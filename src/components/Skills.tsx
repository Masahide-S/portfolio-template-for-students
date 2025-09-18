import React from 'react';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaPython, FaDatabase, FaGithub, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { IconType } from 'react-icons';

// アイコン名とコンポーネントを対応付けるマップ
const iconMap: { [key: string]: IconType } = {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaPython, FaDatabase, FaGithub, FaDocker,
  SiTypescript, SiNextdotjs, SiTailwindcss,
};

// 型定義
type Skill = { name: string; iconName: string; };
type SkillsData = {
  frontend?: Skill[];
  backend?: Skill[];
  others?: Skill[];
};

const Skills: React.FC<{ skills: SkillsData }> = ({ skills = {} }) => {
  // アイコン名から実際のコンポーネントを取得する関数
  const getIcon = (iconName: string) => {
    return iconMap[iconName] ? React.createElement(iconMap[iconName]) : null;
  };

  return (
     <div id="skills" className="py-10">
      <h3 className="subsection-title">Skills</h3>        
      {Object.entries(skills).map(([category, skillList]) => (
          skillList.length > 0 && (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-semibold text-center mb-8 text-text-sub capitalize">{category}</h3>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {skillList.map((skill) => (
                  <div key={skill.name} className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 hover:bg-base hover:scale-105">
                    <div className="text-5xl text-primary">{getIcon(skill.iconName)}</div>
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
  );
};

export default Skills;