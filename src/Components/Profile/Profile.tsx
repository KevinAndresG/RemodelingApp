import { Camera, Mail, MapPin, Phone, User, X } from "lucide-react";
import { UserModel } from "../../Core/Models/User";
import { useState } from "react";
import { Testimonial } from "../../Core/Models/Testimonial";
import ProfileForm from "../Shared/ProfileForm/ProfileForm";

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
  const [newAvatar, setNewAvatar] = useState<string>(user.avatar);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userData !== user) {
      const testimonials = JSON.parse(
        localStorage.getItem("testimonials") || "[]"
      );
      const updatedTestimonials = testimonials.map((t: Testimonial) => {
        if (t.userId === userData.id) {
          return { ...t, name: userData.name, image: userData.avatar };
        }
        return t;
      });
      localStorage.setItem("testimonials", JSON.stringify(updatedTestimonials));
      const updatedUserData = { ...userData, avatar: newAvatar };
      setUser(updatedUserData);
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUserData));
    }
    setIsEditing(false);
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
            <ProfileForm
              handleSubmit={handleSubmit}
              userData={userData}
              setUserData={setUserData}
            />
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
export default UserProfile;
