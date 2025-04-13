import {
  StreamCall,
  StreamTheme,
  StreamVideo,
  User,
  StreamVideoClient,
  Call,
  useCallStateHooks,
  CallControls,
  SpeakerLayout,
  CallingState,
} from "@stream-io/video-react-sdk";
import { useContext, useEffect, useState } from "react";
import { auth, functions } from "../../core/config/Firebase";
import { httpsCallable } from "firebase/functions";
import { useNavigate, useSearchParams } from "react-router-dom";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Routes } from "../../utils/Routes";
import { AuthContext } from "../../store/context/auth";

type GetStreamTokenResult = {
  token: string;
};

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

const VideoCall = () => {
  const [authToken, setAuthToken] = useState<string>("");
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call>();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const callId = searchParams.get("callId");
  const consultantId = searchParams.get("consultantId");

  useEffect(() => {
    const setupStream = async () => {
      if (!callId) {
        navigate(Routes.home);
        return;
      }

      try {
        setIsLoading(true);
        const getStreamToken = httpsCallable(functions, "getStreamToken");
        const result = await getStreamToken();
        const { token } = result.data as GetStreamTokenResult;

        const userId = auth.currentUser?.uid;
        if (!userId) {
          console.error("User not authenticated");
          setIsLoading(false);
          return;
        }

        const user: User = {
          id: userId,
          name: auth.currentUser?.displayName || userId,
          image: auth.currentUser?.photoURL || undefined,
        };

        const streamClient = new StreamVideoClient({
          apiKey,
          user,
          token,
        });

        const streamCall = streamClient.call("default", callId);
        await streamCall.join({ create: true, video: false });

        setAuthToken(token);
        setClient(streamClient);
        setCall(streamCall);
        setIsLoading(false);
      } catch (error) {
        console.error("Error setting up video call:", error);
        setIsLoading(false);
      }
    };

    setupStream();

    return () => {
      if (call) {
        call.leave().catch(console.error);
      }
      if (client) {
        client.disconnectUser().catch(console.error);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!callId || !consultantId) {
    navigate(
      user?.type === "consultant"
        ? Routes.consultantDashboard
        : Routes.yourBookings
    );
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-darkTheme">
        <div className="p-8 rounded-lg shadow-elevated bg-white dark:bg-darkThemeCard">
          <h2 className="text-xl font-medium text-textHeading dark:text-white mb-4">
            Joining video call...
          </h2>
          <div className="w-16 h-16 border-4 border-primaryRed border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!client || !call || !authToken) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-darkTheme">
        <div className="p-8 rounded-lg shadow-elevated bg-white dark:bg-darkThemeCard">
          <h2 className="text-xl font-medium text-textHeading dark:text-white">
            Unable to join call
          </h2>
          <p className="mt-2 text-textBody dark:text-textBody-dark">
            Please try again later.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 px-4 py-2 bg-primaryRed hover:bg-secondaryRed text-white rounded-md"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout />
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

export default VideoCall;

export const MyUILayout = () => {
  const { user } = useContext(AuthContext);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  function handleEndCall() {
    navigate(
      user?.type === "consultant"
        ? Routes.consultantDashboard
        : Routes.yourBookings
    );
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls onLeave={handleEndCall} />
    </StreamTheme>
  );
};
