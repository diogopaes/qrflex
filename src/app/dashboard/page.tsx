'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useQRCodes } from "@/hooks/useQRCodes";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { QrCode, BarChart3, Target, Star, Eye, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const createQRCodeSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  url: z.string().url('URL inválida')
});

type CreateQRCodeForm = z.infer<typeof createQRCodeSchema>;

export default function DashboardPage() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [viewQRCode, setViewQRCode] = useState<{ isOpen: boolean; qrCode: any }>({
    isOpen: false,
    qrCode: null
  });
  const { qrCodes, isLoading, error, createQRCode } = useQRCodes();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateQRCodeForm>({
    resolver: zodResolver(createQRCodeSchema)
  });

  if (session && session.user.plan === 'none') {
    redirect('/dashboard/plans');
  }

  const onSubmit = async (data: CreateQRCodeForm) => {
    try {
      await createQRCode(data.name, data.url);
      setOpen(false);
      reset();
    } catch (error) {
      console.error('Erro ao criar QR Code:', error);
    }
  };

  const totalClicks = qrCodes.reduce((sum, qr) => sum + qr.clicks, 0);
  const clickRate = qrCodes.length > 0 
    ? Math.round((totalClicks / qrCodes.length) * 100)
    : 0;

  const router = useRouter();

  function handleUpdatePlan() {
    router.push('/dashboard/plans');
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-12 gap-6">
        <div className="relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all group">
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <QrCode className="w-6 h-6 text-primary" />
          </div>
          <div className="">
            <h3 className="text-md font-semibold text-gray-900 mb-2">
              QR Codes
            </h3>
            <div className="text-5xl font-bold text-primary mb-1">
              {qrCodes.length}
            </div>
            <p className="text-gray-400 text-sm">
              {isLoading ? 'Carregando...' : `QR Codes ativos`}
            </p>
          </div>
        </div>

        <div className="relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all group">
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <div className="">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Acessos
            </h3>
            <div className="text-5xl font-bold text-primary mb-1">
              {totalClicks}
            </div>
            <p className="text-gray-400 text-sm">
              {isLoading ? 'Carregando...' : `Acessos totais`}
            </p>
          </div>
        </div>

        <div className="relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all group">
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <div className="">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Taxa de Acessos
            </h3>
            <div className="text-5xl font-bold text-primary mb-1">
              {clickRate}%
            </div>
            <p className="text-gray-400 text-sm">
              {isLoading ? 'Carregando...' : 'Média por QR Code'}
            </p>
          </div>
        </div>

        <div className="relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all group">
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Star className="w-6 h-6 text-primary" />
          </div>
          <div className="">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Plano Atual
            </h3>
            <div className="text-3xl font-bold text-primary my-3 capitalize">
              {session?.user?.plan === 'basic' ? 'Básico' : 'Completo'}
            </div>
            <p className="text-gray-400 text-sm">
              {session?.user?.plan === 'basic' ? '1 QR Code disponível' : 'Ilimitado'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">QR Codes Ativos</h2>
          
          {error && (
            <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-xl">
              Erro ao carregar QR Codes: {error}
            </div>
          )}
          
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12 text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                Carregando QR Codes...
              </div>
            ) : qrCodes.length === 0 ? (
              <div className="text-center pt-8 mb-6 text-gray-500">
                <div className="mb-4">
                  <QrCode className="w-12 h-12 mx-auto text-gray-400" />
                </div>
                Nenhum QR Code criado ainda.
              </div>
            ) : (
              qrCodes.map(qr => (
                <div key={qr.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100/80 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{qr.name}</h4>
                      <p className="text-gray-600 mt-1">{qr.shortUrl}</p>
                      <div className="mt-4 flex items-center gap-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Ativo
                        </span>
                        <span className="text-sm text-gray-500">
                          Criado {format(new Date(qr?.createdAt || ''), "dd 'de' MMMM", { locale: ptBR })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-500">Acessos</div>
                        <div className="text-2xl font-bold text-primary">{qr.clicks}</div>
                      </div>
                                              <div className="flex gap-2">
                          <button 
                            onClick={() => setViewQRCode({ isOpen: true, qrCode: qr })}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            Visualizar
                          </button>
                          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
                            Editar
                          </button>
                        </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Botão e Modal de Criar QR Code */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="block">
              {session?.user?.plan === 'basic' && qrCodes.length < 1 ? (
                <Button 
                  className="bg-primary hover:bg-primary/90 !mx-auto rounded-full text-white"
                  size="lg" 
                  disabled={isLoading || qrCodes.length >= 1}
                >
                  Criar Agora
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-4 mt-6">
                  <span className="text-gray-500">Limite de QR Codes atingido <Button 
                    className="bg-primary !mx-auto hover:bg-primary/90 text-white rounded-full"
                    size="lg"
                    onClick={() => handleUpdatePlan()}
                  >
                    Atualizar Plano
                  </Button></span>
                  
                </div>
              )} 
            </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-gray-900">Criar Novo QR Code</DialogTitle>
                  <DialogDescription className="text-gray-500 mb-4">
                    Preencha as informações abaixo para criar seu QR Code dinâmico.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do QR Code</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Cardápio Digital"
                      className="h-12 !rounded-md"
                      {...register('name')}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="url">URL de Destino</Label>
                    <Input
                      id="url"
                      className="h-12 !rounded-md"
                      placeholder="https://seu-site.com/pagina"
                      {...register('url')}
                      disabled={isSubmitting}
                    />
                    {errors.url && (
                      <p className="text-sm text-red-500">{errors.url.message}</p>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="!ml-auto cursor-pointer rounded-full block" disabled={isSubmitting}>
                    {isSubmitting ? 'Criando...' : 'Criar QR Code'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* Modal de Visualização do QR Code */}
            <Dialog open={viewQRCode.isOpen} onOpenChange={(open) => setViewQRCode({ isOpen: open, qrCode: null })}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-gray-900">QR Code</DialogTitle>
                  <DialogDescription className="text-gray-500">
                    Escaneie ou faça o download do seu QR Code
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center p-6">
                  {viewQRCode.qrCode && (
                    <>
                      <div className="bg-white p-2 rounded-xl shadow-sm border" id="qr-code-container">
                        <QRCodeSVG
                          value={viewQRCode.qrCode.shortUrl}
                          size={200}
                          level="H"
                          includeMargin
                          imageSettings={{
                            src: "/logo.png",
                            height: 24,
                            width: 24,
                            excavate: true,
                          }}
                        />
                      </div>
                      <Button
                        onClick={() => {
                          const svg = document.getElementById("qr-code-container")?.querySelector("svg");
                          if (svg) {
                            const canvas = document.createElement("canvas");
                            const ctx = canvas.getContext("2d");
                            const data = new XMLSerializer().serializeToString(svg);
                            const img = new Image();
                            
                            img.onload = () => {
                              canvas.width = 1000;
                              canvas.height = 1000;
                              ctx?.drawImage(img, 0, 0, 1000, 1000);
                              
                              const link = document.createElement("a");
                              link.download = `qrcode-${viewQRCode.qrCode.name}.png`;
                              link.href = canvas.toDataURL("image/png");
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            };
                            
                            img.src = `data:image/svg+xml;base64,${btoa(data)}`;
                          }
                        }}
                        className="mt-6 bg-primary hover:bg-primary/90 text-white rounded-full inline-flex items-center gap-2"
                        size="lg"
                      >
                        <Download className="w-4 h-4" />
                        Baixar PNG
                      </Button>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
      </div>
    </div>
  );
}