import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { Project } from "@/lib/types";

type ProjectRow = {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  contact: string;
  created_at: string;
};

const toProject = (row: ProjectRow): Project => ({
  id: row.id,
  title: row.title,
  description: row.description,
  techStack: row.tech_stack,
  contact: row.contact,
  createdAt: row.created_at,
});

export async function GET() {
  try {
    const supabase = createClient(cookies());
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json((data as ProjectRow[]).map(toProject));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Не удалось загрузить проекты." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const contact = typeof body.contact === "string" ? body.contact.trim() : "";
  const techStack = Array.isArray(body.techStack)
    ? body.techStack.filter((tag: unknown) => typeof tag === "string").map((tag: string) => tag.trim()).filter(Boolean).slice(0, 10)
    : [];

  if (!title || !description || !contact || !techStack.length) {
    return NextResponse.json({ message: "Fill in all required fields and add at least one skill." }, { status: 400 });
  }
  if (title.length > 100 || description.length > 700 || contact.length > 250) {
    return NextResponse.json({ message: "One of the fields is too long." }, { status: 400 });
  }
  try {
    // Supabase persists the idea in Postgres; no filesystem writes occur on Vercel.
    const supabase = createClient(cookies());
    const { data, error } = await supabase
      .from("projects")
      .insert({ title, description, contact, tech_stack: techStack })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(toProject(data as ProjectRow), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Не удалось опубликовать идею. Проверьте подключение к базе данных." }, { status: 500 });
  }
}
