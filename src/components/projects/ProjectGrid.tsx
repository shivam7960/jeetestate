import type { Project } from "@/types";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <li key={p.slug}><ProjectCard project={p} /></li>
      ))}
    </ul>
  );
}
