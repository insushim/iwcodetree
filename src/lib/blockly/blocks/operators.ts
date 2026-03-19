"use client";
import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript";

export function registerBlocks(): void {
  Blockly.Blocks["math_add"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("A").setCheck("Number");
      this.appendDummyInput().appendField("+");
      this.appendValueInput("B").setCheck("Number");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["math_add"] = function (block: Blockly.Block) {
    const a =
      javascriptGenerator.valueToCode(block, "A", Order.ADDITION) || "0";
    const b =
      javascriptGenerator.valueToCode(block, "B", Order.ADDITION) || "0";
    return [`(${a} + ${b})`, Order.ADDITION];
  };

  Blockly.Blocks["math_subtract"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("A").setCheck("Number");
      this.appendDummyInput().appendField("-");
      this.appendValueInput("B").setCheck("Number");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["math_subtract"] = function (
    block: Blockly.Block,
  ) {
    const a =
      javascriptGenerator.valueToCode(block, "A", Order.SUBTRACTION) || "0";
    const b =
      javascriptGenerator.valueToCode(block, "B", Order.SUBTRACTION) || "0";
    return [`(${a} - ${b})`, Order.SUBTRACTION];
  };

  Blockly.Blocks["math_multiply"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("A").setCheck("Number");
      this.appendDummyInput().appendField("*");
      this.appendValueInput("B").setCheck("Number");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["math_multiply"] = function (
    block: Blockly.Block,
  ) {
    const a =
      javascriptGenerator.valueToCode(block, "A", Order.MULTIPLICATION) || "0";
    const b =
      javascriptGenerator.valueToCode(block, "B", Order.MULTIPLICATION) || "0";
    return [`(${a} * ${b})`, Order.MULTIPLICATION];
  };

  Blockly.Blocks["math_divide"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("A").setCheck("Number");
      this.appendDummyInput().appendField("/");
      this.appendValueInput("B").setCheck("Number");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["math_divide"] = function (
    block: Blockly.Block,
  ) {
    const a =
      javascriptGenerator.valueToCode(block, "A", Order.DIVISION) || "0";
    const b =
      javascriptGenerator.valueToCode(block, "B", Order.DIVISION) || "1";
    return [`(${a} / ${b})`, Order.DIVISION];
  };

  Blockly.Blocks["random_from_to"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("FROM").setCheck("Number").appendField("");
      this.appendDummyInput().appendField("부터");
      this.appendValueInput("TO").setCheck("Number");
      this.appendDummyInput().appendField("사이의 난수");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["random_from_to"] = function (
    block: Blockly.Block,
  ) {
    const from =
      javascriptGenerator.valueToCode(block, "FROM", Order.ATOMIC) || "1";
    const to =
      javascriptGenerator.valueToCode(block, "TO", Order.ATOMIC) || "10";
    return [
      `(Math.floor(Math.random() * (${to} - ${from} + 1)) + ${from})`,
      Order.ATOMIC,
    ];
  };

  Blockly.Blocks["compare_gt"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("A").setCheck("Number");
      this.appendDummyInput().appendField(">");
      this.appendValueInput("B").setCheck("Number");
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["compare_gt"] = function (block: Blockly.Block) {
    const a =
      javascriptGenerator.valueToCode(block, "A", Order.RELATIONAL) || "0";
    const b =
      javascriptGenerator.valueToCode(block, "B", Order.RELATIONAL) || "0";
    return [`(${a} > ${b})`, Order.RELATIONAL];
  };

  Blockly.Blocks["compare_lt"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("A").setCheck("Number");
      this.appendDummyInput().appendField("<");
      this.appendValueInput("B").setCheck("Number");
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["compare_lt"] = function (block: Blockly.Block) {
    const a =
      javascriptGenerator.valueToCode(block, "A", Order.RELATIONAL) || "0";
    const b =
      javascriptGenerator.valueToCode(block, "B", Order.RELATIONAL) || "0";
    return [`(${a} < ${b})`, Order.RELATIONAL];
  };

  Blockly.Blocks["compare_eq"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("A").setCheck(null);
      this.appendDummyInput().appendField("=");
      this.appendValueInput("B").setCheck(null);
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["compare_eq"] = function (block: Blockly.Block) {
    const a =
      javascriptGenerator.valueToCode(block, "A", Order.EQUALITY) || "0";
    const b =
      javascriptGenerator.valueToCode(block, "B", Order.EQUALITY) || "0";
    return [`(${a} == ${b})`, Order.EQUALITY];
  };

  Blockly.Blocks["logic_and"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("A").setCheck("Boolean");
      this.appendDummyInput().appendField("그리고");
      this.appendValueInput("B").setCheck("Boolean");
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["logic_and"] = function (block: Blockly.Block) {
    const a =
      javascriptGenerator.valueToCode(block, "A", Order.LOGICAL_AND) || "false";
    const b =
      javascriptGenerator.valueToCode(block, "B", Order.LOGICAL_AND) || "false";
    return [`(${a} && ${b})`, Order.LOGICAL_AND];
  };

  Blockly.Blocks["logic_or"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("A").setCheck("Boolean");
      this.appendDummyInput().appendField("또는");
      this.appendValueInput("B").setCheck("Boolean");
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["logic_or"] = function (block: Blockly.Block) {
    const a =
      javascriptGenerator.valueToCode(block, "A", Order.LOGICAL_OR) || "false";
    const b =
      javascriptGenerator.valueToCode(block, "B", Order.LOGICAL_OR) || "false";
    return [`(${a} || ${b})`, Order.LOGICAL_OR];
  };

  Blockly.Blocks["logic_not"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("OPERAND").setCheck("Boolean").appendField("");
      this.appendDummyInput().appendField("이(가) 아닌");
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["logic_not"] = function (block: Blockly.Block) {
    const operand =
      javascriptGenerator.valueToCode(block, "OPERAND", Order.LOGICAL_NOT) ||
      "false";
    return [`!(${operand})`, Order.LOGICAL_NOT];
  };

  Blockly.Blocks["join_strings"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("A").setCheck(null).appendField("");
      this.appendDummyInput().appendField("와(과)");
      this.appendValueInput("B").setCheck(null);
      this.appendDummyInput().appendField("결합하기");
      this.setInputsInline(true);
      this.setOutput(true, "String");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["join_strings"] = function (
    block: Blockly.Block,
  ) {
    const a = javascriptGenerator.valueToCode(block, "A", Order.ATOMIC) || "''";
    const b = javascriptGenerator.valueToCode(block, "B", Order.ATOMIC) || "''";
    return [`(String(${a}) + String(${b}))`, Order.ADDITION];
  };

  Blockly.Blocks["letter_of_string"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("STRING").setCheck("String").appendField("");
      this.appendDummyInput().appendField("의");
      this.appendValueInput("INDEX").setCheck("Number");
      this.appendDummyInput().appendField("번째 글자");
      this.setInputsInline(true);
      this.setOutput(true, "String");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["letter_of_string"] = function (
    block: Blockly.Block,
  ) {
    const str =
      javascriptGenerator.valueToCode(block, "STRING", Order.ATOMIC) || "''";
    const idx =
      javascriptGenerator.valueToCode(block, "INDEX", Order.ATOMIC) || "1";
    return [`(String(${str})[${idx} - 1] || '')`, Order.ATOMIC];
  };

  Blockly.Blocks["length_of_string"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("STRING").setCheck("String").appendField("");
      this.appendDummyInput().appendField("의 길이");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["length_of_string"] = function (
    block: Blockly.Block,
  ) {
    const str =
      javascriptGenerator.valueToCode(block, "STRING", Order.ATOMIC) || "''";
    return [`String(${str}).length`, Order.ATOMIC];
  };

  Blockly.Blocks["string_contains"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("STRING").setCheck("String").appendField("");
      this.appendDummyInput().appendField("에");
      this.appendValueInput("SUBSTR").setCheck("String");
      this.appendDummyInput().appendField("이(가) 포함되어 있는가?");
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["string_contains"] = function (
    block: Blockly.Block,
  ) {
    const str =
      javascriptGenerator.valueToCode(block, "STRING", Order.ATOMIC) || "''";
    const substr =
      javascriptGenerator.valueToCode(block, "SUBSTR", Order.ATOMIC) || "''";
    return [`String(${str}).includes(String(${substr}))`, Order.ATOMIC];
  };

  Blockly.Blocks["math_mod"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("A").setCheck("Number");
      this.appendDummyInput().appendField("을(를)");
      this.appendValueInput("B").setCheck("Number");
      this.appendDummyInput().appendField("(으)로 나눈 나머지");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["math_mod"] = function (block: Blockly.Block) {
    const a = javascriptGenerator.valueToCode(block, "A", Order.MODULUS) || "0";
    const b = javascriptGenerator.valueToCode(block, "B", Order.MODULUS) || "1";
    return [`(${a} % ${b})`, Order.MODULUS];
  };

  Blockly.Blocks["math_round"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("NUM").setCheck("Number").appendField("");
      this.appendDummyInput().appendField("반올림");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["math_round"] = function (block: Blockly.Block) {
    const num =
      javascriptGenerator.valueToCode(block, "NUM", Order.ATOMIC) || "0";
    return [`Math.round(${num})`, Order.ATOMIC];
  };

  Blockly.Blocks["math_function"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("")
        .appendField(
          new Blockly.FieldDropdown([
            ["절댓값", "abs"],
            ["내림", "floor"],
            ["올림", "ceil"],
            ["제곱근", "sqrt"],
            ["sin", "sin"],
            ["cos", "cos"],
            ["tan", "tan"],
            ["asin", "asin"],
            ["acos", "acos"],
            ["atan", "atan"],
            ["ln", "log"],
            ["log", "log10"],
            ["e^", "exp"],
            ["10^", "pow10"],
          ]) as Blockly.Field,
          "OP",
        );
      this.appendValueInput("NUM").setCheck("Number");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(120);
    },
  };
  javascriptGenerator.forBlock["math_function"] = function (
    block: Blockly.Block,
  ) {
    const op = block.getFieldValue("OP");
    const num =
      javascriptGenerator.valueToCode(block, "NUM", Order.ATOMIC) || "0";
    const map: Record<string, string> = {
      abs: `Math.abs(${num})`,
      floor: `Math.floor(${num})`,
      ceil: `Math.ceil(${num})`,
      sqrt: `Math.sqrt(${num})`,
      sin: `Math.sin(${num} * Math.PI / 180)`,
      cos: `Math.cos(${num} * Math.PI / 180)`,
      tan: `Math.tan(${num} * Math.PI / 180)`,
      asin: `(Math.asin(${num}) * 180 / Math.PI)`,
      acos: `(Math.acos(${num}) * 180 / Math.PI)`,
      atan: `(Math.atan(${num}) * 180 / Math.PI)`,
      log: `Math.log(${num})`,
      log10: `Math.log10(${num})`,
      exp: `Math.exp(${num})`,
      pow10: `Math.pow(10, ${num})`,
    };
    return [map[op] || "0", Order.ATOMIC];
  };
}
