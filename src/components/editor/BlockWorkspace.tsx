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

  const saveCurrentXml = useCallback(() => {
    if (workspaceRef.current) {
      try {
        const Blockly = (window as any).__Blockly;
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
        const Blockly = (window as any).__Blockly;
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

    const init = async () => {
      try {
        const Blockly = await import("blockly");
        (window as any).__Blockly = Blockly;

        const { initBlockly, toolbox } = await import("@/lib/blockly/setup");
        initBlockly();

        ws = Blockly.inject(containerRef.current!, {
          toolbox,
          grid: { spacing: 20, length: 3, colour: "#E2E8F0", snap: true },
          zoom: {
            controls: true,
            wheel: true,
            startScale: 0.85,
            maxScale: 2,
            minScale: 0.3,
          },
          trashcan: true,
          move: { scrollbars: true, drag: true, wheel: true },
          renderer: "zelos",
        });

        workspaceRef.current = ws;
        onWorkspaceReady?.(ws);
        loadXmlForSprite(currentSpriteRef.current);

        // Resize after layout settles
        requestAnimationFrame(() => {
          Blockly.svgResize(ws);
        });

        ws.addChangeListener(() => {
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
      } catch (err) {
        console.error("Failed to load Blockly:", err);
      }
    };

    init();

    return () => {
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
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
    />
  );
}
