import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getNextProject,
  getAllSlugs,
} from "@/lib/data";
import CaseStudyContent from "@/components/case-study/CaseStudyContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Prastut Dahal`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);

  return <CaseStudyContent project={project} nextProject={nextProject} />;
}
