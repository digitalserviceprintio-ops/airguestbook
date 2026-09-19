import React, { useState, useEffect } from 'react';
import { NavigationTab, Guest, Transaction, WishlistItem, GuestWish, UserAccount } from './types';
import { 
  INITIAL_GUESTS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_WISHLIST, 
  INITIAL_WISHES 
} from './data';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DashboardAdminView } from './components/DashboardAdminView';
import { KelolaTamuView } from './components/KelolaTamuView';
import { AmplopKadoView } from './components/AmplopKadoView';
import { LaporanAnalitikView } from './components/LaporanAnalitikView';
import { AturEventView } from './components/AturEventView';
import { AuthView } from './components/AuthView';
import { KioskCheckInModal } from './components/KioskCheckInModal';
import { LiveProjectionModal } from './components/LiveProjectionModal';
import { PayoutModal } from './components/PayoutModal';
import { auth, logoutFirebase } from './firebase/config';
import { 
  subscribeGuests, 
  subscribeTransactions, 
  subscribeWishlist, 
  subscribeWishes,
  addGuestDoc,
  updateGuestDoc,
  addTransactionDoc,
  addWishlistDoc,
  addWishDoc,
  likeWishDoc,
  seedInitialDataIfEmpty
} from './firebase/services';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('amplop');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>({
    id: 'USR-001',
    name: 'Sarah Octavia & Dimas',
    partnerName: 'Dimas Aditya Pratama',
    email: 'sarah.dimas@wedding.com',
    phone: '+62 812-9876-5432',
    role: 'Mempelai',
    eventName: 'The Wedding of Sarah & Dimas',
  });
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  
  // State for application entities
  const [guests, setGuests] = useState<Guest[]>(INITIAL_GUESTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(INITIAL_WISHLIST);
  const [wishes, setWishes] = useState<GuestWish[]>(INITIAL_WISHES);
  const [balance, setBalance] = useState<number>(48750000);

  // Modals state
  const [isKioskOpen, setIsKioskOpen] = useState(false);
  const [isLiveProjectionOpen, setIsLiveProjectionOpen] = useState(false);
  const [isPayoutOpen, setIsPayoutOpen] = useState(false);

  // Sync with Firestore Real-time Collections
  useEffect(() => {
    seedInitialDataIfEmpty();

    const unsubGuests = subscribeGuests((data) => {
      if (data && data.length > 0) setGuests(data);
    });

    const unsubTxs = subscribeTransactions((data) => {
      if (data && data.length > 0) setTransactions(data);
    });

    const unsubWishlist = subscribeWishlist((data) => {
      if (data && data.length > 0) setWishlist(data);
    });

    const unsubWishes = subscribeWishes((data) => {
      if (data && data.length > 0) setWishes(data);
    });

    const unsubAuth = auth.onAuthStateChanged((fbUser) => {
      if (fbUser) {
        setCurrentUser({
          id: fbUser.uid,
          name: fbUser.displayName || 'Sarah Octavia & Dimas',
          partnerName: 'Dimas Aditya Pratama',
          email: fbUser.email || 'sarah.dimas@wedding.com',
          phone: fbUser.phoneNumber || '+62 812-9876-5432',
          role: fbUser.email === 'windariwindari605@gmail.com' ? 'Wedding Organizer' : 'Mempelai',
          eventName: 'The Wedding of Sarah & Dimas',
          avatarUrl: fbUser.photoURL || undefined,
        });
      }
    });

    return () => {
      unsubGuests();
      unsubTxs();
      unsubWishlist();
      unsubWishes();
      unsubAuth();
    };
  }, []);

  // Auth Handlers
  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthInitialMode(mode);
    setCurrentTab('auth');
  };

  const handleLogout = async () => {
    try {
      await logoutFirebase();
    } catch {
      // ignore
    }
    setCurrentUser(null);
    setAuthInitialMode('login');
    setCurrentTab('auth');
  };

  // Handlers with Firestore persistence
  const handleAddGuest = async (newGuest: Guest) => {
    setGuests((prev) => [newGuest, ...prev]);
    await addGuestDoc(newGuest);

    if (newGuest.envelopeAmount && newGuest.envelopeAmount > 0) {
      setBalance((prev) => prev + (newGuest.envelopeAmount || 0));
      const newTx: Transaction = {
        id: `TRX-${Date.now().toString().slice(-4)}`,
        senderName: newGuest.name,
        relation: newGuest.category,
        amount: newGuest.envelopeAmount,
        method: newGuest.paymentMethod || 'QRIS AirGuest',
        timeAgo: 'Baru saja',
        message: 'Selamat menempuh hidup baru Sarah & Dimas! Bahagia selalu!',
        verified: true,
        avatarInitials: newGuest.avatarInitials
      };
      setTransactions((prev) => [newTx, ...prev]);
      await addTransactionDoc(newTx);
    }
  };

  const handleCheckInGuest = async (guestId: string) => {
    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    setGuests((prev) =>
      prev.map((g) =>
        g.id === guestId
          ? {
              ...g,
              attendanceStatus: 'Sudah Hadir',
              checkInTime: timeStr,
              souvenirTaken: true,
            }
          : g
      )
    );
    await updateGuestDoc(guestId, {
      attendanceStatus: 'Sudah Hadir',
      checkInTime: timeStr,
      souvenirTaken: true,
    });
  };

  const handleAddWishlistItem = async (item: { name: string; price: string }) => {
    const newItem: WishlistItem = {
      id: `WSH-${Date.now().toString().slice(-4)}`,
      name: item.name,
      priceEstimate: item.price,
      status: 'Masih Tersedia',
      deliveryNote: 'Tamu dapat patungan atau klaim langsung'
    };
    setWishlist((prev) => [newItem, ...prev]);
    await addWishlistDoc(newItem);
  };

  const handleLikeWish = async (wishId: string) => {
    const target = wishes.find((w) => w.id === wishId);
    const currentLikes = target?.likes || 0;
    setWishes((prev) =>
      prev.map((w) => (w.id === wishId ? { ...w, likes: w.likes + 1, liked: true } : w))
    );
    await likeWishDoc(wishId, currentLikes);
  };

  const handleAddWish = async (newWish: GuestWish) => {
    setWishes((prev) => [newWish, ...prev]);
    await addWishDoc(newWish);
  };

  const handleConfirmPayout = (amount: number) => {
    setBalance((prev) => Math.max(0, prev - amount));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-gray-900 selection:bg-amber-100 selection:text-amber-900 font-sans">
      
      {/* 1. Header with Responsive Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenKiosk={() => setIsKioskOpen(true)}
        onOpenLiveProjection={() => setIsLiveProjectionOpen(true)}
        user={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* 2. Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'auth' && (
          <AuthView
            initialMode={authInitialMode}
            onLoginSuccess={(user) => {
              setCurrentUser(user);
              setCurrentTab('dashboard');
            }}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardAdminView
            guests={guests}
            onOpenKiosk={() => setIsKioskOpen(true)}
            onNavigateTab={setCurrentTab}
            searchQuery={searchQuery}
          />
        )}

        {currentTab === 'tamu' && (
          <KelolaTamuView
            guests={guests}
            onAddGuest={handleAddGuest}
            onOpenKiosk={() => setIsKioskOpen(true)}
            searchFilter={searchQuery}
          />
        )}

        {currentTab === 'amplop' && (
          <AmplopKadoView
            transactions={transactions}
            wishlist={wishlist}
            wishes={wishes}
            onAddWishlistItem={handleAddWishlistItem}
            onLikeWish={handleLikeWish}
            onOpenPayout={() => setIsPayoutOpen(true)}
            onOpenLiveProjection={() => setIsLiveProjectionOpen(true)}
            onNavigateTab={setCurrentTab}
            searchFilter={searchQuery}
          />
        )}

        {currentTab === 'laporan' && (
          <LaporanAnalitikView
            onExportPDF={() => alert('Mengunduh Laporan Keuangan Acara Pernikahan (PDF)...')}
            onExportExcel={() => alert('Mengunduh Absensi & Logistik Souvenir (Excel)...')}
            onSendWhatsAppReport={() => alert('Mengirim rekapitulasi amplop dan daftar kado langsung ke nomor WhatsApp Sarah & Dimas!')}
          />
        )}

        {currentTab === 'atur_event' && (
          <AturEventView onOpenAuth={handleOpenAuth} />
        )}
      </main>

      {/* 3. Footer */}
      <Footer
        onOpenPrivacy={() => alert('AirGuest menghormati privasi data tamu dan keluarga sesuai UU Perlindungan Data Pribadi (PDP).')}
        onOpenQRISProtocol={() => alert('Sistem AirGuest terhubung langsung dengan Standar QRIS Bank Indonesia & Enkripsi TLS 1.3.')}
        onOpenOperatorHelp={() => alert('Bantuan Teknis Operator Concierge: +62 811-AIR-GUEST (Standby 24/7 di Venue)')}
      />

      {/* 4. Interactive Modals */}
      <KioskCheckInModal
        isOpen={isKioskOpen}
        onClose={() => setIsKioskOpen(false)}
        guests={guests}
        onCheckInGuest={handleCheckInGuest}
      />

      <LiveProjectionModal
        isOpen={isLiveProjectionOpen}
        onClose={() => setIsLiveProjectionOpen(false)}
        wishes={wishes}
        onAddWish={handleAddWish}
      />

      <PayoutModal
        isOpen={isPayoutOpen}
        onClose={() => setIsPayoutOpen(false)}
        availableBalance={balance}
        onConfirmPayout={handleConfirmPayout}
      />

    </div>
  );
}
