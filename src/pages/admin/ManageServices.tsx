import { useEffect, useRef, useState } from "react";
import { Services } from "../../types/Services";
import {
  deleteService,
  fetchServices,
  modifyService,
  uploadServiceImage,
} from "../../core/services/ServiceManager";
import { FaSpinner } from "react-icons/fa";
import PrimaryAuthButton from "../../components/common/PrimaryAuthButton";
import AddServiceModal from "../../components/modals/AddServiceModal";
import { showToast } from "../../utils/Toast";
import AdminServicesCard from "../../components/admin/AdminServicesCard";

export default function ManageServices() {
  const [services, setServices] = useState<Services[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModifying, setIsModifying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedService, setSelectedService] = useState<Services | null>(null);
  const imageRef = useRef<HTMLInputElement>(null!);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const configureEdit = (service: Services) => {
    setSelectedService(service);
    setIsEdit(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showToast({ message: "Please select an image file", type: "error" });
        return;
      }
      setSelectedService({
        ...selectedService!,
        thumbnail: URL.createObjectURL(file),
      });
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    setIsModifying(true);
    const response = await deleteService(serviceId);
    if (response) {
      setServices(services.filter((service) => service.id !== serviceId));
      showToast({ message: "Service deleted successfully", type: "success" });
    } else {
      showToast({ message: "Failed to delete service", type: "error" });
    }
    setIsModifying(false);
  };

  const handleModifyService = async () => {
    const file = imageRef.current!.files![0];

    if (!selectedService) return;
    if (
      selectedService &&
      selectedService.name.trim().length === 0 &&
      selectedService.description.trim().length === 0
    ) {
      showToast({ message: "Please fill all fields", type: "error" });
      return;
    }
    setIsModifying(true);
    let newImageUrl = "";
    if (file) {
      newImageUrl = await uploadServiceImage(file);
    } else {
      newImageUrl = selectedService.thumbnail;
    }
    const response = await modifyService({
      ...selectedService,
      thumbnail: newImageUrl,
    });
    if (response) {
      showToast({ message: "Service updated successfully", type: "success" });
      setServices(
        services.map((service) =>
          service.id === selectedService.id
            ? { ...selectedService, thumbnail: newImageUrl }
            : service
        )
      );
      deConfigureEdit();
    } else {
      showToast({ message: "Failed to update service", type: "error" });
    }
    setIsModifying(false);
  };

  const deConfigureEdit = () => {
    setSelectedService(null);
    setIsEdit(false);
    imageRef.current!.value = "";
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedService({ ...selectedService!, name: e.target.value });
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedService({ ...selectedService!, description: e.target.value });
  };

  useEffect(() => {
    const handleFetchServices = async () => {
      setIsLoading(true);
      const fetchedServices = await fetchServices();
      setServices(fetchedServices);
      setIsLoading(false);
    };
    handleFetchServices();
  }, []);

  const returnNewService = (service: Services) => {
    setServices([...services, service]);
  };

  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center"
        style={{
          minHeight: "calc(100vh - 191px)",
          maxHeight: "calc(100vh - 191px)",
        }}
      >
        <FaSpinner size={30} className="animate-spin" />
      </div>
    );
  }

  if (!isLoading && services.length === 0) {
    return (
      <div
        className="flex justify-center items-center"
        style={{
          minHeight: "calc(100vh - 191px)",
          maxHeight: "calc(100vh - 191px)",
        }}
      >
        <p className="text-gray-500 text-lg">No services available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Services</h1>
        <div>
          <PrimaryAuthButton text="Add New Service" onClick={openModal} />
        </div>
      </div>

      {services.length === 0 ? (
        <div className="text-center p-8 bg-white dark:bg-darkThemeCard rounded-lg">
          <p className="text-gray-500">No services available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <AdminServicesCard
              configureEdit={configureEdit}
              deConfigureEdit={deConfigureEdit}
              handleDeleteService={handleDeleteService}
              handleModifyService={handleModifyService}
              handleChangeDescription={handleChangeDescription}
              handleChangeName={handleChangeName}
              handleImageChange={handleImageChange}
              isEdit={isEdit}
              isModifying={isModifying}
              key={service.id}
              service={service}
              selectedService={selectedService}
              imageRef={imageRef}
            />
          ))}
        </div>
      )}

      <AddServiceModal
        returnNewService={returnNewService}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
}
