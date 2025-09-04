import React from 'react';
import { siteConfig } from '@/data/config';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

/**
 * 連絡先情報を表示するセクションコンポーネント
 */
const Contact: React.FC = () => {
  // 設定ファイルから連絡先情報を取得
  const { email, githubId, xId } = siteConfig.contact;

  return (
    <section id="contact" className="py-20 bg-surface border-t-2 border-primary/10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8 text-text-main relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary after:rounded-full">
          Contact
        </h2>
        <p className="max-w-xl mx-auto text-text-sub mb-10">
          お仕事のご相談やご依頼など、お気軽にご連絡ください。
          まずは情報交換からでも大歓迎です。
        </p>
        <div className="flex justify-center items-center gap-8">
          <a href={`https://github.com/${githubId}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/80 transition-all duration-300">
            <FaGithub className="text-2xl" /><span>GitHub</span>
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-3 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/80 transition-all duration-300">
            <FaEnvelope className="text-2xl" /><span>Email</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;