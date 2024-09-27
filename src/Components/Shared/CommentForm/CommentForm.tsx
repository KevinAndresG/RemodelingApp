import { Star, X } from "lucide-react";
import React, { useState } from "react";
import { UserModel } from "../../../Core/Models/User";
import { Comment } from "../../../Core/Models/Comment";

function CommentForm({
  handleNewComment,
  user,
  onClose,
}: {
  handleNewComment: (comment: Comment) => void;
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

    handleNewComment({ rating, comment });
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

export default CommentForm;
