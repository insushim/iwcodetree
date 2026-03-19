export interface SpriteCostume {
  id: string;
  name: string;
  svg: string;
}

export interface SpriteDefinition {
  id: string;
  name: string;
  category: "animal" | "character" | "object" | "vehicle";
  costumes: SpriteCostume[];
  defaultSize: number;
  tags: string[];
}
