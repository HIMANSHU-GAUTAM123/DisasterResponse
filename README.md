# DisasterResponse

A full-stack web application for reporting, tracking, and responding to disasters in real-time. This project includes both a backend (Node.js/Express) and a frontend (React), and leverages modern technologies for geolocation, social media integration, and real-time updates.

---

## 🚀 Features
- **Disaster Reporting:** Users can report new disasters with details like title, description, location, and tags.
- **Disaster Feed:** Browse a list of reported disasters with details and locations.
- **Resource Management:** Find and manage resources available for disaster response.
- **Social Media Feed:** Aggregates and displays disaster-related social media posts in a modern, card-based UI.
- **Geocoding:** Automatic extraction and geocoding of locations from disaster descriptions.
- **Image Verification:** Verify the authenticity of disaster images.
- **Real-Time Updates:** Uses WebSockets for live updates to the disaster and social feeds.
- **User Roles:** Basic role-based access for admin and regular users.

---

## 🛠️ Technologies Used
- **Frontend:** React, Material UI, Socket.IO-client
- **Backend:** Node.js, Express, Socket.IO, Supabase (for database and authentication), dotenv
- **APIs & Services:** Supabase, Google Maps/Geocoding (optional), Social Media APIs (mocked)
- **Deployment:**
  - Backend: [Render](https://render.com/)
  - Frontend: [Vercel](https://vercel.com/)
- **Development Tools:** Cursor (AI-powered code editor)

---

## 🖥️ How to Run Locally

### 1. **Clone the Repository**
```bash
git clone https://github.com/HIMANSHU-GAUTAM123/DisasterResponse.git
cd DisasterResponse
```

### 2. **Backend Setup**
```bash
cd backend
npm install
# Create a .env file with your Supabase credentials:
# SUPABASE_URL=your_supabase_url
# SUPABASE_KEY=your_supabase_key
npm start
```

### 3. **Frontend Setup**
```bash
cd ../frontend
npm install
# (Optional) Create a .env file for API URL:
# REACT_APP_API_URL=http://localhost:5000/api
npm start
```

- The frontend will run on [http://localhost:3000](http://localhost:3000)
- The backend will run on [http://localhost:5000](http://localhost:5000)

---

## 🌐 Deployment
- **Backend:** Deploy to Render. Set environment variables (`SUPABASE_URL`, `SUPABASE_KEY`). Build command: `npm install`.
- **Frontend:** Deploy to Vercel. Set root directory to `frontend`, build command to `npm run build`, and output directory to `build`. Set `REACT_APP_API_URL` to your backend's Render URL.

---

## ✨ About Development with Cursor
This project was developed using [Cursor](https://www.cursor.so/), an AI-powered code editor. Cursor's AI assistant helped:
- Refactor and improve code structure
- Generate and update UI components quickly
- Debug and resolve deployment issues
- Write and update documentation
- Accelerate the overall development process

Cursor made it easy to iterate on features, fix bugs, and maintain best practices throughout the project.

---

## 📋 License
MIT 