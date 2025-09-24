"use client";

import React from 'react';
import { tagStyles } from '@/data/tagStyles';

// サイトの全コンポーネントをインポート
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Knowledge from '@/components/Knowledge';
import Timeline from '@/components/Timeline';
import Awards from '@/components/Awards';
import Creations from '@/components/Creations';
import Connect from '@/components/Connect';
import Footer from '@/components/Footer';

const Preview: React.FC<{ content: any }> = ({ content }) => {
  const { 
    header, profile, contact, skills, certifications, 
    timeline, awards, research, products 
  } = content || {};

  if (!content) {
    return <div className="p-4">Loading Preview...</div>;
  }

  return (
    <div className="w-full h-full bg-white transform">
      <div className="overflow-y-auto h-full text-base">
        <Header navItems={header?.navItems || []} />
        <main>
          <Hero profile={profile || {}} contact={contact || {}} />
          <Knowledge skills={skills || {}} certifications={certifications?.items || []} />
          <Timeline 
            timeline={timeline || []} 
            profile={profile || {}} 
            tagStyles={tagStyles} 
          />
          <Awards 
            awardItems={awards || []} 
            tagStyles={tagStyles} 
          />
          <Creations 
            researchItems={research || []} 
            products={products || []} 
            tagStyles={tagStyles} 
          />
          <Connect contact={contact || {}} />
        </main>
        <Footer profile={profile || {}} header={header || {}} />
      </div>
    </div>
  );
};

export default Preview;