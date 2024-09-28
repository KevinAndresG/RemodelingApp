import React from "react";
import { ProjectModel } from "../../../Core/Models/Projects";

const ProjectDetails = ({
  selectedProject,
  setSelectedProject,
}: {
  selectedProject: ProjectModel;
  setSelectedProject: React.Dispatch<React.SetStateAction<ProjectModel | null>>;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4 text-blue-700">
          {selectedProject.title}
        </h3>
        <img
          src={selectedProject.image}
          alt={selectedProject.title}
          className="w-full h-64 object-cover mb-4 rounded-lg"
        />
        <p className="text-gray-600 mb-4 h-28 overflow-y-auto">
          {selectedProject.details}
        </p>
        <button
          onClick={() => setSelectedProject(null)}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
