import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { contactUsData } from "../../utils/ContactUsData";

export default function ContactUs() {
  return (
    <div className="w-[80%] mx-auto ">
      <h1 className="text-center text-4xl mb-5 font-semibold">Contact Us</h1>
      <p className="text-center">
        Feel free to reach out to us for any inquiries or assistance.
      </p>
      <div className="flex flex-col md:flex-row justify-between gap-10 my-10 mt-16">
        {contactUsData.map((data) => (
          <div
            key={data.title}
            className="flex flex-col gap-6 items-center justify-between"
          >
            {data.title === "Email" && <MdEmail size={50} />}
            {data.title === "Phone" && <MdPhone size={50} />}
            {data.title === "Location" && <MdLocationOn size={50} />}
            <h2 className="text-3xl">{data.title}</h2>
            <p className="text-center text-lg">{data.description}</p>
            <p>{data.link}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
