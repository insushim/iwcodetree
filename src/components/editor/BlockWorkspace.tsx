"use client";

import { useEffect, useRef, useCallback } from "react";

interface BlockWorkspaceProps {
  spriteId: string;
  onCodeChange: (code: string) => void;
}

// Store XML per sprite
const spriteXmlMap = new Map<string, string>();

export function BlockWorkspace({
  spriteId,
  onCodeChange,
}: BlockWorkspaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<any>(null);
  const currentSpriteRef = useRef(spriteId);

  const saveCurrentXml = useCallback(() => {
    if (workspaceRef.current) {
      try {
        const Blockly = (window as any).Blockly;
        if (Blockly) {
          const xml = Blockly.Xml.workspaceToDom(workspaceRef.current);
          const xmlText = Blockly.Xml.domToText(xml);
          spriteXmlMap.set(currentSpriteRef.current, xmlText);
        }
      } catch {
        // Blockly not loaded yet
      }
    }
  }, []);

  const loadXmlForSprite = useCallback((sid: string) => {
    if (workspaceRef.current) {
      try {
        const Blockly = (window as any).Blockly;
        if (Blockly) {
          workspaceRef.current.clear();
          const xmlText = spriteXmlMap.get(sid);
          if (xmlText) {
            const xml = Blockly.Xml.textToDom(xmlText);
            Blockly.Xml.domToWorkspace(xml, workspaceRef.current);
          }
        }
      } catch {
        // Blockly not loaded yet
      }
    }
  }, []);

  // Initialize Blockly
  useEffect(() => {
    if (!containerRef.current) return;

    let ws: any = null;

    const initBlockly = async () => {
      try {
        const Blockly = await import("blockly");
        (window as any).Blockly = Blockly;

        const toolbox = {
          kind: "categoryToolbox",
          contents: [
            {
              kind: "category",
              name: "동작",
              colour: "#4C97FF",
              contents: [
                { kind: "block", type: "controls_repeat_ext" },
                { kind: "block", type: "controls_whileUntil" },
              ],
            },
            {
              kind: "category",
              name: "형태",
              colour: "#9966FF",
              contents: [
                { kind: "block", type: "text" },
                { kind: "block", type: "text_print" },
              ],
            },
            {
              kind: "category",
              name: "이벤트",
              colour: "#FFD500",
              contents: [{ kind: "block", type: "procedures_defnoreturn" }],
            },
            {
              kind: "category",
              name: "제어",
              colour: "#FFAB19",
              contents: [
                { kind: "block", type: "controls_if" },
                { kind: "block", type: "controls_repeat_ext" },
              ],
            },
            {
              kind: "category",
              name: "감지",
              colour: "#5CB1D6",
              contents: [
                { kind: "block", type: "logic_compare" },
                { kind: "block", type: "logic_operation" },
              ],
            },
            {
              kind: "category",
              name: "연산",
              colour: "#40BF4A",
              contents: [
                { kind: "block", type: "math_number" },
                { kind: "block", type: "math_arithmetic" },
              ],
            },
            {
              kind: "category",
              name: "변수",
              colour: "#FF8C1A",
              custom: "VARIABLE",
            },
          ],
        };

        ws = Blockly.inject(containerRef.current!, {
          toolbox,
          grid: {
            spacing: 20,
            length: 3,
            colour: "#E2E8F0",
            snap: true,
          },
          zoom: {
            controls: true,
            wheel: true,
            startScale: 0.85,
            maxScale: 2,
            minScale: 0.3,
          },
          trashcan: true,
          move: {
            scrollbars: true,
            drag: true,
            wheel: true,
          },
          renderer: "zelos",
        });

        workspaceRef.current = ws;

        // Load saved xml
        loadXmlForSprite(currentSpriteRef.current);

        // Listen for changes
        ws.addChangeListener(() => {
          try {
            const Blockly = (window as any).Blockly;
            if (Blockly?.JavaScript) {
              const code = (Blockly.JavaScript as any).workspaceToCode(ws);
              onCodeChange(code);
            }
          } catch {
            // Code generation not available
          }
        });
      } catch (err) {
        console.error("Failed to load Blockly:", err);
      }
    };

    initBlockly();

    return () => {
      if (ws) {
        try {
          ws.dispose();
        } catch {
          // Ignore disposal errors
        }
      }
    };
  }, [loadXmlForSprite, onCodeChange]);

  // Handle sprite switching
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
