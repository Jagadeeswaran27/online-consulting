import { BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import { MdFacebook } from "react-icons/md";

export default function Footer() {
  return (
    <div className="w-[80%] mx-auto flex justify-between gap-16 items-center my-20">
      <div className="w-[50%] flex flex-col gap-6">
        <h1 className="text-3xl font-semibold">Onilne Consulting</h1>
        <p>
          Subscribe to our newsletter for the latest updates on new features and
          product releases.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter your email"
            className="border border-black p-[6px] flex-grow"
          />
          <button className="text-primaryRed border-primaryRed border-2 py-[6px] px-3 font-semibold hover:bg-black hover:border-black hover:text-white transition-all duration-300">
            Subscribe
          </button>
        </div>
        <p>© 2023 Online Consulting. All rights reserved.</p>
      </div>
      <div className="flex justify-between w-[50%]">
        <div className=" flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">Company</h1>
          <ul>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-lg mb-2">
              Home
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-lg mb-2">
              Services
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-lg mb-2">
              Consultants
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-lg mb-2">
              Reviews
            </li>
          </ul>
        </div>
        <div className=" flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">Policies</h1>
          <ul>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-lg mb-2">
              Contact Us
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-lg mb-2">
              FAQs
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-lg mb-2">
              Terms of Service
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-lg mb-2">
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className=" flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">Follow Us</h1>
          <ul>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-lg mb-2 flex items-center gap-2">
              <MdFacebook size={25} /> Facebook
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-lg mb-2 flex items-center gap-2">
              <BsInstagram size={20} /> Instagram
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-lg mb-2 flex items-center gap-2">
              <BsTwitter size={20} /> Twitter
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-lg mb-2 flex items-center gap-2">
              <BsLinkedin size={20} /> LinkedIn
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
