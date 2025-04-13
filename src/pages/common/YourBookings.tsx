import { useEffect, useState } from "react";
import { auth } from "../../core/config/Firebase";
import { fetchUserBookings } from "../../core/services/BookingService";
import { fetchConsultantById } from "../../core/services/ConsultantService";
import { fetchService } from "../../core/services/ServiceManager";
import { Booking } from "../../types/Booking";
import { ConsultantUser } from "../../types/Users";
import { Services } from "../../types/Services";
import { FaSpinner } from "react-icons/fa";
import { isUpcoming } from "../../utils/Helper";
import UpCompingBookings from "../../components/user-bookings/UpCompingBookings";
import PastBookings from "../../components/user-bookings/PastBookings";
import ZeroBookings from "../../components/user-bookings/ZeroBookings";

function YourBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [consultants, setConsultants] = useState<
    Record<string, ConsultantUser>
  >({});
  const [services, setServices] = useState<Record<string, Services>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        const userBookings = await fetchUserBookings(user.uid);

        if (!userBookings) {
          setLoading(false);
          return;
        }

        const sortedBookings = [...userBookings].sort(
          (a, b) => b.scheduledAt.toMillis() - a.scheduledAt.toMillis()
        );

        setBookings(sortedBookings);

        const consultantData: Record<string, ConsultantUser> = {};
        const serviceData: Record<string, Services> = {};

        for (const booking of sortedBookings) {
          if (!consultantData[booking.cid]) {
            const consultant = await fetchConsultantById(booking.cid);
            if (consultant) {
              consultantData[booking.cid] = consultant;
            }
          }

          if (!serviceData[booking.sid]) {
            const service = await fetchService(booking.sid);
            if (service) {
              serviceData[booking.sid] = service;
            }
          }
        }

        setConsultants(consultantData);
        setServices(serviceData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading bookings:", err);
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-81px)] bg-gray-50 dark:bg-darkTheme">
        <FaSpinner size={40} className="animate-spin text-primaryRed mb-4" />
      </div>
    );
  }

  if (bookings.length === 0) {
    return <ZeroBookings />;
  }

  const upcomingBookings = bookings.filter((booking) =>
    isUpcoming(booking.scheduledAt)
  );
  const pastBookings = bookings.filter(
    (booking) => !isUpcoming(booking.scheduledAt)
  );

  return (
    <div className="bg-gray-50 dark:bg-darkTheme min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl font-bold text-textHeading dark:text-white mb-2">
          Your Bookings
        </h1>
        <p className="text-textMuted dark:text-textMuted-dark mb-8">
          Manage and view all your scheduled consultations
        </p>

        {upcomingBookings.length > 0 && (
          <UpCompingBookings
            upcomingBookings={upcomingBookings}
            consultants={consultants}
            services={services}
          />
        )}

        {pastBookings.length > 0 && (
          <PastBookings
            pastBookings={pastBookings}
            consultants={consultants}
            services={services}
          />
        )}
      </div>
    </div>
  );
}

export default YourBookings;
