import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Droplets, 
  Wrench, 
  Sparkles, 
  Shield, 
  Car, 
  Zap,
  Eye,
  Diamond
} from 'lucide-react';

export const Services: React.FC = () => {
  const washServices = [
    {
      title: "Lavagem Premium",
      description: "Lavagem externa e interna completa com produtos premium",
      icon: Sparkles,
      price: "A partir de R$ 30",
      features: ["Lavagem externa", "Aspiração interna", "Limpeza de vidros", "Pneus brilhosos"]
    },
    {
      title: "Lavação Técnica e Detalhamento",
      description: "Processo técnico profissional de limpeza e detalhamento",
      icon: Eye,
      price: "A partir de R$ 80",
      features: ["Descontaminação", "Clay bar", "Polimento suave", "Proteção UV"]
    },
    {
      title: "Higienização + Hidratação + Limpeza de Couro",
      description: "Tratamento completo para interior em couro",
      icon: Shield,
      price: "A partir de R$ 120",
      features: ["Higienização profunda", "Hidratação do couro", "Proteção UV", "Condicionamento"]
    },
    {
      title: "Vitrificação de Pintura + Espelhamento",
      description: "Proteção duradoura com acabamento espelhado",
      icon: Diamond,
      price: "A partir de R$ 200",
      features: ["Preparação da tinta", "Vitrificação", "Espelhamento", "Garantia de 1 ano"]
    },
    {
      title: "Enceramento e Aplicação de Cera",
      description: "Proteção e brilho com ceras premium",
      icon: Zap,
      price: "A partir de R$ 60",
      features: ["Limpeza prévia", "Aplicação de cera", "Polimento final", "Brilho duradouro"]
    },
    {
      title: "Polimento Técnico",
      description: "Correção de pintura e polimento profissional",
      icon: Car,
      price: "A partir de R$ 150",
      features: ["Análise da tinta", "Correção de riscos", "Polimento", "Refino"]
    },
    {
      title: "Cristalização de Vidros",
      description: "Proteção avançada para vidros com efeito cristal",
      icon: Droplets,
      price: "A partir de R$ 80",
      features: ["Limpeza especializada", "Aplicação do cristalizador", "Repelência à água", "Maior visibilidade"]
    }
  ];

  const oilServices = [
    {
      title: "Troca de Óleo Convencional",
      description: "Troca completa de óleo com filtro",
      icon: Wrench,
      price: "A partir de R$ 120",
      features: ["Óleo convencional", "Filtro de óleo", "Verificação de níveis", "Descarte ecológico"]
    },
    {
      title: "Troca de Óleo Sintético",
      description: "Óleo sintético premium para máxima proteção",
      icon: Wrench,
      price: "A partir de R$ 200",
      features: ["Óleo sintético", "Filtro premium", "Aditivos", "Maior durabilidade"]
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-20 bg-muted/50 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-4 bg-mv-blue-100 text-mv-blue-800 hover:bg-mv-blue-200 dark:bg-mv-blue-900 dark:text-mv-blue-200">
            Nossos Serviços
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Serviços <span className="bg-mv-gradient bg-clip-text text-transparent">Especializados</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Oferecemos uma gama completa de serviços para manter seu veículo sempre impecável
          </p>
        </div>

        {/* Lavagem Services */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center flex items-center justify-center gap-3">
            <Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-mv-blue-600" />
            Serviços de Lavagem
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {washServices.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-mv-blue-100 dark:border-mv-blue-800">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <service.icon className="h-8 w-8 sm:h-10 sm:w-10 text-mv-blue-600 dark:text-mv-blue-400 group-hover:scale-110 transition-transform" />
                    <Badge variant="secondary" className="bg-mv-blue-100 text-mv-blue-800 dark:bg-mv-blue-900 dark:text-mv-blue-200 text-sm whitespace-nowrap">
                      {service.price}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg sm:text-xl group-hover:text-mv-blue-600 transition-colors mt-2">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-mv-blue-500 rounded-full mr-3 flex-shrink-0" />
                        <span className="flex-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Oil Change Services */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center flex items-center justify-center gap-3">
            <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-mv-blue-600" />
            Troca de Óleo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {oilServices.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-mv-blue-100 dark:border-mv-blue-800">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <service.icon className="h-8 w-8 sm:h-10 sm:w-10 text-mv-blue-600 dark:text-mv-blue-400 group-hover:scale-110 transition-transform" />
                    <Badge variant="secondary" className="bg-mv-blue-100 text-mv-blue-800 dark:bg-mv-blue-900 dark:text-mv-blue-200 text-sm whitespace-nowrap">
                      {service.price}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg sm:text-xl group-hover:text-mv-blue-600 transition-colors mt-2">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-mv-blue-500 rounded-full mr-3 flex-shrink-0" />
                        <span className="flex-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
