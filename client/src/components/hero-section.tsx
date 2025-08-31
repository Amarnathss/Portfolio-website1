export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24">
      <div className="container mx-auto px-4 text-center">
        <div className="chalk-box p-8 md:p-12 max-w-4xl mx-auto">
          <h1 className="font-chalk text-4xl md:text-6xl lg:text-7xl font-bold chalk-text chalk-glow mb-6">
            <span className="chalk-underline">Amarnath S S</span>
          </h1>
          <h2 className="font-chalk-body text-xl md:text-2xl lg:text-3xl chalk-text mb-8">
            Computer Science Student & Full-Stack Developer
          </h2>
          <p className="font-chalk-body text-lg md:text-xl chalk-text leading-relaxed mb-8 max-w-3xl mx-auto">
            Enthusiastic problem solver with expertise in Data Structures & Algorithms, 
            MERN stack development, and emerging AI technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://drive.google.com/file/d/1NHgUFfg6yu8N3r_6Iskr1o6RpDIW5zOV/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="chalk-hover chalk-box px-6 py-3 chalk-text font-chalk-body text-lg font-semibold hover:bg-chalk hover:text-black transition-all duration-300"
            >
              View My Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


// export default function HeroSection() {
//   const handleNavClick = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       const offsetTop = element.offsetTop - 80;
//       window.scrollTo({
//         top: offsetTop,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <section id="home" className="min-h-screen flex items-center justify-center pt-24">
//       <div className="container mx-auto px-4 text-center">
//         <div className="chalk-box p-8 md:p-12 max-w-4xl mx-auto">
//           <h1 className="font-chalk text-4xl md:text-6xl lg:text-7xl font-bold chalk-text chalk-glow mb-6">
//             <span className="chalk-underline">Amarnath S S</span>
//           </h1>
//           <h2 className="font-chalk-body text-xl md:text-2xl lg:text-3xl chalk-text mb-8">
//             Computer Science Student & Full-Stack Developer
//           </h2>
//           <p className="font-chalk-body text-lg md:text-xl chalk-text leading-relaxed mb-8 max-w-3xl mx-auto">
//             Enthusiastic problem solver with expertise in Data Structures & Algorithms, 
//             MERN stack development, and emerging AI technologies.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={() => handleNavClick("projects")}
//               className="chalk-hover chalk-box px-6 py-3 chalk-text font-chalk-body text-lg font-semibold hover:bg-chalk hover:text-black transition-all duration-300"
//             >
//               View My Work
//             </button>
//             <button
//               onClick={() => handleNavClick("contact")}
//               className="chalk-hover chalk-box px-6 py-3 chalk-text font-chalk-body text-lg font-semibold hover:bg-chalk-accent hover:text-black transition-all duration-300"
//             >
//               Get In Touch
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
