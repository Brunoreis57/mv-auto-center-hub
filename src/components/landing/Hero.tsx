import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-mv-blue-50 via-white to-mv-blue-100 dark:from-mv-blue-950 dark:via-gray-900 dark:to-mv-blue-900" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-mv-blue-200 dark:bg-mv-blue-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-mv-blue-300 dark:bg-mv-blue-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-4 pt-20">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-mv-blue-100 dark:bg-mv-blue-900 text-mv-blue-800 dark:text-mv-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span className="whitespace-nowrap">Excelência em Cuidados Automotivos</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-mv-gradient bg-clip-text text-transparent">
              MV Auto Center
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed px-4">
            Cuidamos do seu veículo com a dedicação e qualidade que ele merece.
            <br className="hidden sm:block" />
            Serviços especializados de lavagem, detalhamento e troca de óleo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-mv-gradient hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-3"
            >
              Nossos Serviços
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto border-mv-blue-300 text-mv-blue-700 hover:bg-mv-blue-50 dark:border-mv-blue-700 dark:text-mv-blue-300 dark:hover:bg-mv-blue-900 text-base sm:text-lg px-6 sm:px-8 py-3"
            >
              Agendar Horário
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto px-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-mv-blue-600 dark:text-mv-blue-400">500+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Clientes Satisfeitos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-mv-blue-600 dark:text-mv-blue-400">5</div>
              <div className="text-sm sm:text-base text-muted-foreground">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-mv-blue-600 dark:text-mv-blue-400">98%</div>
              <div className="text-sm sm:text-base text-muted-foreground">Satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
