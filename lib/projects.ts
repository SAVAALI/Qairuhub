import fs from "node:fs/promises";
import path from "node:path";
import { CreateProjectInput, Project } from "./types";

const dataFile = path.join(process.cwd(), "data", "projects.json");

/** Local JSON repository: zero configuration and easy to replace with a DB later. */
export async function getProjects(): Promise<Project[]> {
  try {
    const file = await fs.readFile(dataFile, "utf8");
    return JSON.parse(file) as Project[];
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function createProject(input: CreateProjectInput): Promise<Project> {
  const project: Project = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const projects = await getProjects();
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify([project, ...projects], null, 2) + "\n", "utf8");
  return project;
}
