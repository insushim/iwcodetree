"use client";
import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript";

export function registerBlocks(): void {
  // Define block (hat block)
  Blockly.Blocks["procedures_defnoreturn"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("정의하기")
        .appendField(
          new Blockly.FieldTextInput("나의 블록") as Blockly.Field,
          "NAME",
        );
      this.appendStatementInput("STACK");
      this.setColour(300);
      this.setTooltip("새 블록을 정의합니다");
    },
  };
  javascriptGenerator.forBlock["procedures_defnoreturn"] = function (
    block: Blockly.Block,
  ) {
    const funcName = block
      .getFieldValue("NAME")
      .replace(/[^a-zA-Z0-9가-힣_]/g, "_");
    const branch = javascriptGenerator.statementToCode(block, "STACK");
    return `function* _proc_${funcName}() {\n${branch}}\n`;
  };

  // Call block
  Blockly.Blocks["procedures_callnoreturn"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldTextInput("나의 블록") as Blockly.Field,
          "NAME",
        );
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(300);
      this.setTooltip("정의한 블록을 실행합니다");
    },
  };
  javascriptGenerator.forBlock["procedures_callnoreturn"] = function (
    block: Blockly.Block,
  ) {
    const funcName = block
      .getFieldValue("NAME")
      .replace(/[^a-zA-Z0-9가-힣_]/g, "_");
    return `yield* _proc_${funcName}();\n`;
  };
}
