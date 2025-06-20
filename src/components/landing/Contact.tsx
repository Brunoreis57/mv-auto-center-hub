
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Instagram
} from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Entre em <span className="bg-mv-gradient bg-clip-text text-transparent">Contato</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos aqui para cuidar do seu veículo. Entre em contato conosco!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-mv-blue-100 dark:border-mv-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-mv-blue-700 dark:text-mv-blue-300">
                  <MapPin className="h-6 w-6" />
                  Endereço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Rua das Oficinas, 123<br />
                  Centro Automotivo<br />
                  São Paulo, SP - CEP: 01234-567
                </p>
              </CardContent>
            </Card>

            <Card className="border-mv-blue-100 dark:border-mv-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-mv-blue-700 dark:text-mv-blue-300">
                  <Phone className="h-6 w-6" />
                  Telefone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  (11) 99999-9999<br />
                  (11) 3333-3333
                </p>
              </CardContent>
            </Card>

            <Card className="border-mv-blue-100 dark:border-mv-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-mv-blue-700 dark:text-mv-blue-300">
                  <Mail className="h-6 w-6" />
                  E-mail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  contato@mvautocenter.com.br<br />
                  agendamento@mvautocenter.com.br
                </p>
              </CardContent>
            </Card>

            <Card className="border-mv-blue-100 dark:border-mv-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-mv-blue-700 dark:text-mv-blue-300">
                  <Clock className="h-6 w-6" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Segunda a Sexta:</span>
                    <span>8h às 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados:</span>
                    <span>8h às 16h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingos:</span>
                    <span>Fechado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map and Social Media */}
          <div className="space-y-6">
            {/* Mock Map */}
            <Card className="border-mv-blue-100 dark:border-mv-blue-800">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-mv-blue-100 to-mv-blue-200 dark:from-mv-blue-900 dark:to-mv-blue-800 flex items-center justify-center">
                  <div className="text-center text-mv-blue-700 dark:text-mv-blue-300">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p className="font-semibold">Localização no Mapa</p>
                    <p className="text-sm opacity-75">Clique para abrir no Google Maps</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-mv-blue-100 dark:border-mv-blue-800">
              <CardHeader>
                <CardTitle className="text-mv-blue-700 dark:text-mv-blue-300">
                  Redes Sociais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 border-mv-blue-200 hover:bg-mv-blue-50 dark:border-mv-blue-700 dark:hover:bg-mv-blue-900"
                  >
                    <Facebook className="h-5 w-5 mr-2 text-blue-600" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 border-mv-blue-200 hover:bg-mv-blue-50 dark:border-mv-blue-700 dark:hover:bg-mv-blue-900"
                  >
                    <Instagram className="h-5 w-5 mr-2 text-pink-600" />
                    Instagram
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Siga-nos para ver nossos trabalhos e promoções!
                </p>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-mv-gradient text-white border-0">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Pronto para agendar?</h3>
                <p className="mb-4 opacity-90">
                  Entre em contato conosco e agende seu horário!
                </p>
                <Button variant="secondary" size="lg" className="bg-white text-mv-blue-700 hover:bg-gray-100">
                  Agendar Agora
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
