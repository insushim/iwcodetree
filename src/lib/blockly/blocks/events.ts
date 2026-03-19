"use client";
import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript";

export function registerBlocks(): void {
  Blockly.Blocks["when_flag_clicked"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("🚩 클릭했을 때");
      this.setNextStatement(true, null);
      this.setColour(45);
      this.setTooltip("깃발을 클릭하면 실행됩니다");
    },
  };
  javascriptGenerator.forBlock["when_flag_clicked"] = function () {
    return "";
  };

  Blockly.Blocks["when_key_pressed"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldDropdown([
            ["스페이스", " "],
            ["위쪽 화살표", "ArrowUp"],
            ["아래쪽 화살표", "ArrowDown"],
            ["오른쪽 화살표", "ArrowRight"],
            ["왼쪽 화살표", "ArrowLeft"],
            ["a", "a"],
            ["b", "b"],
            ["c", "c"],
            ["d", "d"],
            ["e", "e"],
            ["f", "f"],
            ["g", "g"],
            ["h", "h"],
            ["i", "i"],
            ["j", "j"],
            ["k", "k"],
            ["l", "l"],
            ["m", "m"],
            ["n", "n"],
            ["o", "o"],
            ["p", "p"],
            ["q", "q"],
            ["r", "r"],
            ["s", "s"],
            ["t", "t"],
            ["u", "u"],
            ["v", "v"],
            ["w", "w"],
            ["x", "x"],
            ["y", "y"],
            ["z", "z"],
            ["0", "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
          ]) as Blockly.Field,
          "KEY",
        )
        .appendField("키를 눌렀을 때");
      this.setNextStatement(true, null);
      this.setColour(45);
    },
  };
  javascriptGenerator.forBlock["when_key_pressed"] = function () {
    return "";
  };

  Blockly.Blocks["when_sprite_clicked"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("이 스프라이트를 클릭했을 때");
      this.setNextStatement(true, null);
      this.setColour(45);
    },
  };
  javascriptGenerator.forBlock["when_sprite_clicked"] = function () {
    return "";
  };

  Blockly.Blocks["when_backdrop_switch"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("배경이")
        .appendField(
          new Blockly.FieldTextInput("배경1") as Blockly.Field,
          "BACKDROP",
        )
        .appendField("(으)로 바뀌었을 때");
      this.setNextStatement(true, null);
      this.setColour(45);
    },
  };
  javascriptGenerator.forBlock["when_backdrop_switch"] = function () {
    return "";
  };

  Blockly.Blocks["broadcast_msg"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("MSG").setCheck("String").appendField("");
      this.appendDummyInput().appendField("방송하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(45);
    },
  };
  javascriptGenerator.forBlock["broadcast_msg"] = function (
    block: Blockly.Block,
  ) {
    const msg =
      javascriptGenerator.valueToCode(block, "MSG", Order.ATOMIC) ||
      "'메시지1'";
    return `runtime.broadcast(${msg});\n`;
  };

  Blockly.Blocks["broadcast_msg_wait"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("MSG").setCheck("String").appendField("");
      this.appendDummyInput().appendField("방송하고 기다리기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(45);
    },
  };
  javascriptGenerator.forBlock["broadcast_msg_wait"] = function (
    block: Blockly.Block,
  ) {
    const msg =
      javascriptGenerator.valueToCode(block, "MSG", Order.ATOMIC) ||
      "'메시지1'";
    return `yield* runtime.broadcastAndWait(${msg});\n`;
  };

  Blockly.Blocks["when_receive_msg"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldTextInput("메시지1") as Blockly.Field,
          "MSG",
        )
        .appendField("을(를) 받았을 때");
      this.setNextStatement(true, null);
      this.setColour(45);
    },
  };
  javascriptGenerator.forBlock["when_receive_msg"] = function () {
    return "";
  };
}
