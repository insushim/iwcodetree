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
        // Import Blockly and our setup
        const Blockly = await import("blockly");
        (window as any).__Blockly = Blockly;

        // Import and run our custom block registration + toolbox
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
          move: { scrollbars: false, drag: true, wheel: true },
          renderer: "zelos",
        });

        workspaceRef.current = ws;
        onWorkspaceReady?.(ws);
        loadXmlForSprite(currentSpriteRef.current);

        ws.addChangeListener(() => {
          try {
            // Try to generate code from our custom generator
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
      className="absolute inset-0"
      style={{ minHeight: 400 }}
    />
  );
}
