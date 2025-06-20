import React, { createContext, useContext, useState, useEffect } from 'react';

interface VisualSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: 'none' | 'small' | 'medium' | 'large';
  fontFamily: 'inter' | 'roboto' | 'poppins' | 'system';
  buttonStyle: 'default' | 'soft' | 'outline' | 'gradient';
  cardStyle: 'default' | 'glass' | 'bordered' | 'elevated';
  useCustomColors: boolean;
  logo: string;
  banner: string;
}

interface ThemeContextType {
  visualSettings: VisualSettings;
  updateVisualSettings: (settings: Partial<VisualSettings>) => void;
  resetVisualSettings: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const defaultVisualSettings: VisualSettings = {
  primaryColor: '#0066FF',
  secondaryColor: '#4C1D95',
  accentColor: '#10B981',
  borderRadius: 'medium',
  fontFamily: 'inter',
  buttonStyle: 'gradient',
  cardStyle: 'default',
  useCustomColors: false,
  logo: '/placeholder.svg',
  banner: '/placeholder.svg'
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [visualSettings, setVisualSettings] = useState<VisualSettings>(() => {
    // Tenta recuperar as configurações salvas no localStorage
    const savedSettings = localStorage.getItem('visualSettings');
    if (savedSettings) {
      try {
        return JSON.parse(savedSettings);
      } catch (error) {
        console.error('Erro ao carregar configurações visuais:', error);
      }
    }
    return defaultVisualSettings;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    // Aplica o tema
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Aplica as configurações visuais
    if (visualSettings.useCustomColors) {
      document.documentElement.style.setProperty('--primary', visualSettings.primaryColor);
      document.documentElement.style.setProperty('--secondary', visualSettings.secondaryColor);
      document.documentElement.style.setProperty('--accent', visualSettings.accentColor);
    } else {
      document.documentElement.style.removeProperty('--primary');
      document.documentElement.style.removeProperty('--secondary');
      document.documentElement.style.removeProperty('--accent');
    }

    // Aplica o estilo de borda
    document.documentElement.style.setProperty(
      '--radius',
      {
        none: '0px',
        small: '0.25rem',
        medium: '0.5rem',
        large: '1rem'
      }[visualSettings.borderRadius]
    );

    // Aplica a fonte
    document.documentElement.style.setProperty(
      '--font-family',
      {
        inter: 'Inter, sans-serif',
        roboto: 'Roboto, sans-serif',
        poppins: 'Poppins, sans-serif',
        system: 'system-ui, sans-serif'
      }[visualSettings.fontFamily]
    );

    // Salva as configurações no localStorage
    localStorage.setItem('visualSettings', JSON.stringify(visualSettings));
  }, [visualSettings]);

  const updateVisualSettings = (newSettings: Partial<VisualSettings>) => {
    setVisualSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetVisualSettings = () => {
    setVisualSettings(defaultVisualSettings);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ 
      visualSettings, 
      updateVisualSettings, 
      resetVisualSettings,
      theme,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
