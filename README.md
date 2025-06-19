# FixMyHood 🏙️

A full-stack civic issue reporting app with an integrated AI-powered assistant. Users can report problems in their neighborhood — such as potholes, broken streetlights, or trash dumps — through a simple chat-based interface.

---

## 🚀 Features

- 💬 **AI Assistant Interface**: Chat-style form that guides users through issue reporting.
- 📷 **Image Uploads**: Attach images with each issue report.
- 🌗 **Dark/Light Mode**: Toggle between themes with a single click.
- 🌐 **React + Flask**: Frontend built with React, backend powered by Flask + SQLite.

---

## 📁 Project Structure

```
FixMyHood/
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── uploads/
│   └── frontend/ (production React build)
├── frontend/
│   ├── src/
│   │   ├── ChatAssistant.js
│   │   ├── ViewReports.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── App.js
│   ├── public/
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

| Frontend        | Backend        | Auth           | Database  | AI Assistant   |
|-----------------|----------------|----------------|-----------|----------------|
| React           | Flask          | JWT (optional) | SQLite    | Local AI model |

---

## 🧪 Local Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/ramapriyanv/FixMyHood.git
cd FixMyHood
```

### 2. Backend Setup (Python 3.11+)

Install dependencies:

```bash
pip install -r requirements.txt
```

Run Flask backend:

```bash
cd backend
python app.py
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run build
```

Then copy the build:

```bash
xcopy /E /I /Y build ..\backend\frontend\build
```

---

## 🧠 AI Assistant

The assistant is currently powered by a **local AI model** using [Ollama](https://ollama.com/). It asks the user structured questions and submits the form data with optional image upload.

---

## 📜 License

MIT License — free to use, modify, and distribute.

