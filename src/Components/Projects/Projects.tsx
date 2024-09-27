import { useInView } from "react-intersection-observer";
import projectsRef from "../../assets/kitchen.jpg";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: "Cocina Moderna",
      image: projectsRef,
      description: "Diseño contemporáneo con acabados de alta gama.",
    },
    {
      title: "Baño de Lujo",
      image: projectsRef,
      description: "Espacio de relajación con detalles elegantes.",
    },
    {
      title: "Sala de Estar Elegante",
      image: projectsRef,
      description: "Ambiente acogedor y sofisticado para el hogar.",
    },
    {
      title: "Dormitorio Acogedor",
      image: projectsRef,
      description: "Diseño sereno y confortable para el descanso.",
    },
  ];

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
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 transition-colors duration-300 flex items-center"
                >
                  Ver detalles <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
