// src/scripts/generate-sw.js
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generateServiceWorker() {
  const template = await fs.readFile(
    path.join(__dirname, "../../public/firebase-messaging-sw.js"),
    "utf-8"
  );

  const config = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
  };

  const generatedContent = `
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

const firebaseConfig = ${JSON.stringify(config, null, 2)};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background notification received:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});
`;

  await fs.writeFile(
    path.join(__dirname, "../../dist/firebase-messaging-sw.js"),
    generatedContent
  );
}

generateServiceWorker().catch(console.error);
