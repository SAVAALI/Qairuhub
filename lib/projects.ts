import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { CreateProjectInput, Project } from "./types";

type ProjectRow = {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  contact: string;
  created_at: string;
};

const fromRow = (row: ProjectRow): Project => ({
  id: row.id,
  title: row.title,
  description: row.description,
  techStack: row.tech_stack,
  contact: row.contact,
  createdAt: row.created_at,
});

/** Persistent Supabase repository. */
export async function getProjects(): Promise<Project[]> {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(`Unable to load projects: ${error.message}`);
  return (data as ProjectRow[]).map(fromRow);
}

export async function createProject(input: CreateProjectInput): Promise<Project> {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from("projects")
    .insert({ title: input.title, description: input.description, tech_stack: input.techStack, contact: input.contact })
    .select()
    .single();
  if (error) throw new Error(`Unable to publish project: ${error.message}`);
  return fromRow(data as ProjectRow);
}
