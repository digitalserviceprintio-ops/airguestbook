import React, { useState, useEffect, useRef } from 'react';
import { 
  QrCode, 
  Search, 
  Radio, 
  ChevronDown, 
  Menu, 
  X, 
  Tv, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  User, 
  LogIn, 
  LogOut, 
  UserPlus,
  LayoutDashboard,
  Users,
  Wallet,
  BarChart3,
  Settings
} from 'lucide-react';
import { NavigationTab, UserAccount } from '../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenKiosk: () => void;
  onOpenLiveProjection: () => void;
  user?: UserAccount | null;
  onOpenAuth?: (mode?: 'login' | 'register') => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  onOpenKiosk,
  onOpenLiveProjection,
  user,
  onOpenAuth,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const eventDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (eventDropdownRef.current && !eventDropdownRef.current.contains(event.target as Node)) {
        setShowEventDropdown(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tamu', label: 'Buku Tamu', icon: Users },
    { id: 'amplop', label: 'Amplop & Kado', icon: Wallet },
    { id: 'laporan', label: 'Laporan', icon: BarChart3 },
    { id: 'atur_event', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-17 gap-3">
          
          {/* Left: Brand Logo & Event Pill */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Logo */}
            <div 
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#18181B] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200 border border-amber-500/30">
                <div className="relative flex items-center justify-center">
                  <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full border-2 border-amber-400/80 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-gray-900 leading-none">
                  Air<span className="text-amber-500">Guest</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 tracking-wider uppercase mt-0.5">
                  Touchless Concierge
                </span>
              </div>
            </div>

            {/* Event Selector Pill */}
            <div className="relative hidden xl:block" ref={eventDropdownRef}>
              <button
                onClick={() => setShowEventDropdown(!showEventDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100/80 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 transition-colors"
                title="Pilih Acara"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span className="truncate max-w-[130px] font-bold">Sarah &amp; Dimas</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              </button>

              {showEventDropdown && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-200/90 p-3 z-50 text-xs animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/70 mb-2">
                    <p className="font-bold text-gray-900">The Wedding of Sarah &amp; Dimas</p>
                    <p className="text-gray-500 text-[11px] mt-1 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-amber-600" /> Sabtu, 24 Mei 2025
                    </p>
                    <p className="text-gray-500 text-[11px] flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3 h-3 text-amber-600" /> Grand Ballroom Hotel Mulia
                    </p>
                    <div className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Event Berlangsung
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      onSelectTab('atur_event');
                      setShowEventDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-xl text-gray-700 font-medium transition-colors flex items-center justify-between"
                  >
                    <span>Pengaturan Acara</span>
                    <span className="text-gray-400">&rarr;</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Center: Clean Segmented Navigation Bar (Desktop) */}
          <nav className="hidden lg:flex items-center p-1 bg-gray-100/80 rounded-2xl border border-gray-200/60 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 xl:px-3.5 xl:py-1.5 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Actions Cluster */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Live Projection Stage Button */}
            <button
              onClick={onOpenLiveProjection}
              title="Buka tampilan layar proyektor panggung untuk tamu"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 rounded-xl text-amber-900 text-xs font-bold transition-all shadow-2xs"
            >
              <Tv className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="hidden xl:inline">Layar Tamu</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
            </button>

            {/* Scan QR Button */}
            <button
              onClick={onOpenKiosk}
              className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 hover:bg-black active:scale-98 text-white rounded-xl text-xs font-bold shadow-xs transition-all duration-150 whitespace-nowrap"
            >
              <QrCode className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">Scan QR</span>
            </button>

            {/* User Profile / Auth Button */}
            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-1.5 sm:gap-2 pl-1.5 pr-2 sm:pr-2.5 py-1.5 rounded-xl border border-gray-200 hover:border-amber-400 bg-gray-50/80 hover:bg-white transition-all text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden xl:block">
                    <p className="text-xs font-bold text-gray-900 leading-none truncate max-w-[100px]">
                      {user.name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-amber-700 font-semibold leading-none mt-0.5">
                      {user.role}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                </button>

                {/* User Dropdown Menu */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-gray-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800">
                        {user.role}
                      </span>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          onSelectTab('atur_event');
                          setShowUserDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-amber-50/60 hover:text-amber-900 flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-amber-600" />
                        <span>Profil Acara &amp; Rekening</span>
                      </button>
                      <button
                        onClick={() => {
                          onOpenAuth?.('login');
                          setShowUserDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-amber-50/60 hover:text-amber-900 flex items-center gap-2"
                      >
                        <LogIn className="w-3.5 h-3.5 text-blue-600" />
                        <span>Ganti Akun / Masuk</span>
                      </button>
                      <button
                        onClick={() => {
                          onOpenAuth?.('register');
                          setShowUserDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-amber-50/60 hover:text-amber-900 flex items-center gap-2"
                      >
                        <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Daftar Acara Baru</span>
                      </button>
                    </div>
                    <div className="pt-1 border-t border-gray-100">
                      <button
                        onClick={() => {
                          onLogout?.();
                          setShowUserDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Keluar (Logout)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth?.('login')}
                className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5 text-white shrink-0" />
                <span className="hidden sm:inline">Masuk / Daftar</span>
                <span className="sm:hidden">Masuk</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl focus:outline-hidden transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-3 space-y-3 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-5rem)] overflow-y-auto">
            
            {/* Search in Drawer */}
            <div className="px-1">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Cari tamu, meja, atau amplop..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-gray-100 text-xs text-gray-800 placeholder-gray-400 rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-400"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Navigation List */}
            <div className="grid grid-cols-1 gap-1 px-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                      isActive
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>

            {/* Quick Action Buttons in Drawer */}
            <div className="grid grid-cols-2 gap-2 px-1 pt-1">
              <button
                onClick={() => {
                  onOpenKiosk();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-gray-900 text-white rounded-xl text-xs font-bold shadow-xs"
              >
                <QrCode className="w-3.5 h-3.5 text-amber-400" />
                <span>Scan QR</span>
              </button>

              <button
                onClick={() => {
                  onOpenLiveProjection();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-500 text-white rounded-xl text-xs font-bold shadow-xs"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Layar Tamu</span>
              </button>
            </div>

            {/* Mobile Account Section */}
            <div className="pt-2 px-1 border-t border-gray-100">
              {user ? (
                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
                      <p className="text-[10px] text-gray-500 truncate">{user.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => {
                        onOpenAuth?.('login');
                        setMobileMenuOpen(false);
                      }}
                      className="p-1.5 text-gray-600 hover:text-amber-600 rounded-lg hover:bg-gray-200/60"
                      title="Ganti Akun"
                    >
                      <LogIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onLogout?.();
                        setMobileMenuOpen(false);
                      }}
                      className="p-1.5 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50"
                      title="Keluar"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth?.('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk ke Akun / Daftar Baru</span>
                </button>
              )}
            </div>

            {/* Status Footer in Drawer */}
            <div className="pt-2 px-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
              <span className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                AirDrop Proximity Active
              </span>
              <span className="text-emerald-700 font-semibold">● Live Sync</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
