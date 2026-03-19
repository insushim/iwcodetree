"use client";
import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript";

export function registerBlocks(): void {
  Blockly.Blocks["pen_clear"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("모두 지우기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
    },
  };
  javascriptGenerator.forBlock["pen_clear"] = function () {
    return `runtime.penLayer.clear();\n`;
  };

  Blockly.Blocks["pen_stamp"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("도장 찍기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
    },
  };
  javascriptGenerator.forBlock["pen_stamp"] = function () {
    return `runtime.penLayer.stamp(sprite.currentCostume.image, sprite.x, sprite.y, sprite.currentCostume.width * sprite.size / 100, sprite.currentCostume.height * sprite.size / 100);\n`;
  };

  Blockly.Blocks["pen_down"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("펜 내리기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
    },
  };
  javascriptGenerator.forBlock["pen_down"] = function () {
    return `sprite.pen.down = true;\n`;
  };

  Blockly.Blocks["pen_up"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("펜 올리기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
    },
  };
  javascriptGenerator.forBlock["pen_up"] = function () {
    return `sprite.pen.down = false;\n`;
  };

  Blockly.Blocks["set_pen_color"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("펜 색깔을")
        .appendField(
          new (Blockly as any).FieldColour("#0000ff") as Blockly.Field,
          "COLOR",
        )
        .appendField("(으)로 정하기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
    },
  };
  javascriptGenerator.forBlock["set_pen_color"] = function (
    block: Blockly.Block,
  ) {
    const color = block.getFieldValue("COLOR");
    return `sprite.pen.color = '${color}';\n`;
  };

  Blockly.Blocks["set_pen_size"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("펜 굵기를");
      this.appendValueInput("SIZE").setCheck("Number");
      this.appendDummyInput().appendField("(으)로 정하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
    },
  };
  javascriptGenerator.forBlock["set_pen_size"] = function (
    block: Blockly.Block,
  ) {
    const size =
      javascriptGenerator.valueToCode(block, "SIZE", Order.ATOMIC) || "1";
    return `sprite.pen.size = ${size};\n`;
  };
}
