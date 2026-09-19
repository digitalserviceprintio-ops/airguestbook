import React, { useState } from 'react';
import { 
  Settings, 
  Heart, 
  Calendar, 
  MapPin, 
  Radio, 
  CreditCard, 
  Bell, 
  Users, 
  Save, 
  ShieldCheck,
  CheckCircle2,
  Lock,
  LogIn,
  UserPlus
} from 'lucide-react';

interface AturEventViewProps {
  onOpenAuth?: (mode?: 'login' | 'register') => void;
}

export const AturEventView: React.FC<AturEventViewProps> = ({ onOpenAuth }) => {
  const [eventName, setEventName] = useState('The Wedding of Sarah & Dimas');
  const [brideName, setBrideName] = useState('Sarah Octavia, S.E.');
  const [groomName, setGroomName] = useState('Dimas Aditya Pratama, S.T.');
  const [eventDate, setEventDate] = useState('2025-05-24');
  const [eventTime, setEventTime] = useState('18:00 - 21:30 WIB');
  const [venue, setVenue] = useState('Grand Ballroom Hotel Mulia, Senayan, Jakarta');
  const [bcaAccount, setBcaAccount] = useState('8801-9238-1129');
  const [bcaOwner, setBcaOwner] = useState('Sarah Octavia');
  const [mandiriAccount, setMandiriAccount] = useState('137-00-198234-1');
  const [mandiriOwner, setMandiriOwner] = useState('Dimas Aditya P.');
  const [beaconRadius, setBeaconRadius] = useState('25m');
  const [autoWelcomeWA, setAutoWelcomeWA] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Banner */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
            <span>KONFIGURASI CONCIERGE</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500 font-normal">AirGuest Core Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Atur Event &amp; Profil Acara
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Pengaturan profil pengantin, gerbang pembayaran QRIS, kanal transfer bank, serta radius AirGuest Proximity.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Pengaturan Berhasil Disimpan!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Data Acara & Mempelai */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Heart className="w-5 h-5 text-amber-600" />
            <h2 className="font-bold text-base text-gray-900">
              Informasi Pengantin &amp; Venue
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Judul Acara
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 focus:bg-white text-xs rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-hidden font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Mempelai Wanita
              </label>
              <input
                type="text"
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 focus:bg-white text-xs rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Mempelai Pria
              </label>
              <input
                type="text"
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 focus:bg-white text-xs rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Tanggal Acara
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 focus:bg-white text-xs rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-hidden font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Waktu Acara
              </label>
              <input
                type="text"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 focus:bg-white text-xs rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-hidden font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Lokasi &amp; Ballroom
            </label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 focus:bg-white text-xs rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-hidden font-medium"
            />
          </div>
        </div>

        {/* Right Column: QRIS, Rekening & Beacon */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <CreditCard className="w-5 h-5 text-amber-600" />
            <h2 className="font-bold text-base text-gray-900">
              Gerbang Rekening &amp; Beacon Venue
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                BCA Virtual Account
              </label>
              <input
                type="text"
                value={bcaAccount}
                onChange={(e) => setBcaAccount(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 focus:bg-white text-xs rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-hidden font-mono"
              />
              <p className="text-[10px] text-gray-400 mt-1">A.N. {bcaOwner}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Bank Mandiri
              </label>
              <input
                type="text"
                value={mandiriAccount}
                onChange={(e) => setMandiriAccount(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 focus:bg-white text-xs rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-hidden font-mono"
              />
              <p className="text-[10px] text-gray-400 mt-1">A.N. {mandiriOwner}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Radius AirGuest Proximity Beam
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {['10m (Pintu Masuk)', '25m (Foyer Ballroom)', '50m (Lobby Utama)'].map((r) => {
                const val = r.split(' ')[0];
                const isSelected = beaconRadius === val;
                return (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setBeaconRadius(val)}
                    className={`py-2 px-2 text-center rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-gray-800">
              <input
                type="checkbox"
                checked={autoWelcomeWA}
                onChange={(e) => setAutoWelcomeWA(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded-xs focus:ring-amber-400"
              />
              <span>Kirim sambutan WhatsApp otomatis saat tamu terdeteksi tiba di venue</span>
            </label>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-98 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>

        </div>

      </form>

      {/* Akun & Keamanan Sesi Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>Akun &amp; Sesi Masuk AirGuest</span>
          </div>
          <h3 className="text-base font-bold text-gray-900">
            Sesi Pengguna: Sarah Octavia &amp; Dimas
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Email terhubung: <span className="font-semibold text-gray-700">sarah.dimas@wedding.com</span> • Peran: <span className="font-semibold text-amber-700">Mempelai (Penyelenggara)</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenAuth?.('login')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <LogIn className="w-3.5 h-3.5 text-amber-600" />
            <span>Ganti Akun / Masuk</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenAuth?.('register')}
            className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <UserPlus className="w-3.5 h-3.5 text-amber-600" />
            <span>Daftar Acara Baru</span>
          </button>
        </div>
      </div>

    </div>
  );
};
