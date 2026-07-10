"use client";

import React from 'react';
import { tagStyles } from '@/data/tagStyles';
import type { SiteData } from '@/types';

// サイトの全コンポーネントをインポート
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Knowledge from '@/components/Knowledge';
import Timeline from '@/components/Timeline';
import Awards from '@/components/Awards';
import Creations from '@/components/Creations';
import Connect from '@/components/Connect';
import Footer from '@/components/Footer';

interface PreviewProps {
  content: Partial<SiteData> | null;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
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
          <Hero profile={profile || {} as never} contact={contact || {} as never} />
          <Knowledge
            skills={skills || { categories: [] }}
            certifications={certifications?.items || []}
          />
          <Timeline
            timeline={timeline || []}
            profile={profile || {} as never}
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
          <Connect contact={contact || {} as never} />
        </main>
        <Footer profile={profile || {} as never} header={header || {} as never} />
      </div>
    </div>
  );
};

export default Preview;