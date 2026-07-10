"use client";

import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import CollapsibleCard from './CollapsibleCard';
import type { Award, TagStyles } from '@/types';

const Awards: React.FC<{ awardItems: Award[], tagStyles: TagStyles }> = ({ awardItems = [], tagStyles }) => {
  return (
    <section id="awards" className="py-20 bg-surface border-t-2 border-primary/10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-main relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary after:rounded-full">
        Awards
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {awardItems.map((item, index) => (
            <CollapsibleCard key={index} item={item} icon={FaTrophy} tagStyles={tagStyles} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;