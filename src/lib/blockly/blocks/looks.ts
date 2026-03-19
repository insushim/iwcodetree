"use client";
import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript";

export function registerBlocks(): void {
  Blockly.Blocks["say_for_secs"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("TEXT").setCheck(null).appendField("");
      this.appendDummyInput().appendField("을(를)");
      this.appendValueInput("SECS").setCheck("Number");
      this.appendDummyInput().appendField("초 동안 말하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["say_for_secs"] = function (
    block: Blockly.Block,
  ) {
    const text =
      javascriptGenerator.valueToCode(block, "TEXT", Order.ATOMIC) || "'안녕!'";
    const secs =
      javascriptGenerator.valueToCode(block, "SECS", Order.ATOMIC) || "2";
    return `sprite.say(${text});\n{ const _end = performance.now() + ${secs} * 1000; while (performance.now() < _end) { yield; } }\nsprite.say('');\n`;
  };

  Blockly.Blocks["say"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("TEXT").setCheck(null).appendField("");
      this.appendDummyInput().appendField("말하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["say"] = function (block: Blockly.Block) {
    const text =
      javascriptGenerator.valueToCode(block, "TEXT", Order.ATOMIC) || "'안녕!'";
    return `sprite.say(${text});\n`;
  };

  Blockly.Blocks["think_for_secs"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("TEXT").setCheck(null).appendField("");
      this.appendDummyInput().appendField("을(를)");
      this.appendValueInput("SECS").setCheck("Number");
      this.appendDummyInput().appendField("초 동안 생각하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["think_for_secs"] = function (
    block: Blockly.Block,
  ) {
    const text =
      javascriptGenerator.valueToCode(block, "TEXT", Order.ATOMIC) || "'흠...'";
    const secs =
      javascriptGenerator.valueToCode(block, "SECS", Order.ATOMIC) || "2";
    return `sprite.think(${text});\n{ const _end = performance.now() + ${secs} * 1000; while (performance.now() < _end) { yield; } }\nsprite.think('');\n`;
  };

  Blockly.Blocks["think"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("TEXT").setCheck(null).appendField("");
      this.appendDummyInput().appendField("생각하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["think"] = function (block: Blockly.Block) {
    const text =
      javascriptGenerator.valueToCode(block, "TEXT", Order.ATOMIC) || "'흠...'";
    return `sprite.think(${text});\n`;
  };

  Blockly.Blocks["switch_costume"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("COSTUME").setCheck(null).appendField("모양을");
      this.appendDummyInput().appendField("(으)로 바꾸기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["switch_costume"] = function (
    block: Blockly.Block,
  ) {
    const costume =
      javascriptGenerator.valueToCode(block, "COSTUME", Order.ATOMIC) || "1";
    return `sprite.setCostume(${costume});\n`;
  };

  Blockly.Blocks["next_costume"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("다음 모양으로 바꾸기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["next_costume"] = function () {
    return `sprite.nextCostume();\n`;
  };

  Blockly.Blocks["switch_backdrop"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("BACKDROP").setCheck(null).appendField("배경을");
      this.appendDummyInput().appendField("(으)로 바꾸기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["switch_backdrop"] = function (
    block: Blockly.Block,
  ) {
    const backdrop =
      javascriptGenerator.valueToCode(block, "BACKDROP", Order.ATOMIC) || "1";
    return `runtime.stage.switchBackdrop(${backdrop});\n`;
  };

  Blockly.Blocks["next_backdrop"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("다음 배경으로 바꾸기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["next_backdrop"] = function () {
    return `runtime.stage.nextBackdrop();\n`;
  };

  Blockly.Blocks["change_size_by"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("크기를");
      this.appendValueInput("SIZE").setCheck("Number");
      this.appendDummyInput().appendField("만큼 바꾸기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["change_size_by"] = function (
    block: Blockly.Block,
  ) {
    const size =
      javascriptGenerator.valueToCode(block, "SIZE", Order.ATOMIC) || "10";
    return `sprite.changeSize(${size});\n`;
  };

  Blockly.Blocks["set_size_to"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("크기를");
      this.appendValueInput("SIZE").setCheck("Number");
      this.appendDummyInput().appendField("% (으)로 정하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["set_size_to"] = function (
    block: Blockly.Block,
  ) {
    const size =
      javascriptGenerator.valueToCode(block, "SIZE", Order.ATOMIC) || "100";
    return `sprite.setSize(${size});\n`;
  };

  Blockly.Blocks["set_effect"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldDropdown([
            ["색깔", "color"],
            ["밝기", "brightness"],
            ["투명도", "ghost"],
            ["어안렌즈", "fisheye"],
            ["소용돌이", "whirl"],
            ["픽셀화", "pixelate"],
            ["모자이크", "mosaic"],
          ]) as Blockly.Field,
          "EFFECT",
        )
        .appendField("효과를");
      this.appendValueInput("VALUE").setCheck("Number");
      this.appendDummyInput().appendField("(으)로 정하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["set_effect"] = function (block: Blockly.Block) {
    const effect = block.getFieldValue("EFFECT");
    const value =
      javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC) || "0";
    return `sprite.setEffect('${effect}', ${value});\n`;
  };

  Blockly.Blocks["clear_effects"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("그래픽 효과 모두 지우기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["clear_effects"] = function () {
    return `sprite.clearEffects();\n`;
  };

  Blockly.Blocks["show_sprite"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("보이기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["show_sprite"] = function () {
    return `sprite.show();\n`;
  };

  Blockly.Blocks["hide_sprite"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("숨기기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["hide_sprite"] = function () {
    return `sprite.hide();\n`;
  };

  Blockly.Blocks["go_to_layer"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldDropdown([
            ["맨 앞으로", "front"],
            ["맨 뒤로", "back"],
          ]) as Blockly.Field,
          "LAYER",
        )
        .appendField("이동하기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["go_to_layer"] = function (
    block: Blockly.Block,
  ) {
    const layer = block.getFieldValue("LAYER");
    return layer === "front" ? `sprite.goToFront();\n` : `sprite.goToBack();\n`;
  };

  Blockly.Blocks["size_value"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("크기");
      this.setOutput(true, "Number");
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["size_value"] = function () {
    return ["sprite.size", Order.ATOMIC];
  };

  Blockly.Blocks["costume_name"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("모양 이름");
      this.setOutput(true, "String");
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["costume_name"] = function () {
    return ["sprite.currentCostume.name", Order.ATOMIC];
  };

  Blockly.Blocks["costume_number"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("모양 번호");
      this.setOutput(true, "Number");
      this.setColour(290);
    },
  };
  javascriptGenerator.forBlock["costume_number"] = function () {
    return ["(sprite.costumeIndex + 1)", Order.ATOMIC];
  };
}
