FixMyHood 🏙️
A full-stack civic issue reporting app with an integrated AI-powered assistant. Users can report problems in their neighborhood — such as potholes, broken streetlights, or trash dumps — through a simple chat-based interface. Admins or users can review and manage submitted reports.

🚀 Features
💬 AI Assistant Interface: Chat-style form that guides users through issue reporting.

📷 Image Uploads: Attach images with each issue report.

🌗 Dark/Light Mode: Toggle between themes with a single click.

🔐 Authentication (optional): Users must log in to report; only the creator or admin can delete.

🛠️ Admin Dashboard (planned): Moderate and manage reports.

🌐 React + Flask: Frontend built with React, backend powered by Flask + SQLAlchemy.

📁 Project Structure
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


Local AI model

🧪 Local Setup Instructions
1. Clone the repo
git clone https://github.com/ramapriyanv/FixMyHood.git
cd FixMyHood

2. Backend Setup (Python 3.11+)
Install dependencies:

pip install -r requirements.txt

Run Flask backend:

cd backend
python app.py

3. Frontend Setup
cd frontend
npm install
npm run build

Then copy the build:

xcopy /E /I /Y build ..\backend\frontend\build

🧠 AI Assistant
The assistant is currently powered by a local AI model using tools like Ollama or LM Studio. It asks the user structured questions and submits the form data with an optional image upload.
