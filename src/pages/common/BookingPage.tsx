import { useState, useEffect, useRef, useCallback, RefObject } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { fetchService } from "../../core/services/ServiceManager";
import { Services } from "../../types/Services";
import { ConsultantUser } from "../../types/Users";
import { ContactPreference, GeneralSettings } from "../../types/Settings";
import { fetchUserGeneralSettingsForId } from "../../core/services/SettingsServices";
import {
  fetchConsultantById,
  fetchConsultantServices,
} from "../../core/services/ConsultantService";
import { Timestamp } from "firebase/firestore";
import { Booking } from "../../types/Booking";
import { auth } from "../../core/config/Firebase";
import {
  addBooking,
  checkBookingSlot,
  fetchBookingsByDate,
  subscribeToBookingsByDate,
} from "../../core/services/BookingService";
import { showToast } from "../../utils/Toast";
import { generateCallId, getTimeFromTimestamp } from "../../utils/Helper";
import BookingHeader from "../../components/booking/BookingHeader";
import TabNavigation from "../../components/booking/TabNavigation";
import Step1 from "../../components/booking/Step1";
import Step2 from "../../components/booking/Step2";
import Step3 from "../../components/booking/Step3";
import NavigationButtons from "../../components/booking/NavigationButtons";
import { Routes } from "../../utils/Routes";

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [services, setServices] = useState<Services[]>([]);
  const [selectedService, setSelectedService] = useState<Services | null>(null);
  const [selectedMode, setSelectedMode] = useState<ContactPreference | null>(
    null
  );
  const [consultant, setConsultant] = useState<ConsultantUser | null>(null);
  const [consultantSetting, setConsultantSetting] =
    useState<GeneralSettings | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [fetchingSlots, setFetchingSlots] = useState<boolean>(false);

  const sid = searchParams.get("sid");
  const cid = searchParams.get("cid");

  const datePickerRef = useRef<HTMLInputElement | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.focus();
      if (typeof datePickerRef.current.showPicker === "function") {
        datePickerRef.current.showPicker();
      } else {
        datePickerRef.current.click();
      }
    }
  };

  const updateBookedSlots = useCallback((bookings: Booking[]) => {
    const slots = bookings.map((booking) =>
      getTimeFromTimestamp(booking.scheduledAt)
    );
    setBookedSlots(slots);
  }, []);

  useEffect(() => {
    if (selectedDate && cid) {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }

      setFetchingSlots(true);

      fetchBookingsByDate(cid, selectedDate)
        .then((bookings) => {
          updateBookedSlots(bookings);
        })
        .catch((error) => {
          console.error("Error fetching booked slots:", error);
        })
        .finally(() => {
          setFetchingSlots(false);
        });

      unsubscribeRef.current = subscribeToBookingsByDate(
        cid,
        selectedDate,
        updateBookedSlots
      );
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [selectedDate, cid, updateBookedSlots]);

  useEffect(() => {
    const initPage = async () => {
      setLoading(true);
      try {
        if (sid) {
          const service = await fetchService(sid);
          if (service) {
            setSelectedService(service);
            setStep(2);
          }
        }

        if (cid) {
          const consultantSetting = await fetchUserGeneralSettingsForId(cid);
          setConsultantSetting(consultantSetting);
          const consultantData = await fetchConsultantById(cid);
          if (consultantData) {
            setConsultant(consultantData);
            const allServices = await fetchConsultantServices(
              consultantData.services
            );
            setServices(allServices);
          }
        }
      } catch (error) {
        console.error("Error initializing booking page:", error);
      } finally {
        setLoading(false);
      }
    };

    initPage();
  }, [sid, cid]);

  const handleServiceSelect = (service: Services) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleModeSelect = (mode: ContactPreference) => {
    setSelectedMode(mode);
    setStep(3);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : null;
    setSelectedDate(newDate);
    setSelectedTime(null);
    setTimeError(null);
    setBookedSlots([]);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);

    const [hours, minutes] = time.split(":").map(Number);
    if (hours < 10 || (hours === 17 && minutes > 0) || hours > 17) {
      setTimeError("Please select a time between 10:00 AM and 5:00 PM");
    } else {
      setTimeError(null);
    }
  };

  const isTimeSlotBooked = (time: string): boolean => {
    return bookedSlots.includes(time);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime || timeError) {
      setTimeError("Please select a valid date and time for your booking");
      return;
    }
    const appointmentDate = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(":").map(Number);
    appointmentDate.setHours(hours, minutes, 0, 0);
    const scheduledAt = Timestamp.fromDate(appointmentDate);
    const bookingData: Booking = {
      bid: "",
      cid: cid!,
      uid: auth.currentUser?.uid || "",
      sid: selectedService!.id,
      scheduledAt: scheduledAt,
      mode: selectedMode!,
      callId: selectedMode == "online" ? generateCallId() : "",
      inCall: [],
    };
    const isSlotAvailable = await checkBookingSlot(cid!, scheduledAt);
    if (!isSlotAvailable) {
      showToast({
        message: "Selected time slot is already booked. Please choose another.",
        type: "error",
      });
      return;
    }
    const response = await addBooking(bookingData);
    if (response) {
      showToast({
        message: "Booking confirmed successfully!",
        type: "success",
      });
      navigate(Routes.yourBookings);
    } else {
      showToast({
        message: "Failed to confirm booking. Please try again.",
        type: "error",
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      if (sid && step === 2) {
        navigate(-1);
      } else {
        setStep(step - 1);
      }
    } else {
      navigate(-1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-81px)]">
        <FaSpinner size={40} className="animate-spin text-primaryRed" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-darkTheme min-h-screen py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-elevated overflow-hidden">
          {/* Header */}
          <BookingHeader handleBack={handleBack} />

          {/* Tab-style Progress Navigation */}
          <TabNavigation setStep={setStep} step={step} sid={sid} />

          {/* Content */}
          <div className="p-8">
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <Step1
                handleServiceSelect={handleServiceSelect}
                services={services}
              />
            )}

            {/* Step 2: Mode Selection */}
            {step === 2 && selectedService && (
              <Step2
                consultant={consultant}
                consultantSetting={consultantSetting}
                selectedService={selectedService}
                selectedMode={selectedMode}
                handleModeSelect={(mode: ContactPreference) =>
                  handleModeSelect(mode)
                }
              />
            )}

            {/* Step 3: Confirm Booking */}
            {step === 3 && selectedService && selectedMode && (
              <Step3
                consultant={consultant!}
                selectedService={selectedService}
                selectedMode={selectedMode}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                fetchingSlots={fetchingSlots}
                timeError={timeError}
                datePickerRef={datePickerRef as RefObject<HTMLInputElement>}
                handleDateChange={handleDateChange}
                handleTimeChange={handleTimeChange}
                isTimeSlotBooked={isTimeSlotBooked}
                openDatePicker={openDatePicker}
              />
            )}

            {/* Navigation Buttons */}
            <NavigationButtons
              step={step}
              selectedMode={selectedMode}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              timeError={timeError}
              setStep={setStep}
              handleBack={handleBack}
              handleConfirmBooking={handleConfirmBooking}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
