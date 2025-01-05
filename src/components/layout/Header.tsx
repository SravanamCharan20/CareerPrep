import React, { useState } from 'react';
import { Menu, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavLink } from './NavLink';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Jobs/Internships', href: '/jobs' },
    { label: 'Hackathons', href: '/hackathons' },
    { label: 'Practice', href: '/practice' },
    { label: 'Questions', href: '/questions' },
    { label: 'Projects', href: '/projects' },
    { label: 'Community', href: '/community' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-primary-900 shadow-sm z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center text-primary-900 dark:text-white">
                <User className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">CareerPrep</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
            <ThemeToggle />
            <button className="inline-flex items-center px-4 py-2 border border-primary-600 text-sm font-medium rounded-md text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-300 dark:text-primary-300 dark:hover:bg-primary-300 dark:hover:text-primary-900 transition-colors">
              Login / Sign Up
            </button>
          </nav>

          {/* Mobile menu */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-400 hover:text-primary-500 hover:bg-primary-100 dark:hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-900 dark:text-white hover:bg-primary-100 dark:hover:bg-primary-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button className="w-full mt-2 px-4 py-2 border border-primary-600 text-sm font-medium rounded-md text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-300 dark:text-primary-300 dark:hover:bg-primary-300 dark:hover:text-primary-900 transition-colors">
                Login / Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}