import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { UserModel } from "../../../Core/Models/User";

const NavBar = ({
  isScrolled,
  showProfile,
  setShowProfile,
  loggedInUser,
}: {
  isScrolled: boolean;
  showProfile: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInUser: UserModel;
}) => {
  const navLinks = [
    "Inicio",
    "Servicios",
    "Proyectos",
    "Testimonios",
    "Contacto",
  ];
  return (
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
  );
};

export default NavBar;
