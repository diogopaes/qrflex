'use client';
import plan from '@/mock/plan.json';
import { useRouter } from 'next/navigation';

export default function DashboardPlansPage() {
    const router = useRouter();

    async function handleUpdatePlan(plan: string) {
        const res = await fetch('/api/stripe/checkout', {
            method: 'POST',
            body: JSON.stringify({ plan }),
        });
        const { url } = await res.json();
        router.push(url);
    }

    return (
        <section id="planos" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
              Você precisa de um plano para continuar
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
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
              <button
                onClick={() => handleUpdatePlan('basic')}
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 transition-colors shadow-sm cursor-pointer"
              >
                Assinar o Básico
              </button>
              <button
                onClick={() => handleUpdatePlan('premium')}
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-600 transition-colors shadow-sm cursor-pointer"
              >
                Quero o Completo
              </button>
            </div>
          </div>
        </section>
    )
}