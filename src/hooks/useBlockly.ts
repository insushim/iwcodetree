"use client";

import { useRef, useEffect, useCallback } from "react";
import Blockly from "blockly";
import {
  BLOCKLY_GRID_SPACING,
  BLOCKLY_GRID_LENGTH,
  BLOCKLY_GRID_SNAP,
  BLOCKLY_ZOOM,
} from "@/lib/utils/constants";
import { useEditorStore } from "@/stores/editorStore";
import { debounce } from "@/lib/utils/helpers";

export interface UseBlocklyOptions {
  toolboxXml?: string;
  readOnly?: boolean;
}

const DEFAULT_TOOLBOX = `
<xml id="toolbox" style="display: none">
  <category name="Motion" colour="#4C97FF">
    <block type="controls_repeat_ext">
      <value name="TIMES"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
    </block>
  </category>
  <category name="Looks" colour="#9966FF"></category>
  <category name="Events" colour="#FFD500"></category>
  <category name="Control" colour="#FFAB19">
    <block type="controls_if"></block>
    <block type="controls_repeat_ext"></block>
    <block type="controls_whileUntil"></block>
  </category>
  <category name="Operators" colour="#40BF4A">
    <block type="math_number"></block>
    <block type="math_arithmetic"></block>
    <block type="logic_compare"></block>
    <block type="logic_operation"></block>
  </category>
  <category name="Variables" colour="#FF8C1A" custom="VARIABLE"></category>
</xml>
`;

export function useBlockly(options: UseBlocklyOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const { selectedSpriteId, saveBlocklyXml, loadBlocklyXml } = useEditorStore();

  const getWorkspaceXml = useCallback((): string => {
    const ws = workspaceRef.current;
    if (!ws) return "";
    const dom = Blockly.Xml.workspaceToDom(ws);
    return Blockly.Xml.domToText(dom);
  }, []);

  const setWorkspaceXml = useCallback((xml: string): void => {
    const ws = workspaceRef.current;
    if (!ws) return;
    ws.clear();
    if (xml) {
      try {
        const dom = Blockly.utils.xml.textToDom(xml);
        Blockly.Xml.domToWorkspace(dom, ws);
      } catch (e) {
        console.error("Failed to load Blockly XML:", e);
      }
    }
  }, []);

  // Initialize workspace
  useEffect(() => {
    if (!containerRef.current) return;

    const toolboxXml = options.toolboxXml ?? DEFAULT_TOOLBOX;
    const toolboxDom = Blockly.utils.xml.textToDom(toolboxXml);

    const workspace = Blockly.inject(containerRef.current, {
      toolbox: toolboxDom,
      grid: {
        spacing: BLOCKLY_GRID_SPACING,
        length: BLOCKLY_GRID_LENGTH,
        colour: "#ccc",
        snap: BLOCKLY_GRID_SNAP,
      },
      zoom: { ...BLOCKLY_ZOOM },
      trashcan: true,
      readOnly: options.readOnly ?? false,
    });

    workspaceRef.current = workspace;

    // Auto-save on change
    const debouncedSave = debounce(() => {
      const spriteId = useEditorStore.getState().selectedSpriteId;
      if (spriteId) {
        const xml = getWorkspaceXml();
        useEditorStore.getState().saveBlocklyXml(spriteId, xml);
      }
    }, 300);

    workspace.addChangeListener((e: Blockly.Events.Abstract) => {
      if (
        e.type === Blockly.Events.BLOCK_MOVE ||
        e.type === Blockly.Events.BLOCK_CHANGE ||
        e.type === Blockly.Events.BLOCK_CREATE ||
        e.type === Blockly.Events.BLOCK_DELETE
      ) {
        debouncedSave();
      }
    });

    return () => {
      workspace.dispose();
      workspaceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load XML when selected sprite changes
  useEffect(() => {
    if (!selectedSpriteId || !workspaceRef.current) return;
    const xml = loadBlocklyXml(selectedSpriteId);
    setWorkspaceXml(xml ?? "");
  }, [selectedSpriteId, loadBlocklyXml, setWorkspaceXml]);

  const resize = useCallback(() => {
    Blockly.svgResize(workspaceRef.current!);
  }, []);

  return {
    containerRef,
    workspaceRef,
    getWorkspaceXml,
    setWorkspaceXml,
    resize,
  };
}
