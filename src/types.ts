export type NavigationTab = 
  | 'dashboard' 
  | 'tamu' 
  | 'amplop' 
  | 'laporan' 
  | 'atur_event'
  | 'auth';

export interface UserAccount {
  id: string;
  name: string;
  partnerName?: string;
  email: string;
  phone: string;
  role: 'Mempelai' | 'Wedding Organizer' | 'Operator Concierge';
  eventName: string;
  avatarUrl?: string;
}

export interface Guest {
  id: string;
  name: string;
  phone: string;
  category: string;
  table: string;
  pax: number;
  rsvpStatus: 'Hadir' | 'Berhalangan' | 'Menunggu';
  attendanceStatus: 'Sudah Hadir' | 'Belum Hadir';
  checkInTime?: string;
  souvenirTaken: boolean;
  souvenirCount: number;
  envelopeAmount?: number;
  paymentMethod?: 'QRIS AirGuest' | 'BCA VA' | 'Mandiri' | 'Tunai / Titip' | 'Kado';
  giftName?: string;
  avatarUrl?: string;
  avatarInitials?: string;
}

export interface Transaction {
  id: string;
  senderName: string;
  relation: string;
  amount: number;
  method: 'QRIS AirGuest' | 'BCA VA' | 'Mandiri' | 'Tunai' | 'Tunai / Titip' | 'Kado';
  timeAgo: string;
  message: string;
  verified: boolean;
  avatarInitials?: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  priceEstimate: string;
  status: 'Telah Diberikan' | 'Sedang Dikirim' | 'Masih Tersedia';
  giver?: string;
  deliveryNote: string;
  courier?: string;
  trackingNo?: string;
}

export interface GuestWish {
  id: string;
  author: string;
  role: string;
  message: string;
  likes: number;
  giftTag: string;
  avatarInitials: string;
  avatarBg: string;
  liked?: boolean;
}

export interface TableAllocation {
  id: string;
  name: string;
  capacity: number;
  occupied: number;
  note: string;
}
