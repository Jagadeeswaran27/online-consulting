import { Images } from "../../resources/Images";
import SplitText from "../../text-animations/SplitText/SplitText";
export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="py-10 sm:py-16 md:py-20 w-[95%] sm:w-[90%] lg:w-[85%] mx-auto">
        <SplitText
          text="Our Mission"
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold my-6 sm:my-8 md:my-10 text-right md:text-left"
        />
        <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-8 md:gap-10">
          <img
            src={Images.ourMission}
            alt="Our Mission"
            className="w-full md:w-[40%] lg:w-[30%] xl:w-[25%] h-auto rounded-lg "
          />
          <p className="text-base sm:text-lg text-left mb-6 sm:mb-8 md:mb-10 leading-relaxed">
            Our mission is to provide expert consultation services online,
            connecting you with professionals in various fields such as
            Electronics, Hotels, and Automobiles. We aim to make expert advice
            accessible to everyone, anytime, anywhere. Through our innovative
            platform, we bridge the gap between industry experts and those
            seeking professional guidance. Our secure video consultation feature
            ensures high-quality interactions, while our rating system helps
            maintain service excellence. We believe that geographical barriers
            should not limit access to expert knowledge, which is why we've
            created a space where professionals can share their expertise and
            clients can find solutions to their specific needs from the comfort
            of their homes or offices.
          </p>
        </div>

        <div className="my-6 sm:my-8 md:my-12 lg:my-16 text-right">
          <SplitText
            text="Our Vision"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-8 md:gap-10">
          <img
            src={Images.ourVision}
            alt="Our Vision"
            className="w-full md:hidden rounded-lg "
          />
          <p className="text-base sm:text-lg text-left mb-6 sm:mb-8 md:mb-10 md:order-1 lg:order-1 leading-relaxed">
            Our vision is to revolutionize the online consultation landscape by
            creating a global ecosystem where expertise knows no boundaries. We
            envision a future where anyone, anywhere, can instantly connect with
            qualified professionals across diverse fields. Through continuous
            innovation in video consultation technology and user experience, we
            aim to make expert guidance as accessible as a click away. Our
            platform will set new standards in online professional services,
            fostering a community where knowledge sharing thrives and quality
            consultation becomes the norm rather than the exception. We strive
            to empower both consultants and clients, creating opportunities for
            professional growth while ensuring that specialized expertise is
            available to those who need it most.
          </p>
          <img
            src={Images.ourVision}
            alt="Our Vision"
            className="w-full max-md:hidden md:w-[40%] lg:w-[30%] xl:w-[25%] h-auto md:order-2 lg:order-2 rounded-lg "
          />
        </div>

        <div className="my-6 sm:my-8 md:my-12 lg:my-16 text-left">
          <SplitText
            text="Our Team"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-8 md:gap-10">
          <img
            src={Images.ourTeam}
            alt="Our Team"
            className="w-full md:w-[40%] lg:w-[30%] xl:w-[25%] h-auto rounded-lg "
          />
          <p className="text-base sm:text-lg text-left mb-6 sm:mb-8 md:mb-10 leading-relaxed">
            Our team consists of experienced technology professionals, industry
            experts, and customer success specialists working together to
            revolutionize online consulting. Our developers continuously enhance
            our video consultation platform, while our expert review team
            carefully vets and onboards qualified consultants across various
            domains. Our customer support team provides round-the-clock
            assistance to ensure smooth interactions between consultants and
            clients. United by our commitment to making expert knowledge
            accessible, we combine technical innovation with industry expertise
            to create a trusted space for professional consultation.
          </p>
        </div>
        {/* Will include the real analytcs here! */}
        <div className="mt-16 sm:mt-24 md:mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white dark:bg-darkThemeCard p-6 rounded-xl shadow-profileCard">
              <div className="text-4xl font-bold text-primaryRed mb-2">
                100+
              </div>
              <div className="text-textHeading dark:text-white font-medium">
                Expert Consultants
              </div>
            </div>
            <div className="bg-white dark:bg-darkThemeCard p-6 rounded-xl shadow-profileCard">
              <div className="text-4xl font-bold text-primaryRed mb-2">
                5,000+
              </div>
              <div className="text-textHeading dark:text-white font-medium">
                Satisfied Clients
              </div>
            </div>
            <div className="bg-white dark:bg-darkThemeCard p-6 rounded-xl shadow-profileCard">
              <div className="text-4xl font-bold text-primaryRed mb-2">10+</div>
              <div className="text-textHeading dark:text-white font-medium">
                Industry Categories
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
