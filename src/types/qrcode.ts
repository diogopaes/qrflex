export interface QRCode {
  id: string;
  userId: string;
  name: string;
  url: string;
  shortId: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}