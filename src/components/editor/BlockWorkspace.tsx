"use client";

import { useEffect, useRef, useCallback } from "react";

interface BlockWorkspaceProps {
  spriteId: string;
  onCodeChange: (code: string) => void;
  onWorkspaceReady?: (ws: any) => void;
}

const spriteXmlMap = new Map<string, string>();

export function BlockWorkspace({
  spriteId,
  onCodeChange,
  onWorkspaceReady,
}: BlockWorkspaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<any>(null);
  const currentSpriteRef = useRef(spriteId);
  const blocklyRef = useRef<any>(null);

  const saveCurrentXml = useCallback(() => {
    if (workspaceRef.current) {
      try {
        const Blockly = blocklyRef.current;
        if (Blockly) {
          const xml = Blockly.Xml.workspaceToDom(workspaceRef.current);
          const xmlText = Blockly.Xml.domToText(xml);
          spriteXmlMap.set(currentSpriteRef.current, xmlText);
        }
      } catch {
        /* ignore */
      }
    }
  }, []);

  const loadXmlForSprite = useCallback((sid: string) => {
    if (workspaceRef.current) {
      try {
        const Blockly = blocklyRef.current;
        if (Blockly) {
          workspaceRef.current.clear();
          const xmlText = spriteXmlMap.get(sid);
          if (xmlText) {
            const xml = Blockly.Xml.textToDom(xmlText);
            Blockly.Xml.domToWorkspace(xml, workspaceRef.current);
          }
        }
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let ws: any = null;
    let resizeObserver: ResizeObserver | null = null;

    const init = async () => {
      try {
        const Blockly = await import("blockly");
        blocklyRef.current = Blockly;
        (window as any).__Blockly = Blockly;

        const { initBlockly, toolbox } = await import("@/lib/blockly/setup");
        initBlockly();

        ws = Blockly.inject(containerRef.current!, {
          toolbox,
          grid: { spacing: 20, length: 3, colour: "#E2E8F0", snap: true },
          zoom: {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 2,
            minScale: 0.3,
          },
          trashcan: true,
          move: { scrollbars: true, drag: true, wheel: true },
          renderer: "zelos",
        });

        workspaceRef.current = ws;

        // Critical: resize Blockly SVG to match container after layout settles
        Blockly.svgResize(ws);
        // Also resize after a short delay to catch late layout changes
        setTimeout(() => Blockly.svgResize(ws), 100);
        setTimeout(() => Blockly.svgResize(ws), 500);

        // Watch for container size changes
        resizeObserver = new ResizeObserver(() => {
          if (workspaceRef.current) {
            Blockly.svgResize(workspaceRef.current);
          }
        });
        resizeObserver.observe(containerRef.current!);

        // Also handle window resize
        const handleResize = () => {
          if (workspaceRef.current) {
            Blockly.svgResize(workspaceRef.current);
          }
        };
        window.addEventListener("resize", handleResize);

        onWorkspaceReady?.(ws);
        loadXmlForSprite(currentSpriteRef.current);

        ws.addChangeListener((event: any) => {
          // When a block is created (dragged from flyout), scroll to show it
          if (event.type === Blockly.Events.BLOCK_CREATE && event.blockId) {
            setTimeout(() => {
              try {
                ws.centerOnBlock(event.blockId);
              } catch {
                /* block might not exist */
              }
            }, 50);
          }

          try {
            const { generateCode } = require("@/lib/blockly/generator");
            if (generateCode) {
              const code = generateCode(ws);
              onCodeChange(code);
            }
          } catch {
            // Code generation not available yet
          }
        });

        // Store cleanup for window resize
        (containerRef.current as any).__resizeHandler = handleResize;
      } catch (err) {
        console.error("Failed to load Blockly:", err);
      }
    };

    init();

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      if (containerRef.current) {
        const handler = (containerRef.current as any).__resizeHandler;
        if (handler) window.removeEventListener("resize", handler);
      }
      if (ws) {
        try {
          ws.dispose();
        } catch {
          /* ignore */
        }
      }
    };
  }, [loadXmlForSprite, onCodeChange]);

  useEffect(() => {
    if (spriteId !== currentSpriteRef.current) {
      saveCurrentXml();
      currentSpriteRef.current = spriteId;
      loadXmlForSprite(spriteId);
    }
  }, [spriteId, saveCurrentXml, loadXmlForSprite]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ minHeight: 400 }}
    />
  );
}
