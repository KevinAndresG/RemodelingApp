import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { ChevronDown } from "lucide-react";
import userImage from "./assets/perfil.jpg";

import "./App.css";
import ContactSection from "./Components/Contact/Contact";
import NavBar from "./Components/Shared/NavBar/NavBar";
import { UserModel } from "./Core/Models/User";
import TestimonialsSection from "./Components/Testimonials/Testimonials";
import ProjectsSection from "./Components/Projects/Projects";
import ServicesSection from "./Components/Services/Services";
import Footer from "./Components/Shared/Footer/Footer";
import UserProfile from "./Components/Profile/Profile";

export default function HomePage() {
  const defaultUser: UserModel = {
    name: "ZattnerFlyt Game",
    email: "zattner@zattner.com",
    phone: "+57 1001001001",
    address: "Calle Principal 123, Ciudad",
    avatar: userImage,
    id: 1,
  };
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
      <NavBar
        isScrolled={isScrolled}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        loggedInUser={loggedInUser}
      />
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
      <Footer />
    </div>
  );
}
