'use client';

import { signIn } from 'next-auth/react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { QrCode, BarChart3, Eye, Edit, RefreshCw, Target, Zap, UtensilsCrossed, Stethoscope, Briefcase, Palette, Printer, BarChart2, Link2, DollarSign, ChevronRight } from "lucide-react";
import Plans from '@/components/Plans';
import FaqList from '@/components/Faq';
    
export default function Home() {

  async function handleSignIn(planSelected: string) {
    await signIn("google", {
      callbackUrl: `/checkout/${planSelected}`,
    });
  }

  return (
    <div className="pt-16">
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="flex items-center">
          <div className="container mx-auto px-6 pb-16 md:pt-24 pt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
                      className="bg-primary hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-full font-semibold text-md hover:bg-primary-600 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 cursor-pointer"
                    >
                      Começar por R$ 9,90/mês
                    </button>
                    <button
                      onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-white text-gray-600 px-8 py-4 rounded-full font-semibold text-md hover:bg-gray-50 transition-all duration-300 hover:scale-105 cursor-pointer"
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
              <div className="relative">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-[0_20px_80px_-15px_rgba(0,0,0,0.3)] p-8">
                  {/* Cards de Estatísticas */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="relative bg-white flex items-center rounded-2xl p-4 border border-gray-100">
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary/5 rounded-xl flex items-center justify-center">
                        <QrCode className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary">
                          1
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          QR Code
                        </h3>
                        <p className="text-xs text-gray-400">
                          Ativo
                        </p>
                      </div>
                    </div>

                    <div className="relative bg-white flex items-center rounded-2xl p-4 border border-gray-100">
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary/5 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-gray-300 flex items-center gap-2">
                          •••
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          Acessos
                        </h3>
                        <p className="text-xs text-gray-400">
                          Disponível no plano Completo
                          <span className="md:text-[10px] ml-2 pt-1 text-[8px] bg-yellow-200 text-yellow-700 px-2 py-1 rounded-full">
                            Atualizar
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lista de QR Codes */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex flex-col gap-4">
                      <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Ativo
                            </span>
                            <span className="text-sm text-gray-500">
                              Criado há 2 dias
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-gray-900 font-semibold md:text-sm text-xs">Cardápio Digital</h4>
                            <ChevronRight className="w-4 h-4" />
                            <p className="text-gray-600 md:text-sm text-xs">qrflix.com/cardapio-cafe</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-sm hover:bg-primary/10 transition-colors">
                              <Eye className="w-4 h-4" />
                              <span className="hidden md:block">Visualizar</span>
                            </button>
                            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-sm hover:bg-primary/10 transition-colors">
                              <Edit className="w-4 h-4" />
                              <span className="hidden md:block">Editar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="bg-primary text-white w-full mt-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
                      Criar QR Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sessão de Benefícios */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Por que usar <span className="text-primary">QRFlex</span>?
                </h2>
                <p className="text-gray-600 text-lg">
                  Benefícios exclusivos que tornam seu QR Code mais eficiente
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: RefreshCw,
                    title: 'Link Editável',
                    description: 'Mude o destino do seu QR a qualquer momento, sem reimprimir.'
                  },
                  {
                    icon: Target,
                    title: 'QR Dinâmico Real',
                    description: 'Sempre o mesmo QR, mesmo que o conteúdo mude.'
                  },
                  {
                    icon: Zap,
                    title: 'Fácil e Rápido',
                    description: 'Crie seu QR em segundos. Sem complicações.'
                  },
                  {
                    icon: BarChart2,
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
                      <beneficio.icon className="w-6 h-6 text-primary" />
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
        <Plans type="signin" />

        {/* Sessão de Dores */}
        <section className="py-16 bg-gray-50/50">
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
                    icon: Printer
                  },
                  {
                    title: 'Sem controle',
                    description: 'Não dá para saber quantas pessoas escanearam.',
                    icon: BarChart2
                  },
                  {
                    title: 'Links quebrados',
                    description: 'Se a página cai, o QR fica inútil.',
                    icon: Link2
                  },
                  {
                    title: 'Custo alto',
                    description: 'Ferramentas grandes são caras e complexas.',
                    icon: DollarSign
                  }
                ].map((dor, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all">
                    <div className="flex items-start gap-4">
                      <dor.icon className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{dor.title}</h3>
                        <p className="text-gray-600">{dor.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="mt-16 text-center">
                <div className="inline-block px-6 py-3 rounded-2xl">
                  <p className="text-xl font-medium text-primary">
                    Com o QR Flex, você tem controle total do seu QR, mesmo depois de impresso.
                  </p>
                </div>
              </div> */}
            </div>
          </div>

          {/* CTA após Dores */}
          <div className="mt-16 text-center px-6">
              <div className="max-w-2xl mx-auto bg-primary rounded-2xl p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Com o QR Flex, você tem controle total do seu QR, mesmo depois de impresso.
                </h3>
                <p className="text-white mb-8 text-sm">
                  Escolha seu plano e comece a criar QR Codes em menos de 1 minuto
                </p>
                <button
                  onClick={() => handleSignIn('basic')}
                  className="bg-white hover:scale-105 transition-all duration-300 text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 w-full md:w-auto cursor-pointer"
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
                  icon: UtensilsCrossed,
                  title: 'Restaurantes',
                  description: 'QR de cardápio editável'
                },
                {
                  icon: Stethoscope,
                  title: 'Clínicas',
                  description: 'QR de agendamento'
                },
                {
                  icon: Briefcase,
                  title: 'Vendedores',
                  description: 'QR para WhatsApp'
                },
                {
                  icon: Palette,
                  title: 'Criadores',
                  description: 'QR em cartões e posts'
                }
              ].map((caso, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="mb-3 flex justify-center">
                    <caso.icon className="w-12 h-12 text-primary" />
                  </div>
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
            <FaqList />
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
                  className="bg-primary hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-600 shadow-sm cursor-pointer"
                >
                  Começar Agora
                </button>
                <button
                  onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white hover:scale-105 transition-all duration-300 text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 border-2 border-primary cursor-pointer"
                >
                  Ver Planos
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}