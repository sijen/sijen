import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await fetch('/.netlify/functions/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          alert('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        } else {
          alert('Failed to send. Try email directly.');
        }
      } catch (error) {
        alert('Error sending message.');
      }
    };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-2xl mx-auto h-full flex items-center justify-center p-8"
    >
      <div className="glassXDR w-full max-w-md p-8 rounded-2xl shadow-2xl border border-xdr-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-xdr-info to-xdr-critical bg-clip-text text-transparent mb-2">
            Get In Touch
          </h1>
          <p className="text-xdr-muted">Let's connect about security, web dev, or Leo club initiatives!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-xdr-text mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-xdr-panel/50 border border-xdr-border rounded-xl text-xdr-text placeholder-xdr-muted focus:outline-none focus:border-xdr-info/50 transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-xdr-text mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 bg-xdr-panel/50 border border-xdr-border rounded-xl text-xdr-text placeholder-xdr-muted focus:outline-none focus:border-xdr-info/50 transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-xdr-text mb-2">Message</label>
            <textarea
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-3 bg-xdr-panel/50 border border-xdr-border rounded-xl text-xdr-text placeholder-xdr-muted focus:outline-none focus:border-xdr-info/50 transition-all resize-vertical"
              placeholder="Tell me about your project or collaboration idea..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-xdr-info to-xdr-critical text-white font-semibold py-4 px-6 rounded-xl shadow-control-room hover:shadow-xdr-glow transition-all duration-300 glassXDR-hover"
          >
            Send Message
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-xdr-border text-center">
          <p className="text-xs text-xdr-muted">
            Or reach me at: <br />
            <a href="mailto:sijendangol@gmail.com" className="text-xdr-info hover:underline">sijendangol1@gmail.com</a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

