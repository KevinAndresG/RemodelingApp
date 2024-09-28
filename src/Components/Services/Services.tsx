import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ServiceModel } from "../../Core/Models/Services";
import ServiceDetails from "../Shared/ServicesDetails/ServiceDetails";

const services: ServiceModel[] = [
  {
    title: "Diseño de Cocinas",
    description:
      "Creamos cocinas funcionales y elegantes que se adaptan a tu estilo de vida.",
    icon: "🍳",
    details:
      "Nuestro servicio de diseño de cocinas incluye planificación personalizada, selección de materiales de alta calidad, y optimización del espacio para crear la cocina de tus sueños. Trabajamos con los mejores proveedores para ofrecerte una amplia gama de opciones en encimeras, gabinetes, electrodomésticos y accesorios.",
  },
  {
    title: "Remodelación de Baños",
    description: "Transformamos tu baño en un oasis de relajación y confort.",
    icon: "🛁",
    details:
      "La remodelación de baños abarca desde pequeñas actualizaciones hasta renovaciones completas. Ofrecemos instalación de bañeras y duchas modernas, vanidades elegantes, iluminación ambiental, y soluciones de almacenamiento inteligentes. Nuestro equipo se asegura de que cada detalle refleje tu estilo personal.",
  },
  {
    title: "Instalación de Gabinetes",
    description:
      "Ofrecemos soluciones de almacenamiento personalizadas para maximizar tu espacio.",
    icon: "🗄️",
    details:
      "Nuestros expertos en instalación de gabinetes trabajan con precisión para crear espacios de almacenamiento funcionales y atractivos. Utilizamos materiales duraderos y herrajes de calidad para asegurar la longevidad de tus gabinetes. Desde cocinas hasta baños y áreas de lavandería, optimizamos cada rincón de tu hogar.",
  },
  {
    title: "Renovación de Pisos",
    description:
      "Instalamos una amplia variedad de pisos para mejorar la estética de tu hogar.",
    icon: "🏠",
    details:
      "La renovación de pisos puede transformar completamente el aspecto de tu hogar. Ofrecemos una amplia selección de materiales, incluyendo madera, baldosas, vinilo de lujo y más. Nuestro equipo se encarga de la preparación del subsuelo, instalación profesional y acabados perfectos para un resultado duradero y hermoso.",
  },
];

function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedService, setSelectedService] = useState<ServiceModel | null>(
    null
  );
  const [isInCard, setIsInCard] = useState({ hovered: false, index: -1 });

  return (
    <section
      id="servicios"
      className="py-20 bg-gradient-to-b from-white via-gray-100 to-gray-200"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-cyan-500"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Nuestros Servicios
        </motion.h2>
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-md transition-shadow duration-200 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              onMouseEnter={() => setIsInCard({ hovered: true, index })}
              onMouseLeave={() => setIsInCard({ hovered: false, index: -1 })}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                initial={{ scale: 1 }}
                whileInView={
                  isInCard.hovered && isInCard.index === index
                    ? {
                        scale: 1.3,
                        filter: "drop-shadow(-2px 2px 2px rgba(0,0,0,0.5))",
                      }
                    : {
                        scale: 1,
                        filter: "drop-shadow(0 0 0px rgba(0,0,0,0))",
                      }
                }
                transition={{ duration: 0.2 }}
                className="text-4xl mb-4 w-1/6"
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-blue-700">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <button
                onClick={() => setSelectedService(service)}
                className="text-blue-500 hover:text-blue-800 transition-colors duration-200"
              >
                <p className="font-bold flex items-center">
                  Saber más <ArrowRight className="ml-2 w-4 h-4" />
                </p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedService && (
        <ServiceDetails
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      )}
    </section>
  );
}

export default ServicesSection;
