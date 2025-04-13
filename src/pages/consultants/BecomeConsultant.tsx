import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/context/auth";
import { fetchServices } from "../../core/services/ServiceManager";
import { Services } from "../../types/Services";
import { FaSpinner, FaCloudUploadAlt, FaCheck, FaTimes } from "react-icons/fa";
import PrimaryAuthButton from "../../components/common/PrimaryAuthButton";
import NewConsultantTabContent from "../../components/consultants/NewConsultantTabContent";
import {
  canApplyConsultant,
  submitApplication,
} from "../../core/services/ConsultantService";
import { showToast } from "../../utils/Toast";

export default function BecomeConsultant() {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    experience: "",
    selectedServices: [] as string[],
  });
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const getServices = async () => {
      const servicesList = await fetchServices();
      setServices(servicesList);
      setLoading(false);
    };

    getServices();
  }, []);

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => {
      if (prev.selectedServices.includes(serviceId)) {
        return {
          ...prev,
          selectedServices: prev.selectedServices.filter(
            (id) => id !== serviceId
          ),
        };
      } else {
        return {
          ...prev,
          selectedServices: [...prev.selectedServices, serviceId],
        };
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileError("");

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileError("File size exceeds 5MB limit");
        return;
      }

      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setFileError("Only PDF and Word documents are allowed");
        return;
      }

      setPortfolioFile(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.bio.trim()) {
      newErrors.bio = "Professional bio is required";
    } else if (formData.bio.length < 100) {
      newErrors.bio = "Bio should be at least 100 characters";
    }

    if (!formData.experience.trim() || !(parseInt(formData.experience) > 0)) {
      newErrors.experience =
        "Experience information is required and should be a number";
    }

    if (formData.selectedServices.length === 0) {
      newErrors.services = "Please select at least one service";
    }

    if (!portfolioFile) {
      newErrors.portfolio = "Portfolio or resume is required";
    }

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

    const cannotApply = await canApplyConsultant();
    if (cannotApply) {
      const { days, hours, minutes } = cannotApply;
      showToast({
        message: `You can apply again in ${days} days, ${hours} hours, and ${minutes} minutes.`,
        type: "error",
      });
      return;
    }
    setSubmitting(true);
    const response = await submitApplication(
      formData.bio,
      formData.experience,
      formData.selectedServices,
      portfolioFile!
    );
    if (response) {
      showToast({
        message: "Application submitted successfully",
        type: "success",
      });
    } else {
      showToast({ message: "Application submission failed", type: "error" });
    }
    formData.bio = "";
    formData.experience = "";
    formData.selectedServices = [];
    setPortfolioFile(null);
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-81px)]">
        <FaSpinner size={40} className="animate-spin text-primaryRed" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-darkTheme min-h-screen py-8 flex flex-row-reverse lg:min-h-[calc(100vh-84px)] lg:max-h-[calc(100vh-84px)] max-lg:flex-wrap">
      {/* Application Form */}
      <div className="container mx-auto max-w-3xl px-4 py-2 overflow-y-auto">
        <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-textHeading dark:text-white mb-2">
            Consultant Application
          </h2>
          <p className="text-textMuted dark:text-textMuted-dark mb-8">
            Complete the form below to join our platform as a professional
            consultant.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field - Prefilled */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-textHeading dark:text-white mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={user?.userName || ""}
                disabled
                className="w-full px-4 py-3 bg-gray-100 dark:bg-darkThemeSecondary border border-formBorder dark:border-formBorder-dark rounded-lg text-textBody dark:text-textBody-dark"
              />
              <p className="mt-1 text-xs text-textMuted dark:text-textMuted-dark">
                Name is taken from your profile
              </p>
            </div>

            {/* Bio Field */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-textHeading dark:text-white mb-1"
              >
                Professional Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your professional background, skills, and expertise..."
                className={`w-full px-4 py-3 bg-white dark:bg-darkThemeSecondary border ${
                  errors.bio
                    ? "border-red-500"
                    : "border-formBorder dark:border-formBorder-dark"
                } rounded-lg text-textBody dark:text-textBody-dark outline-none`}
                required
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
              )}
            </div>

            {/* Experience Field */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-textHeading dark:text-white mb-1"
              >
                Years of Experience
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="e.g. 5"
                className={`w-full px-4 py-3 bg-white dark:bg-darkThemeSecondary border ${
                  errors.experience
                    ? "border-red-500"
                    : "border-formBorder dark:border-formBorder-dark"
                } rounded-lg text-textBody dark:text-textBody-dark outline-none`}
                required
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
              )}
            </div>

            {/* Services Selection */}
            <div>
              <label className="block text-sm font-medium text-textHeading dark:text-white mb-2">
                Services You Provide
              </label>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${
                  errors.services ? "border border-red-500 rounded-lg p-2" : ""
                }`}
              >
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.selectedServices.includes(service.id)
                        ? "bg-formBg-selected dark:bg-formBg-selectedDark border-primaryRed"
                        : "border-formBorder dark:border-formBorder-dark hover:bg-gray-50 dark:hover:bg-darkThemeSecondary"
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-textHeading dark:text-white">
                        {service.name}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 flex items-center justify-center rounded-full ${
                        formData.selectedServices.includes(service.id)
                          ? "bg-primaryRed text-white"
                          : "border border-gray-400 dark:border-gray-500"
                      }`}
                    >
                      {formData.selectedServices.includes(service.id) && (
                        <FaCheck size={10} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {services.length === 0 && (
                <p className="text-sm text-textMuted dark:text-textMuted-dark mt-2">
                  No services available. Please check back later.
                </p>
              )}
              {errors.services && (
                <p className="text-red-500 text-sm mt-1">{errors.services}</p>
              )}
              <p className="mt-1 text-xs text-textMuted dark:text-textMuted-dark">
                Select all services that you can provide as a consultant
              </p>
            </div>

            {/* Portfolio/Resume Upload */}
            <div>
              <label
                htmlFor="portfolio"
                className="block text-sm font-medium text-textHeading dark:text-white mb-2"
              >
                Upload Portfolio/Resume
              </label>
              <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed ${
                  errors.portfolio
                    ? "border-red-500"
                    : "border-formBorder dark:border-formBorder-dark"
                } rounded-lg`}
              >
                <div className="space-y-1 text-center">
                  <div className="flex justify-center">
                    <FaCloudUploadAlt
                      size={36}
                      className="text-textMuted dark:text-textMuted-dark"
                    />
                  </div>
                  <div className="flex text-sm justify-center text-textMuted dark:text-textMuted-dark">
                    <label
                      htmlFor="portfolio"
                      className="relative cursor-pointer rounded-md font-medium text-primaryRed hover:text-secondaryRed focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="portfolio"
                        name="portfolio"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-textMuted dark:text-textMuted-dark">
                    PDF or DOC up to 5MB
                  </p>
                  {portfolioFile && (
                    <div className="mt-2 flex items-center justify-center text-sm">
                      <span className="bg-gray-100 dark:bg-darkThemeSecondary text-textBody dark:text-textBody-dark py-1 px-3 rounded-lg flex items-center">
                        {portfolioFile.name}
                        <button
                          type="button"
                          onClick={() => setPortfolioFile(null)}
                          className="ml-2 text-textMuted dark:text-textMuted-dark hover:text-primaryRed"
                        >
                          <FaTimes size={14} />
                        </button>
                      </span>
                    </div>
                  )}
                  {fileError && (
                    <p className="text-red-500 text-xs mt-1">{fileError}</p>
                  )}
                  {errors.portfolio && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.portfolio}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className="pt-4">
              <PrimaryAuthButton
                isLoading={submitting}
                text="Submit Application"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
      <NewConsultantTabContent />
    </div>
  );
}
