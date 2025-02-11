import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { contactUsData } from "../../utils/ContactUsData";

export default function ContactUs() {
  return (
    <div className="w-[70%] mx-auto ">
      <h1 className="text-center text-4xl mb-5 font-semibold">Contact Us</h1>
      <p className="text-center">
        Feel free to reach out to us for any inquiries or assistance.
      </p>
      <div className="flex flex-col md:flex-row justify-between gap-10 my-10">
        {contactUsData.map((item) => (
          <div className="flex flex-col gap-6 items-center justify-between">
            {item.title === "Email" && <MdEmail size={50} />}
            {item.title === "Phone" && <MdPhone size={50} />}
            {item.title === "Location" && <MdLocationOn size={50} />}
            <h2 className="text-3xl">{item.title}</h2>
            <p className="text-center text-lg">{item.description}</p>
            <p>{item.link}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
