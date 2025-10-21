import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui você pode integrar com um serviço de email ou Firebase
    console.log('Form submitted:', formData);

    // Enviar via WhatsApp
    const message = `Olá! Meu nome é ${formData.name}.\n\nEmail: ${formData.email}\nTelefone: ${formData.phone}\n\nMensagem: ${formData.message}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Hero Section - Mobile First */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white px-4 py-12">
        <h1 className="text-3xl font-display font-black mb-2">
          Entre em Contato
        </h1>
        <p className="text-sm text-primary-100">
          Estamos aqui para atendê-lo!
        </p>
      </section>

      {/* Conteúdo - Mobile First */}
      <div className="px-4 py-6 space-y-6">
        {/* Informações de Contato */}
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-black text-gray-900 mb-4">
            Nossas Informações
          </h2>

          {/* Endereço */}
          <div className="flex items-start gap-3 bg-white p-4 rounded-3xl shadow-md">
            <div className="bg-primary-100 p-2.5 rounded-full flex-shrink-0">
              <MapPin size={20} className="text-primary-600" />
            </div>
            <div>
              <h3 className="font-bold text-base mb-1">Endereço</h3>
              <p className="text-gray-600 text-sm">
                Rua das Flores, 123<br />
                Centro - São Paulo, SP<br />
                CEP: 01234-567
              </p>
            </div>
          </div>

          {/* Telefone */}
          <div className="flex items-start gap-3 bg-white p-4 rounded-3xl shadow-md">
            <div className="bg-secondary-100 p-2.5 rounded-full flex-shrink-0">
              <Phone size={20} className="text-primary-600" />
            </div>
            <div>
              <h3 className="font-bold text-base mb-1">Telefone</h3>
              <p className="text-gray-600 text-sm">
                (11) 9 9999-9999<br />
                (11) 3333-3333
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3 bg-white p-4 rounded-3xl shadow-md">
            <div className="bg-accent-100 p-2.5 rounded-full flex-shrink-0">
              <Mail size={20} className="text-primary-600" />
            </div>
            <div>
              <h3 className="font-bold text-base mb-1">Email</h3>
              <p className="text-gray-600 text-sm">
                contato@casadopao.com.br<br />
                vendas@casadopao.com.br
              </p>
            </div>
          </div>

          {/* Horário */}
          <div className="flex items-start gap-3 bg-white p-4 rounded-3xl shadow-md">
            <div className="bg-primary-100 p-2.5 rounded-full flex-shrink-0">
              <Clock size={20} className="text-primary-600" />
            </div>
            <div>
              <h3 className="font-bold text-base mb-1">Horário</h3>
              <p className="text-gray-600 text-sm">
                <strong>Seg-Sex:</strong> 06:00 - 20:00<br />
                <strong>Sáb-Dom:</strong> 07:00 - 18:00
              </p>
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0977!2d-46.6333094!3d-23.5505199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjkiUyA0NsKwMzgnMDAuMyJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Casa do Pão"
          ></iframe>
        </div>

        {/* Formulário de Contato */}
        <div className="card p-5">
          <h2 className="text-2xl font-display font-black mb-4 text-gray-900">
            Envie uma Mensagem
          </h2>

          {submitted && (
            <div className="bg-green-100 border-2 border-green-400 text-green-700 px-4 py-3 rounded-3xl mb-4 text-sm">
              Mensagem enviada! Entraremos em contato.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2 text-sm">
                Nome Completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field w-full"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2 text-sm">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field w-full"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-bold mb-2 text-sm">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2 text-sm">
                Mensagem *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="input-field resize-none w-full rounded-3xl"
                placeholder="Escreva sua mensagem..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center gap-2 py-4"
            >
              <Send size={20} />
              <span>Enviar Mensagem</span>
            </button>

            <p className="text-xs text-gray-500 text-center">
              Você será redirecionado para o WhatsApp
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
