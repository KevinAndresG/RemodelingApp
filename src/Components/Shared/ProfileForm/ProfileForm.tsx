import React from "react";
import { UserModel } from "../../../Core/Models/User";

const ProfileForm = ({
  handleSubmit,
  userData,
  setUserData,
}: {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  userData: UserModel;
  setUserData: React.Dispatch<React.SetStateAction<UserModel>>;
}) => {
  return (
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
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
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
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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
          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
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
  );
};

export default ProfileForm;
