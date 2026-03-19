import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { generateId } from "@/lib/utils/helpers";
import {
  DEFAULT_BACKDROP,
  DEFAULT_SPRITE_SIZE,
  MAX_SPRITES,
} from "@/lib/utils/constants";

export interface Sprite {
  id: string;
  name: string;
  costumeDataUrl: string;
  x: number;
  y: number;
  size: number;
  direction: number;
  visible: boolean;
  draggable: boolean;
  rotationStyle: "all around" | "left-right" | "don't rotate";
}

interface EditorState {
  currentProjectId: string | null;
  projectTitle: string;
  sprites: Sprite[];
  selectedSpriteId: string | null;
  currentBackdrop: string;
  isRunning: boolean;
  blocklyXmlMap: Record<string, string>;

  // Actions
  setProjectInfo: (id: string, title: string) => void;
  setProjectTitle: (title: string) => void;
  addSprite: (partial?: Partial<Sprite>) => Sprite | null;
  removeSprite: (id: string) => void;
  selectSprite: (id: string | null) => void;
  updateSprite: (id: string, updates: Partial<Sprite>) => void;
  setRunning: (running: boolean) => void;
  setBackdrop: (backdrop: string) => void;
  saveBlocklyXml: (spriteId: string, xml: string) => void;
  loadBlocklyXml: (spriteId: string) => string | null;
  reset: () => void;
}

function createDefaultSprite(overrides?: Partial<Sprite>): Sprite {
  return {
    id: generateId("spr"),
    name: "Sprite1",
    costumeDataUrl: "",
    x: 0,
    y: 0,
    size: DEFAULT_SPRITE_SIZE,
    direction: 90,
    visible: true,
    draggable: false,
    rotationStyle: "all around",
    ...overrides,
  };
}

const initialState = {
  currentProjectId: null as string | null,
  projectTitle: "Untitled",
  sprites: [] as Sprite[],
  selectedSpriteId: null as string | null,
  currentBackdrop: DEFAULT_BACKDROP,
  isRunning: false,
  blocklyXmlMap: {} as Record<string, string>,
};

export const useEditorStore = create<EditorState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setProjectInfo: (id, title) =>
        set({ currentProjectId: id, projectTitle: title }),

      setProjectTitle: (title) => set({ projectTitle: title }),

      addSprite: (partial) => {
        const { sprites } = get();
        if (sprites.length >= MAX_SPRITES) return null;
        const count = sprites.length + 1;
        const sprite = createDefaultSprite({
          name: `Sprite${count}`,
          ...partial,
        });
        set({
          sprites: [...sprites, sprite],
          selectedSpriteId: sprite.id,
        });
        return sprite;
      },

      removeSprite: (id) =>
        set((state) => {
          const sprites = state.sprites.filter((s) => s.id !== id);
          const xmlMap = { ...state.blocklyXmlMap };
          delete xmlMap[id];
          const selectedSpriteId =
            state.selectedSpriteId === id
              ? (sprites[0]?.id ?? null)
              : state.selectedSpriteId;
          return { sprites, blocklyXmlMap: xmlMap, selectedSpriteId };
        }),

      selectSprite: (id) => set({ selectedSpriteId: id }),

      updateSprite: (id, updates) =>
        set((state) => ({
          sprites: state.sprites.map((s) =>
            s.id === id ? { ...s, ...updates } : s,
          ),
        })),

      setRunning: (running) => set({ isRunning: running }),

      setBackdrop: (backdrop) => set({ currentBackdrop: backdrop }),

      saveBlocklyXml: (spriteId, xml) =>
        set((state) => ({
          blocklyXmlMap: { ...state.blocklyXmlMap, [spriteId]: xml },
        })),

      loadBlocklyXml: (spriteId) => get().blocklyXmlMap[spriteId] ?? null,

      reset: () => set(initialState),
    }),
    { name: "editorStore" },
  ),
);
