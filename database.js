const firebaseConfig = {
  apiKey: "AIzaSyBSigbUoIsOYmJAfTkpLdyP3WaEGJQmA-U",
  authDomain: "avudev-bot-web-2209.firebaseapp.com",
  databaseURL: "https://avudev-bot-web-2209-default-rtdb.firebaseio.com", 
  projectId: "avudev-bot-web-2209",
  storageBucket: "avudev-bot-web-2209.firebasestorage.app",
  messagingSenderId: "695129468246",
  appId: "1:695129468246:web:fd56ef4601fb09e8627af7",
  measurementId: "G-3162H5Y7L3"
};

// Khởi tạo cho web
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();

// Cấu hình các cổng API nhiệm vụ (Lấy từ config.py của Admin)
const CONFIG = {
    REWARD_TASK: 250, // Thưởng 250đ/nhiệm vụ
    WEB_URL: "https://wipsbot.github.io/avudev-botweb/",
    API_KEYS: {
        'YeuMoney': '2103f2aa67d874c161e5f4388b2312af6d43742734a8ea41716b8a2cc94b7b02',
        'LayMaNgay': 'U5RAzqswEDJ71Q7O3JmEwbRmCyOjbgEwHQfoTNaeo035Ol',
        'Link4M': '68208afab6b8fc60542289b6',
        'XLink': 'ac55663f-ef85-4849-8ce1-4ca99bd57ce7'
    }
};