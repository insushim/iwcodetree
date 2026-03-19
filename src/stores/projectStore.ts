import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { generateId } from "@/lib/utils/helpers";
import {
  type SerializedProject,
  loadAllProjectsFromStorage,
  saveProjectToStorage,
  deleteProjectFromStorage,
} from "@/lib/utils/project-serializer";
import { DEFAULT_BACKDROP } from "@/lib/utils/constants";

interface ProjectState {
  projects: SerializedProject[];
  currentProject: SerializedProject | null;

  // Actions
  loadProjects: () => void;
  createProject: (title?: string) => SerializedProject;
  deleteProject: (id: string) => void;
  updateProject: (id: string, updates: Partial<SerializedProject>) => void;
  setCurrentProject: (project: SerializedProject | null) => void;
}

export const useProjectStore = create<ProjectState>()(
  devtools(
    (set, get) => ({
      projects: [],
      currentProject: null,

      loadProjects: () => {
        const projects = loadAllProjectsFromStorage();
        set({ projects });
      },

      createProject: (title) => {
        const now = new Date().toISOString();
        const project: SerializedProject = {
          id: generateId("prj"),
          title: title ?? "Untitled",
          sprites: [],
          blocklyXmlMap: {},
          backdrop: DEFAULT_BACKDROP,
          createdAt: now,
          updatedAt: now,
        };
        saveProjectToStorage(project);
        set({
          projects: [...get().projects, project],
          currentProject: project,
        });
        return project;
      },

      deleteProject: (id) => {
        deleteProjectFromStorage(id);
        const projects = get().projects.filter((p) => p.id !== id);
        const currentProject =
          get().currentProject?.id === id ? null : get().currentProject;
        set({ projects, currentProject });
      },

      updateProject: (id, updates) => {
        const projects = get().projects.map((p) =>
          p.id === id
            ? { ...p, ...updates, updatedAt: new Date().toISOString() }
            : p,
        );
        const updated = projects.find((p) => p.id === id);
        if (updated) saveProjectToStorage(updated);
        const currentProject =
          get().currentProject?.id === id
            ? (updated ?? null)
            : get().currentProject;
        set({ projects, currentProject });
      },

      setCurrentProject: (project) => set({ currentProject: project }),
    }),
    { name: "projectStore" },
  ),
);
