"use client";

import React, { useState } from 'react';
import { FaGithub, FaPaperPlane, FaEnvelope } from 'react-icons/fa';

// 型定義
type ContactData = {
  githubId?: string;
  email?: string;
  formspreeEndpoint?: string;
};

const Contact: React.FC<{ contact: ContactData }> = ({ contact = {} }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(contact.formspreeEndpoint || '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('メッセージが送信されました！ありがとうございます。');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('メッセージの送信に失敗しました。');
      }
    } catch (error) {
      console.error('送信エラー:', error);
      alert('メッセージの送信中にエラーが発生しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="py-10 w-full">
      <h3 className="subsection-title">Contact</h3>
      <div className="text-center">
        <p className="max-w-xl mx-auto text-text-sub mb-10">
          お仕事のご相談やご依頼など、お気軽にご連絡ください。
        </p>

        {/* --- メールフォーム --- */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4 text-left">
            <label htmlFor="name" className="block text-text-sub font-semibold mb-2">お名前</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-base border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-4 text-left">
            <label htmlFor="email" className="block text-text-sub font-semibold mb-2">メールアドレス</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-base border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-6 text-left">
            <label htmlFor="message" className="block text-text-sub font-semibold mb-2">メッセージ</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-base border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane className="text-xl" />
            <span>{isSubmitting ? '送信中...' : 'メッセージを送信'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;