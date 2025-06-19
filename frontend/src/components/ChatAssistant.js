import React, { useState } from 'react';
import axios from 'axios';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Tell me about the issue you'd like to report." }
  ]);
  const [inputText, setInputText] = useState("");
  const [formData, setFormData] = useState({ title: "", location: "", description: "" });
  const [image, setImage] = useState(null);
  const [botTyping, setBotTyping] = useState(false);
  const [awaitingImage, setAwaitingImage] = useState(false);

  const handleUserInput = async (e) => {
    e.preventDefault();
    const userMessage = { from: "user", text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setBotTyping(true);

    try {
      const res = await axios.post("/api/chat", { message: userMessage.text });
      const { title, location, description } = res.data;

      const updatedFormData = {
        title: title || formData.title,
        location: location || formData.location,
        description: description || formData.description
      };
      setFormData(updatedFormData);

      const missing = [];
      if (!updatedFormData.title) missing.push("title");
      if (!updatedFormData.location) missing.push("location");
      if (!updatedFormData.description) missing.push("description");

      if (missing.length > 0) {
        setMessages(prev => [
          ...prev,
          { from: "bot", text: `Please also provide: ${missing.join(", ")}` }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            from: "bot",
            text: `Thanks! I've extracted the following:\n\n📝 Title: ${updatedFormData.title}\n📍 Location: ${updatedFormData.location}\n📄 Description: ${updatedFormData.description}\n\nPlease upload an image if available and click Submit to finalize.`
          }
        ]);
        setAwaitingImage(true);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { from: "bot", text: "⚠️ Something went wrong." }]);
    } finally {
      setBotTyping(false);
    }
  };

  const handleSubmitFinal = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("description", formData.description);
    if (image) data.append("image", image);

    try {
      await axios.post("/api/issues", data);
      setMessages(prev => [...prev, { from: "bot", text: "✅ Issue submitted successfully!" }]);
    } catch {
      setMessages(prev => [...prev, { from: "bot", text: "❌ Submission failed." }]);
    }

    setAwaitingImage(false);
    setFormData({ title: "", location: "", description: "" });
    setImage(null);
  };

  return (
    <div className="mt-3">
      <div className="border rounded p-3 mb-3" style={{ maxHeight: 400, overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.from === "user" ? "text-end" : "text-start"}`}>
            <span className={`badge bg-${msg.from === "user" ? "primary" : "secondary"}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {botTyping && (
          <div className="text-start mb-2">
            <span className="badge bg-secondary">🤖 Bot is typing...</span>
          </div>
        )}
      </div>

      {!awaitingImage && (
        <form onSubmit={handleUserInput}>
          <input
            className="form-control"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit" className="btn btn-success mt-2">Send</button>
        </form>
      )}

      {awaitingImage && (
        <div>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button onClick={handleSubmitFinal} className="btn btn-primary mt-2">Submit Issue</button>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
