import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary-800 to-primary-900 text-white mt-12">
      <div className="px-4 py-8">
        {/* Logo e Nome */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-display font-black mb-2">Casa do Pão</h3>
          <p className="text-primary-200 text-sm">Pães artesanais fresquinhos</p>
        </div>

        {/* Info Compacta */}
        <div className="space-y-3 max-w-sm mx-auto">
          <div className="flex items-start gap-3 bg-white bg-opacity-10 p-3 rounded-2xl">
            <MapPin size={18} className="text-secondary-400 mt-0.5 flex-shrink-0" />
            <span className="text-sm">Rua das Flores, 123 - Centro, SP</span>
          </div>

          <div className="flex items-start gap-3 bg-white bg-opacity-10 p-3 rounded-2xl">
            <Phone size={18} className="text-secondary-400 mt-0.5 flex-shrink-0" />
            <span className="text-sm">(11) 9 9999-9999</span>
          </div>

          <div className="flex items-start gap-3 bg-white bg-opacity-10 p-3 rounded-2xl">
            <Clock size={18} className="text-secondary-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <div>Seg-Sex: 06:00 - 20:00</div>
              <div>Sáb-Dom: 07:00 - 18:00</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-6 border-t border-primary-700">
          <p className="text-xs text-primary-300">
            © {new Date().getFullYear()} Casa do Pão
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
