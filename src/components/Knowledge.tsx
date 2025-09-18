import React from 'react';
import Skills from './Skills';
import Certifications from './Certifications';

// page.tsxから渡されるpropsの型を定義
interface KnowledgeProps {
  skills: any;
  certifications: any;
}

const Knowledge: React.FC<KnowledgeProps> = ({ skills, certifications }) => {
  return (
    <section id="knowledge" className="py-20 bg-surface border-t-2 border-primary/10">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Knowledge</h2>
        <Skills skills={skills} />
        <Certifications certifications={certifications} />
      </div>
    </section>
  );
};

export default Knowledge;