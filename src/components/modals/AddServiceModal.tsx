import { useEffect, useState } from "react";
import {
  addService,
  uploadServiceImage,
} from "../../core/services/ServiceManager";
import PrimaryAuthButton from "../common/PrimaryAuthButton";
import { showToast } from "../../utils/Toast";
import { Services } from "../../types/Services";
import { MdCancel } from "react-icons/md";

interface AddServiceModalProps {
  isOpen: boolean;
  closeModal: () => void;
  returnNewService: (service: Services) => void;
}

export default function AddServiceModal({
  isOpen,
  closeModal,
  returnNewService,
}: AddServiceModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Service name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!selectedFile) newErrors.file = "Thumbnail image is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTimeout(() => setErrors({}), 3000);
      return;
    }
    setIsLoading(true);
    const imageUrl = await uploadServiceImage(selectedFile!);
    if (imageUrl.length === 0) {
      setIsLoading(false);
      return showToast({ message: "Failed to upload image", type: "error" });
    }
    const newService = {
      name,
      description,
      thumbnail: imageUrl,
      id: name,
    } as Services;
    const response = await addService(newService);
    if (response) {
      showToast({ message: "Service added successfully", type: "success" });
      closeModal();
      returnNewService(newService);
    } else {
      showToast({ message: "Failed to add service", type: "error" });
    }
    setIsLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="relative bg-white dark:bg-darkThemeCard w-full max-w-md m-4 rounded-lg shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-medium leading-6 mb-4">Add New Service</h3>
        <MdCancel
          size={30}
          className="absolute right-2 top-2 cursor-pointer"
          onClick={closeModal}
        />

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-text-gray-500">
              Service Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-darkThemeSecondary px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primaryRed"
              placeholder="Enter service name"
            />
            {errors.name && (
              <p className="text-primaryRed text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
              <span className="pl-1 text-primaryRed">Max(20 words)</span>
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-darkThemeSecondary px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primaryRed"
              placeholder="Enter service description"
            />
            {errors.description && (
              <p className="text-primaryRed text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Thumbnail Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-primaryRed file:text-white
                hover:file:bg-secondaryRed file:cursor-pointer"
            />
            {errors.file && (
              <p className="text-primaryRed text-sm mt-1">{errors.file}</p>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-500"
            >
              Cancel
            </button>
            <PrimaryAuthButton
              isLoading={isLoading}
              text="Add Service"
              onClick={(event) => handleSubmit(event)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
