// Firebase 라이브러리를 서비스 워커로 가져옵니다.
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');

// 서비스 워커에서 Firebase 앱을 초기화합니다.
// 이 설정 정보는 회원님의 개인 프로젝트 정보와 정확히 일치해야 합니다.
const firebaseConfig = {
    apiKey: "AIzaSyCe36cYwqNz1yJnjJ0zA1W4vGY7IIaWDOU",
    authDomain: "baby-sion.firebaseapp.com",
    projectId: "baby-sion",
    storageBucket: "baby-sion.firebasestorage.app",
    messagingSenderId: "1067320748533",
    appId: "1:1067320748533:web:db3b5bf48df4b0607498bc",
    measurementId: "G-7S6ZQNKVCJ"
};

firebase.initializeApp(firebaseConfig);

// 메시징 서비스 인스턴스를 가져옵니다.
const messaging = firebase.messaging();

// 백그라운드에서 푸시 알림을 받았을 때 처리하는 핸들러입니다.
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
