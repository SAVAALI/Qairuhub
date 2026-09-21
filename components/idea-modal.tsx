"use client";

import { FormEvent, useState } from "react";
import { Project } from "@/lib/types";

type Props = { open: boolean; onClose: () => void; onCreated: (project: Project) => void };
const suggestions = ["Python", "ML", "React", "TypeScript", "Node.js", "Figma", "UI/UX", "Flutter"];

export function IdeaModal({ open, onClose, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  if (!open) return null;

  const toggleTag = (tag: string) => setTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]);
  const addCustomTag = () => {
    const value = customTag.trim();
    if (value && !tags.includes(value)) setTags([...tags, value]);
    setCustomTag("");
  };
  const close = () => { if (!saving) { setError(""); onClose(); } };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setSaving(true);
    try {
      const response = await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, description, contact, techStack: tags }) });
      const payload = await response.json().catch(() => ({ message: "Сервер вернул некорректный ответ." }));
      if (!response.ok) throw new Error(payload.message || "Could not publish your idea.");
      onCreated(payload); setTitle(""); setDescription(""); setContact(""); setTags([]); onClose();
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong."); }
    finally { setSaving(false); }
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={close}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="idea-title" onMouseDown={(e) => e.stopPropagation()}>
      <button className="close" onClick={close} aria-label="Close form">×</button>
      <p className="eyebrow">YOUR NEXT BUILD STARTS HERE</p>
      <h2 id="idea-title">Опубликовать идею</h2>
      <form onSubmit={submit}>
        <label>Название проекта<input required maxLength={100} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Например, Smart Campus" /></label>
        <label>Расскажите об идее<textarea required maxLength={700} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Какую проблему решает проект и кого ищете?" rows={4} /></label>
        <fieldset><legend>Нужные навыки <span>*</span></legend><div className="picker">
          {suggestions.map((tag) => <button type="button" className={tags.includes(tag) ? "picked" : ""} onClick={() => toggleTag(tag)} key={tag}>{tag}</button>)}
        </div><div className="custom-tag"><input value={customTag} onChange={(e) => setCustomTag(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomTag())} placeholder="Другой навык" /><button type="button" onClick={addCustomTag}>Добавить</button></div></fieldset>
        <label>Telegram или ссылка для связи<input required maxLength={250} value={contact} onChange={(e) => setContact(e.target.value)} placeholder="@username или https://t.me/..." /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="publish" disabled={saving}>{saving ? "Публикуем..." : "Опубликовать идею"}</button>
      </form>
    </section>
  </div>;
}
