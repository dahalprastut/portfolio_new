// ============================================================================
// DATA — Single source of truth for all portfolio content
// ============================================================================

export type Region = "nepal" | "us";

// --- Types ---

export interface Experience {
  id: string;
  region: Region;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Project {
  id: string;
  slug: string;
  region: Region;
  title: string;
  description: string;
  tags: string[];
  image: string;
  video?: string;
  href: string;
  layout?: "large" | "standard";
  // Case study fields
  client?: string;
  responsibility?: string;
  year?: string;
  introduction?: string;
  challenge?: string;
  solution?: string;
  liveUrl?: string;
  images?: string[];
  color?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
}

export interface ResearchItem {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

// --- Content ---

export const personalInfo = {
  name: "Prastut Dahal",
  title: "Front End Developer",
  email: "dahalprastut@gmail.com",
  resumeUrl: "/resume/PrastutDahal_Resume.pdf",
  heroGreeting: "Hello! I am",
  heroSpecializations: ["React JS", "Next JS", "TypeScript", "Node JS"],
  aboutStatement:
    "Multidisciplinary Web Developer with more than 4 years of experience in Front End Web Development",
  aboutBio: [
    "Hi! I am Prastut Dahal, a 25-year-old Web Developer from Nepal, currently based in the US. I specialize in building high-performance, accessible, and visually stunning web applications using React, Next.js, and TypeScript.",
    "My journey spans two continents — from building fintech platforms in Nepal to conducting cutting-edge visualization research at Bowling Green State University. I bring a unique blend of engineering rigor and creative design sensibility to every project.",
    "I love teaching as a passion and believe in giving back to the community. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or mentoring aspiring developers.",
  ],
};

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/prastut-dahal",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/prastut-dahal",
    icon: "github",
  },
];

export const experiences: Experience[] = [
  // US Experiences
  {
    id: "actual-reality",
    region: "us",
    title: "Software Engineer",
    company: "Actual Reality Technologies",
    location: "Ohio, US",
    period: "Sept 2025 – Present",
    description:
      "Building enterprise-grade web applications with Next.js, tRPC, and Azure cloud infrastructure. Implemented Entra ID SSO for seamless authentication across platforms.",
    technologies: ["Next.js", "tRPC", "Azure", "Entra ID", "TypeScript"],
  },
  {
    id: "bgsu-research",
    region: "us",
    title: "Research Assistant",
    company: "Bowling Green State University",
    location: "Ohio, US",
    period: "Aug 2023 – Jul 2025",
    description:
      "Conducted graduate research in scientific visualization, developing CUDA-accelerated volume ray casting algorithms and interactive 3D visualization tools for wetland ecology and solar physics data.",
    technologies: ["CUDA", "Python", "Node.js", "Three.js", "Volume Ray Casting"],
  },
  // Nepal Experiences
  {
    id: "seva-development",
    region: "nepal",
    title: "Software Engineer",
    company: "Seva Development",
    location: "Kathmandu, Nepal",
    period: "Feb 2022 – Apr 2023",
    description:
      "Led front-end development of a comprehensive automotive platform serving dealerships across Nepal. Built real-time dashboards with React, Redux-Saga, and GraphQL, deployed on AWS with Docker.",
    technologies: ["React", "Redux-Saga", "GraphQL", "AWS", "Docker"],
  },
];

export const projects: Project[] = [
  // US Projects
  {
    id: "ssoe-platform",
    slug: "ssoe-platform",
    region: "us",
    title: "SSOE Platform",
    description: "Enterprise collaboration platform built with Next.js and Azure cloud",
    tags: ["Next.js", "tRPC", "Azure", "TypeScript"],
    image: "/images/projects/ssoe-platform.jpg",
    href: "/work/ssoe-platform",
    layout: "large",
    client: "Actual Reality Technologies",
    responsibility: "Full-Stack Development",
    year: "2025",
    introduction:
      "A modern enterprise platform designed for seamless team collaboration and project management, built on Azure cloud infrastructure with robust SSO integration.",
    challenge:
      "The client needed a unified platform that could handle complex workflows while maintaining enterprise-grade security with Entra ID SSO across multiple tenants.",
    solution:
      "Built a Next.js application with tRPC for type-safe APIs, integrated Azure services for authentication and storage, and implemented a real-time collaboration system.",
    liveUrl: "#",
    color: "#2563EB",
  },
  {
    id: "wetland-visualization",
    slug: "wetland-visualization",
    region: "us",
    title: "Wetland Pool Visualization",
    description: "Interactive 3D visualization of wetland ecology data using volume ray casting",
    tags: ["Three.js", "CUDA", "Python", "WebGL"],
    image: "/images/projects/wetland-viz.jpg",
    href: "/work/wetland-visualization",
    layout: "standard",
    client: "BGSU Research Lab",
    responsibility: "Research & Development",
    year: "2024",
    introduction:
      "An interactive visualization tool that renders complex volumetric wetland data in real-time, enabling ecologists to explore and analyze aquatic ecosystems.",
    challenge:
      "Rendering high-resolution volumetric data in real-time on consumer hardware while maintaining scientific accuracy and interactive performance.",
    solution:
      "Developed CUDA-accelerated ray casting algorithms optimized for wetland data, with a Three.js frontend for interactive exploration and annotation.",
    color: "#22C55E",
  },
  // Nepal Projects
  {
    id: "yetiyap",
    slug: "yetiyap",
    region: "nepal",
    title: "YetiYap",
    description: "Real-time messaging platform with rich media support and group chat",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    image: "/images/projects/yetiyap.jpg",
    href: "/work/yetiyap",
    layout: "large",
    client: "Personal Project",
    responsibility: "Full-Stack Development",
    year: "2022",
    introduction:
      "A feature-rich messaging application built for the Nepali market, supporting real-time text, voice, and media sharing with group chat functionality.",
    challenge:
      "Creating a scalable real-time messaging system that works reliably on varying network conditions common in Nepal.",
    solution:
      "Implemented WebSocket-based real-time communication with offline message queuing, optimistic UI updates, and efficient media compression.",
    color: "#FF4D1A",
  },
  {
    id: "seva-automotive",
    slug: "seva-automotive",
    region: "nepal",
    title: "Seva Automotive Platform",
    description: "Comprehensive dealership management system with real-time inventory tracking",
    tags: ["React", "Redux-Saga", "GraphQL", "AWS"],
    image: "/images/projects/seva-automotive.jpg",
    href: "/work/seva-automotive",
    layout: "standard",
    client: "Seva Development",
    responsibility: "Front-End Development",
    year: "2022",
    introduction:
      "A full-featured automotive dealership management platform serving multiple dealers across Nepal with real-time inventory, sales tracking, and customer management.",
    challenge:
      "Building a complex state management system for real-time inventory across multiple dealerships with varying internet connectivity.",
    solution:
      "Designed a Redux-Saga architecture with GraphQL subscriptions for real-time updates, optimistic UI patterns, and offline-first data persistence.",
    color: "#F59E0B",
  },
  {
    id: "techtrix",
    slug: "techtrix",
    region: "nepal",
    title: "Techtrix Hackathon Winner",
    description: "Award-winning hackathon project showcasing innovative web solutions",
    tags: ["HTML", "SCSS", "JavaScript", "GSAP"],
    image: "/images/projects/techtrix.jpg",
    href: "/work/techtrix",
    layout: "standard",
    client: "Hackathon",
    responsibility: "Design & Development",
    year: "2021",
    introduction:
      "A creative web solution built during the Techtrix hackathon, combining modern design patterns with innovative user interactions.",
    challenge:
      "Delivering a polished, innovative web solution within a 24-hour hackathon timeframe.",
    solution:
      "Leveraged GSAP for smooth animations, SCSS for rapid styling, and vanilla JavaScript for performant interactions, creating a visually stunning experience.",
    color: "#8B5CF6",
  },
];

export const research: ResearchItem[] = [
  {
    title: "Coronal Loop Visualization",
    description:
      "Master's thesis research on interactive visualization of solar coronal loop structures using volume ray casting techniques. Developed novel rendering algorithms for scientific data exploration in solar physics.",
    tags: ["CUDA", "Volume Rendering", "Scientific Visualization", "Solar Physics"],
    link: "#",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Design & Mockup",
    skills: [
      "HTML",
      "CSS/SCSS",
      "Tailwind CSS",
      "Figma",
      "Responsive Design",
      "UI/UX",
    ],
  },
  {
    title: "Front End",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux",
      "Three.js",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    title: "Back End",
    skills: [
      "Node.js",
      "Python",
      "GraphQL",
      "tRPC",
      "AWS",
      "Azure",
      "Docker",
      "CUDA",
    ],
  },
];

export const galleryItems: GalleryItem[] = [
  { id: "g1", src: "/images/gallery/gallery-1.jpg", alt: "Project screenshot 1" },
  { id: "g2", src: "/images/gallery/gallery-2.jpg", alt: "Project screenshot 2" },
  { id: "g3", src: "/images/gallery/gallery-3.jpg", alt: "Design work 1" },
  { id: "g4", src: "/images/gallery/gallery-4.jpg", alt: "Project screenshot 3" },
  { id: "g5", src: "/images/gallery/gallery-5.jpg", alt: "Visual work 1" },
  { id: "g6", src: "/images/gallery/gallery-6.jpg", alt: "Project screenshot 4" },
];

// --- Helpers ---

export function getProjectsByRegion(region: Region): Project[] {
  return projects.filter((p) => p.region === region);
}

export function getExperiencesByRegion(region: Region): Experience[] {
  return experiences.filter((e) => e.region === region);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(currentSlug: string): Project | undefined {
  const idx = projects.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return projects[0];
  return projects[(idx + 1) % projects.length];
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
