import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-scroll";
import {
  ChevronDown,
  User,
  MessageSquare,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Camera,
  Star,
  X,
} from "lucide-react";

import userImage from "./assets/perfil.jpg";
import userImage2 from "./assets/perfil-2.webp";
import projectsRef from "./assets/kitchen.jpg";

import "./App.css";
import ContactSection from "./Components/Contact/Contact";

interface Comment {
  rating: number;
  comment: string;
}

interface UserModel {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  id: number;
}

interface Testimonial {
  name: string;
  text: string;
  rating: number;
  image: string;
  userId: number;
}

export default function HomePage() {
  // Simular un usuario logueado
  const defaultUser: UserModel = {
    name: "ZattnerFlyt Game",
    email: "zattner@zattner.com",
    phone: "+57 1001001001",
    address: "Calle Principal 123, Ciudad",
    avatar: userImage,
    id: 1,
  };

  const navLinks = [
    "Inicio",
    "Servicios",
    "Proyectos",
    "Testimonios",
    "Contacto",
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { scrollY } = useScroll();

  const [loggedInUser, setLoggedInUser] = useState<UserModel>(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : defaultUser;
  });

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav
        className={`fixed w-full z-50 transition-all duration-300 border-b ${
          isScrolled ? "scrolledNav" : "bg-transparent"
        }`}
      >
        <div
          className={`container mx-auto px-6 flex justify-between items-baseline duration-200 ${
            isScrolled ? "py-4" : "py-3 "
          }`}
        >
          <motion.a
            href="#"
            className="text-xl font-bold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            RemodeFlyt
          </motion.a>
          <ul className="hidden md:flex space-x-3">
            {navLinks.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.toLowerCase()}
                  smooth={true}
                  duration={500}
                  className={`${
                    isScrolled
                      ? "text-gray-800 hover:text-blue-500 hover:border-blue-500"
                      : "hover:text-gray-800 hover:border-gray-800 text-white"
                  } font-bold cursor-pointer hover:border-b-2 border-transparent duration-100`}
                >
                  {item}
                </Link>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <button
                onClick={() => setShowProfile(!showProfile)}
                className={`${
                  isScrolled
                    ? "text-gray-800 hover:text-blue-500"
                    : "hover:text-gray-800 text-white"
                } font-semibold cursor-pointer flex items-center`}
              >
                <img
                  src={loggedInUser.avatar}
                  alt="Avatar"
                  className="w-8 h-8 mr-2 rounded-full object-cover object-top"
                />
                <p className="overflow-ellipsis overflow-hidden whitespace-nowrap w-36">
                  {loggedInUser.name}
                </p>
              </button>
            </motion.li>
          </ul>
        </div>
      </nav>

      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <UserProfile
            user={loggedInUser}
            setUser={setLoggedInUser}
            setShowProfile={setShowProfile}
          />
        </div>
      )}

      <section id="inicio" className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-400 via-cyan-600 to-blue-600">
          <svg
            className="absolute bottom-0 left-0 right-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10 px-4">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Transforma tu hogar
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Especialistas en remodelaciones de cocinas y baños
            </motion.p>
            <motion.button
              className="bg-white text-cyan-700 font-bold py-3 px-6 rounded-full hover:bg-gray-100 hover:text-cyan-600 transition duration-200"
              whileHover={{ scale: 1.05 }}
            >
              Contáctanos
            </motion.button>
          </div>
        </div>
        <motion.div className="absolute bottom-10 left-1/2">
          <ChevronDown className="text-gray-500 w-14 h-14 drop-shadow-md animate-bounce" />
        </motion.div>
      </section>

      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection user={loggedInUser} />
      <ContactSection />

      <footer className="bg-white text-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-x-4">
              <h3 className="text-2xl font-bold text-cyan-500 mb-2">
                RemodeFlyt
              </h3>
              <div className="flex gap-1">
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <p className="text-gray-600 text-center">
              Transformando espacios, creando hogares.
            </p>
          </div>
          <div className="border-t border-gray-200 mt-2 pt-4 text-center">
            <p className="text-sm text-gray-500">
              &copy; 2024 RemodeFlyt. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isInCard, setIsInCard] = useState({ hovered: false, index: -1 });

  const services = [
    {
      title: "Diseño de Cocinas",
      description:
        "Creamos cocinas funcionales y elegantes que se adaptan a tu estilo de vida.",
      icon: "🍳",
    },
    {
      title: "Remodelación de Baños",
      description: "Transformamos tu baño en un oasis de relajación y confort.",
      icon: "🛁",
    },
    {
      title: "Instalación de Gabinetes",
      description:
        "Ofrecemos soluciones de almacenamiento personalizadas para maximizar tu espacio.",
      icon: "🗄️",
    },
    {
      title: "Renovación de Pisos",
      description:
        "Instalamos una amplia variedad de pisos para mejorar la estética de tu hogar.",
      icon: "🏠",
    },
  ];

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
              <a
                href="#"
                className="text-blue-500 hover:text-blue-800 w-1/3 transition-colors duration-200 flex items-center"
              >
                Saber más <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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

function TestimonialsSection({ user }: { user: UserModel }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testimonials, setTestimonials] = useState(() => {
    const savedTestimonials = localStorage.getItem("testimonials");
    return savedTestimonials
      ? JSON.parse(savedTestimonials)
      : [
          {
            name: "María García",
            text: "RemodeFlyt transformó nuestra cocina anticuada en un espacio moderno y funcional. ¡Estamos encantados con el resultado!",
            rating: 5,
            image: userImage2,
            userId: 2,
          },
          {
            name: "Juan Pérez",
            text: "El equipo de RemodeFlyt fue profesional y eficiente. Nuestra remodelación del baño se completó a tiempo y dentro del presupuesto.",
            rating: 4,
            image: userImage2,
            userId: 3,
          },
          {
            name: "Ana Martínez",
            text: "La atención al detalle y la calidad del trabajo de RemodeFlyt superaron nuestras expectativas. Definitivamente los recomendaremos.",
            rating: 5,
            image: userImage2,
            userId: 4,
          },
        ];
  });

  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("testimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  const handleNewComment = (newComment: {
    comment: string;
    rating: number;
  }) => {
    const updatedTestimonials = [
      {
        name: user.name,
        text: newComment.comment,
        rating: newComment.rating,
        image: user.avatar,
        userId: user.id,
      },
      ...testimonials,
    ];
    setTestimonials(updatedTestimonials);
    setShowCommentForm(false);
  };

  return (
    <section
      id="testimonios"
      className="py-20 bg-gradient-to-b from-white via-gray-100 to-gray-200"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-cyan-500"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Lo que dicen nuestros clientes
        </motion.h2>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {testimonials.map((testimonial: Testimonial, index: number) => (
            <motion.div
              key={`${testimonial.name}-${index}`}
              className="bg-white p-4 h-80 break-words overflow-hidden overflow-ellipsis rounded-lg shadow-lg hover:shadow-md transition-shadow duration-200 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4 w-full">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full border-2 border-green-400 object-cover object-top"
                />
                <div className="w-1/2">
                  <h3 className="font-semibold text-md text-blue-700 overflow-ellipsis overflow-hidden whitespace-nowrap">
                    {testimonial.name}
                  </h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 h-48 italic break-words overflow-hidden">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          {!showCommentForm ? (
            <button
              onClick={() => setShowCommentForm(true)}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 flex items-center"
            >
              <MessageSquare className="mr-2" />
              Dejar un comentario
            </button>
          ) : (
            <CommentForm
              onCommentSubmit={handleNewComment}
              user={user}
              onClose={() => setShowCommentForm(false)}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}

function UserProfile({
  user,
  setUser,
  setShowProfile,
}: {
  user: UserModel;
  setUser: React.Dispatch<React.SetStateAction<UserModel>>;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user);
  const [userDataCpy] = useState(user);
  const [newAvatar, setNewAvatar] = useState<string>(userImage);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newAvatar !== user.avatar) {
      const testimonials = JSON.parse(
        localStorage.getItem("testimonials") || "[]"
      );
      const updatedTestimonials = testimonials.map((t: Testimonial) => {
        if (t.userId === userData.id) {
          return { ...t, image: newAvatar };
        }
        return t;
      });
      localStorage.setItem("testimonials", JSON.stringify(updatedTestimonials));
    }

    const updatedUserData = { ...userData, avatar: newAvatar };
    setUser(updatedUserData);
    setIsEditing(false);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUserData));
  };

  const handleCancel = () => {
    setUserData(userDataCpy);
    setIsEditing(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatar(reader.result as string);
        setUserData({ ...userData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="mx-auto relative bg-white shadow-md
     p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    >
      {isEditing ? (
        <button
          onClick={handleCancel}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      ) : (
        <button
          onClick={() => {
            setShowProfile(false);
          }}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      )}
      <div className="flex place-items-center flex-col md:flex-row">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <div className="relative">
            <img
              src={userData.avatar}
              alt="Avatar del usuario"
              className="w-48 h-48 rounded-full mx-auto object-cover object-top"
            />
            {isEditing && (
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
              >
                <Camera size={20} />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </div>
        <div className="md:w-2/3 md:pl-8">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                Guardar Cambios
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="w-6 h-6 text-blue-500 mr-2" />
                <span className="overflow-ellipsis overflow-hidden whitespace-nowrap w-52">
                  {userData.name}
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-blue-500 mr-2" />
                <span className="overflow-ellipsis overflow-hidden whitespace-nowrap w-52">
                  {userData.email}
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-blue-500 mr-2" />
                <span className="overflow-ellipsis overflow-hidden whitespace-nowrap w-52">
                  {userData.phone}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-blue-500 mr-2" />
                <span className="overflow-ellipsis overflow-hidden whitespace-nowrap w-52">
                  {userData.address}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {!isEditing && (
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-5 block mx-auto bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Editar Perfil
        </button>
      )}
    </div>
  );
}

function CommentForm({
  onCommentSubmit,
  user,
  onClose,
}: {
  onCommentSubmit: (comment: Comment) => void;
  user: UserModel;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simular una acción del servidor
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onCommentSubmit({ rating, comment });
    setIsSubmitting(false);
    setRating(0);
    setComment("");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <X size={24} />
      </button>
      <h2 className="text-2xl font-bold text-cyan-500 mb-6">
        Deja tu comentario
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex items-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover mr-4"
          />
          <span className="font-medium text-gray-700">{user.name}</span>
        </div>
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Calificación
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Comentario
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="shadow-sm outline-none focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
            placeholder="Escribe tu comentario aquí"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || rating === 0 || comment.trim() === ""}
          className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded hover:bg-blue-600 transition duration-300 disabled:opacity-50"
        >
          {isSubmitting ? "Enviando..." : "Enviar comentario"}
        </button>
      </form>
    </div>
  );
}
