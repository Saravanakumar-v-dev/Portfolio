import EdutrackImg from "../assets/Edutrack.png";
import MultiImg from "../assets/Multi.png";
import PortfolioImg from "../assets/Portfolio.png";
import JobImg from "../assets/Job.png";
import CredexImg from "../assets/Credex.png";

export const projects = [
  {
    id: 1,
    title: "EduTrack - Student Performance Management System",
    category: "fullstack",
    categoryLabel: "Full-Stack",
    description:
      "A MERN dashboard for tracking attendance, academic performance, and student insights through a clean analytics interface.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    github: "#",
    demo: "https://edu-track-omega.vercel.app/",
    image: EdutrackImg,
  },
  {
    id: 2,
    title: "AI Spend Audit — Credex",
    category: "fullstack",
    categoryLabel: "Full-Stack",
    description:
      "A free, deterministic audit tool that reveals exactly how much engineering teams overspend on AI subscriptions — Cursor, Copilot, ChatGPT, Claude, and API platforms — with shareable, privacy-safe reports and line-item savings.",
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Zod", "Claude AI"],
    github: "#",
    demo: "#",
    image: CredexImg,
  },
  {
    id: 3,
    title: "Smart Portfolio v2",
    category: "frontend",
    categoryLabel: "Frontend",
    description:
      "A modern animated portfolio focused on premium UI, dark-first aesthetics, motion systems, and clear recruiter-facing storytelling.",
    tech: ["React", "Tailwind", "Framer Motion"],
    github: "#",
    demo: "#",
    image: PortfolioImg,
  },
  {
    id: 4,
    title: "Multimodal Phishing Detection System",
    category: "ml",
    categoryLabel: "Machine Learning",
    description:
      "A machine learning experiment that explores multimodal phishing detection with a practical research-oriented workflow.",
    tech: ["Python", "Machine Learning", "Google Colab"],
    github: "#",
    demo: "https://colab.research.google.com/drive/1HypmqssqmUxarTKY6poBPsnYEDZZDVfo?usp=sharing",
    image: MultiImg,
  },
  {
    id: 5,
    title: "JobTracker",
    category: "fullstack",
    categoryLabel: "Full-Stack",
    description:
      "A full-stack application to track and manage job applications efficiently.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    github: "#",
    demo: "https://job-tracker-gold-ten.vercel.app/",
    image: JobImg,
  },
];
