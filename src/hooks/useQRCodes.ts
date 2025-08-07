import { useState, useEffect } from 'react';
import { QRCode } from '@/types/qrcode';

export function useQRCodes() {
  const [qrCodes, setQRCodes] = useState<QRCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQRCodes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/qrcodes');
      if (!response.ok) throw new Error('Falha ao carregar QR Codes');
      
      const data = await response.json();
      setQRCodes(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQRCode = async (id: string, name: string, url: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/qrcodes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, url }),
      });

      if (!response.ok) throw new Error('Falha ao atualizar QR Code');
      
      const updatedQRCode = await response.json();
      setQRCodes(prev => prev.map(qr => qr.id === id ? { ...qr, name, url } : qr));
      setError(null);
      return updatedQRCode;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createQRCode = async (name: string, url: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/qrcodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, url }),
      });

      if (!response.ok) throw new Error('Falha ao criar QR Code');
      
      const newQRCode = await response.json();
      setQRCodes(prev => [newQRCode, ...prev]);
      setError(null);
      return newQRCode;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQRCodes();
  }, []);

  return {
    qrCodes,
    isLoading,
    error,
    createQRCode,
    updateQRCode,
    refreshQRCodes: fetchQRCodes,
  };
}