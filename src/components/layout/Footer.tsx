import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { id: 'facebook', icon: Facebook, href: 'https://facebook.com' },
    { id: 'twitter', icon: Twitter, href: 'https://twitter.com' },
    { id: 'linkedin', icon: Linkedin, href: 'https://linkedin.com' },
    { id: 'instagram', icon: Instagram, href: 'https://instagram.com' },
  ];

  const footerLinks = [
    { id: 'about', label: 'About Us', href: '/about' },
    { id: 'privacy', label: 'Privacy Policy', href: '/privacy' },
    { id: 'terms', label: 'Terms of Service', href: '/terms' },
    { id: 'contact', label: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center text-2xl font-bold mb-4">
              CareerPrep
            </div>
            <p className="text-gray-400 max-w-md">
              Empowering students and job seekers with the tools and resources they need to succeed in their careers.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ id, icon: Icon, href }) => (
                <a
                  key={id}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CareerPrep. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}