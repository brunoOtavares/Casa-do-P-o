import React from 'react';
import { MapPin, Phone, Clock, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-accent-900 text-white mt-12 overflow-hidden z-10">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 px-4 py-8">
        {/* Logo e Nome */}
        <div className="text-center mb-6">
          <div className="inline-block mb-3">
            <div className="text-5xl animate-bounce">🍞</div>
          </div>
          <h3 className="text-3xl font-display font-black mb-2 drop-shadow-lg">Casa do Pão</h3>
          <p className="text-sm text-primary-100 font-medium">Pães artesanais feitos com ❤️</p>
        </div>

        {/* Informações de Contato */}
        <div className="space-y-3 max-w-sm mx-auto">
          {/* Endereço */}
          <div className="flex items-start gap-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md p-4 rounded-3xl shadow-lg hover:from-white/25 hover:to-white/15 transition-all">
            <div className="bg-secondary-500 p-2 rounded-full">
              <MapPin size={18} className="text-gray-900" />
            </div>
            <div className="text-sm">
              <p className="font-bold mb-1">Endereço</p>
              <p className="text-primary-50">
                Rua Visconde de Seabra, 119, lote 22<br />
                Santa Luzia - São Gonçalo, RJ
              </p>
            </div>
          </div>

          {/* Telefone */}
          <div className="flex items-start gap-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md p-4 rounded-3xl shadow-lg hover:from-white/25 hover:to-white/15 transition-all">
            <div className="bg-secondary-500 p-2 rounded-full">
              <Phone size={18} className="text-gray-900" />
            </div>
            <div className="text-sm">
              <p className="font-bold mb-1">Telefone</p>
              <p className="text-primary-50">(21) 99953-0686</p>
            </div>
          </div>

          {/* Horário */}
          <div className="flex items-start gap-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md p-4 rounded-3xl shadow-lg hover:from-white/25 hover:to-white/15 transition-all">
            <div className="bg-secondary-500 p-2 rounded-full">
              <Clock size={18} className="text-gray-900" />
            </div>
            <div className="text-sm">
              <p className="font-bold mb-1">Horário</p>
              <p className="text-primary-50">
                Seg-Sáb: 06:00 - 20:00<br />
                Dom: 07:00 - 12:00
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md p-4 rounded-3xl shadow-lg hover:from-white/25 hover:to-white/15 transition-all">
            <div className="bg-secondary-500 p-2 rounded-full">
              <Mail size={18} className="text-gray-900" />
            </div>
            <div className="text-sm">
              <p className="font-bold mb-1">Email</p>
              <p className="text-primary-50">Matavaes58@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <p className="text-sm text-primary-100 font-medium flex items-center justify-center gap-2">
            © {new Date().getFullYear()} Casa do Pão. Feito com <Heart size={14} className="text-secondary-400 fill-current animate-pulse" /> em São Gonçalo
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
