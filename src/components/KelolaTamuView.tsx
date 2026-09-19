import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Clock, 
  Gift, 
  Upload, 
  Printer, 
  UserPlus, 
  Radio, 
  Search, 
  SlidersHorizontal, 
  Check, 
  Hourglass, 
  Share2, 
  QrCode, 
  ChevronLeft, 
  ChevronRight,
  Send,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { Guest, TableAllocation } from '../types';
import { TABLE_ALLOCATIONS } from '../data';

interface KelolaTamuViewProps {
  guests: Guest[];
  onAddGuest: (guest: Guest) => void;
  onSelectGuestForTicket?: (guest: Guest) => void;
  onOpenKiosk?: () => void;
  searchFilter: string;
}

export const KelolaTamuView: React.FC<KelolaTamuViewProps> = ({
  guests,
  onAddGuest,
  onOpenKiosk,
  searchFilter: globalSearch,
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('Semua Tamu');
  const [rsvpFilter, setRsvpFilter] = useState('Semua');
  const [selectedGuest, setSelectedGuest] = useState<Guest>(guests[0]);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>(['AG-VIP-001']);
  
  // Form State for Quick Input
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('VVIP Kehormatan - Meja 01');
  const [formAmount, setFormAmount] = useState('1000000');
  const [formMethod, setFormMethod] = useState<'Amplop Fisik (Kotak Hadiah)' | 'QRIS AirGuest' | 'Transfer Bank'>('Amplop Fisik (Kotak Hadiah)');

  const categoryTabs = [
    { label: 'Semua Tamu', count: 450 },
    { label: 'VIP & VVIP', count: 48 },
    { label: 'Keluarga Inti', count: 36 },
    { label: 'Teman & Kolega', count: 280 },
    { label: 'Sudah Hadir', count: 214 },
    { label: 'Belum Hadir', count: 236 },
  ];

  const effectiveSearch = (localSearch || globalSearch).toLowerCase();

  const filteredGuests = guests.filter((g) => {
    const matchesSearch = 
      g.name.toLowerCase().includes(effectiveSearch) ||
      g.phone.toLowerCase().includes(effectiveSearch) ||
      g.table.toLowerCase().includes(effectiveSearch) ||
      g.category.toLowerCase().includes(effectiveSearch);

    if (!matchesSearch) return false;

    if (activeCategoryFilter === 'VIP & VVIP') {
      return g.category.includes('VIP') || g.category.includes('VVIP');
    }
    if (activeCategoryFilter === 'Keluarga Inti') {
      return g.category.includes('Keluarga') || g.category.includes('Kerabat');
    }
    if (activeCategoryFilter === 'Teman & Kolega') {
      return g.category.includes('Sahabat') || g.category.includes('Kolega') || g.category.includes('Alumni');
    }
    if (activeCategoryFilter === 'Sudah Hadir') {
      return g.attendanceStatus === 'Sudah Hadir';
    }
    if (activeCategoryFilter === 'Belum Hadir') {
      return g.attendanceStatus === 'Belum Hadir';
    }

    if (rsvpFilter !== 'Semua') {
      return g.rsvpStatus === rsvpFilter;
    }

    return true;
  });

  const handleSelectAll = () => {
    if (selectedRowIds.length === filteredGuests.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(filteredGuests.map((g) => g.id));
    }
  };

  const handleToggleRow = (id: string, guest: Guest) => {
    setSelectedGuest(guest);
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter((item) => item !== id));
    } else {
      setSelectedRowIds([...selectedRowIds, id]);
    }
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newGuest: Guest = {
      id: `AG-MAN-${Date.now().toString().slice(-4)}`,
      name: formName.trim(),
      phone: '+62 8' + Math.floor(100000000 + Math.random() * 900000000),
      category: formCategory.split(' - ')[0] || 'Tamu Reguler',
      table: formCategory.split(' - ')[1] || 'Meja Umum',
      pax: 2,
      rsvpStatus: 'Hadir',
      attendanceStatus: 'Sudah Hadir',
      checkInTime: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      souvenirTaken: true,
      souvenirCount: 1,
      envelopeAmount: parseInt(formAmount.replace(/\D/g, '')) || 0,
      paymentMethod: formMethod === 'QRIS AirGuest' ? 'QRIS AirGuest' : 'Tunai / Titip',
      avatarInitials: formName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    };

    onAddGuest(newGuest);
    setSelectedGuest(newGuest);
    setFormName('');
    alert(`Tamu ${newGuest.name} berhasil ditambahkan dan langsung tercatat hadir!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
            <span>RSVP &amp; ACCESS CONCIERGE</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500 font-normal">ID Acara #AG-9924</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Kelola Daftar Tamu &amp; Konfirmasi RSVP
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Pantau kehadiran secara touchless, alokasikan penomoran meja cerdas, dan broadcast tiket QR AirDrop secara instan.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start lg:self-auto">
          {onOpenKiosk && (
            <button
              onClick={onOpenKiosk}
              className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-400" />
              <span>Scan Kiosk</span>
            </button>
          )}

          <button
            onClick={() => alert('Fitur impor data tamu CSV/Excel dibuka.')}
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-colors shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5 text-gray-600" />
            <span>Import CSV</span>
          </button>

          <button
            onClick={() => alert('Mencetak seluruh kartu QR tamu berformat PDF A4...')}
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-gray-600" />
            <span>Cetak Kartu QR</span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('quick-add-guest-form');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                const input = document.getElementById('quick-input-guest-name');
                if (input) (input as HTMLInputElement).focus();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Tambah Tamu</span>
          </button>

          <button
            onClick={() => alert('Mengirim tiket AirDrop & link undangan digital via WhatsApp API ke 236 tamu belum check-in...')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-xs font-bold shadow-xs active:scale-98 transition-all"
          >
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Broadcast Undangan</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700 uppercase text-[10px] tracking-wider">TOTAL UNDANGAN</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 tracking-tight my-1 flex items-baseline gap-1.5">
            <span>450</span>
            <span className="text-xs font-medium text-gray-500">Jiwa</span>
          </div>
          <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500 flex items-center gap-1">
            <span>👥 240 Undangan Fisik/Digital</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700 uppercase text-[10px] tracking-wider">KONFIRMASI HADIR</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 tracking-tight my-1 flex items-baseline gap-1.5">
            <span>368</span>
            <span className="text-xs font-medium text-gray-500">(81.7%)</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 my-2 overflow-hidden">
            <div className="bg-amber-500 h-1.5 rounded-full w-[81.7%]"></div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700 uppercase text-[10px] tracking-wider">SUDAH CHECK-IN</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 tracking-tight my-1 flex items-baseline gap-1.5">
            <span>214</span>
            <span className="text-xs font-medium text-gray-500">Hadir</span>
          </div>
          <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Arus: 18 tamu / 10 menit</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700 uppercase text-[10px] tracking-wider">SOUVENIR TERBAGI</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Gift className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 tracking-tight my-1 flex items-baseline gap-1.5">
            <span>198</span>
            <span className="text-xs font-medium text-gray-500">/ 350 Pack</span>
          </div>
          <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500 flex items-center gap-1">
            <span>🎁 Sisa 152 paket di meja VIP</span>
          </div>
        </div>

      </div>

      {/* Main Content: Filter Pills + Table (8 cols) & Side Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Guest List Table & Controls (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categoryTabs.map((tab) => {
              const isActive = activeCategoryFilter === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveCategoryFilter(tab.label)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>

          {/* Search Bar & Status Dropdown */}
          <div className="bg-white p-3 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:flex-1">
              <input
                type="text"
                placeholder="Cari nama, meja, atau nomor telepon..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 focus:bg-white text-xs text-gray-800 placeholder-gray-400 rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-400"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={rsvpFilter}
                onChange={(e) => setRsvpFilter(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-hidden"
              >
                <option value="Semua">Status RSVP: Semua</option>
                <option value="Hadir">Hadir</option>
                <option value="Berhalangan">Berhalangan</option>
                <option value="Menunggu">Menunggu</option>
              </select>
              <button 
                onClick={() => alert('Filter lanjutan: Rentang Meja, Souvenir, dan Metode Amplop')}
                className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500"
                title="Filter Lanjutan"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bulk Selection Bar */}
          {selectedRowIds.length > 0 && (
            <div className="mb-3 px-4 py-2.5 bg-amber-50/90 border border-amber-200/80 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>{selectedRowIds.length} tamu dipilih</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    alert(`Menandai ${selectedRowIds.length} tamu terpilih sebagai Hadir & Souvenir Diambil.`);
                  }}
                  className="px-3 py-1 bg-white hover:bg-amber-100/70 border border-amber-300 text-amber-900 rounded-lg text-xs font-semibold shadow-2xs"
                >
                  Tandai Hadir
                </button>
                <button
                  onClick={() => {
                    alert(`Mengirim pesan WhatsApp tiket QR ke ${selectedRowIds.length} tamu terpilih.`);
                  }}
                  className="px-3 py-1 bg-white hover:bg-amber-100/70 border border-amber-300 text-amber-900 rounded-lg text-xs font-semibold shadow-2xs"
                >
                  Kirim Tiket WA
                </button>
                <button
                  onClick={() => setSelectedRowIds([])}
                  className="px-2.5 py-1 text-gray-600 hover:text-gray-900 text-xs font-medium"
                >
                  Batal
                </button>
              </div>
            </div>
          )}

          {/* Guest Table */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-xs">
                <thead className="bg-gray-50/80 text-gray-500 font-semibold border-b border-gray-100 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4 w-8">
                      <input
                        type="checkbox"
                        checked={selectedRowIds.length === filteredGuests.length && filteredGuests.length > 0}
                        onChange={handleSelectAll}
                        className="rounded-xs text-amber-500 focus:ring-amber-400"
                      />
                    </th>
                    <th className="py-3 px-3">Nama Tamu</th>
                    <th className="py-3 px-3">Kategori &amp; Meja</th>
                    <th className="py-3 px-3">RSVP</th>
                    <th className="py-3 px-3">Kehadiran</th>
                    <th className="py-3 px-3 text-center">Souvenir</th>
                    <th className="py-3 px-4 text-right">Nominal Amplop</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredGuests.map((guest) => {
                    const isSelected = selectedRowIds.includes(guest.id);
                    const isCheckedIn = guest.attendanceStatus === 'Sudah Hadir';

                    return (
                      <tr
                        key={guest.id}
                        onClick={() => setSelectedGuest(guest)}
                        className={`hover:bg-amber-50/30 transition-colors cursor-pointer ${
                          selectedGuest.id === guest.id ? 'bg-amber-50/50' : ''
                        }`}
                      >
                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleRow(guest.id, guest)}
                            className="rounded-xs text-amber-500 focus:ring-amber-400"
                          />
                        </td>
                        
                        {/* Nama Tamu */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] flex items-center justify-center shrink-0">
                              {guest.avatarInitials || guest.name.substring(0, 2)}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 leading-tight">
                                {guest.name}
                              </p>
                              <p className="text-[10px] text-gray-400 font-mono">
                                {guest.phone}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Kategori & Meja */}
                        <td className="py-3 px-3">
                          <p className="font-semibold text-gray-800">
                            {guest.category}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            {guest.table}
                          </p>
                        </td>

                        {/* RSVP */}
                        <td className="py-3 px-3">
                          {guest.rsvpStatus === 'Hadir' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100/70 text-amber-900 text-[10px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              Hadir ({guest.pax} Pax)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                              Berhalangan
                            </span>
                          )}
                        </td>

                        {/* Kehadiran */}
                        <td className="py-3 px-3">
                          {isCheckedIn ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold shadow-2xs">
                              Check-in {guest.checkInTime || '19:00'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-medium">
                              <Clock className="w-3 h-3" />
                              Belum Hadir
                            </span>
                          )}
                        </td>

                        {/* Souvenir */}
                        <td className="py-3 px-3 text-center">
                          {guest.souvenirTaken ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-800">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-400">
                              <Hourglass className="w-3 h-3" />
                            </span>
                          )}
                        </td>

                        {/* Nominal Amplop */}
                        <td className="py-3 px-4 text-right">
                          {guest.envelopeAmount ? (
                            <div>
                              <span className="font-bold text-gray-900">
                                Rp {guest.envelopeAmount.toLocaleString('id-ID')}
                              </span>
                              <p className="text-[10px] text-gray-400">
                                {guest.paymentMethod || 'Digital QRIS'}
                              </p>
                            </div>
                          ) : (
                            <span className="text-gray-400 italic text-[11px]">
                              -
                            </span>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
              <span>Menampilkan 1-6 dari 450 tamu terdaftar</span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => alert('Halaman sebelumnya')}
                  className="px-2.5 py-1 bg-white border border-gray-200 rounded-md font-medium hover:bg-gray-50"
                >
                  Sebelumnya
                </button>
                <button className="w-7 h-7 bg-amber-500 text-white rounded-md font-bold">1</button>
                <button className="w-7 h-7 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium">2</button>
                <button className="w-7 h-7 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium">3</button>
                <span className="px-1 text-gray-400">...</span>
                <button className="w-7 h-7 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md font-medium">45</button>
                <button 
                  onClick={() => alert('Halaman berikutnya')}
                  className="px-2.5 py-1 bg-white border border-gray-200 rounded-md font-medium hover:bg-gray-50"
                >
                  Berikutnya
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right: AirDrop Generator + Round Tables + NFC Stand (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Generator Tiket AirDrop Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-sm text-gray-900">
                  Generator Tiket AirDrop
                </h3>
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Tamu Terpilih
              </span>
            </div>

            {/* QR Card Preview */}
            <div className="bg-gradient-to-b from-amber-50/60 to-gray-50 p-5 rounded-2xl border border-gray-200 flex flex-col items-center text-center">
              <div className="bg-white p-3 rounded-xl shadow-xs border border-gray-200 mb-2">
                {/* Visual QR Code mock */}
                <div className="w-32 h-32 border-2 border-gray-800 rounded-lg p-2 flex flex-col justify-between relative bg-white">
                  <div className="flex justify-between">
                    <div className="w-7 h-7 border-4 border-gray-900 rounded-xs flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-gray-900"></div>
                    </div>
                    <div className="w-7 h-7 border-4 border-gray-900 rounded-xs flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-gray-900"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 m-auto w-7 h-7 rounded-full bg-amber-500 border border-white flex items-center justify-center shadow-xs">
                    <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-7 h-7 border-4 border-gray-900 rounded-xs flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-gray-900"></div>
                    </div>
                    <div className="w-7 h-7 grid grid-cols-2 gap-0.5">
                      <div className="bg-gray-900"></div>
                      <div className="bg-gray-400"></div>
                      <div className="bg-gray-500"></div>
                      <div className="bg-gray-900"></div>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="font-extrabold text-sm text-gray-900 mt-1">
                {selectedGuest.name}
              </h4>
              <p className="text-xs text-gray-500 font-mono">
                ID: {selectedGuest.id} • {selectedGuest.table}
              </p>

              <p className="text-[11px] text-gray-400 mt-2">
                Scan via kamera iPhone/Android untuk auto check-in tanpa antrean fisik.
              </p>

              <div className="grid grid-cols-2 gap-2 w-full mt-4">
                <button
                  onClick={() => alert(`AirDrop Pass berhasil dipancarkan ke perangkat ${selectedGuest.name}!`)}
                  className="px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-center gap-1.5"
                >
                  <Radio className="w-3.5 h-3.5 text-amber-600" />
                  <span>AirDrop Pass</span>
                </button>

                <button
                  onClick={() => alert(`Membuka WhatsApp Web untuk kirim tiket QR ke ${selectedGuest.phone}`)}
                  className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>WhatsApp QR</span>
                </button>
              </div>
            </div>
          </div>

          {/* Alokasi 25 Round Table */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-sm text-gray-900">
                  Alokasi 25 Round Table
                </h3>
              </div>
              <button 
                onClick={() => alert('Membuka denah ballroom interaktif')}
                className="text-xs font-bold text-amber-600 hover:underline"
              >
                Denah Ballroom &rarr;
              </button>
            </div>

            <div className="space-y-3.5">
              {TABLE_ALLOCATIONS.map((t) => {
                const percent = (t.occupied / t.capacity) * 100;
                return (
                  <div key={t.id}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-gray-800 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        {t.name}
                      </span>
                      <span className="font-mono text-gray-500 font-semibold">
                        {t.occupied} / {t.capacity} Kursi
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-amber-500 h-1.5 rounded-full"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {t.note}
                    </p>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => alert('Sistem otomatis mengatur balancing penomoran meja sesuai konfirmasi kehadiran...')}
              className="w-full mt-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-colors"
            >
              Atur Seating Chart Otomatis
            </button>
          </div>

          {/* NFC Touchless Tag Active Status */}
          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">
                NFC Touchless Tag Aktif
              </h4>
              <p className="text-[11px] text-amber-900 mt-0.5">
                Gate 1 &amp; Gate 2 terhubung ke 4 AirGuest Stand
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Quick Input: Tambah Tamu & Nominal Amplop (Bottom Form) */}
      <div id="quick-add-guest-form" className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-base text-gray-900">
              ⚡ Quick Input: Tambah Tamu &amp; Nominal Amplop
            </h3>
            <p className="text-xs text-gray-500">
              Catat tamu baru secara cepat beserta meja alokasi dan nominal amplop fisik/digital.
            </p>
          </div>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            FORMULIR AKTIF
          </span>
        </div>

        <form onSubmit={handleQuickSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Input 1: Nama Tamu */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Nama Lengkap Tamu
              </label>
              <input
                id="quick-input-guest-name"
                type="text"
                placeholder="Bpk. Hendra Gunawan"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 focus:bg-white text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-500"
                required
              />
            </div>

            {/* Input 2: Kategori & Meja */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Kategori &amp; Meja
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 focus:bg-white text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-500"
              >
                <option value="VVIP Kehormatan - Meja 01">VVIP Kehormatan - Meja 01</option>
                <option value="VIP Kolega Ortu - Meja 02">VIP Kolega Ortu - Meja 02</option>
                <option value="Keluarga Pengantin - Meja 03">Keluarga Pengantin - Meja 03</option>
                <option value="Rekan Kantor - Meja 12">Rekan Kantor - Meja 12</option>
                <option value="Sahabat SMA - Meja 09">Sahabat SMA - Meja 09</option>
              </select>
            </div>

            {/* Input 3: Nominal Amplop / Hadiah */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Nominal Amplop / Hadiah (Rp)
              </label>
              <input
                type="number"
                placeholder="1000000"
                value={formAmount}
                onChange={(e) => setFormAmount(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 focus:bg-white text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-500 font-mono"
              />
            </div>

            {/* Input 4: Metode Penyerahan */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Metode Penyerahan
              </label>
              <select
                value={formMethod}
                onChange={(e) => setFormMethod(e.target.value as any)}
                className="w-full px-3 py-2 bg-gray-50 focus:bg-white text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-500"
              >
                <option value="Amplop Fisik (Kotak Hadiah)">Amplop Fisik (Kotak Hadiah)</option>
                <option value="QRIS AirGuest">QRIS AirGuest (Scan Standee)</option>
                <option value="Transfer Bank">Transfer Bank (BCA / Mandiri)</option>
              </select>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Data amplop terenkripsi dan otomatis tersinkron ke buku kas amplop.</span>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  setFormName('');
                  setFormAmount('1000000');
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition-colors"
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                Simpan Tamu &amp; Amplop
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};
