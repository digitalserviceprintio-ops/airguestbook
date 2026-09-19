import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Wallet, 
  Gift, 
  Download, 
  Play, 
  Calendar, 
  MapPin, 
  Clock, 
  Radio, 
  ChevronDown, 
  MoreVertical, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare,
  Sparkles,
  Send,
  Sliders,
  QrCode
} from 'lucide-react';
import { Guest, NavigationTab } from '../types';

interface DashboardAdminViewProps {
  guests: Guest[];
  onOpenKiosk: () => void;
  onNavigateTab: (tab: NavigationTab) => void;
  searchQuery: string;
}

export const DashboardAdminView: React.FC<DashboardAdminViewProps> = ({
  guests,
  onOpenKiosk,
  onNavigateTab,
  searchQuery,
}) => {
  const [guestCategoryFilter, setGuestCategoryFilter] = useState<'Semua' | 'VIP' | 'Keluarga'>('Semua');
  const [massNotificationSent, setMassNotificationSent] = useState(false);

  // Filter checked in guests
  const checkedInGuests = guests.filter((g) => {
    const matchesSearch = 
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.table.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (guestCategoryFilter === 'VIP') return g.category.includes('VIP') || g.category.includes('VVIP');
    if (guestCategoryFilter === 'Keluarga') return g.category.includes('Keluarga') || g.category.includes('Kerabat');
    return true;
  });

  const handleSendMassNotification = () => {
    setMassNotificationSent(true);
    setTimeout(() => setMassNotificationSent(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Event Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-amber-700 mb-1">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              AIRGUEST BEAM ACTIVE
            </span>
            <span className="text-gray-400 font-normal">142 perangkat terdeteksi di venue</span>
          </div>

          <p className="text-xs font-bold text-gray-500 tracking-wider uppercase mt-1">
            RESEPSI PERNIKAHAN
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            The Wedding of Sarah &amp; Dimas
          </h1>

          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-gray-600 mt-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              Sabtu, 24 Mei 2025
            </span>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              Grand Ballroom Hotel Mulia, Jakarta
            </span>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              <Clock className="w-3.5 h-3.5" />
              Sesi 1 Berlangsung (03:24:18)
            </span>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-auto">
          <button
            onClick={() => alert('Mengunduh rekapitulasi data tamu & absensi (Format Excel .XLSX)...')}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4 text-gray-600" />
            <span>Download Rekap Data</span>
          </button>

          <button
            onClick={onOpenKiosk}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-98 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            <QrCode className="w-4 h-4" />
            <span>Mulai Check-In Tamu</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Total Tamu */}
        <div 
          onClick={() => onNavigateTab('tamu')}
          className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs relative cursor-pointer hover:border-amber-300 transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700">Total Tamu Diundang</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 tracking-tight my-1 flex items-baseline gap-1.5">
            <span>450</span>
            <span className="text-xs font-medium text-gray-500">orang</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium mt-3 pt-3 border-t border-gray-100">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              318 Hadir
            </span>
            <span className="flex items-center gap-1 text-rose-500 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              45 Menolak
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              87 Pending
            </span>
          </div>
        </div>

        {/* Stat 2: Kehadiran Saat Ini */}
        <div 
          onClick={() => onNavigateTab('tamu')}
          className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs relative cursor-pointer hover:border-amber-300 transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700">Kehadiran Saat Ini (Live)</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 tracking-tight my-1 flex items-baseline gap-1.5">
            <span>214</span>
            <span className="text-xs font-medium text-gray-500">/ 318 Konfirmasi (67%)</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 my-2 overflow-hidden">
            <div className="bg-amber-500 h-1.5 rounded-full w-[67%] transition-all duration-500"></div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2">
            <span className="text-emerald-600 font-semibold">↗ +28 tamu dlm 15 mnt</span>
            <span className="text-amber-600 font-bold group-hover:underline">Buka Tamu &rarr;</span>
          </div>
        </div>

        {/* Stat 3: Amplop Digital */}
        <div 
          onClick={() => onNavigateTab('amplop')}
          className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs relative cursor-pointer hover:border-amber-300 transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700">Amplop Digital Terkumpul</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 tracking-tight my-1">
            Rp 48.750.000
          </div>
          <p className="text-[11px] text-gray-500">
            Dari 142 amplop via QRIS &amp; Transfer
          </p>
          <div className="flex items-center justify-between text-[11px] text-gray-500 mt-3 pt-3 border-t border-gray-100">
            <span>Rata-rata: Rp 343.300</span>
            <span className="text-amber-600 font-bold group-hover:underline">
              Rincian &rarr;
            </span>
          </div>
        </div>

        {/* Stat 4: Kado Fisik */}
        <div 
          onClick={() => onNavigateTab('amplop')}
          className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs relative cursor-pointer hover:border-amber-300 transition-all"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700">Kado Fisik Terdaftar</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Gift className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 tracking-tight my-1 flex items-baseline gap-1.5">
            <span>38</span>
            <span className="text-xs font-medium text-gray-500">hadiah fisik</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-500">
            <span>26 Diterima Meja Kado</span>
            <span>12 Dikirim ke Rumah</span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
            <CheckCircle className="w-3 h-3" />
            <span>100% Terverifikasi barcode</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Live Guest Check-In Feed + Proximity Beam & Wishes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live Guest Check-In Feed (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <h2 className="font-bold text-base text-gray-900">
                Live Guest Check-In Feed
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                214 Masuk
              </span>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg text-xs self-start sm:self-auto">
              {(['Semua', 'VIP', 'Keluarga'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGuestCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-md font-semibold transition-all ${
                    guestCategoryFilter === cat
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {cat === 'Semua' ? 'Semua (214)' : cat === 'VIP' ? 'VIP (34)' : 'Keluarga (56)'}
                </button>
              ))}
            </div>
          </div>

          {/* Guest Feed List */}
          <div className="divide-y divide-gray-100">
            {checkedInGuests.map((guest) => (
              <div key={guest.id} className="py-3.5 flex items-center justify-between gap-2 sm:gap-3 group">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-200">
                    {guest.avatarInitials || guest.name.substring(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                        {guest.name}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 shrink-0">
                        {guest.category}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 truncate">
                      Pukul {guest.checkInTime || '19:30 WIB'} • {guest.pax} Pax • {guest.table}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {guest.souvenirTaken ? (
                    <span className="px-2 sm:px-2.5 py-1 bg-amber-50 border border-amber-200/80 text-amber-800 rounded-lg text-[10px] sm:text-[11px] font-bold flex items-center gap-1">
                      <Gift className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="hidden sm:inline">Souvenir Diambil ({guest.souvenirCount})</span>
                      <span className="sm:hidden">Souvenir ({guest.souvenirCount})</span>
                    </span>
                  ) : (
                    <span className="px-2 sm:px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] sm:text-[11px] font-medium flex items-center gap-1">
                      <span className="hidden sm:inline">Belum Ambil Souvenir</span>
                      <span className="sm:hidden">Belum Ambil</span>
                    </span>
                  )}

                  <button 
                    onClick={() => alert(`Detail profil tamu: ${guest.name}\nMeja: ${guest.table}\nStatus: ${guest.attendanceStatus}`)}
                    className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg transition-colors shrink-0"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Show more button */}
          <button 
            onClick={() => onNavigateTab('tamu')}
            className="w-full mt-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-700 transition-colors border border-gray-200/80 flex items-center justify-center gap-1.5"
          >
            <span>Tampilkan 209 Tamu Lainnya di Daftar Tamu</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Column: AirGuest Proximity Beam Radar + Ucapan Terbaru (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AirGuest Proximity Beam Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-amber-600 animate-pulse" />
                <h3 className="font-bold text-sm sm:text-base text-gray-900">
                  AirGuest Proximity Beam
                </h3>
              </div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Radius 25m Aktif
              </span>
            </div>

            {/* Interactive Radar Graphic */}
            <div className="relative w-full h-56 bg-gradient-to-b from-gray-50 to-amber-50/20 rounded-2xl border border-gray-200 flex items-center justify-center overflow-hidden">
              
              {/* Concentric rings */}
              <div className="absolute w-48 h-48 rounded-full border border-amber-200/60 animate-ping opacity-25"></div>
              <div className="absolute w-40 h-40 rounded-full border border-amber-200"></div>
              <div className="absolute w-28 h-28 rounded-full border border-amber-300"></div>
              <div className="absolute w-16 h-16 rounded-full border border-amber-400"></div>

              {/* Center Hub */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-amber-500 border-4 border-white shadow-md flex flex-col items-center justify-center text-white">
                <Radio className="w-5 h-5 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-wider mt-0.5">AIRGUEST</span>
              </div>

              {/* Detected Devices Floating on Radar */}
              <div className="absolute top-6 left-12 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5 text-[10px] font-bold text-gray-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                iPhone Dimas F.
              </div>

              <div className="absolute top-10 right-8 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5 text-[10px] font-bold text-gray-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Pixel 8 Citra
              </div>

              <div className="absolute bottom-8 right-16 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5 text-[10px] font-bold text-gray-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Galaxy S24 Sarah
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-3">
              Mendeteksi smartphone tamu yang mendekati gerbang utama untuk mengirim buku ucapan &amp; barcode check-in instan.
            </p>

            {/* Beacon Actions */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={handleSendMassNotification}
                className="px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-colors flex items-center justify-center gap-1"
              >
                <Send className="w-3.5 h-3.5 text-amber-600" />
                <span>{massNotificationSent ? 'Terkirim!' : 'Kirim Notifikasi Massal'}</span>
              </button>

              <button
                onClick={() => onNavigateTab('atur_event')}
                className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Atur Beacon Venue</span>
              </button>
            </div>
          </div>

          {/* Ucapan & Amplop Terbaru */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-sm sm:text-base text-gray-900">
                  Ucapan &amp; Amplop Terbaru
                </h3>
              </div>
              <button 
                onClick={() => onNavigateTab('amplop')}
                className="text-xs font-bold text-amber-600 hover:underline"
              >
                Lihat Semua (142)
              </button>
            </div>

            <div className="space-y-3">
              
              {/* Message 1 */}
              <div className="p-3 bg-gray-50/70 rounded-xl border border-gray-200/70">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-900">
                    dr. Hendra Wijaya &amp; Istri
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    Rp 1.500.000 (QRIS)
                  </span>
                </div>
                <p className="text-xs text-gray-600 italic">
                  &ldquo;Selamat berbahagia Sarah &amp; Dimas! Semoga menjadi keluarga yang sakinah mawaddah warahmah, selalu dilimpahi rezeki dan kehangatan cinta.&rdquo;
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400">
                  <span>4 mnt lalu</span>
                  <button 
                    onClick={() => alert('Pesan balasan terima kasih terkirim ke WhatsApp dr. Hendra Wijaya!')}
                    className="text-amber-600 hover:underline font-semibold"
                  >
                    Balas Terima Kasih
                  </button>
                </div>
              </div>

              {/* Message 2 */}
              <div className="p-3 bg-gray-50/70 rounded-xl border border-gray-200/70">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-900">
                    Maya Kartika Sari
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    Rp 500.000 (BCA)
                  </span>
                </div>
                <p className="text-xs text-gray-600 italic">
                  &ldquo;Happy wedding Sarah my dearest partner! Finally you tied the knot. Wishing both of you a wonderful lifelong journey ahead!&rdquo;
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400">
                  <span>12 mnt lalu</span>
                  <button 
                    onClick={() => alert('Pesan balasan terima kasih terkirim ke WhatsApp Maya Kartika Sari!')}
                    className="text-amber-600 hover:underline font-semibold"
                  >
                    Balas Terima Kasih
                  </button>
                </div>
              </div>

              {/* Message 3 */}
              <div className="p-3 bg-gray-50/70 rounded-xl border border-gray-200/70">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-900">
                    Keluarga Besar Alm. Sutanto
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
                    Kado Fisik (Microwave)
                  </span>
                </div>
                <p className="text-xs text-gray-600 italic">
                  &ldquo;Doa terbaik kami untuk kedua mempelai dan keluarga besar. Semoga rukun selalu sampai anak cucu.&rdquo;
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400">
                  <span>19 mnt lalu</span>
                  <button 
                    onClick={() => alert('Pesan balasan terima kasih terkirim ke WhatsApp Keluarga Alm. Sutanto!')}
                    className="text-amber-600 hover:underline font-semibold"
                  >
                    Balas Terima Kasih
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
