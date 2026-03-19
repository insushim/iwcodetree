"use client";
import * as Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";

export function generateCode(workspace: Blockly.WorkspaceSvg): string {
  javascriptGenerator.STATEMENT_PREFIX = "";
  javascriptGenerator.STATEMENT_SUFFIX = "";
  const code = javascriptGenerator.workspaceToCode(workspace);
  return code;
}

export function getTopLevelBlocks(
  workspace: Blockly.WorkspaceSvg,
): Blockly.Block[] {
  return workspace.getTopBlocks(true);
}

export function generateCodeForBlock(block: Blockly.Block): string {
  let code = "";
  let current: Blockly.Block | null = block;
  while (current) {
    const blockCode = javascriptGenerator.blockToCode(current);
    if (typeof blockCode === "string") {
      code += blockCode;
    } else if (Array.isArray(blockCode)) {
      code += blockCode[0];
    }
    current = current.getNextBlock();
  }
  return code;
}

export function getEventType(
  block: Blockly.Block,
): { event: string; param?: string } | null {
  switch (block.type) {
    case "when_flag_clicked":
      return { event: "flag_clicked" };
    case "when_key_pressed":
      return { event: "key_pressed", param: block.getFieldValue("KEY") };
    case "when_sprite_clicked":
      return { event: "sprite_clicked" };
    case "when_backdrop_switch":
      return {
        event: "backdrop_switch",
        param: block.getFieldValue("BACKDROP"),
      };
    case "when_receive_msg":
      return { event: "message_" + block.getFieldValue("MSG") };
    case "when_clone_start":
      return { event: "clone_start" };
    default:
      return null;
  }
}
