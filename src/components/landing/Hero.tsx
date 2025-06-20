import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Banner Image Background */}
      <div className="absolute inset-0">
        <img 
          src="/assets/banners/banner.jpeg" 
          alt="MV Centro Automotivo - Serviços Automotivos" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay escuro para melhor legibilidade */}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20">
        {/* Text content */}
        <div className="max-w-2xl animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span className="whitespace-nowrap">Excelência em Cuidados Automotivos</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
            MV Centro Automotivo
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
            Cuidamos do seu veículo com a dedicação e qualidade que ele merece.
            Serviços especializados de lavagem, detalhamento e troca de óleo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-white text-black hover:bg-white/90 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-3"
            >
              Nossos Serviços
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto border-white text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8 py-3"
            >
              Agendar Horário
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-md border-t border-white/20 pt-8">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-white/80">Clientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">5</div>
              <div className="text-sm text-white/80">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">98%</div>
              <div className="text-sm text-white/80">Satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
