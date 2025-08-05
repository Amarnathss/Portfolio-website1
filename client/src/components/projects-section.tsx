interface Project {
  title: string;
  icon: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
}

export default function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "Crop & Fertilizer Recommendation",
      icon: "fas fa-seedling",
      description: "ML-powered app recommending optimal crops and fertilizers based on soil and environmental conditions.",
      techStack: ["Python", "scikit-learn", "Pandas", "Flask", "React.js"],
      githubUrl: "https://github.com/Amarnathss/Crop-and-Fertilizer-Recomendation-Project",
      demoUrl: "#",
    },
    {
      title: "PrepStack AI Assistant",
      icon: "fas fa-robot",
      description: "Platform to upload and search personal notes, integrated GitHub access, and competitive programming stats visualization.",
      techStack: ["React.js", "Node.js", "Grok AI", "Multi-user"],
      githubUrl: "https://github.com/Amarnathss/PrepStack_AI_Assistent",
      demoUrl: "#",
    },
    {
      title: "Jobsy – Job Portal",
      icon: "fas fa-briefcase",
      description: "Full-stack job portal for job seekers and recruiters with job posting and candidate search functionality.",
      techStack: ["React.js", "Node.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/Amarnathss/jobsy",
      demoUrl: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 pt-24">
      <div className="container mx-auto px-4">
        <h2 className="font-chalk text-3xl md:text-4xl lg:text-5xl font-bold chalk-text chalk-glow text-center mb-12">
          <span className="chalk-underline">Featured Projects</span>
        </h2>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className={`project-card p-6 chalk-hover ${index === 2 ? 'lg:col-span-2 xl:col-span-1' : ''}`}
            >
              <div className="mb-6">
                <h3 className="font-chalk text-xl md:text-2xl chalk-text text-chalk-accent mb-3">
                  <i className={`${project.icon} mr-2`}></i>
                  {project.title}
                </h3>
                <p className="font-chalk-body text-base chalk-text leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-chalk text-lg chalk-text mb-3">Tech Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-sm font-chalk-body chalk-text"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 chalk-box px-4 py-2 text-center chalk-text font-chalk-body hover:bg-chalk hover:text-black transition-all duration-300"
                >
                  <i className="fab fa-github mr-2"></i>GitHub
                </a>
                <a 
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 chalk-box px-4 py-2 text-center chalk-text font-chalk-body hover:bg-chalk-accent hover:text-black transition-all duration-300"
                >
                  <i className="fas fa-external-link-alt mr-2"></i>Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
