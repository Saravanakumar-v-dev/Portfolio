import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ProjectList from "../components/projects/ProjectList";
import { projects } from "../data/sampleProjects";
import useScrollToTop from "../hooks/useScrollToTop";

export default function ProjectsPage() {
  useScrollToTop();

  return (
    <>
      <Navbar />

      <main className="container mx-auto px-4 md:px-12 py-16">
        <h1 className="text-3xl font-bold mb-8">All Projects</h1>

        <ProjectList projects={projects} />
      </main>

      <Footer />
    </>
  );
}
