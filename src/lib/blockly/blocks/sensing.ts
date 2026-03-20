"use client";
import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript";

export function registerBlocks(): void {
  Blockly.Blocks["touching_target"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldDropdown([
            ["마우스 포인터", "_mouse_"],
            ["벽", "_edge_"],
          ]) as Blockly.Field,
          "TARGET",
        )
        .appendField("에 닿았는가?");
      this.setOutput(true, "Boolean");
      this.setColour(190);
    },
  };
  javascriptGenerator.forBlock["touching_target"] = function (
    block: Blockly.Block,
  ) {
    const target = block.getFieldValue("TARGET");
    return [`sprite.isTouching('${target}')`, Order.ATOMIC];
  };

  Blockly.Blocks["touching_color"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldDropdown([
            ["빨강", "#FF0000"],
            ["파랑", "#0000FF"],
            ["초록", "#00CC00"],
            ["노랑", "#FFFF00"],
            ["검정", "#000000"],
          ]),
          "COLOR",
        )
        .appendField("색에 닿았는가?");
      this.setOutput(true, "Boolean");
      this.setColour(190);
    },
  };
  javascriptGenerator.forBlock["touching_color"] = function () {
    return ["false", Order.ATOMIC];
  };

  Blockly.Blocks["ask_and_wait"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("QUESTION").setCheck("String").appendField("");
      this.appendDummyInput().appendField("묻고 기다리기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(190);
    },
  };
  javascriptGenerator.forBlock["ask_and_wait"] = function (
    block: Blockly.Block,
  ) {
    const question =
      javascriptGenerator.valueToCode(block, "QUESTION", Order.ATOMIC) ||
      "'이름이 뭐야?'";
    return `{ const _a = prompt(${question}) || ''; if (runtime.stage) runtime.stage.answer = _a; }\nyield;\n`;
  };

  Blockly.Blocks["answer_value"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("대답");
      this.setOutput(true, "String");
      this.setColour(190);
    },
  };
  javascriptGenerator.forBlock["answer_value"] = function () {
    return ["runtime.getAnswer()", Order.ATOMIC];
  };

  Blockly.Blocks["mouse_x_value"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("마우스 x좌표");
      this.setOutput(true, "Number");
      this.setColour(190);
    },
  };
  javascriptGenerator.forBlock["mouse_x_value"] = function () {
    return ["(runtime.stage ? runtime.stage.mouseX : 0)", Order.ATOMIC];
  };

  Blockly.Blocks["mouse_y_value"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("마우스 y좌표");
      this.setOutput(true, "Number");
      this.setColour(190);
    },
  };
  javascriptGenerator.forBlock["mouse_y_value"] = function () {
    return ["(runtime.stage ? runtime.stage.mouseY : 0)", Order.ATOMIC];
  };

  Blockly.Blocks["mouse_down_bool"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("마우스를 클릭했는가?");
      this.setOutput(true, "Boolean");
      this.setColour(190);
    },
  };
  javascriptGenerator.forBlock["mouse_down_bool"] = function () {
    return ["(runtime.stage ? runtime.stage.mouseDown : false)", Order.ATOMIC];
  };

  Blockly.Blocks["key_pressed_bool"] = {
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
            ["w", "w"],
            ["s", "s"],
            ["d", "d"],
          ]) as Blockly.Field,
          "KEY",
        )
        .appendField("키를 눌렀는가?");
      this.setOutput(true, "Boolean");
      this.setColour(190);
    },
  };
  javascriptGenerator.forBlock["key_pressed_bool"] = function (
    block: Blockly.Block,
  ) {
    const key = block.getFieldValue("KEY");
    return [
      `(runtime.stage ? runtime.stage.isKeyPressed('${key}') : false)`,
      Order.ATOMIC,
    ];
  };

  Blockly.Blocks["distance_to"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldDropdown([
            ["마우스 포인터", "_mouse_"],
          ]) as Blockly.Field,
          "TARGET",
        )
        .appendField("까지의 거리");
      this.setOutput(true, "Number");
      this.setColour(190);
    },
  };
  javascriptGenerator.forBlock["distance_to"] = function () {
    return [
      "sprite.distanceTo(runtime.stage ? runtime.stage.mouseX : 0, runtime.stage ? runtime.stage.mouseY : 0)",
      Order.ATOMIC,
    ];
  };

  Blockly.Blocks["timer_value"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("타이머");
      this.setOutput(true, "Number");
      this.setColour(190);
    },
  };
  javascriptGenerator.forBlock["timer_value"] = function () {
    return ["runtime.getTimer()", Order.ATOMIC];
  };

  Blockly.Blocks["reset_timer"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("타이머 초기화");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(190);
    },
  };
  javascriptGenerator.forBlock["reset_timer"] = function () {
    return `runtime.resetTimer();\n`;
  };

  Blockly.Blocks["current_datetime"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("현재")
        .appendField(
          new Blockly.FieldDropdown([
            ["연도", "year"],
            ["월", "month"],
            ["일", "date"],
            ["요일", "day"],
            ["시", "hour"],
            ["분", "minute"],
            ["초", "second"],
          ]) as Blockly.Field,
          "TYPE",
        );
      this.setOutput(true, "Number");
      this.setColour(190);
    },
  };
  javascriptGenerator.forBlock["current_datetime"] = function (
    block: Blockly.Block,
  ) {
    const type = block.getFieldValue("TYPE");
    const map: Record<string, string> = {
      year: "new Date().getFullYear()",
      month: "(new Date().getMonth() + 1)",
      date: "new Date().getDate()",
      day: "new Date().getDay()",
      hour: "new Date().getHours()",
      minute: "new Date().getMinutes()",
      second: "new Date().getSeconds()",
    };
    return [map[type] || "0", Order.ATOMIC];
  };
}
