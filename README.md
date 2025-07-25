# 🎓 EduHub – MERN Stack Online Learning Platform

## ⚠️ Disclaimer

> This project is built for educational and portfolio purposes. It uses free-tier deployment services like Render, which may result in an initial **cold start delay of 50 seconds to 1 minute** for backend services.

---

## 📖 Description

**EduHub** is a full-stack online learning platform designed using the **MERN stack**. It allows **students** to explore and enroll in courses and **instructors** to create, manage, and publish courses. The platform features secure OTP-based email registration, media hosting via Cloudinary, and payment integration through Razorpay’s test API.

It’s a robust solution for anyone looking to build or understand a scalable, full-stack course platform with role-based access control and deployment-ready architecture.

---

## 🚀 Features

### 🧑‍🎓 Student Account
- ✅ OTP-based registration and login via email
- 📄 Profile with picture and bio
- 📚 View courses category-wise
- 💳 Enroll in courses via Razorpay (Test Mode)
- 🎥 Access lectures in enrolled courses
- 📩 Email notifications on registration and purchase

### 👨‍🏫 Instructor Account
- ✅ OTP-based registration and login
- 📄 Profile with picture and bio
- 🧑‍🏫 Create, publish, and archive courses
- 📤 Upload thumbnails and lectures (via Cloudinary)
- 📂 Manage own courses
- 🚫 Cannot enroll in courses

---

## 🧰 Tech Stack

| Technology | Reason for Use |
|------------|----------------|
| **MongoDB Atlas** | Scalable NoSQL database for handling user and course data. |
| **Express.js** | Minimal, flexible Node.js web framework for backend logic and APIs. |
| **React.js** | Efficient front-end library for building dynamic UIs with component-based architecture. |
| **Node.js** | Server-side runtime for handling backend operations in JavaScript. |
| **Tailwind CSS** | Utility-first CSS framework to create responsive and modern designs quickly. |
| **Cloudinary** | Efficient media storage and delivery for course images and lecture videos. |
| **Razorpay (Test API)** | Enables payment integration to simulate real purchase flows. |
| **Render (Backend)** | Free-tier hosting for backend APIs. Comes with cold-start limitations. |
| **Vercel (Frontend)** | Seamless deployment platform for React frontends. |
| **Nodemailer** | Sends OTPs and transactional emails (registration and purchases). |
| **JWT** | Secure user authentication and authorization. |

---

## 🌐 Live Demo Links

- 🔗 **Frontend (Vercel)**: [https://eduhub-frontend.vercel.app](https://eduhub-frontend-ten.vercel.app/)
- 🔗 **Backend (Render)**: [https://eduhub-backend.onrender.com](https://eduhub-backend.onrender.com)

> ⏱ The backend may take **50–60 seconds** to start due to Render’s free-tier cold starts.

---

## 🖼️ Screenshots

| Home Page | Student Dashboard | Instructor Dashboard |
|-----------|-------------------|----------------------|
| ![Home](https://res.cloudinary.com/dsbkzhsxq/image/upload/v1753421543/Screenshot_2025-07-25_110054_whqibx.png) | ![Student](https://res.cloudinary.com/dsbkzhsxq/image/upload/v1753421728/Screenshot_2025-07-25_110410_zdldph.png) | ![Instructor](https://res.cloudinary.com/dsbkzhsxq/image/upload/v1753421816/Screenshot_2025-07-25_110631_b9pzfb.png) |

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Koushik-Mediga/eduhub.git
cd eduhub
```

### 2. Backend Setup

```bash
cd server
npm install
npm run dev
```
Create a .env file in the server/ directory with:

```bash
MONGODB_URL=your_mongodb_uri
PORT=5000

MAIL_USER=your_email@example.com
MAIL_HOST=smtp.mailprovider.com
MAIL_PASS=your_email_app_password

JWT_SECRET=your_jwt_secret

FOLDER_NAME=your_cloudinary_folder_name
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm start
```
Create a .env file in the client/ directory with:

```bash
REACT_APP_BASE_URL=http://localhost:5000/api/v1
REACT_APP_RAZORPAY_KEY=your_razorpay_key
```

## 🔮 Future Enhancements
- Course reviews and star ratings
- Certificate generation on course completion
- Admin panel for managing users and courses
- Real-time notifications using WebSockets
- Advanced filtering and search functionality

---

## 📦 Usage

1.  Visit the frontend link above
2.  Register as a Student or Instructor (via OTP email verification)
3.  **Students**: browse categories, enroll in courses, and access lectures
4.  **Instructors**: create and manage courses
5.  Email notifications are automatically sent on registration and purchases

---

## 👨‍💻 Author
**Koushik Mediga**
- 📧 koushikmediga@gmail.com
- 🔗 [LinkedIn](https://www.linkedin.com/in/koushik-mediga-532983247/)
- 🔗 [Portfolio](https://portfolio-website-omega-vert.vercel.app/)

---

## 🤝 Contributing
Contributions are welcome!
Please fork the repository and submit a pull request.
For bug reports or feature suggestions, feel free to open an issue.

---

## 📄 License
This project is licensed under the MIT License.
You are free to use, modify, and distribute it for educational and personal use.
