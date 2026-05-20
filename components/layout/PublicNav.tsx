'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PublicNavbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: 'Features', path: '/features' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              HostelSaathi
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                onClick={() => router.push(link.path)}
              >
                {link.label}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => router.push('/login')}
            >
              Login
            </Button>

            <Button
              onClick={() => router.push('/get-started')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  router.push(link.path);
                  setOpen(false);
                }}
              >
                {link.label}
              </Button>
            ))}

            <div className="pt-2 border-t border-border space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  router.push('/login');
                  setOpen(false);
                }}
              >
                Login
              </Button>

              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => {
                  router.push('/get-started');
                  setOpen(false);
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}