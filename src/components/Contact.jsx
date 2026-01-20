import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: "", error: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ success: "", error: "" });

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setStatus({ success: "Message sent successfully!", error: "" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({ success: "", error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Me</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status.success && (
            <p className="text-green-600 text-center">{status.success}</p>
          )}
          {status.error && (
            <p className="text-red-600 text-center">{status.error}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
