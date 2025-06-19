from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from config import Config
from models import db, Issue
import os
import requests


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"message": "Token is missing"}), 403
        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            g.user_id = data["user_id"]
            g.is_admin = data["is_admin"]
        except:
            return jsonify({"message": "Invalid token"}), 403
        return f(*args, **kwargs)
    return decorated


app = Flask(
    __name__,
    static_folder="frontend/build",  # where React lives
    static_url_path="/"              # serve it from root
)

app.config.from_object(Config)
db.init_app(app)
CORS(app)

# ---------- API ----------
@app.route("/api/issues", methods=["POST"])
def submit_issue():
    data = request.form
    image = request.files.get("image")
    filename = None

    if image:
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

    issue = Issue(
        title=data.get("title"),
        description=data.get("description"),
        location=data.get("location"),
        image_filename=filename
    )
    db.session.add(issue)
    db.session.commit()
    return jsonify({"message": "Issue submitted successfully!"})


@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

# ---------- FRONTEND ----------
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
    
@app.route("/api/issues", methods=["GET"])
def get_issues():
    issues = Issue.query.order_by(Issue.id.desc()).all()
    data = []
    for i in issues:
        data.append({
            "id": i.id,
            "title": i.title,
            "description": i.description,
            "location": i.location,
            "image_url": f"/uploads/{i.image_filename}" if i.image_filename else None
        })
    return jsonify(data)

@app.route("/api/chat", methods=["POST"])
def local_ai_chat():
    user_input = request.json.get("message")

    prompt = f"""
You're a helpful civic reporting assistant.

Given the user's message, extract and return as much of this information as possible in JSON:
- title (short label of issue)
- location (where the issue is)
- description (detailed explanation)

If anything is missing, just return what you can.

User: "{user_input}"

Response format:
{{
  "title": "...",
  "location": "...",
  "description": "..."
}}
"""

    res = requests.post("http://localhost:11434/api/generate", json={
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    })

    response_text = res.json()["response"]

    try:
        parsed = eval(response_text.strip())
    except:
        return jsonify({"error": "Invalid AI output", "raw": response_text}), 500

    return jsonify(parsed)


# ---------- START ----------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
