import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { UserModel } from "../../Core/Models/User";
import userImage2 from "../../assets/perfil-2.webp";
import { motion } from "framer-motion";
import { Testimonial } from "../../Core/Models/Testimonial";
import { MessageSquare, Star } from "lucide-react";
import CommentForm from "../Shared/CommentForm/CommentForm";

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
              handleNewComment={handleNewComment}
              user={user}
              onClose={() => setShowCommentForm(false)}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
