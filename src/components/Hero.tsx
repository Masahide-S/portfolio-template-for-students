"use client";

import React from 'react';
import { FaGithub, FaEnvelope } from 'react-icons/fa6';
import Image from 'next/image';

// 型定義
type Profile = {
  name?: string;
  catchphrase?: string;
  birthDate?: string; // 文字列として受け取る
  university?: {
    name?: string;
    faculty?: string;
    entranceYear?: number;
  };
  profileImage?: string;
  mainVisual?: string;
  aboutMe?: string;
};
type Contact = {
  email?: string;
  githubId?: string;
};

const Hero: React.FC<{ profile: Profile, contact: Contact }> = ({ profile = {}, contact = {} }) => {
  // 年齢や学年の計算ロジックはpropsを元に行う
  let age = 0;
  if (profile.birthDate) {
    const birthDateObj = new Date(profile.birthDate);
    const today = new Date();
    age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
  }

  let affiliationText = "";
  if (profile.university?.entranceYear) {
    const today = new Date();
    let grade = today.getFullYear() - profile.university.entranceYear + 1;
    if (today.getMonth() < 3) { grade--; }
    if (grade > 4) {
      affiliationText = `${profile.university.name} ${profile.university.faculty} 卒業`;
    } else if (grade > 0) {
      affiliationText = `${profile.university.name} ${profile.university.faculty} ${grade}年`;
    }
  }

  return (
    <section id="about">
      <div 
        className="w-full h-[40vh] md:h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url('${profile.mainVisual || ''}')` }}
      ></div>
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-main relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary after:rounded-full">Profile</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="flex-shrink-0">
            <Image 
              src={profile.profileImage || '/default-profile.png'}
              alt="プロフィール画像"
              width={240}
              height={240}
              className="w-48 h-48 md:w-60 md:h-60 rounded-full shadow-lg"
              priority
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold">{profile.name}</h1>
            <p className="text-lg text-primary font-semibold mt-2">{profile.catchphrase}</p>
            <div className="flex justify-center md:justify-start gap-6 mt-6 text-text-sub">
              <div><span className="font-bold text-text-main">Age: </span>{age || 'N/A'}</div>
              <div><span className="font-bold text-text-main">Affiliation: </span>{affiliationText || 'N/A'}</div>
            </div>
            <p className="max-w-xl mt-6 leading-relaxed text-text-sub whitespace-pre-line">{profile.aboutMe}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;