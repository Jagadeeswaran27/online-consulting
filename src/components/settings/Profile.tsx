import { useState } from "react";
import { User } from "../../types/Auth";

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  const [editableUserName, setEditableUserName] = useState(user.userName);
  const [editablePhotoURL, setEditablePhotoURL] = useState(user.photoURL || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Implement save logic here (e.g., save changes to a database or state)
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableUserName(user.userName);
    setEditablePhotoURL(user.photoURL || "");
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <div className="relative">
          <img
            src={editablePhotoURL}
            alt="User Profile"
            className="rounded-full h-32 w-32 object-cover border-4 border-gray-300"
          />
          {isEditing && (
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setEditablePhotoURL(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="absolute bottom-0 right-0 p-2 bg-primaryRed text-white rounded-full cursor-pointer"
            />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{user.userName}</h2>
          <p className="text-gray-500 ">{user.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-500 ">
            User Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editableUserName}
              onChange={(e) => setEditableUserName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-primaryRed"
            />
          ) : (
            <p className="text-lg font-medium mt-2">{editableUserName}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-500">Email</label>
          <p className="text-lg font-medium mt-2">{user.email}</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-500">
            User Type
          </label>
          <p className="text-lg font-medium mt-2">{user.type}</p>
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-6 mt-6">
          <button
            onClick={handleSave}
            className="bg-primaryRed text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-primaryRedDark focus:outline-none focus:ring-2 focus:ring-primaryRed"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
