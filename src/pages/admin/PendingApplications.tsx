import React, { useState, useEffect } from "react";
import {
  acceptApplication,
  fetchPendingApplications,
  rejectApplication,
} from "../../core/services/AdminService";
import { ApplicationFormWithMetaData } from "../../types/Consultant";
import {
  FaSpinner,
  FaCheck,
  FaTimes,
  FaFileAlt,
  FaChevronDown,
  FaClock,
} from "react-icons/fa";
import { showToast } from "../../utils/Toast";
import { formatTimestamp } from "../../utils/Helper";

export default function PendingApplications() {
  const [applications, setApplications] = useState<
    ApplicationFormWithMetaData[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadApplications = async () => {
      setLoading(true);
      const data = await fetchPendingApplications();
      setApplications(data);

      setLoading(false);
    };

    loadApplications();
  }, []);

  const toggleExpand = (uid: string) => {
    if (expandedIds.includes(uid)) {
      setExpandedIds(expandedIds.filter((id) => id !== uid));
    } else {
      setExpandedIds([...expandedIds, uid]);
    }
  };

  const filteredApplications = applications.filter((app) =>
    (app.username || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAccept = async (
    e: React.MouseEvent,
    application: ApplicationFormWithMetaData
  ) => {
    e.stopPropagation();
    const res = await acceptApplication(application);
    setIsActionLoading(true);
    if (res) {
      showToast({
        message: "Application accepted successfully",
        type: "success",
      });
      setApplications(
        applications.filter((app) => app.uid !== application.uid)
      );
    } else {
      showToast({ message: "Failed to accept application", type: "error" });
    }
    setIsActionLoading(false);
  };

  const handleReject = async (
    e: React.MouseEvent,
    application: ApplicationFormWithMetaData
  ) => {
    e.stopPropagation();
    const res = await rejectApplication(application);
    setIsActionLoading(true);
    if (res) {
      showToast({
        message: "Application rejected successfully",
        type: "success",
      });
      setApplications(
        applications.filter((app) => app.uid !== application.uid)
      );
    } else {
      showToast({ message: "Failed to reject application", type: "error" });
    }
    setIsActionLoading(false);
  };

  if (loading) {
    return (
      <div
        className="flex justify-center items-center"
        style={{
          minHeight: "calc(100vh - 191px)",
          maxHeight: "calc(100vh - 191px)",
        }}
      >
        <FaSpinner size={30} className="animate-spin text-primaryRed" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold dark:text-white">
          Pending Applications
        </h2>
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search applications"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-formBorder dark:border-formBorder-dark 
                      focus:border-formBorder-focus focus:outline-none
                      dark:bg-darkThemeSecondary dark:text-white"
          />
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white dark:bg-darkThemeCard rounded-lg shadow p-8 text-center">
          <p className="text-textMuted dark:text-textMuted-dark text-lg">
            No pending applications found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {filteredApplications.map((application) => (
            <div
              key={application.uid}
              className="bg-white dark:bg-darkThemeCard rounded-lg shadow-customLight overflow-hidden"
            >
              <div
                className="p-4 cursor-pointer flex justify-between items-center"
                onClick={() => toggleExpand(application.uid)}
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-textHeading dark:text-white">
                    {application.username ||
                      `User ${application.uid.substring(0, 8)}...`}
                  </span>
                  <span className="text-sm text-textMuted dark:text-textMuted-dark">
                    Experience: {application.experience} years
                  </span>
                  <span className="text-xs flex items-center text-textMuted dark:text-textMuted-dark mt-1">
                    <FaClock className="mr-1" /> Submitted:{" "}
                    {formatTimestamp(application.timestamp)}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center space-x-4 mr-4">
                    <button
                      disabled={isActionLoading}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                      title="Approve application"
                      onClick={(e) => handleAccept(e, application)}
                    >
                      <FaCheck size={18} />
                    </button>
                    <button
                      disabled={isActionLoading}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                      title="Reject application"
                      onClick={(e) => handleReject(e, application)}
                    >
                      <FaTimes size={18} />
                    </button>
                  </div>
                  <FaChevronDown
                    className={`text-textMuted dark:text-textMuted-dark transition-transform duration-300 ${
                      expandedIds.includes(application.uid)
                        ? "transform rotate-180"
                        : ""
                    }`}
                    size={16}
                  />
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedIds.includes(application.uid) ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-4 border-t border-formBorder dark:border-formBorder-dark bg-cardBg dark:bg-cardBg-dark">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-sm font-medium text-textMuted dark:text-textMuted-dark mb-1">
                          Bio
                        </h3>
                        <p className="text-textBody dark:text-textBody-dark">
                          {application.bio}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-textMuted dark:text-textMuted-dark mb-1">
                          Contact
                        </h3>
                        <p className="text-textBody dark:text-textBody-dark">
                          {application.contact}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-textMuted dark:text-textMuted-dark mb-1">
                          Experience
                        </h3>
                        <p className="text-textBody dark:text-textBody-dark">
                          {application.experience}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-textMuted dark:text-textMuted-dark mb-1">
                          Submitted
                        </h3>
                        <p className="text-textBody dark:text-textBody-dark flex items-center">
                          <FaClock className="mr-2" />{" "}
                          {formatTimestamp(application.timestamp)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h3 className="text-sm font-medium text-textMuted dark:text-textMuted-dark mb-1">
                          Services
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {application.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-reviewCard dark:bg-reviewCard-dark rounded-full text-sm text-textBody dark:text-textBody-dark"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-textMuted dark:text-textMuted-dark mb-1">
                          Resume
                        </h3>
                        <a
                          href={application.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-primaryRed hover:bg-secondaryRed text-white rounded-lg transition-colors"
                        >
                          <FaFileAlt className="mr-2" />
                          View Resume
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
