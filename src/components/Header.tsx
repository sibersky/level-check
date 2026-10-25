// src/components/Header.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { FlagIcon } from './FlagIcon';

export interface HeaderProps {
  currentLocale: 'ru' | 'en' | 'es';
  onLocaleChange: (locale: 'ru' | 'en' | 'es') => void;
  isLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocale = 'en',
  onLocaleChange,
  isLoggedIn = false,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const accountUrlBase = 'https://account.teacher-alex.com';
  const siteBaseUrl = 'https://teacher-alex.com';

  const languages = [
    { code: 'ru' as const, name: 'Русский' },
    { code: 'en' as const, name: 'English' },
    { code: 'es' as const, name: 'Español' },
  ];

  const currentLangObj = languages.find((l) => l.code === currentLocale) || languages[1];

  const authLabels = {
    ru: { courses: 'Курсы', about: 'О нас', contact: 'Контакты', login: 'Войти', signUp: 'Регистрация', profile: 'Кабинет' },
    es: { courses: 'Cursos', about: 'Sobre nosotros', contact: 'Contacto', login: 'Iniciar sesión', signUp: 'Registrarse', profile: 'Perfil' },
    en: { courses: 'Courses', about: 'About', contact: 'Contact', login: 'Login', signUp: 'Sign Up', profile: 'Account' },
  }[currentLocale];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const linkStyle =
    'text-sm font-medium text-neutral-900 hover:text-brand-900 transition-colors';

  return (
    <nav className="bg-[color:var(--color-brand-300)] border-b border-[color:var(--color-neutral-300)] shadow-xs sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section: Logo + Divider + Tool Name + Nav Links */}
          <div className="flex items-center space-x-4 md:space-x-6 h-full">
            <a
              href={siteBaseUrl}
              className="flex items-center shrink-0 h-full py-2 group focus:outline-hidden"
              aria-label="Teacher Alex Homepage"
            >
              <img
                src="/assets/logo.png"
                alt="Teacher Alex"
                className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  // Fallback stylish monogram if image fails to render
                  (e.currentTarget as HTMLElement).style.display = 'none';
                  const fb = document.getElementById('header-logo-fallback');
                  if (fb) fb.style.display = 'flex';
                }}
              />
              <div
                id="header-logo-fallback"
                className="hidden w-9 h-9 rounded-xl bg-brand-900 text-white font-black items-center justify-center text-lg"
              >
                A
              </div>
            </a>

            {/* Tool Name Badge */}
            <span className="text-neutral-800 hidden md:inline font-light select-none">/</span>
            <span className="text-sm font-bold text-neutral-900 hidden md:inline tracking-tight">
              Level Check
            </span>

            {/* Main Nav Links (separated by border-l matching Teacher Alex standard) */}
            <div className="hidden md:flex items-center space-x-5 pl-6 ml-6 border-l border-[color:var(--color-neutral-400)]/60">
              <a href={`${siteBaseUrl}/courses`} className={linkStyle}>
                {authLabels.courses}
              </a>
              <a href={`${siteBaseUrl}/about`} className={linkStyle}>
                {authLabels.about}
              </a>
              <a href={`${siteBaseUrl}/contact`} className={linkStyle}>
                {authLabels.contact}
              </a>
            </div>
          </div>

          {/* Right Section: Language Switcher + Auth Buttons */}
          <div className="flex items-center space-x-3.5">
            {/* Language Switcher Dropdown (matching exact style in screenshot) */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-2 bg-brand-900/90 hover:bg-brand-950 text-white border border-brand-800 py-1.5 px-3 rounded-lg shadow-2xs focus:outline-hidden transition-colors cursor-pointer text-xs font-semibold"
                aria-label="Select Language"
              >
                <FlagIcon country={currentLangObj.code} size="sm" />
                <span className="hidden sm:inline text-xs font-bold">{currentLangObj.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-brand-200" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 origin-top-right z-50 animate-in fade-in duration-150">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        onLocaleChange(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left flex items-center px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                        currentLocale === lang.code
                          ? 'bg-brand-50 text-brand-900 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <FlagIcon country={lang.code} size="sm" className="mr-2" />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Auth Links */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <a href={`${accountUrlBase}/settings/profile`} className={linkStyle}>
                    {authLabels.profile}
                  </a>
                  <a href={`${accountUrlBase}/auth/logout`} className={linkStyle}>
                    Выйти
                  </a>
                </>
              ) : (
                <>
                  <a href={`${accountUrlBase}/auth/login`} className={linkStyle}>
                    {authLabels.login}
                  </a>
                  <a
                    href={`${accountUrlBase}/auth/register`}
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-xs hover:shadow-sm transition-all"
                  >
                    {authLabels.signUp}
                  </a>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 rounded-lg text-neutral-900 hover:bg-brand-200 transition-colors focus:outline-hidden cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[color:var(--color-neutral-400)]/60 space-y-2 animate-in fade-in">
            <a
              href={`${siteBaseUrl}/courses`}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-900 hover:bg-brand-200"
            >
              {authLabels.courses}
            </a>
            <a
              href={`${siteBaseUrl}/about`}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-900 hover:bg-brand-200"
            >
              {authLabels.about}
            </a>
            <a
              href={`${siteBaseUrl}/contact`}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-900 hover:bg-brand-200"
            >
              {authLabels.contact}
            </a>

            <div className="pt-3 border-t border-[color:var(--color-neutral-400)]/60 flex items-center gap-3">
              <a
                href={`${accountUrlBase}/auth/login`}
                className="flex-1 py-2 text-center text-xs font-semibold text-neutral-900 bg-brand-200 hover:bg-brand-100 rounded-lg"
              >
                {authLabels.login}
              </a>
              <a
                href={`${accountUrlBase}/auth/register`}
                className="flex-1 py-2 text-center text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-2xs"
              >
                {authLabels.signUp}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
