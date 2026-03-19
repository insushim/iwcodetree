"use client";
import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript";

export function registerBlocks(): void {
  // move_steps
  Blockly.Blocks["move_steps"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("STEPS").setCheck("Number").appendField("");
      this.appendDummyInput().appendField("걸음 이동하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("지정한 걸음 수만큼 이동합니다");
    },
  };
  javascriptGenerator.forBlock["move_steps"] = function (block: Blockly.Block) {
    const steps =
      javascriptGenerator.valueToCode(block, "STEPS", Order.ATOMIC) || "10";
    return `sprite.move(${steps});\nyield;\n`;
  };

  // turn_right
  Blockly.Blocks["turn_right"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("DEGREES").setCheck("Number").appendField("↻");
      this.appendDummyInput().appendField("도 돌기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("오른쪽으로 회전합니다");
    },
  };
  javascriptGenerator.forBlock["turn_right"] = function (block: Blockly.Block) {
    const degrees =
      javascriptGenerator.valueToCode(block, "DEGREES", Order.ATOMIC) || "15";
    return `sprite.turnRight(${degrees});\nyield;\n`;
  };

  // turn_left
  Blockly.Blocks["turn_left"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("DEGREES").setCheck("Number").appendField("↺");
      this.appendDummyInput().appendField("도 돌기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("왼쪽으로 회전합니다");
    },
  };
  javascriptGenerator.forBlock["turn_left"] = function (block: Blockly.Block) {
    const degrees =
      javascriptGenerator.valueToCode(block, "DEGREES", Order.ATOMIC) || "15";
    return `sprite.turnLeft(${degrees});\nyield;\n`;
  };

  // goto_xy
  Blockly.Blocks["goto_xy"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("x:");
      this.appendValueInput("X").setCheck("Number");
      this.appendDummyInput().appendField("y:");
      this.appendValueInput("Y").setCheck("Number");
      this.appendDummyInput().appendField("(으)로 이동하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("지정한 x, y 좌표로 이동합니다");
    },
  };
  javascriptGenerator.forBlock["goto_xy"] = function (block: Blockly.Block) {
    const x = javascriptGenerator.valueToCode(block, "X", Order.ATOMIC) || "0";
    const y = javascriptGenerator.valueToCode(block, "Y", Order.ATOMIC) || "0";
    return `sprite.goto(${x}, ${y});\nyield;\n`;
  };

  // glide_to_xy
  Blockly.Blocks["glide_to_xy"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("SECS").setCheck("Number").appendField("");
      this.appendDummyInput().appendField("초 동안 x:");
      this.appendValueInput("X").setCheck("Number");
      this.appendDummyInput().appendField("y:");
      this.appendValueInput("Y").setCheck("Number");
      this.appendDummyInput().appendField("(으)로 이동하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("지정한 시간 동안 부드럽게 이동합니다");
    },
  };
  javascriptGenerator.forBlock["glide_to_xy"] = function (
    block: Blockly.Block,
  ) {
    const secs =
      javascriptGenerator.valueToCode(block, "SECS", Order.ATOMIC) || "1";
    const x = javascriptGenerator.valueToCode(block, "X", Order.ATOMIC) || "0";
    const y = javascriptGenerator.valueToCode(block, "Y", Order.ATOMIC) || "0";
    return `yield* sprite.glide(${x}, ${y}, ${secs});\n`;
  };

  // point_direction
  Blockly.Blocks["point_direction"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("DIRECTION").setCheck("Number").appendField("");
      this.appendDummyInput().appendField("도 방향 보기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("지정한 방향을 바라봅니다");
    },
  };
  javascriptGenerator.forBlock["point_direction"] = function (
    block: Blockly.Block,
  ) {
    const dir =
      javascriptGenerator.valueToCode(block, "DIRECTION", Order.ATOMIC) || "90";
    return `sprite.setDirection(${dir});\n`;
  };

  // point_towards
  Blockly.Blocks["point_towards"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("마우스 포인터 쪽 바라보기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("마우스 포인터 방향을 바라봅니다");
    },
  };
  javascriptGenerator.forBlock["point_towards"] = function () {
    return `sprite.pointTowards(runtime.stage.mouseX, runtime.stage.mouseY);\n`;
  };

  // change_x
  Blockly.Blocks["change_x"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("x좌표를");
      this.appendValueInput("DX").setCheck("Number");
      this.appendDummyInput().appendField("만큼 바꾸기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
    },
  };
  javascriptGenerator.forBlock["change_x"] = function (block: Blockly.Block) {
    const dx =
      javascriptGenerator.valueToCode(block, "DX", Order.ATOMIC) || "10";
    return `sprite.changeX(${dx});\nyield;\n`;
  };

  // change_y
  Blockly.Blocks["change_y"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("y좌표를");
      this.appendValueInput("DY").setCheck("Number");
      this.appendDummyInput().appendField("만큼 바꾸기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
    },
  };
  javascriptGenerator.forBlock["change_y"] = function (block: Blockly.Block) {
    const dy =
      javascriptGenerator.valueToCode(block, "DY", Order.ATOMIC) || "10";
    return `sprite.changeY(${dy});\nyield;\n`;
  };

  // set_x
  Blockly.Blocks["set_x"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("x좌표를");
      this.appendValueInput("X").setCheck("Number");
      this.appendDummyInput().appendField("(으)로 정하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
    },
  };
  javascriptGenerator.forBlock["set_x"] = function (block: Blockly.Block) {
    const x = javascriptGenerator.valueToCode(block, "X", Order.ATOMIC) || "0";
    return `sprite.setX(${x});\nyield;\n`;
  };

  // set_y
  Blockly.Blocks["set_y"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("y좌표를");
      this.appendValueInput("Y").setCheck("Number");
      this.appendDummyInput().appendField("(으)로 정하기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
    },
  };
  javascriptGenerator.forBlock["set_y"] = function (block: Blockly.Block) {
    const y = javascriptGenerator.valueToCode(block, "Y", Order.ATOMIC) || "0";
    return `sprite.setY(${y});\nyield;\n`;
  };

  // bounce_on_edge
  Blockly.Blocks["bounce_on_edge"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("벽에 닿으면 튕기기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
    },
  };
  javascriptGenerator.forBlock["bounce_on_edge"] = function () {
    return `sprite.bounceOnEdge();\n`;
  };

  // x_position (reporter)
  Blockly.Blocks["x_position"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("x좌표");
      this.setOutput(true, "Number");
      this.setColour(230);
    },
  };
  javascriptGenerator.forBlock["x_position"] = function () {
    return ["sprite.x", Order.ATOMIC];
  };

  // y_position (reporter)
  Blockly.Blocks["y_position"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("y좌표");
      this.setOutput(true, "Number");
      this.setColour(230);
    },
  };
  javascriptGenerator.forBlock["y_position"] = function () {
    return ["sprite.y", Order.ATOMIC];
  };

  // direction_value (reporter)
  Blockly.Blocks["direction_value"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("방향");
      this.setOutput(true, "Number");
      this.setColour(230);
    },
  };
  javascriptGenerator.forBlock["direction_value"] = function () {
    return ["sprite.direction", Order.ATOMIC];
  };
}
