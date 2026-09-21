"use client";

import { useEffect, useMemo, useState } from "react";
import { IdeaModal } from "./idea-modal";
import { ProjectCard } from "./project-card";
import { Project } from "@/lib/types";

const featuredTags = ["Все", "Python", "ML", "React", "TypeScript", "Node.js", "Figma", "UI/UX"];

export function ProjectBoard({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [activeTag, setActiveTag] = useState("Все");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { // Refreshes data when deployed behind a shared persistent store.
    setLoading(true); fetch("/api/projects").then((r) => r.ok ? r.json() : []).then(setProjects).catch(() => undefined).finally(() => setLoading(false));
  }, []);
  const visibleProjects = useMemo(() => activeTag === "Все" ? projects : projects.filter((project) => project.techStack.includes(activeTag)), [activeTag, projects]);

  return <main>
    <nav className="nav container"><a className="brand" href="#top" aria-label="QAIRU Hub home"><span>Q</span> QAIRU <i>HUB</i></a><button className="nav-cta" onClick={() => setModalOpen(true)}>+ Добавить идею</button></nav>
    <section className="hero container" id="top"><div><p className="eyebrow">STUDENT BUILDERS COMMUNITY</p><h1>Собери команду.<br /><em>Создай будущее.</em></h1><p className="hero-copy">QAIRU Hub — место, где сильные идеи встречают талантливых людей.</p><button className="hero-cta" onClick={() => setModalOpen(true)}>Опубликовать идею <span>→</span></button></div><div className="hero-orbit" aria-hidden="true"><div className="orbit-ring" /><div className="orbit-center">✦</div><span className="bubble b1">&lt;/&gt;</span><span className="bubble b2">✦</span><span className="bubble b3">{ }</span></div></section>
    <section className="feed-section"><div className="container"><div className="feed-heading"><div><p className="eyebrow">EXPLORE OPPORTUNITIES</p><h2>Найди свой <em>проект</em></h2></div><span className="project-count">{projects.length} идей</span></div><div className="filters" aria-label="Filter projects">{featuredTags.map((tag) => <button key={tag} onClick={() => setActiveTag(tag)} className={activeTag === tag ? "active" : ""}>{tag}</button>)}</div>
      {loading && <p className="loading">Обновляем идеи...</p>}
      <div className="project-grid">{visibleProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      {!loading && !visibleProjects.length && <div className="empty"><span>⌁</span><h3>Пока нет проектов с этим навыком</h3><button onClick={() => setActiveTag("Все")}>Показать все идеи</button></div>}
    </div></section>
    <footer className="container"><span>© 2026 QAIRU HUB</span><span>Построй что-то важное.</span></footer>
    <IdeaModal open={modalOpen} onClose={() => setModalOpen(false)} onCreated={(project) => { setProjects((all) => [project, ...all]); setActiveTag("Все"); }} />
  </main>;
}
