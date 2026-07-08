import React from 'react';
import GitHubActivity from './GitHubActivity';
import Contact from './Contact';
import type { Contact as ContactType } from '@/types';

interface ConnectProps {
  contact: ContactType;
}

const Connect: React.FC<ConnectProps> = ({ contact }) => {
  return (
    <section id="connect" className="py-20 bg-surface border-t-2 border-primary/10">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Connect</h2>
        {/* 👇 子コンポーネントを並べるだけにする */}
        <GitHubActivity contact={contact} />
        <Contact contact={contact} />
      </div>
    </section>
  );
};

export default Connect;