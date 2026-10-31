// src/components/Footer.tsx
import React from 'react';
import { BookOpen, Newspaper, Bell, Sparkles } from 'lucide-react';

interface FooterProps {
  locale?: 'ru' | 'en' | 'es';
}

export const Footer: React.FC<FooterProps> = ({ locale = 'ru' }) => {
  const currentYear = new Date().getFullYear();
  const yearDisplay = currentYear > 2025 ? `2025 - ${currentYear}` : `${currentYear}`;
  const siteBaseUrl = 'https://teacher-alex.com';

  const labels = {
    ru: {
      courses: 'Курсы',
      about: 'О нас',
      contact: 'Контакты',
      account: 'Личный кабинет',
    },
    en: {
      courses: 'Courses',
      about: 'About',
      contact: 'Contact',
      account: 'Student Account',
    },
    es: {
      courses: 'Cursos',
      about: 'Sobre nosotros',
      contact: 'Contacto',
      account: 'Mi Cuenta',
    },
  }[locale];

  return (
    <footer className="py-10 border-t border-[color:var(--color-neutral-300)] bg-[color:var(--color-brand-300)] text-[color:var(--color-neutral-900)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Hub Tools Quick Links Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-neutral-800 pb-4 border-b border-[color:var(--color-neutral-400)]/40">
          <a
            href={`${siteBaseUrl}/smart_reader`}
            className="flex items-center gap-1.5 hover:text-brand-900 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-brand-700" />
            <span>Smart Reader</span>
          </a>
          <a
            href={`${siteBaseUrl}/story_maker`}
            className="flex items-center gap-1.5 hover:text-brand-900 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-brand-700" />
            <span>Story Maker</span>
          </a>
          <a
            href={`${siteBaseUrl}/poke_me_on`}
            className="flex items-center gap-1.5 hover:text-brand-900 transition-colors"
          >
            <Bell className="w-4 h-4 text-brand-700" />
            <span>Poke-Me-On</span>
          </a>
          <a
            href={`${siteBaseUrl}/simply_new`}
            className="flex items-center gap-1.5 hover:text-brand-900 transition-colors"
          >
            <Newspaper className="w-4 h-4 text-brand-700" />
            <span>Simply New</span>
          </a>
        </div>

        {/* Ecosystem Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-800 font-medium">
          <a href={`${siteBaseUrl}/courses`} className="hover:text-brand-900 transition-colors">
            {labels.courses}
          </a>
          <span className="text-neutral-500">•</span>
          <a href={`${siteBaseUrl}/about`} className="hover:text-brand-900 transition-colors">
            {labels.about}
          </a>
          <span className="text-neutral-500">•</span>
          <a href={`${siteBaseUrl}/contact`} className="hover:text-brand-900 transition-colors">
            {labels.contact}
          </a>
          <span className="text-neutral-500">•</span>
          <a href="https://account.teacher-alex.com" className="hover:text-brand-900 transition-colors">
            {labels.account}
          </a>
        </div>

        {/* Standard Copyright Text */}
        <p className="text-center text-xs sm:text-sm text-neutral-900 font-normal">
          © {yearDisplay} Teacher Alex. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
