import { MdEdit } from "react-icons/md";
import { Services } from "../../types/Services";
import { FaSpinner } from "react-icons/fa";
import { Images } from "../../resources/Images";

interface AdminServicesCardProps {
  service: Services;
  isEdit: boolean;
  selectedService: Services | null;
  configureEdit: (service: Services) => void;
  deConfigureEdit: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDescription: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleModifyService: () => void;
  handleDeleteService: (id: string) => void;
  isModifying: boolean;
  key: string;
  imageRef: React.RefObject<HTMLInputElement | null>;
}

export default function AdminServicesCard({
  configureEdit,
  service,
  selectedService,
  isEdit,
  imageRef,
  handleChangeDescription,
  handleChangeName,
  handleDeleteService,
  handleImageChange,
  deConfigureEdit,
  isModifying,
  handleModifyService,
}: AdminServicesCardProps) {
  return (
    <div className="bg-white dark:bg-darkThemeCard rounded-lg shadow-md overflow-hidden min-h-[350px] max-h-[350px]">
      <div className="relative group">
        <img
          src={
            selectedService?.id === service.id
              ? selectedService.thumbnail
              : service.thumbnail
          }
          alt={service.name}
          className="w-full h-48 object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = Images.placeholderImage;
          }}
        />
        {isEdit && selectedService?.id === service.id && (
          <div
            onClick={() => imageRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          >
            <MdEdit className="text-white text-2xl" />
          </div>
        )}
      </div>

      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        className="hidden"
        id="profile-photo-input"
        onChange={handleImageChange}
      />
      <div className="p-4">
        {isEdit && selectedService?.id === service.id ? (
          <div className="w-[300px] my-[3px]">
            <input
              type="text"
              value={selectedService?.name}
              onChange={handleChangeName}
              className=" text-sm pl-2 py-1 mb-1 border border-gray-600 dark:bg-darkThemeSecondary rounded-lg focus:outline-none "
            />
          </div>
        ) : (
          <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
        )}
        {isEdit && selectedService?.id === service.id ? (
          <div className="w-full my-[3px]">
            <input
              type="text"
              value={selectedService?.description}
              onChange={handleChangeDescription}
              className=" pl-2 text-sm mb-3 py-1  w-full border border-gray-600 dark:bg-darkThemeSecondary rounded-lg focus:outline-none "
            />
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {service.description}
          </p>
        )}
        <div className="flex items-center justify-end gap-2">
          {isEdit && selectedService?.id === service.id ? (
            <>
              <button
                onClick={deConfigureEdit}
                className="text-gray-500  text-centerw-[70px] px-3 py-1 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleModifyService}
                className="text-primaryRed flex items-center justify-center py-1 w-[80px] hover:text-secondaryRed px-3 my-2 rounded border"
              >
                {isModifying && selectedService.id === service.id ? (
                  <FaSpinner size={20} className="animate-spin" />
                ) : (
                  "Modify"
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => configureEdit(service)}
                className="text-gray-500 w-[70px] px-3 py-1 my-2 rounded border"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteService(service.id)}
                className="text-primaryRed flex items-center justify-center hover:text-secondaryRed px-3 py-1 my-2 rounded border"
              >
                {isModifying && selectedService?.id === service.id ? (
                  <FaSpinner size={20} className="animate-spin" />
                ) : (
                  "Delete"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
