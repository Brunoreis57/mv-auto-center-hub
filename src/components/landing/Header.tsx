import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useState } from 'react';

interface HeaderProps {
  onLoginClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="w-full max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/assets/logos/logo.png.png" 
              alt="MV Centro Automotivo Logo" 
              className="h-8 w-auto"
            />
            <h1 className="text-lg font-bold bg-mv-gradient bg-clip-text text-transparent">
              MV Centro Automotivo
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <a href="#services" className="text-muted-foreground hover:text-mv-blue-600 transition-colors">
              Serviços
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-mv-blue-600 transition-colors">
              Contato
            </a>
            <ThemeToggle />
            <Button 
              onClick={onLoginClick}
              className="bg-mv-gradient hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Login Funcionários
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-3 pb-3 border-t border-border pt-3 flex flex-col gap-3">
            <a 
              href="#services" 
              className="text-muted-foreground hover:text-mv-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </a>
            <a 
              href="#contact" 
              className="text-muted-foreground hover:text-mv-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
            <Button 
              onClick={() => {
                onLoginClick();
                setIsMenuOpen(false);
              }}
              className="w-full bg-mv-gradient hover:opacity-90 transition-opacity"
            >
              Login Funcionários
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};
