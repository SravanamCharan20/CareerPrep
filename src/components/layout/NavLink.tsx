import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      to={href}
      className="text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-100 px-3 py-2 text-sm font-medium transition-colors duration-200"
    >
      {children}
    </Link>
  );
}