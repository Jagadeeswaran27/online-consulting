importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

self.addEventListener("install", (event) => {
  event.waitUntil(
    fetch("/firebase-config.json") //
      .then((response) => response.json())
      .then((config) => {
        firebase.initializeApp(config);
        const messaging = firebase.messaging();

        messaging.onBackgroundMessage((payload) => {
          console.log("Background notification received:", payload);
          self.registration.showNotification(payload.notification.title, {
            body: payload.notification.body,
            icon: payload.notification.icon,
          });
        });
      })
  );
});
