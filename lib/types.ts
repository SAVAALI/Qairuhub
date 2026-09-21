export type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  contact: string;
  createdAt: string;
};

export type CreateProjectInput = Omit<Project, "id" | "createdAt">;
