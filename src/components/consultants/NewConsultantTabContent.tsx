import { useState } from "react";
import {
  FaClock,
  FaMoneyBillWave,
  FaQuestionCircle,
  FaStar,
  FaFileAlt,
  FaUserCheck,
  FaUserCog,
  FaHandshake,
} from "react-icons/fa";

export default function NewConsultantTabContent() {
  const [activeTab, setActiveTab] = useState<"benefits" | "faq" | "process">(
    "process"
  );

  return (
    <div>
      <div className="container mx-auto max-w-4xl px-4 mt-8 mb-4">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("benefits")}
            className={`py-3 px-6 font-medium ${
              activeTab === "benefits"
                ? "border-b-2 border-primaryRed text-primaryRed"
                : "text-gray-500 dark:text-gray-400 hover:text-primaryRed"
            }`}
          >
            Benefits
          </button>
          <button
            onClick={() => setActiveTab("process")}
            className={`py-3 px-6 font-medium ${
              activeTab === "process"
                ? "border-b-2 border-primaryRed text-primaryRed"
                : "text-gray-500 dark:text-gray-400 hover:text-primaryRed"
            }`}
          >
            Process
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`py-3 px-6 font-medium ${
              activeTab === "faq"
                ? "border-b-2 border-primaryRed text-primaryRed"
                : "text-gray-500 dark:text-gray-400 hover:text-primaryRed"
            }`}
          >
            FAQ
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto max-w-4xl px-4 mb-8">
        {activeTab === "benefits" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-darkThemeCard rounded-xl p-6 flex flex-col items-center text-center shadow-customLight">
              <div className="bg-red-50 dark:bg-opacity-10 rounded-full p-4 mb-4">
                <FaMoneyBillWave className="text-primaryRed text-2xl" />
              </div>
              <h3 className="font-medium text-xl mb-2 dark:text-white">
                Competitive Earnings
              </h3>
              <p className="text-textMuted dark:text-textMuted-dark">
                Set your own rates and receive payments securely through our
                platform.
              </p>
            </div>

            <div className="bg-white dark:bg-darkThemeCard rounded-xl  shadow-customLight p-6 flex flex-col items-center text-center">
              <div className="bg-red-50 dark:bg-opacity-10 rounded-full p-4 mb-4">
                <FaClock className="text-primaryRed text-2xl" />
              </div>
              <h3 className="font-medium text-xl mb-2 dark:text-white">
                Flexible Schedule
              </h3>
              <p className="text-textMuted dark:text-textMuted-dark">
                Work when you want and manage your availability through our
                calendar system.
              </p>
            </div>

            <div className="bg-white dark:bg-darkThemeCard rounded-xl  shadow-customLight p-6 flex flex-col items-center text-center">
              <div className="bg-red-50 dark:bg-opacity-10 rounded-full p-4 mb-4">
                <FaStar className="text-primaryRed text-2xl" />
              </div>
              <h3 className="font-medium text-xl mb-2 dark:text-white">
                Build Your Reputation
              </h3>
              <p className="text-textMuted dark:text-textMuted-dark">
                Get feedback and ratings from clients to enhance your
                professional profile.
              </p>
            </div>
          </div>
        )}

        {activeTab === "process" && (
          <div className="bg-white dark:bg-darkThemeCard rounded-xl  shadow-customLight p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              Application Process
            </h2>

            <div className="space-y-8">
              <div className="flex">
                <div className="flex-shrink-0 bg-red-50 dark:bg-opacity-10 rounded-full p-3 mr-4 flex items-center justify-center w-12 h-12">
                  <FaFileAlt className="text-primaryRed text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1 dark:text-white">
                    Submit Application
                  </h3>
                  <p className="text-textMuted dark:text-textMuted-dark">
                    Complete the application form and upload your resume/CV and
                    any relevant credentials.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 bg-red-50 dark:bg-opacity-10 rounded-full p-3 mr-4 flex items-center justify-center w-12 h-12">
                  <FaUserCheck className="text-primaryRed text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1 dark:text-white">
                    Admin Review
                  </h3>
                  <p className="text-textMuted dark:text-textMuted-dark">
                    Our admin team will validate your resume and credentials
                    within 2 business days maximum.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 bg-red-50 dark:bg-opacity-10 rounded-full p-3 mr-4 flex items-center justify-center w-12 h-12">
                  <FaUserCog className="text-primaryRed text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1 dark:text-white">
                    Profile Setup
                  </h3>
                  <p className="text-textMuted dark:text-textMuted-dark">
                    Once approved, you'll receive an email to set up your
                    consultant profile and availability.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 bg-red-50 dark:bg-opacity-10 rounded-full p-3 mr-4 flex items-center justify-center w-12 h-12">
                  <FaHandshake className="text-primaryRed text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1 dark:text-white">
                    Start Consulting
                  </h3>
                  <p className="text-textMuted dark:text-textMuted-dark">
                    Begin accepting client bookings and providing consultations
                    on your terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="bg-white dark:bg-darkThemeCard rounded-xl  shadow-customLight p-6">
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-2 flex items-center dark:text-white">
                <FaQuestionCircle className="text-primaryRed mr-2" />
                How do I get paid?
              </h3>
              <p className="text-textMuted dark:text-textMuted-dark ml-6">
                Payments are processed securely through our platform. We deposit
                earnings to your account twice a month.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-lg mb-2 flex items-center dark:text-white">
                <FaQuestionCircle className="text-primaryRed mr-2" />
                How long does the application process take?
              </h3>
              <p className="text-textMuted dark:text-textMuted-dark ml-6">
                Most applications are reviewed within 3-5 business days. You'll
                receive an email notification once your application is approved.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-lg mb-2 flex items-center dark:text-white">
                <FaQuestionCircle className="text-primaryRed mr-2" />
                What qualifications do I need?
              </h3>
              <p className="text-textMuted dark:text-textMuted-dark ml-6">
                Requirements vary by category but generally include verified
                expertise, relevant experience, and strong communication skills.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2 flex items-center dark:text-white">
                <FaQuestionCircle className="text-primaryRed mr-2" />
                Can I work part-time?
              </h3>
              <p className="text-textMuted dark:text-textMuted-dark ml-6">
                Yes! You have full control over your availability and can choose
                to work as many or as few hours as you prefer.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
