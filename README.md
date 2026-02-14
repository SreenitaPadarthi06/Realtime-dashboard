# Real-Time Dashboard 🚀

A production-ready real-time dashboard built using:

- React (Vite)
- WebSocket (Node.js + ws)
- Recharts (Live chart visualization)
- Docker (Containerized setup)

---

## 🔥 Features

- Real-time metric updates every 3 seconds
- Notification system
- Auto WebSocket reconnection
- Live updating chart
- Dockerized frontend & backend
- Production-ready Nginx build

---

## 🐳 Run with Docker

Make sure Docker is installed.

```bash
docker compose up --build
```
Open in your browser:

http://localhost:3000

---

## 🛠 Tech Stack

Frontend:
- React
- Zustand
- Recharts

Backend:
- Node.js
- ws (WebSocket)

DevOps:
- Docker
- Docker Compose

---

## 📂 Project Structure

```
realtime-dashboard/
│
├── backend/
│   ├── mock-server.js
│   ├── Dockerfile
│   └── package.json
│
├── src/
│   ├── components/
│   ├── store/
│   └── App.jsx
│
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 👨‍💻 Author

Your Name
