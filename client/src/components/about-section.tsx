export default function AboutSection() {
  return (
    <section id="about" className="py-20 pt-24">
      <div className="container mx-auto px-4">
        <h2 className="font-chalk text-3xl md:text-4xl lg:text-5xl font-bold chalk-text chalk-glow text-center mb-12">
          <span className="chalk-underline">About Me</span>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="chalk-box p-6 md:p-8">
            <h3 className="font-chalk text-2xl md:text-3xl chalk-text text-chalk-accent mb-6">Professional Summary</h3>
            <p className="font-chalk-body text-lg chalk-text leading-relaxed mb-6">
              Enthusiastic computer science student with problem-solving skills in Data Structures and Algorithms using C++. 
              Experienced in building basic full-stack applications with the MERN stack, working with SQL databases, 
              and exploring AI and Generative AI technologies.
            </p>
            <p className="font-chalk-body text-lg chalk-text leading-relaxed">
              Quick learner with a passion for writing clean, efficient code and applying emerging technologies 
              to solve real-world problems.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="chalk-box p-6">
              <h3 className="font-chalk text-xl md:text-2xl chalk-text text-chalk-accent mb-4">
                <i className="fas fa-graduation-cap mr-3"></i>Education
              </h3>
              <div className="font-chalk-body chalk-text">
                <h4 className="text-lg font-semibold mb-2">RV Institute of Technology and Management, Bengaluru</h4>
                <p className="text-base mb-1">BE in Computer Science and Engineering</p>
                <p className="text-base mb-1">2022 – 2026</p>
                <p className="text-base text-chalk-accent">CGPA: 7.8</p>
              </div>
            </div>
            
            <div className="chalk-box p-6">
              <h3 className="font-chalk text-xl md:text-2xl chalk-text text-chalk-accent mb-4">
                <i className="fas fa-certificate mr-3"></i>Certifications
              </h3>
              <div className="font-chalk-body chalk-text space-y-2">
                <p className="flex items-center">
                  <i className="fas fa-check-circle text-chalk-accent mr-2"></i>
                  Web Development Bootcamp – Udemy
                </p>
                <p className="flex items-center">
                  <i className="fas fa-check-circle text-chalk-accent mr-2"></i>
                  Python Programming – Udemy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}