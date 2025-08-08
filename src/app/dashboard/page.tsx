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
import { QrCode, BarChart3, Target, Star, Eye, Download, Edit, AlertCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";
import { useUpgradePlan } from "@/hooks/useUpgradePlan";

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
  const [editQRCode, setEditQRCode] = useState<{ isOpen: boolean; qrCode: any }>({
    isOpen: false,
    qrCode: null
  });
  const { register: registerEdit, handleSubmit: handleSubmitEdit, formState: { errors: errorsEdit, isSubmitting: isSubmittingEdit }, reset: resetEdit } = useForm<CreateQRCodeForm>();
  const { qrCodes, isLoading, error, createQRCode, updateQRCode } = useQRCodes();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateQRCodeForm>({
    resolver: zodResolver(createQRCodeSchema)
  });
  const { loading, upgrade } = useUpgradePlan();

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

  async function handleUpdatePlan() {
    await upgrade();
  }

     if(isLoading || loading) {
     return <DashboardSkeleton />
   }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 mt-12 gap-6">
        <div className="relative bg-white rounded-2xl p-4 md:p-8 border border-gray-100 hover:border-gray-200 transition-all group">
          <div className="absolute -top-4 -left-4 md:w-12 md:h-12 w-10 h-10 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <QrCode className="md:w-6 md:h-6  text-primary" />
          </div>
          <div className="">
            <h3 className="md:text-md text-sm font-semibold text-gray-900 mb-2">
              QR Codes
            </h3>
            <div className="md:text-5xl text-3xl font-bold text-primary mb-1">
              {qrCodes.length}
            </div>
            <p className="text-gray-400 md:text-sm text-xs">
              {isLoading ? 'Carregando...' : `QR Codes ativos`}
            </p>
          </div>
        </div>

        <div className="relative bg-white rounded-2xl p-4 md:p-8 border border-gray-100 hover:border-gray-200 transition-all group">
          <div className="absolute -top-4 -left-4 md:w-12 md:h-12 w-10 h-10 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <BarChart3 className="md:w-6 md:h-6  text-primary" />
          </div>
          <div className="">
            <h3 className="md:text-lg text-sm font-semibold text-gray-900 mb-2">
              Acessos
            </h3>
            {session?.user?.plan === 'basic' ? (
              <>
                <div className="md:text-4xl text-2xl font-bold text-gray-300 mb-1 flex items-center gap-2">
                  <span>***</span>
                  <button
                    onClick={handleUpdatePlan}
                    className="text-xs bg-yellow-200 cursor-pointer font-medium text-yellow-500 px-2 py-1 rounded-full hover:scale-105 transition-all"
                  >
                    Atualizar
                  </button>
                </div>
                <p className="text-gray-400 md:text-sm text-xs">
                  Disponível no plano Completo
                </p>
              </>
            ) : (
              <>
                <div className="md:text-5xl text-3xl font-bold text-primary mb-1">
                  {totalClicks}
                </div>
                <p className="text-gray-400 md:text-sm text-xs">
                  {isLoading ? 'Carregando...' : `Acessos totais`}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="relative bg-white rounded-2xl p-4 md:p-8 border border-gray-100 hover:border-gray-200 transition-all group">
          <div className="absolute -top-4 -left-4 md:w-12 md:h-12 w-10 h-10 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Target className="md:w-6 md:h-6  text-primary" />
          </div>
          <div className="">
            <h3 className="md:text-lg text-sm font-semibold text-gray-900 mb-2">
              Taxa de Acessos
            </h3>
            {session?.user?.plan === 'basic' ? (
              <>
                <div className="md:text-4xl text-2xl font-bold text-gray-300 mb-1 flex items-center gap-2">
                  <span>***</span>
                  <button
                    onClick={handleUpdatePlan}
                    className="text-xs cursor-pointer bg-yellow-200 font-medium text-yellow-500 px-2 py-1 rounded-full hover:scale-105 transition-all"
                  >
                    Atualizar
                  </button>
                </div>
                <p className="text-gray-400 md:text-sm text-xs">
                  Disponível no plano Completo
                </p>
              </>
            ) : (
              <>
                <div className="md:text-5xl text-3xl font-bold text-primary mb-1">
                  {clickRate}%
                </div>
                <p className="text-gray-400 md:text-sm text-xs">
              {isLoading ? 'Carregando...' : 'Média por QR Code'}
            </p>
              </>
            )}
          </div>
        </div>

        <div className="relative bg-white rounded-2xl p-4 md:p-8 border border-gray-100 hover:border-gray-200 transition-all group">
          <div className="absolute -top-4 -left-4 md:w-12 md:h-12 w-10 h-10 bg-yellow-500/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Star className="md:w-6 md:h-6  text-yellow-500" />
          </div>
          <div className="">
            <h3 className="md:text-lg text-sm font-semibold text-gray-900 mb-2">
              Plano Atual
            </h3>
            <div className="md:text-3xl text-md font-bold text-primary my-3 capitalize">
              {session?.user?.plan === 'basic' ? 'Básico' : 'Completo'}
            </div>
            <p className="text-gray-400 md:text-sm text-xs">
              {session?.user?.plan === 'basic' ? '1 QR Code disponível' : 'Ilimitado'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="bg-white relative rounded-2xl p-8 border border-gray-100">
          <div className="absolute -top-4 -left-4 md:w-12 md:h-12 w-10 h-10 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <QrCode className="md:w-6 md:h-6  text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">QR Codes Ativos</h2>
          
            {error && (
            <span className="text-red-500 mb-4 p-4 flex items-center w-auto gap-2 bg-red-50 rounded-xl">
              <AlertCircle className="w-6 h-6 text-red-500" />
                Erro ao carregar QR Codes: {error}
            </span>
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
                <div key={qr.id} className="bg-gray-50/50 border border-gray-100 rounded-xl p-6 hover:bg-gray-100/80 transition-all duration-300">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div>
                      <h4 className="text-lg font-semibold text-gray-900">{qr.name}</h4>
                      <p className="text-gray-600 mt-1">{qr.url}</p>
                      <div className="mt-4 flex items-center gap-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Ativo
                          </span>
                        {qr?.createdAt && (
                          <span className="text-sm text-gray-500">
                            Criado {format(new Date(qr?.createdAt || ''), "dd 'de' MMMM", { locale: ptBR })}
                          </span>
                        )}
                      </div>
                        </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-gray-500">Acessos</div>
                        {session?.user?.plan === 'basic' ? (
                          <div className="flex items-center gap-2">
                            <div className="text-2xl font-bold text-gray-300">***</div>
                            <button
                              onClick={handleUpdatePlan}
                              className="text-xs cursor-pointer bg-yellow-200 font-medium text-yellow-500 px-2 py-1 rounded-full hover:scale-105 transition-all"
                            >
                              Atualizar
                        </button>
                          </div>
                        ) : (
                          <div className="text-2xl font-bold text-primary">{qr.clicks}</div>
                        )}
                      </div>
                         <div className="flex gap-2">
                          <button 
                            onClick={() => setViewQRCode({ isOpen: true, qrCode: qr })}
                            className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="hidden md:block">Visualizar</span>
                          </button>
                          <button 
                            onClick={() => {
                              setEditQRCode({ isOpen: true, qrCode: qr });
                              resetEdit({
                                name: qr.name,
                                url: qr.url
                              });
                            }}
                            className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            <span className="hidden md:block">Editar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Botão e Modal de Criar QR Code */}
          {session?.user?.plan === 'premium' || qrCodes.length < 1 ? (
            <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild className="block">
                <Button 
                        className="bg-primary text-lg hover:scale-105 mt-6 transition-all cursor-pointer hover:bg-primary/90 !mx-auto rounded-full text-white"
                        size="lg" 
                >
                        {qrCodes.length < 1 ? 'Crier seu QRCode' : 'Criar Novo QRCode'}
                </Button>
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
              ) : (
                <div className="flex items-center justify-center !mx-auto gap-2 mt-6">
                  <span className="text-gray-500">Limite de QR Codes atingido, no plano Básico.</span> 
                  <Button 
                    className="bg-yellow-200 cursor-pointer !ml-4 hover:scale-105 hover:bg-yellow-200 transition-all text-yellow-500 rounded-full"
                    size="lg"
                    onClick={() => handleUpdatePlan()}
                  >
                    Atualizar
                  </Button>   
                </div>
          )}

          {/* Modal de Edição do QR Code */}
          <Dialog open={editQRCode.isOpen} onOpenChange={(open) => !open && setEditQRCode({ isOpen: false, qrCode: null })}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-gray-900">Editar QR Code</DialogTitle>
                <DialogDescription className="text-gray-500 mb-4">
                  Atualize as informações do seu QR Code
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitEdit(async (data) => {
                try {
                  if (editQRCode.qrCode) {
                    await updateQRCode(editQRCode.qrCode.id, data.name, data.url);
                    setEditQRCode({ isOpen: false, qrCode: null });
                  }
                } catch (error) {
                  console.error('Erro ao atualizar QR Code:', error);
                }
              })} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nome do QR Code</Label>
                  <Input
                    id="edit-name"
                    placeholder="Ex: Cardápio Digital"
                    className="h-12 !rounded-md"
                    {...registerEdit('name', {
                      required: 'Nome é obrigatório',
                      minLength: {
                        value: 3,
                        message: 'Nome deve ter pelo menos 3 caracteres'
                      }
                    })}
                    disabled={isSubmittingEdit}
                  />
                  {errorsEdit.name && (
                    <p className="text-sm text-red-500">{errorsEdit.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-url">URL de Destino</Label>
                  <Input
                    id="edit-url"
                    className="h-12 !rounded-md"
                    placeholder="https://seu-site.com/pagina"
                    {...registerEdit('url', {
                      required: 'URL é obrigatória',
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: 'URL inválida'
                      }
                    })}
                    disabled={isSubmittingEdit}
                  />
                  {errorsEdit.url && (
                    <p className="text-sm text-red-500">{errorsEdit.url.message}</p>
                  )}
                </div>

                <Button type="submit" size="lg" className="!ml-auto cursor-pointer rounded-full block" disabled={isSubmittingEdit}>
                  {isSubmittingEdit ? 'Salvando...' : 'Salvar Alterações'}
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