export default function PendingApplications() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Applications</h1>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white dark:bg-darkThemeCard p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Pending Applications</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border dark:border-gray-700 rounded">
              <div className="flex items-center gap-3">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Applicant"
                  className="rounded-full w-10 h-10"
                />
                <div>
                  <h4 className="font-medium">Robert Johnson</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Applied for: Career Counseling
                  </p>
                </div>
              </div>
              <div className="space-x-2">
                <button className="text-green-500 hover:text-green-600">
                  Approve
                </button>
                <button className="text-primaryRed hover:text-secondaryRed">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
