import React from 'react';
import { iconMap } from '@/lib/icons';
import type { Skills as SkillsType } from '@/types';

const Skills: React.FC<{ skills: SkillsType }> = ({ skills }) => {
  const getIcon = (iconName: string) => {
    return iconMap[iconName] ? React.createElement(iconMap[iconName]) : null;
  };

  if (!skills || !skills.categories || skills.categories.length === 0) {
    return null;
  }

  return (
    <div id="skills" className="py-10">
      <h3 className="subsection-title">Skills</h3>
      {skills.categories.map((categoryData) => (
        <div key={categoryData.category} className="mb-12">
          <h3 className="text-xl font-semibold text-center mb-8 text-text-sub capitalize">
            {categoryData.category}
          </h3>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {categoryData.items.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 hover:bg-base hover:scale-105"
              >
                <div className="text-5xl text-primary">{getIcon(skill.iconName)}</div>
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
