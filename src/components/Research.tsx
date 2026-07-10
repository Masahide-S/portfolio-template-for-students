"use client";

import React from 'react';
import { FaFlask } from 'react-icons/fa';
import CollapsibleCard from './CollapsibleCard';
import type { ResearchItem, TagStyles } from '@/types';

const Research: React.FC<{ researchItems: ResearchItem[], tagStyles: TagStyles }> = ({ researchItems = [], tagStyles }) => {
  return (
    <div id="research" className="py-10">
      <h3 className="subsection-title">Research</h3>
        <div className="max-w-4xl mx-auto space-y-8">
          {researchItems.map((item, index) => (
            <CollapsibleCard key={index} item={item} icon={FaFlask} tagStyles={tagStyles} />
          ))}
        </div>
    </div>
  );
};

export default Research;
