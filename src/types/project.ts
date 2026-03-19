export interface ProjectBlock {
  id: string;
  type: string;
  category: string;
  inputs: Record<string, unknown>;
  next?: string;
  parent?: string;
}

export interface ProjectVariable {
  id: string;
  name: string;
  value: string | number | boolean;
}

export interface ProjectSprite {
  id: string;
  spriteId: string;
  name: string;
  x: number;
  y: number;
  size: number;
  direction: number;
  visible: boolean;
  currentCostume: number;
  blocks: ProjectBlock[];
  variables: ProjectVariable[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  backdropId: string;
  sprites: ProjectSprite[];
  createdAt: string;
  updatedAt: string;
  missionId?: string;
  isShared: boolean;
}
