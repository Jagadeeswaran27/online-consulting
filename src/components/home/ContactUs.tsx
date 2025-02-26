import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { contactUsData } from "../../utils/ContactUsData";

export default function ContactUs() {
  return (
    <div className="w-[95%] sm:w-[90%] md:w-[80%] mx-auto px-4 sm:px-0">
      <h1 className="text-center text-3xl sm:text-4xl mb-3 sm:mb-5 font-semibold">
        Contact Us
      </h1>
      <p className="text-center">
        Feel free to reach out to us for any inquiries or assistance.
      </p>
      <div className="flex flex-col md:flex-row justify-between gap-8 sm:gap-10 my-8 sm:my-10 md:mt-16">
        {contactUsData.map((data) => (
          <div
            key={data.title}
            className="flex flex-col gap-4 sm:gap-6 items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            {data.title === "Email" && (
              <MdEmail size={40} className="sm:text-[50px]" />
            )}
            {data.title === "Phone" && (
              <MdPhone size={40} className="sm:text-[50px]" />
            )}
            {data.title === "Location" && (
              <MdLocationOn size={40} className="sm:text-[50px]" />
            )}
            <h2 className="text-2xl sm:text-3xl">{data.title}</h2>
            <p className="text-center text-base sm:text-lg">
              {data.description}
            </p>
            <p>{data.link}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
