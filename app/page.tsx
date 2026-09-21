import { ProjectBoard } from "@/components/project-board";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function Home() {
  return <ProjectBoard initialProjects={await getProjects()} />;
}
