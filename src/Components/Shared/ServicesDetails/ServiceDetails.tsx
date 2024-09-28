import { ServiceModel } from "../../../Core/Models/Services";

const ServiceDetails = ({
  selectedService,
  setSelectedService,
}: {
  selectedService: ServiceModel;
  setSelectedService: React.Dispatch<React.SetStateAction<ServiceModel | null>>;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4 text-blue-700">
          {selectedService.title}
        </h3>
        <p className="text-gray-600 mb-4 h-28 overflow-y-auto">
          {selectedService.details}
        </p>
        <button
          onClick={() => setSelectedService(null)}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ServiceDetails;
