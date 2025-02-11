// import { MdPerson } from "react-icons/md";
import { Images } from "../../resources/Images";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-10 sticky top-0 z-10 bg-white shadow-md">
      <div className="flex gap-10 font-semibold  items-center">
        <div className="w-12 h-20">
          <img src={Images.logo2} alt="logo" className="w-full h-full" />
        </div>
        <p className="hover:text-primaryRed cursor-pointer transition-all duration-300 ">
          Home
        </p>
        <p className="hover:text-primaryRed cursor-pointer transition-all duration-300">
          Services
        </p>
        <p className="hover:text-primaryRed cursor-pointer transition-all duration-300">
          About Us
        </p>
        <p className="hover:text-primaryRed cursor-pointer transition-all duration-300">
          Contact Us
        </p>
      </div>
      {/* <div className="flex gap-5 items-center">
        <MdPerson size={40} />
        <p className="text-lg font-semibold">Hello, Jagadeeswaran M</p>
      </div> */}

      <div className="flex gap-10">
        <button className="bg-primaryRed text-white py-2 px-5 font-semibold hover:bg-black hover:text-white transition-all duration-300">
          Login
        </button>
        <button className="text-primaryRed border-primaryRed border-2 py-[6px] px-3 font-semibold hover:bg-black hover:border-black hover:text-white transition-all duration-300">
          Sign Up
        </button>
      </div>
    </header>
  );
}
