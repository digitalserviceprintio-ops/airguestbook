import React, { useState } from 'react';
import { 
  Gift, 
  Wallet, 
  TrendingUp, 
  Eye, 
  EyeOff, 
  ArrowUpRight, 
  QrCode, 
  CheckCircle2, 
  Radio, 
  Heart, 
  Tv, 
  Plus, 
  Truck, 
  Printer,
  ChevronRight,
  Sparkles,
  Search,
  Building,
  CreditCard,
  Share2
} from 'lucide-react';
import { Transaction, WishlistItem, GuestWish, NavigationTab } from '../types';

interface AmplopKadoViewProps {
  transactions: Transaction[];
  wishlist: WishlistItem[];
  wishes: GuestWish[];
  onAddWishlistItem: (item: { name: string; price: string }) => void;
  onLikeWish: (id: string) => void;
  onOpenPayout: () => void;
  onOpenLiveProjection: () => void;
  onNavigateTab?: (tab: NavigationTab) => void;
  searchFilter: string;
}

export const AmplopKadoView: React.FC<AmplopKadoViewProps> = ({
  transactions,
  wishlist,
  wishes,
  onAddWishlistItem,
  onLikeWish,
  onOpenPayout,
  onOpenLiveProjection,
  onNavigateTab,
  searchFilter,
}) => {
  const [showNominalOnScreen, setShowNominalOnScreen] = useState(true);
  const [txFilter, setTxFilter] = useState<'Semua' | 'QRIS' | 'Transfer Bank'>('Semua');
  const [newGiftName, setNewGiftName] = useState('');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = 
      t.senderName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.message.toLowerCase().includes(searchFilter.toLowerCase());
    
    if (!matchesSearch) return false;
    if (txFilter === 'QRIS') return t.method === 'QRIS AirGuest';
    if (txFilter === 'Transfer Bank') return t.method === 'BCA VA' || t.method === 'Mandiri';
    return true;
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText?.(text);
    setCopiedAccount(label);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handleAddNewGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGiftName.trim()) return;
    onAddWishlistItem({
      name: newGiftName.trim(),
      price: 'Rp 2.500.000 (Estimasi)'
    });
    setNewGiftName('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header & Payout Actions */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-13 h-13 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0 border border-amber-200">
            <Gift className="w-7 h-7 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
              <span>VAULT &amp; HADIAH AKTIF</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500 font-normal">Gate QRIS Real-time v3.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Amplop Digital &amp; Registri Kado
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Kelola persembahan kasih, transaksi QRIS nirsentuh, serta logistik kado pernikahan Sarah &amp; Dimas.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
          {/* Toggle Nominal on Screen */}
          <button
            onClick={() => setShowNominalOnScreen(!showNominalOnScreen)}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition-colors"
          >
            {showNominalOnScreen ? (
              <>
                <Eye className="w-4 h-4 text-emerald-600" />
                <span>Nominal Ditampilkan di Layar</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 text-gray-400" />
                <span>Nominal Disamarkan (Privat)</span>
              </>
            )}
          </button>

          {/* Tarik Dana / Payout */}
          <button
            onClick={onOpenPayout}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs active:scale-98 transition-all"
          >
            <Wallet className="w-4 h-4" />
            <span>Tarik Dana / Payout</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Amplop Digital */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700">Amplop Digital Terkumpul</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight my-1">
            {showNominalOnScreen ? 'Rp 48.750.000' : 'Rp ••••••••'}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14 transaksi dalam 30 menit terakhir</span>
          </div>
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Rekening Terhubung: BCA ••8920</span>
            <span className="text-amber-600 font-bold hover:underline cursor-pointer" onClick={onOpenPayout}>
              Siap Tarik
            </span>
          </div>
        </div>

        {/* Card 2: Kado Fisik */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700">Total Kado Fisik Masuk</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Gift className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight my-1 flex items-baseline gap-2">
            <span>38</span>
            <span className="text-sm font-semibold text-gray-500">Barang</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-600 font-medium mb-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              26 di Venue Grand Ballroom
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <span className="w-2 h-2 rounded-full bg-gray-300"></span>
              12 Dikirim ke Rumah
            </span>
          </div>
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Meja Kado Gate A &amp; B</span>
            <span className="text-emerald-600 font-bold">92% Terkatalog</span>
          </div>
        </div>

        {/* Card 3: Rata-rata Amplop / Tamu */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700">Rata-rata Amplop / Tamu</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight my-1">
            {showNominalOnScreen ? 'Rp 350.000' : 'Rp •••••••'}
          </div>
          <div className="text-xs text-gray-500 font-medium mb-3">
            Dari total 142 amplop digital terkonfirmasi
          </div>
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Paling Populer: QRIS Dinamis</span>
            <span className="text-amber-700 font-bold">78% Volume</span>
          </div>
        </div>

      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: QRIS & Transfer Channels + Real-Time Transaction Feed (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Gerbang QRIS & Rekening Transfer */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-amber-600" />
                <h2 className="font-bold text-base text-gray-900">
                  Gerbang QRIS &amp; Rekening Transfer
                </h2>
              </div>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                Nirsentuh Terverifikasi
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              
              {/* QR Code Frame */}
              <div className="sm:col-span-5 bg-gradient-to-b from-amber-50/50 to-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col items-center justify-center text-center">
                <div className="bg-white p-3 rounded-xl shadow-xs border border-gray-200/80 relative">
                  {/* Styled QR Code Box with AirGuest heart logo in center */}
                  <div className="w-36 h-36 border-2 border-gray-900 rounded-lg p-1.5 flex flex-col justify-between relative bg-white">
                    {/* Top row markers */}
                    <div className="flex justify-between">
                      <div className="w-8 h-8 border-4 border-gray-900 rounded-sm flex items-center justify-center">
                        <div className="w-3 h-3 bg-gray-900 rounded-xs"></div>
                      </div>
                      <div className="w-8 h-8 border-4 border-gray-900 rounded-sm flex items-center justify-center">
                        <div className="w-3 h-3 bg-gray-900 rounded-xs"></div>
                      </div>
                    </div>
                    {/* Center decorative emblem */}
                    <div className="absolute inset-0 m-auto w-9 h-9 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow-xs">
                      <Heart className="w-4 h-4 text-white fill-white" />
                    </div>
                    {/* Bottom marker */}
                    <div className="flex justify-between items-end">
                      <div className="w-8 h-8 border-4 border-gray-900 rounded-sm flex items-center justify-center">
                        <div className="w-3 h-3 bg-gray-900 rounded-xs"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-0.5 w-8 h-8">
                        <div className="w-2 h-2 bg-gray-900 rounded-xs"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-xs"></div>
                        <div className="w-2 h-2 bg-gray-900 rounded-xs"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-gray-600 mt-2">
                  QRIS Standar Bank Indonesia
                </span>
                <span className="text-[10px] text-gray-400">
                  Kompatibel BCA, Mandiri, GoPay, OVO, Dana
                </span>
              </div>

              {/* Channels List */}
              <div className="sm:col-span-7 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span className="font-semibold text-gray-700">Kanal Penerimaan Aktif</span>
                  <button 
                    onClick={() => {
                      if (onNavigateTab) {
                        onNavigateTab('atur_event');
                      } else {
                        alert('Buka tab Pengaturan untuk mengubah rekening penerima.');
                      }
                    }}
                    className="text-amber-600 hover:underline font-medium"
                  >
                    Ubah Rekening &rarr;
                  </button>
                </div>

                {/* BCA Virtual Account */}
                <div 
                  onClick={() => handleCopy('880192381129', 'BCA')}
                  className="p-3 bg-gray-50 hover:bg-gray-100/80 rounded-xl border border-gray-200/80 flex items-center justify-between gap-2 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center shrink-0">
                      BCA
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">BCA Virtual Account • Sarah Octavia</p>
                      <p className="text-[11px] font-mono text-gray-600">8801-9238-1129</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {copiedAccount === 'BCA' ? (
                      <span className="text-[10px] text-emerald-600 font-bold">Tersalin!</span>
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                </div>

                {/* Mandiri */}
                <div 
                  onClick={() => handleCopy('137001982341', 'MDR')}
                  className="p-3 bg-gray-50 hover:bg-gray-100/80 rounded-xl border border-gray-200/80 flex items-center justify-between gap-2 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-800 font-black text-xs flex items-center justify-center shrink-0">
                      MDR
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">Bank Mandiri • Dimas Aditya P.</p>
                      <p className="text-[11px] font-mono text-gray-600">137-00-198234-1</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {copiedAccount === 'MDR' ? (
                      <span className="text-[10px] text-emerald-600 font-bold">Tersalin!</span>
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                </div>

                {/* Instant Broadcast Scan */}
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/70 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                      <Radio className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">AirGuest Instant Broadcast Scan</p>
                      <p className="text-[11px] text-amber-800 truncate">Tampil di layar foyer tamu otomatis</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[10px] font-bold shrink-0">
                    Live
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* Riwayat Amplop Masuk Real-Time */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="font-bold text-base text-gray-900">
                  Riwayat Amplop Masuk Real-Time
                </h2>
                <p className="text-xs text-gray-500">
                  Sinkronisasi otomatis melalui gerbang payment gateway
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg text-xs self-start sm:self-auto overflow-x-auto max-w-full">
                {(['Semua', 'QRIS', 'Transfer Bank'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTxFilter(filter)}
                    className={`px-3 py-1 rounded-md font-semibold transition-all whitespace-nowrap ${
                      txFilter === filter
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* List of transactions */}
            <div className="divide-y divide-gray-100">
              {filteredTransactions.map((tx) => (
                <div key={tx.id} className="py-3.5 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {tx.avatarInitials || tx.senderName.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                          {tx.senderName}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 shrink-0">
                          {tx.relation}
                        </span>
                        <span className="text-[11px] text-gray-400 shrink-0">
                          {tx.timeAgo}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 italic line-clamp-2 break-words">
                        &ldquo;{tx.message}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-black text-xs sm:text-sm text-gray-900">
                      Rp {tx.amount.toLocaleString('id-ID')}
                    </div>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-600 font-semibold mt-0.5">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span className="hidden sm:inline">Terverifikasi Otomatis</span>
                      <span className="sm:hidden">Terverifikasi</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => alert('Memuat seluruh 142 arsip transaksi lengkap...')}
              className="w-full mt-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-700 transition-colors border border-gray-200/80"
            >
              Lihat Seluruh 142 Transaksi
            </button>
          </div>

        </div>

        {/* Right Column: Wishlist & Registri Kado + Reception Desk (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Wishlist & Registri Kado */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-600" />
                <h2 className="font-bold text-base text-gray-900">
                  Wishlist &amp; Registri Kado
                </h2>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                4 / 6 Terpenuhi
              </span>
            </div>

            {/* Add gift input form */}
            <form onSubmit={handleAddNewGift} className="mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ketik nama kado atau paste link Tokopedia/Shopee..."
                  value={newGiftName}
                  onChange={(e) => setNewGiftName(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-gray-50 focus:bg-white rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shrink-0 flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah</span>
                </button>
              </div>
            </form>

            {/* Wishlist Items List */}
            <div className="space-y-3">
              {wishlist.map((item) => {
                const isGiven = item.status === 'Telah Diberikan';
                const isShipping = item.status === 'Sedang Dikirim';
                const isAvailable = item.status === 'Masih Tersedia';

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isAvailable
                        ? 'border-l-4 border-l-amber-500 border-gray-200 bg-amber-50/20'
                        : 'border-gray-200/80 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                          <Gift className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-gray-900 leading-tight">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            Estimasi: {item.priceEstimate}
                          </p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isGiven
                            ? 'bg-amber-100 text-amber-800'
                            : isShipping
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                      {item.giver && (
                        <span>
                          <strong className="text-gray-700">Pemberi:</strong> {item.giver}
                        </span>
                      )}
                      {item.deliveryNote && (
                        <span className={item.giver ? 'text-gray-400' : 'text-gray-600'}>
                          {item.deliveryNote}
                        </span>
                      )}
                      {isAvailable && (
                        <button 
                          onClick={() => alert(`Link registri kado "${item.name}" telah disalin ke clipboard!`)}
                          className="text-amber-600 font-bold hover:underline ml-auto flex items-center gap-1"
                        >
                          <Share2 className="w-3 h-3" /> Bagikan Link Kado
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Meja Penerimaan Kado Venue */}
          <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200/80 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900">
                  Meja Penerimaan Kado Venue
                </h3>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  Operator Concierge: <strong className="text-gray-900">Faisal &amp; Annisa</strong> (Booth Utara)
                </p>
              </div>
            </div>

            <button
              onClick={() => alert('Mencetak label identifikasi kado fisik ke printer barcode thermal...')}
              className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 shrink-0 flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Label Box</span>
            </button>
          </div>

        </div>

      </div>

      {/* Dinding Doa Restu & Pesan Tamu (Bottom Interactive Section) */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              LIVE BROADCAST INTERAKTIF
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              Dinding Doa Restu &amp; Pesan Tamu
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Ucapan hangat yang masuk saat amplop digital atau kado dikirimkan
            </p>
          </div>

          <button
            onClick={onOpenLiveProjection}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 transition-colors self-start sm:self-auto shadow-2xs"
          >
            <Tv className="w-4 h-4 text-amber-600" />
            <span>Buka Tampilan Proyektor</span>
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="bg-gray-50/70 hover:bg-white rounded-2xl p-4 border border-gray-200/80 flex flex-col justify-between transition-all hover:shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center ${wish.avatarBg}`}>
                      {wish.avatarInitials}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900 leading-tight">
                        {wish.author}
                      </h4>
                      <p className="text-[10px] text-gray-400">
                        {wish.role}
                      </p>
                    </div>
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={() => onLikeWish(wish.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed italic">
                  &ldquo;{wish.message}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-[11px]">
                <span className="text-gray-500 font-medium">
                  {wish.giftTag}
                </span>
                <span className="flex items-center gap-1 font-bold text-amber-600">
                  👏 {wish.likes}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
