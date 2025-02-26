import { BsInstagram, BsTwitter, BsLinkedin, BsFacebook } from "react-icons/bs";
import { Icons } from "../../resources/Icons";

export default function Footer() {
  return (
    <div className="w-[95%] sm:w-[90%] md:w-[80%] mx-auto flex flex-col lg:flex-row justify-between gap-10 lg:gap-16 items-center py-10 sm:py-20 px-4 sm:px-0">
      <div className="w-full lg:w-[50%] flex flex-col gap-6">
        <h1 className="text-2xl sm:text-3xl font-semibold flex items-center gap-2">
          <img
            src={Icons.logo2}
            alt="Logo"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
          Online Consulting
        </h1>
        <p>
          Subscribe to our newsletter for the latest updates on new features and
          product releases.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full px-5 py-3 border border-gray-600 dark:bg-darkThemeSecondary focus:outline-none"
          />
          <button className="text-primaryRed border-primaryRed border-2 py-[6px] px-3 font-semibold hover:bg-secondaryRed hover:border-primaryRed hover:text-white transition-all duration-300 whitespace-nowrap">
            Subscribe
          </button>
        </div>
        <p>© 2023 Online Consulting. All rights reserved.</p>
      </div>
      <div className="w-full lg:w-[50%] flex flex-wrap justify-between gap-8 sm:gap-4">
        <div className="flex flex-col gap-4 sm:gap-6 w-full xs:w-[45%] sm:w-auto">
          <h1 className="text-xl sm:text-2xl font-semibold">Company</h1>
          <ul>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-base sm:text-lg mb-2">
              Home
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-base sm:text-lg mb-2">
              Services
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-base sm:text-lg mb-2">
              Consultants
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-base sm:text-lg mb-2">
              Reviews
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 sm:gap-6 w-full xs:w-[45%] sm:w-auto">
          <h1 className="text-xl sm:text-2xl font-semibold">Policies</h1>
          <ul>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-base sm:text-lg mb-2">
              Contact Us
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-base sm:text-lg mb-2">
              FAQs
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-base sm:text-lg mb-2">
              Terms of Service
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-base sm:text-lg mb-2">
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 sm:gap-6 w-full sm:w-auto mt-4 sm:mt-0">
          <h1 className="text-xl sm:text-2xl font-semibold">Follow Us</h1>
          <ul>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-base sm:text-lg mb-2 flex items-center gap-2">
              <BsFacebook size={18} className="sm:text-[20px]" /> Facebook
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-base sm:text-lg mb-2 flex items-center gap-2">
              <BsInstagram size={18} className="sm:text-[20px]" /> Instagram
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-base sm:text-lg mb-2 flex items-center gap-2">
              <BsTwitter size={18} className="sm:text-[20px]" /> Twitter
            </li>
            <li className="hover:text-primaryRed transition-all duration-300 cursor-pointer text-base sm:text-lg mb-2 flex items-center gap-2">
              <BsLinkedin size={18} className="sm:text-[20px]" /> LinkedIn
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
