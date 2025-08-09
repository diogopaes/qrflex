import { signIn } from "next-auth/react";
import plans from '@/mock/plans.json';
import { useRouter } from "next/navigation";

export default function Plans({ type = 'signin' }: { type: 'signin' | 'update' }) {
    const router = useRouter();

    async function handleUpdatePlan(plan: string) {
        const res = await fetch('/api/stripe/checkout', {
            method: 'POST',
            body: JSON.stringify({ plan }),
        });
        const { url } = await res.json();
        router.push(url);
    }

    async function handleSignIn(planSelected: string) {
        await signIn("google", {
            callbackUrl: `/checkout/${planSelected}`,
        });
    }

    return (
        <section id="planos" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
                Planos simples e direto ao ponto
                </h2>
                
                {/* Cards de Planos */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plans.map((plan, index) => (
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
                        onClick={() => type === 'signin' ? handleSignIn(plan.type) : handleUpdatePlan(plan.type)}
                        className={`w-full mt-8 px-6 py-3 rounded-full font-medium transition-all cursor-pointer ${
                        plan.highlighted
                            ? 'bg-primary text-white hover:bg-primary-600'
                            : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                        }`}
                    >
                        {plan.highlighted ? 'Quero o Completo' : 'Assinar Básico'}
                    </button>
                    </div>
                ))}
                </div>
            </div>
            </section>
    );
}