# ⭐ Rivora — Real-Time Chat Application

Rivora is a clean and responsive real-time chat application built with React, Node.js, MongoDB, and Socket.IO.  
It supports instant messaging, user authentication, and a modern, responsive chat interface.

🔗 **Live App:** https://rivora-two.vercel.app/

---

## ✨ Features

### 🔐 Authentication
- User signup & login  
- Secure password hashing with **bcrypt**  
- JWT-based authentication  

### 💬 Real-Time Messaging
- Real-time chat via **Socket.IO**  
- Messages update instantly without page refresh  

### 🗂️ Sidebar Chat List
- Displays available chats  
- Shows last message snippet  
- Smooth transitions between conversations  

### 📱 Responsive UI
- Fully responsive across all screen sizes  

---

## 🚀 Upcoming Features
Planned enhancements:

- Delivered message tick (double tick)  
- Seen/read message tick (blue tick)  
- Unread message count  
- File & media uploads  
- Image/file preview before sending  
- Group chats  
- Voice & video calling  
- User search / chat search  
- Typing indicator  

---

## 🛠️ Tech Stack

### **Frontend (React + Vite)**
- React 19  
- Vite  
- React Router DOM 7  
- Redux Toolkit  
- React Redux  
- Socket.IO Client  
- Axios  
- TailwindCSS  
- PostCSS + Autoprefixer  
- React Icons  
- React Hot Toast  
- Moment.js  

---

### **Backend (Node.js + Express + MongoDB)**
- **Node.js**
- **Express 5**
- **MongoDB + Mongoose**
- **Socket.IO** (real-time messaging)
- **jsonwebtoken** (JWT auth)
- **bcrypt** (password hashing)
- **dotenv** (environment variables)
- **cors** (cross-origin support)
- **nodemon** (development auto-restart)

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/rivora.git
cd rivora
```

### 2. Install dependencies (root)
```bash
npm install
```

### 3. Add environment variables  
Create a **.env** file inside the server folder:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Start backend
```bash
cd server
npm run dev
```

### 5. Start frontend
```bash
cd client
npm run dev
```

---

## 📂 Folder Structure

```
/client        → React frontend  
/server        → Node.js backend (Express + Socket.IO)  
```

---

## 🧭 How It Works

1. User logs in / signs up  
2. Backend validates user and issues a JWT  
3. Frontend connects to Socket.IO server  
4. Messages are exchanged in real time  
5. MongoDB stores users, chats, and messages  
6. UI is updated via Redux state and live socket data  

---

## 👨‍💻 Author

**Harsh Aggarwal**  
GitHub: https://github.com/your-username

---

## 📜 License
MIT License