
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CalendarDays, User, Home } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Events', path: '/events', icon: <CalendarDays className="h-4 w-4" /> },
    { name: 'Profile', path: '/profile', icon: <User className="h-4 w-4" /> },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="font-medium text-lg tracking-tight animate-fade-in"
        >
          expo
        </Link>
        
        <nav className="hidden md:flex space-x-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                'hover:bg-secondary flex items-center gap-1.5',
                'animate-fade-in',
                isActive(link.path) && 'bg-secondary',
              )}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white/95 backdrop-blur-lg border-t">
          <div className="flex justify-around py-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex flex-col items-center justify-center px-3 py-1.5 rounded-lg',
                  'transition-all duration-300',
                  isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.icon}
                <span className="text-xs mt-0.5">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
