import React from 'react';
import { Heart, Users, Award, Clock } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Paixão pelo que fazemos',
      description: 'Cada pão é feito com dedicação e amor pela arte da panificação'
    },
    {
      icon: Users,
      title: 'Tradição Familiar',
      description: 'Receitas tradicionais passadas de geração em geração'
    },
    {
      icon: Award,
      title: 'Qualidade Premium',
      description: 'Ingredientes selecionados e processos artesanais'
    },
    {
      icon: Clock,
      title: 'Sempre Fresquinho',
      description: 'Produtos assados diariamente para garantir a frescura'
    }
  ];

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Hero Section - Mobile First */}
      <section className="bg-gradient-to-br from-accent-700 to-accent-900 text-white px-4 py-12">
        <h1 className="text-3xl font-display font-black mb-2">
          Sobre a Casa do Pão
        </h1>
        <p className="text-sm text-accent-100">
          Tradição, qualidade e sabor
        </p>
      </section>

      {/* História - Mobile First */}
      <section className="px-4 py-8">
        <h2 className="text-2xl font-display font-black mb-4 text-gray-900">Nossa História</h2>

        <div className="rounded-3xl overflow-hidden shadow-lg mb-4">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800"
            alt="Padaria"
            className="w-full h-48 object-cover"
          />
        </div>

        <div className="space-y-3 text-gray-700 text-sm">
          <p>
            A Casa do Pão nasceu do sonho de uma família apaixonada pela arte da panificação.
            Há mais de 20 anos, começamos com uma pequena padaria de bairro, com o objetivo
            de levar pães frescos e de qualidade para nossa comunidade.
          </p>
          <p>
            Desde o início, nossa missão foi clara: combinar receitas tradicionais com
            ingredientes selecionados para criar produtos que aquecem o coração e alimentam
            a alma. Cada pão que sai do nosso forno é feito com o mesmo cuidado e dedicação
            de antigamente.
          </p>
          <p>
            Hoje, somos referência em panificação artesanal na região, mas mantemos os
            mesmos valores que nos trouxeram até aqui: qualidade, tradição e respeito
            aos nossos clientes.
          </p>
        </div>
      </section>

      {/* Valores - Mobile First */}
      <section className="px-4 py-8 bg-warm-sand">
        <h2 className="text-2xl font-display font-black mb-2 text-gray-900 text-center">
          Nossos Valores
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Os pilares do nosso trabalho
        </p>

        <div className="space-y-4">
          {values.map((value, index) => (
            <div key={index} className="card p-4 flex items-start gap-3">
              <div className="bg-secondary-100 p-3 rounded-full flex-shrink-0">
                <value.icon size={24} className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base mb-1">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compromisso - Mobile First */}
      <section className="px-4 py-8">
        <h2 className="text-2xl font-display font-black mb-6 text-center text-gray-900">
          Nosso Compromisso
        </h2>
        <div className="space-y-4">
          <div className="bg-primary-50 p-4 rounded-3xl">
            <h3 className="font-display font-bold text-base mb-2 text-primary-800">
              Ingredientes de Qualidade
            </h3>
            <p className="text-gray-700 text-sm">
              Selecionamos cuidadosamente cada ingrediente, priorizando fornecedores locais
              e produtos frescos para garantir o melhor sabor.
            </p>
          </div>
          <div className="bg-secondary-50 p-4 rounded-3xl">
            <h3 className="font-display font-bold text-base mb-2 text-gray-800">
              Produção Artesanal
            </h3>
            <p className="text-gray-700 text-sm">
              Mantemos os métodos tradicionais de panificação, com produção artesanal
              que valoriza o tempo e o processo de cada receita.
            </p>
          </div>
          <div className="bg-accent-50 p-4 rounded-3xl">
            <h3 className="font-display font-bold text-base mb-2 text-accent-800">
              Frescor Diário
            </h3>
            <p className="text-gray-700 text-sm">
              Todos os nossos produtos são preparados diariamente, garantindo que você
              sempre leve para casa o melhor em termos de frescor e sabor.
            </p>
          </div>
          <div className="bg-primary-50 p-4 rounded-3xl">
            <h3 className="font-display font-bold text-base mb-2 text-primary-800">
              Atendimento Humanizado
            </h3>
            <p className="text-gray-700 text-sm">
              Cada cliente é parte da nossa família. Oferecemos um atendimento caloroso
              e personalizado, porque sabemos que faz toda a diferença.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
