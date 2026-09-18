import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    'bot-field': '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [serverMsg, setServerMsg] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.message.trim()) {
      errs.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setServerMsg('');

    try {
      // Netlify form submission handler
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...formData }),
      });

      setStatus('success');
      setServerMsg('Message transmitted successfully. I will get back to you shortly!');
      setFormData({ name: '', email: '', message: '', 'bot-field': '' });
    } catch (err) {
      // If deployed or offline fallback
      setStatus('error');
      setServerMsg('Failed to send transmission. Please try again or reach out directly via email.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setServerMsg('');
  };

  return (
    <div className="rounded-lg bg-[#141414] border border-[#2A2A2A] p-6 sm:p-8">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#2A2A2A]">
        <h3 className="font-['Space_Grotesk',sans-serif] text-lg font-bold text-white">
          Send a Transmission
        </h3>
        <span className="font-mono text-xs text-[#71717A] bg-[#090909] px-2 py-0.5 rounded border border-[#2A2A2A]">
          POST /api/contact
        </span>
      </div>

      {status === 'success' ? (
        <div className="py-8 text-center space-y-4 animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-[#090909] border border-[#E11D2E]/40 text-[#E11D2E] flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="font-['Space_Grotesk',sans-serif] font-bold text-lg text-white">
              Transmission Received
            </p>
            <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-sm mx-auto">
              {serverMsg}
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#090909] border border-[#2A2A2A] text-xs font-mono text-white hover:border-[#E11D2E] transition-colors"
          >
            <span>Send Another Message</span>
          </button>
        </div>
      ) : (
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="space-y-4"
          noValidate
        >
          {/* Hidden fields for Netlify forms */}
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Don't fill this out if you're human:
              <input name="bot-field" value={formData['bot-field']} onChange={handleChange} />
            </label>
          </p>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-xs font-mono text-[#A1A1AA] mb-1.5">
              name <span className="text-[#E11D2E]">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Rivera"
              disabled={status === 'submitting'}
              className={`w-full rounded-md bg-[#090909] border px-3.5 py-2.5 text-sm text-white placeholder-[#52525B] font-sans transition-colors focus:outline-none ${
                errors.name
                  ? 'border-[#E11D2E] focus:ring-1 focus:ring-[#E11D2E]'
                  : 'border-[#2A2A2A] focus:border-[#E11D2E]'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-[#E11D2E] font-mono mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-mono text-[#A1A1AA] mb-1.5">
              email <span className="text-[#E11D2E]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. alex@example.com"
              disabled={status === 'submitting'}
              className={`w-full rounded-md bg-[#090909] border px-3.5 py-2.5 text-sm text-white placeholder-[#52525B] font-sans transition-colors focus:outline-none ${
                errors.email
                  ? 'border-[#E11D2E] focus:ring-1 focus:ring-[#E11D2E]'
                  : 'border-[#2A2A2A] focus:border-[#E11D2E]'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-[#E11D2E] font-mono mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-xs font-mono text-[#A1A1AA] mb-1.5">
              message <span className="text-[#E11D2E]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project, team, or opportunity..."
              disabled={status === 'submitting'}
              className={`w-full rounded-md bg-[#090909] border px-3.5 py-2.5 text-sm text-white placeholder-[#52525B] font-sans transition-colors focus:outline-none resize-none ${
                errors.message
                  ? 'border-[#E11D2E] focus:ring-1 focus:ring-[#E11D2E]'
                  : 'border-[#2A2A2A] focus:border-[#E11D2E]'
              }`}
            />
            {errors.message && (
              <p className="text-xs text-[#E11D2E] font-mono mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* Error notice if server fails */}
          {status === 'error' && (
            <div className="p-3 rounded bg-[#090909] border border-[#E11D2E] text-xs text-[#E11D2E] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#E11D2E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FF3B4D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D2E] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
