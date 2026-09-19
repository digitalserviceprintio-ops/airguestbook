import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  MapPin, 
  Users, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Radio, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  HeartHandshake,
  KeyRound,
  ChevronRight,
  Tv
} from 'lucide-react';
import { UserAccount, NavigationTab } from '../types';
import { loginWithGoogle } from '../firebase/config';
import { syncUserProfile } from '../firebase/services';

interface AuthViewProps {
  initialMode?: 'login' | 'register';
  onLoginSuccess: (user: UserAccount) => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  initialMode = 'login',
  onLoginSuccess,
  onNavigateTab,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialMode);

  React.useEffect(() => {
    setAuthMode(initialMode);
  }, [initialMode]);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('sarah.octavia@airguest.id');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');
  const [loginRole, setLoginRole] = useState<'Mempelai' | 'Wedding Organizer' | 'Operator Concierge'>('Mempelai');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regPartnerName, setRegPartnerName] = useState('');
  const [regEventName, setRegEventName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEventDate, setRegEventDate] = useState('2025-06-28');
  const [regVenue, setRegVenue] = useState('');
  const [regGuestCount, setRegGuestCount] = useState('300 - 500 Tamu');
  const [regPassword, setRegPassword] = useState('');
  const [regTermsAccepted, setRegTermsAccepted] = useState(true);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const user: UserAccount = {
        id: 'USR-001',
        name: loginRole === 'Mempelai' ? 'Sarah Octavia & Dimas Aditya' : 'Vows & Co. Wedding Planner',
        partnerName: loginRole === 'Mempelai' ? 'Dimas Aditya Pratama' : undefined,
        email: loginIdentifier || 'sarah.dimas@wedding.com',
        phone: '+62 812-9876-5432',
        role: loginRole,
        eventName: 'The Wedding of Sarah & Dimas',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      };
      setSuccessMessage('Berhasil masuk ke konsol acara AirGuest!');
      setTimeout(() => {
        onLoginSuccess(user);
        onNavigateTab('dashboard');
      }, 600);
    }, 500);
  };

  const handleQuickDemoLogin = (role: 'Mempelai' | 'Wedding Organizer') => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const user: UserAccount = {
        id: role === 'Mempelai' ? 'USR-SARAH-DIMAS' : 'USR-WO-VOWS',
        name: role === 'Mempelai' ? 'Sarah Octavia & Dimas' : 'Vows & Co. Wedding Planner',
        partnerName: role === 'Mempelai' ? 'Dimas Aditya' : undefined,
        email: role === 'Mempelai' ? 'sarah.dimas@wedding.com' : 'organizer@vowsco.id',
        phone: '+62 812-8800-9911',
        role: role,
        eventName: 'The Wedding of Sarah & Dimas',
      };
      onLoginSuccess(user);
      onNavigateTab('dashboard');
    }, 400);
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setLoading(true);
    try {
      const fbUser = await loginWithGoogle();
      if (fbUser) {
        const user: UserAccount = {
          id: fbUser.uid,
          name: fbUser.displayName || 'Penyelenggara Acara',
          partnerName: 'Dimas Aditya Pratama',
          email: fbUser.email || 'user@wedding.com',
          phone: fbUser.phoneNumber || '+62 812-9876-5432',
          role: fbUser.email === 'windariwindari605@gmail.com' ? 'Wedding Organizer' : loginRole,
          eventName: 'The Wedding of Sarah & Dimas',
          avatarUrl: fbUser.photoURL || undefined,
        };
        await syncUserProfile(user);
        setSuccessMessage('Berhasil masuk via Google Firebase Authentication!');
        setTimeout(() => {
          onLoginSuccess(user);
          onNavigateTab('dashboard');
        }, 500);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Gagal masuk dengan Google');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regTermsAccepted) {
      setErrorMessage('Silakan setujui Ketentuan Layanan & Kebijakan Privasi AirGuest untuk melanjutkan.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const newUser: UserAccount = {
        id: `USR-${Date.now().toString().slice(-4)}`,
        name: regName || 'Sarah Octavia',
        partnerName: regPartnerName || 'Dimas Aditya',
        email: regEmail || 'sarah.octavia@gmail.com',
        phone: regPhone || '+62 812-3344-5566',
        role: 'Mempelai',
        eventName: regEventName || `The Wedding of ${regName} & ${regPartnerName || 'Pasangan'}`,
      };
      setSuccessMessage('Akun berhasil dibuat! Mengalihkan ke Dashboard Acara Anda...');
      setTimeout(() => {
        onLoginSuccess(newUser);
        onNavigateTab('atur_event');
      }, 800);
    }, 600);
  };

  return (
    <div className="py-4 sm:py-8 animate-in fade-in duration-300">
      
      {/* Container Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Side: Brand Showcase & Atmosphere (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#18181B] via-[#202025] to-[#121214] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle decorative background glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-black border border-amber-400/40 flex items-center justify-center shadow-lg shadow-amber-500/10">
                <div className="w-6 h-6 rounded-full border-2 border-amber-400 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <span className="text-xs font-black tracking-widest text-amber-400 uppercase">
                  AIRGUEST CONCIERGE
                </span>
                <h1 className="text-xl font-extrabold tracking-tight text-white">
                  AirGuest Portal
                </h1>
              </div>
            </div>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
              Platform modern manajemen resepsi pernikahan &amp; event touchless dengan verifikasi kedatangan instan serta amplop digital QRIS langsung cair ke rekening.
            </p>

            {/* Feature highlights list */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                  <Radio className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">AirDrop Proximity Check-In</h4>
                  <p className="text-[11px] text-gray-400">Pancarkan tiket QR atau verifikasi kehadiran tanpa antrean ballroom.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                  <CreditCard className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Amplop QRIS &amp; BI-FAST Instan</h4>
                  <p className="text-[11px] text-gray-400">Pencairan tanda kasih langsung ke rekening BCA / Mandiri H+0.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                  <Tv className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Live Foyer Projection</h4>
                  <p className="text-[11px] text-gray-400">Tampilkan doa restu tamu secara estetik di panggung proyektor.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Event Preview Card at bottom of left panel */}
          <div className="relative z-10 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Event Terkini
              </span>
              <span className="text-[10px] text-gray-400">Live Ballroom</span>
            </div>
            <p className="text-xs font-bold text-white mb-0.5">The Wedding of Sarah &amp; Dimas</p>
            <p className="text-[11px] text-gray-400">Grand Ballroom Hotel Mulia • 353 Tamu Hadir</p>
          </div>

          {/* Security footnote */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-400" /> Standar QRIS BI &amp; TLS 1.3
            </span>
            <span>AirGuest v2.4</span>
          </div>

        </div>

        {/* Right Side: Auth Forms (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
          
          <div>
            {/* Top Switcher Tabs (Masuk vs Daftar) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-6">
              <div className="inline-flex p-1 bg-gray-100 rounded-xl w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`flex-1 sm:flex-initial px-3 sm:px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                    authMode === 'login'
                      ? 'bg-white text-gray-900 shadow-xs'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Masuk ke Akun
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`flex-1 sm:flex-initial px-3 sm:px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                    authMode === 'register'
                      ? 'bg-white text-gray-900 shadow-xs'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Daftar Akun Baru
                </button>
              </div>

              <button
                type="button"
                onClick={() => onNavigateTab('dashboard')}
                className="text-xs text-gray-500 hover:text-amber-600 font-medium transition-colors self-start sm:self-auto"
              >
                Kembali ke Beranda &rarr;
              </button>
            </div>

            {/* Error / Success Feedback Notifications */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* FORM 1: LOGIN (Masuk ke Akun) */}
            {authMode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Selamat Datang Kembali</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Silakan masuk untuk mengelola meja tamu, amplop digital, dan siaran live foyer resepsi.
                  </p>
                </div>

                {/* Google Firebase Login Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2.5 shadow-2xs hover:border-amber-300 transition-all active:scale-98"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Masuk dengan Google (Firebase Auth)</span>
                </button>

                <div className="flex items-center my-2 text-[11px] text-gray-400">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-3 font-medium">atau masuk dengan email / peran</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* Peran / Role Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Masuk Sebagai:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'Mempelai', label: 'Mempelai' },
                      { id: 'Wedding Organizer', label: 'Wedding Organizer' },
                      { id: 'Operator Concierge', label: 'Operator Meja' }
                    ].map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setLoginRole(role.id as any)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                          loginRole === role.id
                            ? 'bg-amber-50/80 border-amber-500 text-amber-950 ring-1 ring-amber-400'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {role.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email or WhatsApp Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email atau Nomor WhatsApp
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="contoh: sarah.dimas@wedding.com atau 0812..."
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 focus:bg-white text-xs text-gray-900 rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                      required
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-gray-700">
                      Kata Sandi
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Instruksi pemulihan kata sandi telah dikirim ke email/WhatsApp terdaftar!')}
                      className="text-[11px] text-amber-600 hover:text-amber-700 font-semibold"
                    >
                      Lupa kata sandi?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Masukkan kata sandi akun..."
                      className="w-full pl-9 pr-10 py-2.5 bg-gray-50 focus:bg-white text-xs text-gray-900 rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                      required
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 absolute right-3 top-1/2 -translate-y-1/2 p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 border-gray-300 focus:ring-amber-400"
                  />
                  <label htmlFor="remember" className="text-xs text-gray-600 select-none">
                    Ingat saya di perangkat concierge ini
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all"
                >
                  {loading ? (
                    <span>Memverifikasi akun...</span>
                  ) : (
                    <>
                      <span>Masuk ke Konsol Acara</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Quick 1-Click Demo Logins */}
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-[11px] font-semibold text-gray-500 mb-2">
                    ⚡ Akses Demo Instan (Sekali Klik):
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('Mempelai')}
                      className="p-2.5 rounded-xl border border-gray-200 hover:border-amber-400 bg-gray-50/60 hover:bg-amber-50/40 text-left transition-all"
                    >
                      <div className="text-[11px] font-bold text-gray-900">Mempelai (Sarah &amp; Dimas)</div>
                      <div className="text-[10px] text-gray-500">Akses penuh saldo &amp; tamu</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('Wedding Organizer')}
                      className="p-2.5 rounded-xl border border-gray-200 hover:border-amber-400 bg-gray-50/60 hover:bg-amber-50/40 text-left transition-all"
                    >
                      <div className="text-[11px] font-bold text-gray-900">Wedding Organizer (Vows &amp; Co.)</div>
                      <div className="text-[10px] text-gray-500">Kelola logistik &amp; RSVP</div>
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* FORM 2: REGISTER (Daftar Akun Baru) */}
            {authMode === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Daftarkan Pernikahan Anda</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Buat akun AirGuest dan siapkan buku tamu digital, amplop QRIS, dan check-in touchless dalam 2 menit.
                  </p>
                </div>

                {/* Row 1: Names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nama Calon Pengantin (Anda)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="contoh: Sarah Octavia"
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-400"
                        required
                      />
                      <User className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nama Pasangan
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={regPartnerName}
                        onChange={(e) => setRegPartnerName(e.target.value)}
                        placeholder="contoh: Dimas Aditya"
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-400"
                        required
                      />
                      <HeartHandshake className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                {/* Event Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Judul Acara Resepsi
                  </label>
                  <input
                    type="text"
                    value={regEventName}
                    onChange={(e) => setRegEventName(e.target.value)}
                    placeholder="contoh: The Wedding of Sarah & Dimas"
                    className="w-full px-3 py-2 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-400"
                    required
                  />
                </div>

                {/* Row 2: Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="email@wedding.com"
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-400"
                        required
                      />
                      <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nomor WhatsApp (Aktif)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+62 812..."
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-400"
                        required
                      />
                      <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                {/* Row 3: Date and Estimated Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Tanggal Rencana Resepsi
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={regEventDate}
                        onChange={(e) => setRegEventDate(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-400"
                        required
                      />
                      <Calendar className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Estimasi Jumlah Tamu
                    </label>
                    <select
                      value={regGuestCount}
                      onChange={(e) => setRegGuestCount(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-400"
                    >
                      <option value="100 - 300 Tamu">100 - 300 Tamu (Intimate Wedding)</option>
                      <option value="300 - 500 Tamu">300 - 500 Tamu (Ballroom Standar)</option>
                      <option value="500 - 1000 Tamu">500 - 1000 Tamu (Grand Reception)</option>
                      <option value="> 1000 Tamu">&gt; 1000 Tamu (Mega Ballroom)</option>
                    </select>
                  </div>
                </div>

                {/* Password for Registration */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Buat Kata Sandi Akun
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Minimal 8 karakter..."
                      className="w-full pl-8 pr-10 py-2 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-400"
                      required
                    />
                    <KeyRound className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 absolute right-3 top-1/2 -translate-y-1/2 p-1"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="regTerms"
                    checked={regTermsAccepted}
                    onChange={(e) => setRegTermsAccepted(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-amber-500 border-gray-300 focus:ring-amber-400"
                  />
                  <label htmlFor="regTerms" className="text-[11px] text-gray-600 leading-snug select-none">
                    Saya menyetujui <span className="text-amber-600 font-semibold cursor-pointer">Ketentuan Layanan</span> dan <span className="text-amber-600 font-semibold cursor-pointer">Kebijakan Privasi</span> AirGuest Indonesia.
                  </label>
                </div>

                {/* Submit Register */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all"
                >
                  {loading ? (
                    <span>Mempersiapkan Konsol Acara...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Buat Akun &amp; Mulai Event Gratis</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

          {/* Social and Footnote */}
          <div className="pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
            Butuh bantuan teknis pendaftaran? Hubungi Concierge kami di <span className="text-amber-600 font-semibold">+62 811-AIR-GUEST</span>
          </div>

        </div>

      </div>

    </div>
  );
};
