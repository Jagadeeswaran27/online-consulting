import { Booking } from "../../types/Booking";
import { Services } from "../../types/Services";
import { ConsultantUser } from "../../types/Users";
import UpcomingBookingCard from "./UpcomingBookingCard";

interface UpcomingBookingsProps {
  upcomingBookings: Booking[];
  consultants: Record<string, ConsultantUser>;
  services: Record<string, Services>;
}

function UpCompingBookings({
  consultants,
  services,
  upcomingBookings,
}: UpcomingBookingsProps) {
  return (
    <>
      <h2 className="text-xl font-semibold text-textHeading dark:text-white mb-4 mt-8">
        Upcoming Consultations
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {upcomingBookings.map((booking) => {
          const consultant = consultants[booking.cid];
          const service = services[booking.sid];
          const bookingDate = booking.scheduledAt.toDate();
          const isToday =
            new Date().toDateString() === bookingDate.toDateString();

          return (
            <div key={booking.bid}>
              <UpcomingBookingCard
                booking={booking}
                consultant={consultant}
                service={service}
                isToday={isToday}
                isConsultant={false}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UpCompingBookings;
