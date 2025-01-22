importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCR_bAqAr4v8hPKCdXAkaUKqFcsps9ykGY",
  authDomain: "fir-task-ad9d9.firebaseapp.com",
  projectId: "fir-task-ad9d9",
  storageBucket: "fir-task-ad9d9.firebasestorage.app",
  messagingSenderId: "573063164996",
  appId: "1:573063164996:web:6a98aa6f7f1781e5887811",
  measurementId: "G-ZT4NPECBN2",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.body;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
