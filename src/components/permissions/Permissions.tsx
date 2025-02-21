import { getToken, onMessage, MessagePayload } from "firebase/messaging";
import { useEffect } from "react";
import { messaging } from "../../core/config/Firebase";

const VAPID_KEY =
  "BCHOEz3wpdCs_xwEYyLjUpJKWru-q08lut29ENqgM-WglxQb-na5JKKR2At8FJh71MCXMiL18dswy-_OVxSKrgw";

function Permissions() {
  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging, { vapidKey: VAPID_KEY })
          .then((currentToken) => {
            if (currentToken) {
              console.log("FCM Token:", currentToken);
              // Send this token to your backend for saving
            } else {
              console.log("No registration token available.");
            }
          })
          .catch((err) => console.error("Error fetching FCM token:", err));
      }
    });

    // Listen for incoming messages
    onMessage(messaging, (payload: MessagePayload) => {
      console.log("Notification received:", payload);
      if (payload.notification?.title) {
        new Notification(payload.notification.title, {
          body: payload.notification?.body || "",
          icon: payload.notification?.icon || undefined,
        });
      }
    });
  }, []);

  return <div></div>;
}

export default Permissions;
