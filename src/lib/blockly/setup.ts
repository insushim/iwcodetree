"use client";
import * as Blockly from "blockly";
import { registerBlocks as registerMotion } from "./blocks/motion";
import { registerBlocks as registerLooks } from "./blocks/looks";
import { registerBlocks as registerSound } from "./blocks/sound";
import { registerBlocks as registerEvents } from "./blocks/events";
import { registerBlocks as registerControl } from "./blocks/control";
import { registerBlocks as registerSensing } from "./blocks/sensing";
import { registerBlocks as registerOperators } from "./blocks/operators";
import { registerBlocks as registerVariables } from "./blocks/variables";
import { registerBlocks as registerPen } from "./blocks/pen";
import { registerBlocks as registerMyBlocks } from "./blocks/myblocks";
import { toolbox } from "./toolbox";

let initialized = false;

export function initBlockly(): void {
  if (initialized) return;
  initialized = true;

  registerMotion();
  registerLooks();
  registerSound();
  registerEvents();
  registerControl();
  registerSensing();
  registerOperators();
  registerVariables();
  registerPen();
  registerMyBlocks();
}

export function createWorkspace(container: HTMLElement): Blockly.WorkspaceSvg {
  initBlockly();

  const workspace = Blockly.inject(container, {
    toolbox,
    grid: {
      spacing: 20,
      length: 3,
      colour: "#ccc",
      snap: true,
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 0.8,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
    },
    trashcan: true,
    move: {
      scrollbars: true,
      drag: true,
      wheel: true,
    },
    sounds: false,
    renderer: "zelos",
  });

  return workspace;
}

export { toolbox };
