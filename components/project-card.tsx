import { Project } from "@/lib/types";

type Props = { project: Project };

function contactUrl(contact: string) {
  if (/^https?:\/\//i.test(contact)) return contact;
  const username = contact.replace(/^@/, "");
  return `https://t.me/${username}`;
}

export function ProjectCard({ project }: Props) {
  return (
    <article className="project-card">
      <div className="card-topline">
        <span className="status-dot" />
        <span>Ищет команду</span>
      </div>
      <h3>{project.title}</h3>
      <p className="description">{project.description}</p>
      <div className="tag-list" aria-label="Tech stack">
        {project.techStack.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
      </div>
      <a className="join-button" href={contactUrl(project.contact)} target="_blank" rel="noreferrer">
        Хочу в команду <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
