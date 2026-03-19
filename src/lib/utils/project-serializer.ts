import { LS_KEY_PROJECTS } from "./constants";

// ---- Types ----

export interface SerializedSprite {
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

export interface SerializedProject {
  id: string;
  title: string;
  sprites: SerializedSprite[];
  blocklyXmlMap: Record<string, string>;
  backdrop: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Serialize ----

export function serializeProject(project: SerializedProject): string {
  return JSON.stringify(project);
}

export function deserializeProject(json: string): SerializedProject | null {
  try {
    const parsed = JSON.parse(json) as SerializedProject;
    if (!parsed.id || !parsed.title || !Array.isArray(parsed.sprites)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

// ---- LocalStorage helpers ----

export function saveProjectToStorage(project: SerializedProject): void {
  const projects = loadAllProjectsFromStorage();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    projects[idx] = project;
  } else {
    projects.push(project);
  }
  localStorage.setItem(LS_KEY_PROJECTS, JSON.stringify(projects));
}

export function loadAllProjectsFromStorage(): SerializedProject[] {
  try {
    const raw = localStorage.getItem(LS_KEY_PROJECTS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function loadProjectFromStorage(
  projectId: string,
): SerializedProject | null {
  const projects = loadAllProjectsFromStorage();
  return projects.find((p) => p.id === projectId) ?? null;
}

export function deleteProjectFromStorage(projectId: string): void {
  const projects = loadAllProjectsFromStorage().filter(
    (p) => p.id !== projectId,
  );
  localStorage.setItem(LS_KEY_PROJECTS, JSON.stringify(projects));
}
