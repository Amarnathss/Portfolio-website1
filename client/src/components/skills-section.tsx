import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  percentage: number;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: "Programming",
      icon: "fas fa-code",
      skills: [
        { name: "C++", percentage: 90 },
        { name: "Python", percentage: 85 },
        { name: "C", percentage: 80 },
      ],
    },
    {
      title: "Frontend",
      icon: "fas fa-palette",
      skills: [
        { name: "React.js", percentage: 88 },
        { name: "JavaScript", percentage: 85 },
        { name: "Tailwind CSS", percentage: 90 },
        { name: "Redux", percentage: 75 },
      ],
    },
    {
      title: "Backend & DB",
      icon: "fas fa-server",
      skills: [
        { name: "Node.js", percentage: 82 },
        { name: "Express.js", percentage: 80 },
        { name: "MongoDB", percentage: 85 },
        { name: "SQL", percentage: 78 },
      ],
    },
  ];

  const tools = ["Git", "GitHub", "JWT", "AppWrite", "Flask", "scikit-learn", "Pandas"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 pt-24">
      <div className="container mx-auto px-4">
        <h2 className="font-chalk text-3xl md:text-4xl lg:text-5xl font-bold chalk-text chalk-glow text-center mb-12">
          <span className="chalk-underline">Skills & Expertise</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title} className="chalk-box p-6">
              <h3 className="font-chalk text-xl md:text-2xl chalk-text text-chalk-accent mb-6 flex items-center">
                <i className={`${category.icon} mr-3`}></i>{category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="chalk-text font-chalk-body mb-2">
                      <span>{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 chalk-box p-6 text-center">
          <h3 className="font-chalk text-xl md:text-2xl chalk-text text-chalk-accent mb-6 flex items-center justify-center">
            <i className="fas fa-tools mr-3"></i>Tools & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool) => (
              <span 
                key={tool}
                className="chalk-box px-4 py-2 chalk-text font-chalk-body hover:bg-chalk hover:text-black transition-all duration-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}