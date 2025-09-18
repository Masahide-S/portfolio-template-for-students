import React from 'react';

type Profile = { name?: string };
type NavItem = { name: string; href: string };
type HeaderData = { navItems?: NavItem[] };

interface FooterProps {
  profile: Profile;
  header: HeaderData;
}

const Footer: React.FC<FooterProps> = ({ profile = {}, header = {} }) => {
  const navItems = header.navItems || [];

  return (
    <footer className="bg-base py-8 border-t-2 border-primary/10">
      <div className="container mx-auto px-6 text-center">
        <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-6">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-text-sub hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </nav>
        <p className="text-text-sub text-sm">
          &copy; {new Date().getFullYear()} {profile.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;