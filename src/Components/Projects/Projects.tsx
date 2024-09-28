import { useInView } from "react-intersection-observer";
import projectsRef from "../../assets/kitchen.jpg";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { ProjectModel } from "../../Core/Models/Projects";
import ProjectDetails from "../Shared/ProjectsDetails/ProjectDetail";

const projects: ProjectModel[] = [
  {
    title: "Cocina Moderna",
    image: projectsRef,
    description: "Diseño contemporáneo con acabados de alta gama.",
    details:
      "Esta cocina moderna combina funcionalidad y estilo con encimeras de cuarzo, gabinetes de madera de nogal, y electrodomésticos de acero inoxidable. La isla central proporciona espacio adicional para cocinar y socializar, mientras que la iluminación LED bajo los gabinetes crea un ambiente acogedor.",
  },
  {
    title: "Baño de Lujo",
    image: projectsRef,
    description: "Espacio de relajación con detalles elegantes.",
    details:
      "Este baño de lujo presenta una amplia ducha de vidrio sin marco, una bañera independiente, y un tocador doble con encimeras de mármol. Los azulejos de gran formato y la iluminación ambiental crean una atmósfera de spa, perfecta para relajarse después de un largo día.",
  },
  {
    title: "Sala de Estar Elegante",
    image: projectsRef,
    description: "Ambiente acogedor y sofisticado para el hogar.",
    details:
      "Esta sala de estar elegante combina comodidad y estilo con un sofá seccional de cuero, sillas de acento modernas y una chimenea de gas. Los tonos neutros se complementan con toques de color en los accesorios, creando un espacio acogedor y sofisticado para la familia y los invitados.",
  },
  {
    title: "Dormitorio Acogedor",
    image: projectsRef,
    description: "Diseño sereno y confortable para el descanso.",
    details:
      "Este dormitorio acogedor ofrece un refugio tranquilo con una paleta de colores suaves, textiles lujosos y muebles de madera cálida. El cabecero tapizado y las cortinas blackout aseguran un sueño reparador, mientras que el área de lectura junto a la ventana proporciona un espacio para relajarse.",
  },
];

function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedProject, setSelectedProject] = useState<ProjectModel | null>(
    null
  );

  return (
    <section
      id="proyectos"
      className="py-20 bg-gradient-to-b from-gray-200 via-gray-100 to-white"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-cyan-500"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Nuestros Proyectos
        </motion.h2>
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
              initial={{ scale: 0.9 }}
              whileInView={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <motion.img
                src={project.image}
                alt={project.title}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-700">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-blue-500 hover:text-blue-800 transition-colors duration-200"
                >
                  <p className="font-bold text-sm flex items-center">
                    Ver detalles <ArrowRight className="ml-2 w-4 h-4" />
                  </p>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectDetails
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      )}
    </section>
  );
}

export default ProjectsSection;
