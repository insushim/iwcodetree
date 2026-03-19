"use client";
import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript";

export function registerBlocks(): void {
  Blockly.Blocks["set_variable"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldTextInput("내 변수") as Blockly.Field,
          "VAR",
        )
        .appendField("을(를)");
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField("(으)로 정하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
    },
  };
  javascriptGenerator.forBlock["set_variable"] = function (
    block: Blockly.Block,
  ) {
    const varName = block.getFieldValue("VAR");
    const value =
      javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC) || "0";
    return `sprite.variables.set('${varName}', ${value});\n`;
  };

  Blockly.Blocks["change_variable"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldTextInput("내 변수") as Blockly.Field,
          "VAR",
        )
        .appendField("을(를)");
      this.appendValueInput("VALUE").setCheck("Number");
      this.appendDummyInput().appendField("만큼 바꾸기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
    },
  };
  javascriptGenerator.forBlock["change_variable"] = function (
    block: Blockly.Block,
  ) {
    const varName = block.getFieldValue("VAR");
    const value =
      javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC) || "1";
    return `sprite.variables.set('${varName}', (Number(sprite.variables.get('${varName}')) || 0) + ${value});\n`;
  };

  Blockly.Blocks["variable_get"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldTextInput("내 변수") as Blockly.Field,
          "VAR",
        );
      this.setOutput(true, null);
      this.setColour(20);
    },
  };
  javascriptGenerator.forBlock["variable_get"] = function (
    block: Blockly.Block,
  ) {
    const varName = block.getFieldValue("VAR");
    return [`(sprite.variables.get('${varName}') ?? 0)`, Order.ATOMIC];
  };
}
