"use client";
import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript";

export function registerBlocks(): void {
  Blockly.Blocks["wait_secs"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("SECS").setCheck("Number").appendField("");
      this.appendDummyInput().appendField("초 기다리기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
    },
  };
  javascriptGenerator.forBlock["wait_secs"] = function (block: Blockly.Block) {
    const secs =
      javascriptGenerator.valueToCode(block, "SECS", Order.ATOMIC) || "1";
    return `{ const _end = performance.now() + ${secs} * 1000; while (performance.now() < _end) { yield; } }\n`;
  };

  Blockly.Blocks["repeat_times"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("TIMES").setCheck("Number").appendField("");
      this.appendDummyInput().appendField("번 반복하기");
      this.appendStatementInput("DO");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
    },
  };
  javascriptGenerator.forBlock["repeat_times"] = function (
    block: Blockly.Block,
  ) {
    const times =
      javascriptGenerator.valueToCode(block, "TIMES", Order.ATOMIC) || "10";
    const branch = javascriptGenerator.statementToCode(block, "DO");
    return `for (let _i = 0; _i < ${times}; _i++) {\n${branch}yield;\n}\n`;
  };

  Blockly.Blocks["forever_loop"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("무한 반복하기");
      this.appendStatementInput("DO");
      this.setPreviousStatement(true, null);
      this.setColour(30);
    },
  };
  javascriptGenerator.forBlock["forever_loop"] = function (
    block: Blockly.Block,
  ) {
    const branch = javascriptGenerator.statementToCode(block, "DO");
    return `while (true) {\n${branch}yield;\n}\n`;
  };

  Blockly.Blocks["if_then"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("만약");
      this.appendDummyInput().appendField("이라면");
      this.appendStatementInput("DO");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
    },
  };
  javascriptGenerator.forBlock["if_then"] = function (block: Blockly.Block) {
    const condition =
      javascriptGenerator.valueToCode(block, "CONDITION", Order.ATOMIC) ||
      "false";
    const branch = javascriptGenerator.statementToCode(block, "DO");
    return `if (${condition}) {\n${branch}}\n`;
  };

  Blockly.Blocks["if_then_else"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("만약");
      this.appendDummyInput().appendField("이라면");
      this.appendStatementInput("DO");
      this.appendDummyInput().appendField("아니면");
      this.appendStatementInput("ELSE");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
    },
  };
  javascriptGenerator.forBlock["if_then_else"] = function (
    block: Blockly.Block,
  ) {
    const condition =
      javascriptGenerator.valueToCode(block, "CONDITION", Order.ATOMIC) ||
      "false";
    const branch = javascriptGenerator.statementToCode(block, "DO");
    const elseBranch = javascriptGenerator.statementToCode(block, "ELSE");
    return `if (${condition}) {\n${branch}} else {\n${elseBranch}}\n`;
  };

  Blockly.Blocks["wait_until"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("CONDITION").setCheck("Boolean").appendField("");
      this.appendDummyInput().appendField("까지 기다리기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
    },
  };
  javascriptGenerator.forBlock["wait_until"] = function (block: Blockly.Block) {
    const condition =
      javascriptGenerator.valueToCode(block, "CONDITION", Order.ATOMIC) ||
      "false";
    return `while (!(${condition})) { yield; }\n`;
  };

  Blockly.Blocks["repeat_until"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("CONDITION").setCheck("Boolean").appendField("");
      this.appendDummyInput().appendField("까지 반복하기");
      this.appendStatementInput("DO");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
    },
  };
  javascriptGenerator.forBlock["repeat_until"] = function (
    block: Blockly.Block,
  ) {
    const condition =
      javascriptGenerator.valueToCode(block, "CONDITION", Order.ATOMIC) ||
      "false";
    const branch = javascriptGenerator.statementToCode(block, "DO");
    return `while (!(${condition})) {\n${branch}yield;\n}\n`;
  };

  Blockly.Blocks["stop_script"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldDropdown([
            ["모두", "all"],
            ["이 스크립트", "this"],
            ["스프라이트의 다른 스크립트", "other"],
          ]) as Blockly.Field,
          "STOP",
        )
        .appendField("멈추기");
      this.setPreviousStatement(true, null);
      this.setColour(30);
    },
  };
  javascriptGenerator.forBlock["stop_script"] = function (
    block: Blockly.Block,
  ) {
    const stop = block.getFieldValue("STOP");
    if (stop === "all") return `runtime.stop(); return;\n`;
    if (stop === "this") return `return;\n`;
    return `runtime.scheduler.removeThreadsForSprite(sprite.name);\n`;
  };

  Blockly.Blocks["create_clone_of"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldDropdown([["자신", "_myself_"]]) as Blockly.Field,
          "TARGET",
        )
        .appendField("의 복제본 만들기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
    },
  };
  javascriptGenerator.forBlock["create_clone_of"] = function (
    block: Blockly.Block,
  ) {
    const target = block.getFieldValue("TARGET");
    if (target === "_myself_") {
      return `runtime.createClone(sprite.name);\n`;
    }
    return `runtime.createClone('${target}');\n`;
  };

  Blockly.Blocks["when_clone_start"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("복제본으로 시작했을 때");
      this.setNextStatement(true, null);
      this.setColour(30);
    },
  };
  javascriptGenerator.forBlock["when_clone_start"] = function () {
    return "";
  };

  Blockly.Blocks["delete_this_clone"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("이 복제본 삭제하기");
      this.setPreviousStatement(true, null);
      this.setColour(30);
    },
  };
  javascriptGenerator.forBlock["delete_this_clone"] = function () {
    return `sprite.deleteClone(); return;\n`;
  };
}
