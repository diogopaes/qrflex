'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const createQRCodeSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  url: z.string().url('URL inválida')
});

type CreateQRCodeForm = z.infer<typeof createQRCodeSchema>;

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const { qrCodes, isLoading, error, createQRCode } = useQRCodes();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateQRCodeForm>({
    resolver: zodResolver(createQRCodeSchema)
  });

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

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de QR Codes</CardTitle>
            <span className="text-lg">📱</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qrCodes.length}</div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? 'Carregando...' : `${qrCodes.length} QR Codes ativos`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Escaneamentos</CardTitle>
            <span className="text-lg">📊</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? 'Carregando...' : `${totalClicks} escaneamentos totais`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Cliques</CardTitle>
            <span className="text-lg">🎯</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clickRate}%</div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? 'Carregando...' : 'Média por QR Code'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plano Atual</CardTitle>
            <span className="text-lg">⭐</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Essencial</div>
            <p className="text-xs text-muted-foreground">
              1 QR Code disponível
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>QR Codes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="text-red-500 mb-4">
                Erro ao carregar QR Codes: {error}
              </div>
            )}
            
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">Carregando QR Codes...</div>
              ) : qrCodes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhum QR Code criado ainda. Crie seu primeiro QR Code!
                </div>
              ) : (
                qrCodes.map(qr => (
                  <div key={qr.id} className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-50 transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-gray-800 font-medium">{qr.name}</h4>
                        <p className="text-gray-500 text-sm">{qr.shortUrl}</p>
                        <div className="mt-3 flex items-center gap-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Ativo
                          </span>
                          <span className="text-sm text-gray-500">
                            Criado {format(new Date(qr.createdAt), "dd 'de' MMMM", { locale: ptBR })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-500">Escaneamentos</div>
                          <div className="text-2xl font-bold text-gray-800">{qr.clicks}</div>
                        </div>
                        <button className="text-primary hover:text-primary-600 font-medium">
                          Editar link
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Botão e Modal de Criar QR Code */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="w-full mt-6" 
                  disabled={isLoading || qrCodes.length >= 1}
                >
                  {qrCodes.length >= 1 
                    ? 'Limite de QR Codes atingido' 
                    : 'Criar Novo QR Code'
                  }
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo QR Code</DialogTitle>
                  <DialogDescription>
                    Preencha as informações abaixo para criar seu QR Code dinâmico.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do QR Code</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Cardápio Digital"
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
                      placeholder="https://seu-site.com/pagina"
                      {...register('url')}
                      disabled={isSubmitting}
                    />
                    {errors.url && (
                      <p className="text-sm text-red-500">{errors.url.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Criando...' : 'Criar QR Code'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}