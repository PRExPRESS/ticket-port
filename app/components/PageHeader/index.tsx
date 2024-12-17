import { useTheme } from 'next-themes';
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    const {theme} = useTheme();
  return (
    <div className={`text-center mb-8 px-[10%] py-[75px] 
      ${theme === 'dark' ? "bg-[url('/imgs/dark-banner.jpg')]" : "bg-[url('/imgs/banner.jpg')]"} 
      bg-cover bg-center bg-no-repeat`}>
      <h1 className="text-3xl font-bold text-primary dark:text-text-dark font-playfair">{title}</h1>
      {subtitle && <p className="text-muted-gray mt-2">{subtitle}</p>}
    </div>
  );
};

export default Header;
