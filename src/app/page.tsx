'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { status } = useSession();

  if (status === 'authenticated') {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-primary-700 text-white">
        <div className="container mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Conteúdo Lado Esquerdo */}
            <div className="space-y-8">
              <h1 className="text-5xl font-bold leading-tight">
                QR Code que você controla. Simples assim.
              </h1>
              <p className="text-xl text-primary-200">
                Crie seu QR Code dinâmico, edite o link sempre que quiser e pare de 
                desperdiçar tempo e impressões. Ideal para cardápios, promoções e 
                serviços locais.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                  className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 transition-colors w-full md:w-auto"
                >
                  Começar por R$ 9,90/mês
                </button>
                <p className="text-sm text-primary-200 text-center md:text-left">
                  Sem taxas escondidas. Cancele quando quiser.
                </p>
              </div>
            </div>

            {/* Mockup Lado Direito */}
            <div className="relative hidden md:block">
              <div className="bg-white rounded-lg shadow-2xl p-6">
                <div className="mb-8">
                  <h3 className="text-gray-800 font-semibold text-lg mb-4">Meu QR Code</h3>
                  
                  {/* QR Code Ativo */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
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

      {/* Sessão de Dores */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Por que empresas perdem tempo e dinheiro com QR Codes comuns?
            </h2>
            <div className="space-y-6 text-left">
              {[
                'QR fixo: Se o link muda, você precisa imprimir tudo de novo.',
                'Sem controle: Não dá para saber quantas pessoas escanearam.',
                'Links quebrados: Se a página cai, o QR fica inútil.',
                'Custo alto: Ferramentas grandes são caras e complexas.'
              ].map((dor, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-red-500 text-xl">❌</span>
                  <p className="text-gray-700">{dor}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 p-6 bg-primary text-white rounded-lg">
              <p className="text-xl font-medium">
                Com o QR Code Inteligente, você tem controle total do seu QR, mesmo depois de impresso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sessão de Benefícios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
            Por que usar QR Code Inteligente?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: '✅',
                title: 'Link Editável',
                description: 'Mude o destino do seu QR a qualquer momento, sem reimprimir.'
              },
              {
                icon: '✅',
                title: 'QR Dinâmico Real',
                description: 'Sempre o mesmo QR, mesmo que o conteúdo mude.'
              },
              {
                icon: '✅',
                title: 'Fácil e Rápido',
                description: 'Crie seu QR em segundos. Sem complicações.'
              },
              {
                icon: '✅',
                title: 'Estatísticas de Acesso',
                description: 'Veja quantas pessoas escanearam seus QRs.',
                badge: 'Plano Premium'
              }
            ].map((beneficio, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <span className="text-green-600 text-2xl">{beneficio.icon}</span>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {beneficio.title}
                      </h3>
                      {beneficio.badge && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-blue-800">
                          {beneficio.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-gray-600 leading-relaxed">
                      {beneficio.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessão de Planos */}
      <section id="planos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
            Planos simples e direto ao ponto
          </h2>
          
          {/* Tabela de Comparação */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-6 px-6 text-left text-gray-500 w-1/3">Recurso</th>
                  <th className="py-6 px-6 text-center bg-gray-50">
                    <div className="text-gray-800 font-semibold">Essencial</div>
                    <div className="text-primary font-bold text-2xl mt-1">R$ 9,90</div>
                    <div className="text-gray-500 text-sm">/mês</div>
                  </th>
                  <th className="py-6 px-6 text-center bg-primary-50">
                    <div className="text-gray-800 font-semibold">Premium</div>
                    <div className="text-primary font-bold text-2xl mt-1">R$ 29,90</div>
                    <div className="text-gray-500 text-sm">/mês</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: 'QRs Dinâmicos',
                    essencial: '1',
                    premium: 'Ilimitado'
                  },
                  {
                    feature: 'Editar o link do QR',
                    essencial: '✅',
                    premium: '✅'
                  },
                  {
                    feature: 'Estatísticas de acessos',
                    essencial: '❌',
                    premium: '✅'
                  },
                  {
                    feature: 'Acesso imediato',
                    essencial: '✅',
                    premium: '✅'
                  },
                  {
                    feature: 'Suporte prioritário',
                    essencial: '❌',
                    premium: '✅'
                  }
                ].map((row, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-4 px-6 text-gray-800">{row.feature}</td>
                    <td className="py-4 px-6 text-center bg-gray-50">
                      <span className={row.essencial === '✅' ? 'text-green-600' : 
                                    row.essencial === '❌' ? 'text-red-500' : 
                                    'text-gray-800 font-medium'}>
                        {row.essencial}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center bg-primary-50">
                      <span className={row.premium === '✅' ? 'text-green-600' : 
                                    row.premium === '❌' ? 'text-red-500' : 
                                    'text-gray-800 font-medium'}>
                        {row.premium}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTAs */}
          <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 transition-colors shadow-sm"
            >
              Assinar o Essencial
            </button>
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-600 transition-colors shadow-sm"
            >
              Quero o Premium
            </button>
          </div>

          {/* CTA após planos */}
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto bg-primary rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Comece a usar QR Codes inteligentes hoje
              </h3>
              <p className="text-primary-200 mb-8">
                Escolha seu plano e comece a criar QR Codes em menos de 1 minuto
              </p>
              <button
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 transition-colors w-full md:w-auto"
              >
                Começar por R$ 9,90/mês
              </button>
            </div>
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
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-600 transition-colors shadow-sm"
              >
                Começar Agora
              </button>
              <button
                onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors border-2 border-primary"
              >
                Ver Planos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-100">
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
  );
}