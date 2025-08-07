'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import plan from '@/mock/plan.json';
import Link from 'next/link';
    
export default function Home() {
  const { status } = useSession();

  async function handleSignIn(planSelected: string) {
    await signIn("google", {
      callbackUrl: `/checkout/${planSelected}`,
    });
  }

  return (
    <div className="pt-16">
      <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="container mx-auto px-6 h-18 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          QRFlix
        </Link>

        {status === 'authenticated' ? (
          <Link
            href="/dashboard"
            className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Dashboard
          </Link>
        ) : (
          <button
            onClick={() => handleSignIn('basic')}
            className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-colors cursor-pointer"
          >
            Começar Agora
          </button>
        )}
      </div>
    </header>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="flex items-center">
          <div className="container mx-auto px-6 pb-16 pt-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Conteúdo Lado Esquerdo */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
                    QR Code que você <span className="text-primary">controla.</span> <br />
                    Simples assim.
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Crie seu QR Code dinâmico, edite o link sempre que quiser e pare de 
                    desperdiçar tempo e impressões. Ideal para cardápios, promoções e 
                    serviços locais.
                  </p>
                </div>
                <div className="space-y-6 pt-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleSignIn('basic')}
                      className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-md hover:bg-primary-600 transition-all shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 cursor-pointer"
                    >
                      Começar por R$ 9,90/mês
                    </button>
                    <button
                      onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-white text-gray-600 px-8 py-4 rounded-full font-semibold text-md hover:bg-gray-50 transition-all border border-gray-200 cursor-pointer"
                    >
                      Ver Planos
                    </button>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Sem taxas escondidas
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Cancele quando quiser
                    </div>
                  </div>
                </div>
              </div>

              {/* Mockup Lado Direito */}
              <div className="relative hidden md:block">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-[0_20px_80px_-15px_rgba(0,0,0,0.3)] p-8">
                  <div className="mb-8">
                    <h3 className="text-gray-800 font-semibold text-lg mb-4">Meu QR Code</h3>
                    
                    {/* QR Code Ativo */}
                    <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-6 mb-6 hover:bg-gray-50 transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-gray-800 font-medium">Cardápio Digital</h4>
                          <p className="text-gray-500 text-sm">qrflix.com/cardapio-cafe</p>
                          <div className="mt-3 flex items-center gap-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Ativo
                            </span>
                            <span className="text-sm text-gray-500">
                              Criado há 2 dias
                            </span>
                          </div>
                        </div>
                        <button className="text-primary hover:text-blue-700 font-medium">
                          Editar link
                        </button>
                      </div>
                    </div>

                    {/* Estatísticas com Upgrade */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-gray-800 font-medium">Estatísticas</h4>
                        <span className="text-sm text-gray-500">Últimos 7 dias</span>
                      </div>
                      <div className="relative">
                        <div className="blur-sm">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded">
                              <div className="text-2xl font-bold text-gray-800">127</div>
                              <div className="text-sm text-gray-500">Escaneamentos</div>
                            </div>
                            <div className="bg-white p-3 rounded">
                              <div className="text-2xl font-bold text-gray-800">85%</div>
                              <div className="text-sm text-gray-500">Taxa de cliques</div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/10 rounded">
                          <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                            Upgrade para visualizar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sessão de Benefícios */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Por que usar <span className="text-primary">QR Flex</span>?
                </h2>
                <p className="text-gray-600 text-lg">
                  Benefícios exclusivos que tornam seu QR Code mais eficiente
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: '🔄',
                    title: 'Link Editável',
                    description: 'Mude o destino do seu QR a qualquer momento, sem reimprimir.'
                  },
                  {
                    icon: '🎯',
                    title: 'QR Dinâmico Real',
                    description: 'Sempre o mesmo QR, mesmo que o conteúdo mude.'
                  },
                  {
                    icon: '⚡',
                    title: 'Fácil e Rápido',
                    description: 'Crie seu QR em segundos. Sem complicações.'
                  },
                  {
                    icon: '📊',
                    title: 'Estatísticas de Acesso',
                    description: 'Veja quantas pessoas escanearam seus QRs.',
                    badge: 'Plano Premium'
                  }
                ].map((beneficio, index) => (
                  <div 
                    key={index} 
                    className="relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all group"
                  >
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl">{beneficio.icon}</span>
                    </div>
                    <div className="ml-8">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {beneficio.title}
                        </h3>
                        {beneficio.badge && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {beneficio.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {beneficio.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sessão de Planos */}
        <section id="planos" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
              Planos simples e direto ao ponto
            </h2>
            
            {/* Cards de Planos */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {plan.map((plan, index) => (
                <div 
                  key={index} 
                  className={`relative bg-white rounded-2xl p-8 ${
                    plan.highlighted 
                      ? 'border-2 border-primary shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
                      : 'border border-gray-100'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-end justify-center gap-1">
                      <span className="text-3xl font-bold text-gray-800">R$</span>
                      <span className="text-5xl font-bold text-gray-800">{plan.price}</span>
                      <span className="text-gray-500 mb-1">/mês</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <span className={feature.included ? 'text-green-500' : 'text-gray-300'}>
                          {feature.included ? '✓' : '×'}
                        </span>
                        <span className={feature.included ? 'text-gray-800' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleSignIn(plan.type)}
                    className={`w-full mt-8 px-6 py-3 rounded-full font-medium transition-all cursor-pointer ${
                      plan.highlighted
                        ? 'bg-primary text-white hover:bg-primary-600'
                        : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {plan.highlighted ? 'Começar Agora' : 'Assinar Plano'}
                  </button>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
              <button
                onClick={() => handleSignIn('basic')}
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 transition-colors shadow-sm cursor-pointer"
              >
                Assinar o Básico
              </button>
              <button
                onClick={() => handleSignIn('premium')}
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-600 transition-colors shadow-sm cursor-pointer"
              >
                Quero o Completo
              </button>
            </div>
          </div>
        </section>

        {/* Sessão de Dores */}
        <section className="py-32 bg-gray-50/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Por que empresas perdem tempo e <span className="text-primary">dinheiro</span> <br />
                  com QR Codes comuns?
                </h2>
                <p className="text-gray-600 text-lg">
                  Problemas comuns que as empresas enfrentam ao usar QR codes tradicionais
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'QR fixo',
                    description: 'Se o link muda, você precisa imprimir tudo de novo.',
                    icon: '🖨️'
                  },
                  {
                    title: 'Sem controle',
                    description: 'Não dá para saber quantas pessoas escanearam.',
                    icon: '📊'
                  },
                  {
                    title: 'Links quebrados',
                    description: 'Se a página cai, o QR fica inútil.',
                    icon: '🔗'
                  },
                  {
                    title: 'Custo alto',
                    description: 'Ferramentas grandes são caras e complexas.',
                    icon: '💰'
                  }
                ].map((dor, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{dor.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{dor.title}</h3>
                        <p className="text-gray-600">{dor.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-16 text-center">
                <div className="inline-block bg-primary/5 px-6 py-3 rounded-2xl">
                  <p className="text-xl font-medium text-primary">
                    Com o QR Flex, você tem controle total do seu QR, mesmo depois de impresso.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA após Dores */}
          <div className="mt-16 text-center">
              <div className="max-w-2xl mx-auto bg-primary rounded-2xl p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Comece a usar QR Codes inteligentes hoje mesmo!
                </h3>
                <p className="text-white mb-8 text-sm">
                  Escolha seu plano e comece a criar QR Codes em menos de 1 minuto
                </p>
                <button
                  onClick={() => handleSignIn('basic')}
                  className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 transition-colors w-full md:w-auto cursor-pointer"
                >
                  Começar por R$ 9,90/mês
                </button>
              </div>
            </div>
        </section>

        {/* Casos de Uso */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Ideal para pequenos negócios e criadores
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: '🍽️',
                  title: 'Restaurantes',
                  description: 'QR de cardápio editável'
                },
                {
                  icon: '👨‍⚕️',
                  title: 'Clínicas',
                  description: 'QR de agendamento'
                },
                {
                  icon: '💼',
                  title: 'Vendedores',
                  description: 'QR para WhatsApp'
                },
                {
                  icon: '🎨',
                  title: 'Criadores',
                  description: 'QR em cartões e posts'
                }
              ].map((caso, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-4xl mb-3">{caso.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{caso.title}</h3>
                  <p className="text-gray-600 text-sm">{caso.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
              Perguntas Frequentes (FAQ)
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  pergunta: 'Quantos QRs posso criar no plano de R$ 9,90?',
                  resposta: 'Apenas 1, mas com edição ilimitada do link.'
                },
                {
                  pergunta: 'O QR muda quando edito o link?',
                  resposta: 'Não. O QR permanece o mesmo, você pode editar sempre que quiser.'
                },
                {
                  pergunta: 'Posso ver estatísticas de acesso?',
                  resposta: 'Sim, mas apenas no plano Premium (R$ 29,90/mês).'
                },
                {
                  pergunta: 'Tem fidelidade?',
                  resposta: 'Não. Cancele quando quiser.'
                }
              ].map((item, index) => {
                const [isOpen, setIsOpen] = useState(false);
                
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:border-gray-200 transition-colors duration-300">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.pergunta}
                      </h3>
                      <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`px-6 transition-all duration-200 ease-in-out ${
                        isOpen ? 'max-h-40 py-4' : 'max-h-0'
                      } overflow-hidden`}
                    >
                      <p className="text-gray-600">
                        {item.resposta}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Pronto para revolucionar seus QR Codes?
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Junte-se a centenas de empresas que já estão usando QR Codes inteligentes
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleSignIn('basic')}
                  className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-600 transition-colors shadow-sm cursor-pointer"
                >
                  Começar Agora
                </button>
                <button
                  onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors border-2 border-primary cursor-pointer"
                >
                  Ver Planos
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-50/50 border-t border-gray-100">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex flex-col gap-2">
                <div className="text-2xl font-bold text-primary">
                  QRFlex
                </div>
                <div className="text-sm text-gray-600">
                  © 2025 QR Flex
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <button className="text-gray-600 hover:text-primary transition-colors font-medium">
                  Termos
                </button>
                <button className="text-gray-600 hover:text-primary transition-colors font-medium">
                  Política de Privacidade
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}