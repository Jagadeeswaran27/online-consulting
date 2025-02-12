import { useState } from "react";
import { services } from "../../utils/ServicesData";

export default function Services() {
  const [selectedService, setSelectedService] = useState(0);

  return (
    <div>
      <h1 className="text-center text-4xl mb-20 font-semibold">Our Services</h1>
      <div className="flex gap-16 items-center justify-between w-[80%] mx-auto my-10">
        <div className="w-[50%] h-full">
          <img
            src={services[selectedService].image}
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="w-[50%] flex flex-col xl:gap-5 gap-2 justify-between">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`relative px-5 py-3 cursor-pointer transition-all duration-300`}
              onClick={() => setSelectedService(index)}
            >
              <div
                className={`absolute left-0 top-0 h-full w-[3px] transition-all duration-300 ${
                  selectedService === index ? "bg-black" : "bg-transparent"
                }`}
              ></div>

              <h1 className="font-semibold xl:text-[40px] lg:text-[30px] text-[20px]">
                Consult for {service.name}
              </h1>
              <p className="xl:text-[18px] lg:text-[14px] text-[12px]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
