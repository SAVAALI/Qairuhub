import { NextResponse } from "next/server";
import { createProject, getProjects } from "@/lib/projects";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(await getProjects());
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
  const project = await createProject({ title, description, contact, techStack });
  return NextResponse.json(project, { status: 201 });
}
