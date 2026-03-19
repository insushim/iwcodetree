"use client";
import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript";

export function registerBlocks(): void {
  Blockly.Blocks["play_sound"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldDropdown([
            ["야옹", "meow"],
            ["팝", "pop"],
            ["딩", "ding"],
            ["보잉", "boing"],
            ["버즈", "buzz"],
            ["클릭", "click"],
            ["드럼", "drum"],
          ]) as Blockly.Field,
          "SOUND",
        )
        .appendField("소리 재생하기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
    },
  };
  javascriptGenerator.forBlock["play_sound"] = function (block: Blockly.Block) {
    const sound = block.getFieldValue("SOUND");
    return `runtime.soundEngine.playSound('${sound}');\n`;
  };

  Blockly.Blocks["play_sound_wait"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldDropdown([
            ["야옹", "meow"],
            ["팝", "pop"],
            ["딩", "ding"],
            ["보잉", "boing"],
            ["버즈", "buzz"],
            ["클릭", "click"],
            ["드럼", "drum"],
          ]) as Blockly.Field,
          "SOUND",
        )
        .appendField("소리 끝까지 재생하기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
    },
  };
  javascriptGenerator.forBlock["play_sound_wait"] = function (
    block: Blockly.Block,
  ) {
    const sound = block.getFieldValue("SOUND");
    return `yield; runtime.soundEngine.playSound('${sound}');\n{ const _end = performance.now() + 500; while (performance.now() < _end) { yield; } }\n`;
  };

  Blockly.Blocks["stop_all_sounds"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("모든 소리 멈추기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
    },
  };
  javascriptGenerator.forBlock["stop_all_sounds"] = function () {
    return `runtime.soundEngine.stopAll();\n`;
  };

  Blockly.Blocks["change_volume"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("음량을");
      this.appendValueInput("VOLUME").setCheck("Number");
      this.appendDummyInput().appendField("만큼 바꾸기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
    },
  };
  javascriptGenerator.forBlock["change_volume"] = function (
    block: Blockly.Block,
  ) {
    const vol =
      javascriptGenerator.valueToCode(block, "VOLUME", Order.ATOMIC) || "-10";
    return `runtime.soundEngine.changeVolume(${vol});\n`;
  };

  Blockly.Blocks["set_volume"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("음량을");
      this.appendValueInput("VOLUME").setCheck("Number");
      this.appendDummyInput().appendField("% (으)로 정하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
    },
  };
  javascriptGenerator.forBlock["set_volume"] = function (block: Blockly.Block) {
    const vol =
      javascriptGenerator.valueToCode(block, "VOLUME", Order.ATOMIC) || "100";
    return `runtime.soundEngine.setVolume(${vol});\n`;
  };

  Blockly.Blocks["volume_value"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("음량");
      this.setOutput(true, "Number");
      this.setColour(330);
    },
  };
  javascriptGenerator.forBlock["volume_value"] = function () {
    return ["runtime.soundEngine.getVolume()", Order.ATOMIC];
  };

  Blockly.Blocks["play_note"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("NOTE").setCheck("Number").appendField("");
      this.appendDummyInput().appendField("음을");
      this.appendValueInput("BEATS").setCheck("Number");
      this.appendDummyInput().appendField("박자 연주하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
    },
  };
  javascriptGenerator.forBlock["play_note"] = function (block: Blockly.Block) {
    const note =
      javascriptGenerator.valueToCode(block, "NOTE", Order.ATOMIC) || "60";
    const beats =
      javascriptGenerator.valueToCode(block, "BEATS", Order.ATOMIC) || "0.5";
    return `runtime.soundEngine.playNote(${note}, ${beats} * 0.5);\n{ const _end = performance.now() + ${beats} * 500; while (performance.now() < _end) { yield; } }\n`;
  };
}
