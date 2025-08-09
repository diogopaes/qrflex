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
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { QrCode, BarChart3, Target, Star, Eye, Download, Edit, AlertCircle, ChevronRight, ChartBar, ChartLine, ChartNoAxesColumn, Plus } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";
import { useUpgradePlan } from "@/hooks/useUpgradePlan";
import StatCard from "./components/StatCard";

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
        {/* 1) Acessos */}
        <StatCard
          icon={<BarChart3 className="md:w-6 md:h-6 text-primary" />}
          value={totalClicks}
          label="Acessos"
          hint={isLoading ? "Carregando..." : "Cliques totais"}
          locked={session?.user?.plan === "basic"}
          onUpgrade={handleUpdatePlan}
        />

        {/* 2) Taxa média */}
        <StatCard
          icon={<Target className="md:w-6 md:h-6 text-primary" />}
          value={`${(Number.isFinite(clickRate) ? clickRate : 0)}%`}
          label="Taxa Média"
          hint={isLoading ? "Carregando..." : "Média por QR Code"}
          locked={session?.user?.plan === "basic"}
          onUpgrade={handleUpdatePlan}
        />

        {/* 3) QRs Ativos */}
        <StatCard
          icon={<QrCode className="md:w-6 md:h-6 text-primary" />}
          value={qrCodes.length}
          label="QR Codes"
          hint={isLoading ? "Carregando..." : "Ativos"}
        />

        {/* 4) Plano atual */}
        <StatCard
          icon={<Star className="md:w-6 md:h-6 text-yellow-500" />}
          value={session?.user?.plan === "basic" ? "Básico" : "Completo"}
          label="Plano Atual"
          hint={session?.user?.plan === "basic" ? "1 QR disponível" : "Ilimitado"}
          accent={session?.user?.plan === "basic" ? "text-primary" : "text-primary"}
        />
      </div>


      <div className="mt-12">
        <div className="bg-white relative rounded-2xl p-6 md:p-8 border border-gray-100">
          <div className="absolute -top-4 -left-4 md:w-12 md:h-12 w-10 h-10 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <QrCode className="md:w-6 md:h-6  text-primary" />
          </div>
          <h2 className="md:text-2xl text-xl font-semibold text-gray-900 mb-6">QR Codes</h2>
          
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
                <div className="text-center md:text-md text-sm pt-2 mb-6 text-gray-500">
                  <div className="mb-4">
                    <QrCode className="w-12 h-12 mx-auto text-gray-300" />
                  </div>
                </div>
              ) : (
                qrCodes.map(qr => (
                <div key={qr.id} className="bg-gray-50/50 border border-gray-100 rounded-xl px-6 py-4 hover:bg-gray-100/80 transition-all duration-300">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800">
                            Ativo
                        </span>
                        <span className="text-xs text-gray-500">
                          Criado{" "}
                          {qr?.createdAt
                            ? formatDistanceToNow(new Date(qr.createdAt), { addSuffix: true, locale: ptBR })
                            : "há alguns segundos"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {/* <span className="text-gray-600 text-[10px] px-2 py-1">{qr.shortId}</span> */}
                        <h4 className="md:text-md text-sm whitespace-nowrap font-semibold text-gray-900">{qr.name}</h4>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                        <p className="text-gray-600 md:text-sm text-xs truncate max-w-[180px] md:max-w-none">
                          {qr.url}
                        </p>
                      </div>
                              
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <ChartNoAxesColumn className="w-4 h-4 text-gray-500" />
                        {session?.user?.plan === 'basic' ? (
                          <div className="flex items-center gap-2">
                            <div className="text-2xl font-bold text-gray-300">•••</div>
                            <button
                              onClick={handleUpdatePlan}
                              className="text-[10px] cursor-pointer bg-yellow-200 text-yellow-700 px-2 py-0.5 rounded-full hover:scale-105"
                            >
                              Atualizar
                        </button>
                          </div>
                        ) : (
                          <div className="text-lg font-bold text-primary">{qr.clicks}</div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setViewQRCode({ isOpen: true, qrCode: qr })}
                          className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden md:block text-sm">Visualizar</span>
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
                          <span className="hidden md:block text-sm">Editar</span>
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
                  className="bg-primary flex items-center gap-2 mb-6 text-lg hover:scale-105 mt-6 transition-all cursor-pointer hover:bg-primary/90 !mx-auto rounded-full text-white"
                  size="xl" 
                >
                  <Plus className="w-8 h-8" />
                  {qrCodes.length < 1 ? 'Criar primeiro QRCode' : 'Criar outro QRCode'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-semibold text-gray-900">Criar QR Code</DialogTitle>
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
                          className="h-12 !rounded-md placeholder:text-gray-400"
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
                          className="h-12 !rounded-md placeholder:text-gray-400"
                      placeholder="https://seu-site.com/pagina"
                      {...register('url')}
                      disabled={isSubmitting}
                    />
                    {errors.url && (
                      <p className="text-sm text-red-500">{errors.url.message}</p>
                    )}
                  </div>

                  <Button type="submit" size="xl" className="!ml-auto hover:scale-105 transition-all duration-300 cursor-pointer rounded-full block" disabled={isSubmitting}>
                    {isSubmitting ? 'Criando...' : 'Criar QR Code'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          ) : (
            <div className="flex md:flex-row flex-col text-center items-center justify-center !mx-auto gap-2 mt-6">
              <span className="text-gray-500 md:text-md text-sm">Limite de QR Codes atingido, no plano Básico.</span>   
            </div>
          )}

          {/* Modal de Edição do QR Code */}
          <Dialog open={editQRCode.isOpen} onOpenChange={(open) => !open && setEditQRCode({ isOpen: false, qrCode: null })}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-3xl font-semibold text-gray-900">Editar QR Code</DialogTitle>
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
                    className="h-12 !rounded-md placeholder:text-gray-400"
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
                    className="h-12 !rounded-md placeholder:text-gray-400"
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

                <Button type="submit" size="xl" className="!ml-auto hover:scale-105 transition-all duration-300 cursor-pointer rounded-full block" disabled={isSubmittingEdit}>
                  {isSubmittingEdit ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Modal de Visualização do QR Code */}
          <Dialog open={viewQRCode.isOpen} onOpenChange={(open) => setViewQRCode({ isOpen: open, qrCode: null })}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-3xl font-semibold text-gray-900">QR Code</DialogTitle>
                <DialogDescription className="text-gray-500">
                  Escaneie ou faça o download do seu QR Code
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center p-4">
                {viewQRCode.qrCode && (
                  <>
                    <div className="bg-white p-2 rounded-xl border" id="qr-code-container">
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
                      className="mt-6 cursor-pointer bg-primary hover:scale-105 transition-all duration-300 hover:bg-primary/90 text-white rounded-full inline-flex items-center gap-2"
                      size="xl"
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