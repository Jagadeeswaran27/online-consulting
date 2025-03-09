import { useContext, useRef, useState } from "react";
import { User } from "../../types/Users";
import { BiCheck, BiCheckCircle } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import {
  updateUserName,
  uploadProfileImage,
  updateUserContact,
} from "../../core/services/SettingsServices";
import { AuthContext } from "../../store/context/auth";
import { Images } from "../../resources/Images";
import { showToast } from "../../utils/Toast";

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  const [editableUserName, setEditableUserName] = useState(user.userName);
  const [editablePhotoURL, setEditablePhotoURL] = useState(user.photoURL);
  const [editableContact, setEditableContact] = useState(user.contact);
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isContactEditing, setIsContactEditing] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isImageSaving, setIsImageSaving] = useState(false);

  const { changePhotoUrl, changeUserName, changeContact } =
    useContext(AuthContext);

  const handleClickEditImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showToast({ message: "Please select an image file", type: "error" });
        return;
      }
      setEditablePhotoURL(URL.createObjectURL(file));
      setIsImageSelected(true);
    }
  };

  const handleSaveImage = async () => {
    setIsImageSaving(true);
    const file = imageRef.current?.files?.[0];
    if (!file) return;
    const newPhotoURL = await uploadProfileImage(file);
    if (newPhotoURL.length > 0) {
      setEditablePhotoURL(newPhotoURL);
      setIsImageSelected(false);
      changePhotoUrl(newPhotoURL);
      showToast({
        message: "Profile picture updated successfully",
        type: "success",
      });
    } else {
      showToast({ message: "Failed to update profile picture", type: "error" });
    }
  };

  const handleSaveName = async () => {
    setIsNameEditing(false);
    const result = await updateUserName(editableUserName);
    if (result) {
      changeUserName(editableUserName);
      showToast({ message: "Name updated successfully", type: "success" });
    } else {
      showToast({ message: "Failed to update name", type: "error" });
      setEditableUserName(user.userName);
    }
  };

  const handleSaveContact = async () => {
    setIsContactEditing(false);
    const result = await updateUserContact(editableContact);
    if (result) {
      changeContact(editableContact);
      showToast({ message: "Contact updated successfully", type: "success" });
    } else {
      showToast({ message: "Failed to update contact", type: "error" });
      setEditableContact(user.contact);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <img
            src={editablePhotoURL}
            alt="User Profile"
            className="rounded-full h-24 w-24 sm:h-32 sm:w-32 object-cover object-top border-4 border-gray-300"
            onError={(e) => {
              e.currentTarget.src = Images.defaultAvatar;
            }}
          />
          {isImageSelected ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
              {isImageSaving ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <BiCheck
                  size={30}
                  onClick={handleSaveImage}
                  className="cursor-pointer"
                />
              )}
            </div>
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              onClick={handleClickEditImage}
            >
              <MdEdit className="text-white text-2xl" />
            </div>
          )}

          <input
            ref={imageRef}
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
            id="profile-photo-input"
          />
        </div>
        <div className="text-center sm:text-left mt-4 sm:mt-0">
          <h2 className="text-2xl font-semibold">{user.userName}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-500 ">
            User Name
          </label>
          {isNameEditing ? (
            <div className="w-full max-w-[300px] mt-2 flex gap-2 items-center">
              <input
                type="text"
                value={editableUserName}
                onChange={(e) => setEditableUserName(e.target.value)}
                className="w-full pl-5 py-2 border border-gray-600 dark:bg-darkThemeSecondary rounded-lg focus:outline-none"
              />
              <BiCheckCircle
                onClick={handleSaveName}
                size={30}
                className="cursor-pointer"
              />
            </div>
          ) : (
            <p className="text-lg flex gap-2 items-center font-medium mt-2">
              {editableUserName}{" "}
              {!isNameEditing && (
                <MdEdit
                  onClick={() => setIsNameEditing(true)}
                  className="cursor-pointer"
                />
              )}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-500">Contact</label>
          {isContactEditing ? (
            <div className="w-full max-w-[300px] mt-2 flex gap-2 items-center">
              <input
                type="text"
                value={editableContact}
                onChange={(e) => setEditableContact(e.target.value)}
                className="w-full pl-5 py-2 border border-gray-600 dark:bg-darkThemeSecondary rounded-lg focus:outline-none"
              />
              <BiCheckCircle
                onClick={handleSaveContact}
                size={30}
                className="cursor-pointer"
              />
            </div>
          ) : (
            <p className="text-lg flex gap-2 items-center font-medium mt-2">
              {editableContact}{" "}
              {!isContactEditing && (
                <MdEdit
                  onClick={() => setIsContactEditing(true)}
                  className="cursor-pointer"
                />
              )}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-500">Email</label>
          <p className="text-lg font-medium mt-2 break-all">{user.email}</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-500">
            User Type
          </label>
          <p className="text-lg font-medium mt-2">{user.type}</p>
        </div>
      </div>
    </div>
  );
}
