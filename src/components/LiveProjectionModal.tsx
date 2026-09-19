import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Heart, 
  QrCode, 
  Radio, 
  Sparkles, 
  Maximize2, 
  Send,
  Users,
  Play
} from 'lucide-react';
import { GuestWish } from '../types';

interface LiveProjectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishes: GuestWish[];
  onAddWish: (wish: GuestWish) => void;
}

export const LiveProjectionModal: React.FC<LiveProjectionModalProps> = ({
  isOpen,
  onClose,
  wishes,
  onAddWish,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [message, setMessage] = useState('');
  const [showInputBox, setShowInputBox] = useState(false);
  const [highlightedWishId, setHighlightedWishId] = useState<string | null>(null);
  const prevTopWishIdRef = useRef<string | null>(wishes[0]?.id || null);

  // Detect when a new wish arrives at the top of the stream
  useEffect(() => {
    const currentTopId = wishes[0]?.id;
    if (currentTopId && currentTopId !== prevTopWishIdRef.current) {
      setHighlightedWishId(currentTopId);
      prevTopWishIdRef.current = currentTopId;

      const timer = setTimeout(() => {
        setHighlightedWishId((curr) => (curr === currentTopId ? null : curr));
      }, 4500);

      return () => clearTimeout(timer);
    }
    prevTopWishIdRef.current = currentTopId || null;
  }, [wishes]);

  if (!isOpen) return null;

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    const newWish: GuestWish = {
      id: `LIVE-${Date.now()}`,
      author: authorName.trim(),
      role: 'Tamu Ballroom',
      message: message.trim(),
      likes: 1,
      giftTag: 'Amplop Terkirim',
      avatarInitials: authorName.trim().substring(0, 2).toUpperCase(),
      avatarBg: 'bg-amber-500 text-white'
    };

    setHighlightedWishId(newWish.id);
    onAddWish(newWish);
    setMessage('');
    setShowInputBox(false);
  };

  const handleSimulateIncomingWish = () => {
    const samples = [
      {
        author: 'Prasetyo & Maya',
        role: 'Sahabat Kuliah Sarah',
        message: 'Barakallahu lakuma, semoga sakinah mawaddah warahmah sampai akhir hayat!',
        giftTag: 'Amplop Terkirim • QRIS AirGuest',
        initials: 'PM',
        bg: 'bg-emerald-600 text-white'
      },
      {
        author: 'Keluarga Besar dr. Bambang',
        role: 'Kolega Keluarga Dimas',
        message: 'Selamat berbahagia Sarah & Dimas! Pesta resepsinya sangat megah dan penuh berkah.',
        giftTag: 'Kado Terdaftar • Coffee Machine',
        initials: 'KB',
        bg: 'bg-blue-600 text-white'
      },
      {
        author: 'Anisa Rahmawati',
        role: 'Rekan Kerja Dimas',
        message: 'Happy wedding guys! Selamat menempuh petualangan baru berdua, langgeng selalu!',
        giftTag: 'Amplop Terkirim • BCA VA',
        initials: 'AR',
        bg: 'bg-purple-600 text-white'
      }
    ];

    const pick = samples[Math.floor(Math.random() * samples.length)];
    const simWish: GuestWish = {
      id: `SIM-${Date.now()}`,
      author: pick.author,
      role: pick.role,
      message: pick.message,
      likes: 2,
      giftTag: pick.giftTag,
      avatarInitials: pick.initials,
      avatarBg: pick.bg
    };

    setHighlightedWishId(simWish.id);
    onAddWish(simWish);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F0F12] text-white flex flex-col overflow-y-auto animate-in fade-in duration-300">
      
      {/* Top Bar for Event Projection Controls */}
      <div className="p-3 sm:py-4 sm:px-8 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-black/40 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20 shrink-0">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-amber-400 truncate">
                AIRGUEST LIVE PROJECTION
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Sync
              </span>
            </div>
            <h2 className="text-xs sm:text-base font-black truncate">
              The Wedding of Sarah &amp; Dimas
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={handleSimulateIncomingWish}
            title="Simulasikan tamu mengirim doa baru secara real-time"
            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-gray-200 text-xs font-semibold transition-all flex items-center gap-1.5 hover:text-white"
          >
            <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
            <span className="hidden sm:inline">Simulasi Doa Masuk</span>
            <span className="sm:hidden">Simulasi</span>
          </button>

          <button
            onClick={() => setShowInputBox(!showInputBox)}
            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 rounded-full text-amber-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Kirim Doa</span>
          </button>

          <button
            onClick={onClose}
            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-semibold text-gray-300 transition-colors flex items-center gap-1"
          >
            <X className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Tutup Layar</span>
          </button>
        </div>
      </div>

      {/* Main Stage Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-10 flex flex-col justify-between">
        
        {/* Top Hero Heading */}
        <div className="text-center my-4">
          <p className="text-amber-400 font-semibold tracking-widest text-xs sm:text-sm uppercase mb-2">
            Selamat Datang di Resepsi Pernikahan
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Sarah Octavia <span className="text-amber-400">&amp;</span> Dimas Aditya
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">
            Grand Ballroom Hotel Mulia • Sabtu, 24 Mei 2025
          </p>
        </div>

        {/* Input box popup if opened */}
        {showInputBox && (
          <form onSubmit={handleSendWish} className="max-w-md mx-auto w-full bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 mb-6 animate-in slide-in-from-top-4 shadow-2xl">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Tulis Doa Restu Langsung ke Layar:
              </h4>
              <button
                type="button"
                onClick={() => setShowInputBox(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Nama Anda / Pasangan..."
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 text-white rounded-lg text-xs border border-white/20 mb-2 focus:outline-hidden focus:border-amber-400 transition-colors"
              required
            />
            <textarea
              placeholder="Tulis ucapan dan doa restu..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 text-white rounded-lg text-xs border border-white/20 mb-2 focus:outline-hidden focus:border-amber-400 transition-colors"
              rows={2}
              required
            />
            
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {[
                'Barakallahu lakuma, sakinah selamanya!',
                'Happy wedding! Langgeng selalu berdua ❤️',
                'Pesta yang indah, selamat berbahagia!'
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMessage(suggestion)}
                  className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-amber-300 border border-white/10 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowInputBox(false)}
                className="px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
              >
                <Send className="w-3 h-3" />
                <span>Kirim ke Layar</span>
              </button>
            </div>
          </form>
        )}

        {/* Dynamic Wishes Wall with Subtle Pulse Highlight Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
          {wishes.slice(0, 6).map((wish, index) => {
            const isNew = wish.id === highlightedWishId;

            return (
              <div
                key={wish.id}
                className={`relative rounded-2xl p-5 backdrop-blur-xs flex flex-col justify-between transition-all duration-700 ${
                  isNew
                    ? 'bg-gradient-to-b from-amber-500/20 via-amber-900/10 to-white/5 border-2 border-amber-400 shadow-[0_0_35px_rgba(251,191,36,0.35)] ring-1 ring-amber-400/60 scale-[1.02]'
                    : 'bg-white/5 border border-white/10 hover:border-amber-400/40'
                } animate-in fade-in`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Subtle animated pulse halo & badge for newly added wish */}
                {isNew && (
                  <>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/40 via-yellow-300/30 to-amber-500/40 rounded-2xl blur-[2px] -z-10 animate-pulse pointer-events-none" />
                    <div className="absolute -top-3 left-5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-gray-950 shadow-lg shadow-amber-400/30 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                      <Sparkles className="w-3 h-3 fill-current text-gray-950" />
                      <span>Doa Baru Masuk</span>
                    </div>
                  </>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-full font-black text-xs flex items-center justify-center shadow-inner ${wish.avatarBg}`}>
                      {wish.avatarInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-white">{wish.author}</h4>
                        {isNew && (
                          <span className="text-[10px] text-amber-400 font-semibold animate-pulse">
                            • Baru
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-amber-300/80">{wish.role}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed italic">
                    &ldquo;{wish.message}&rdquo;
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span className={isNew ? 'text-amber-300 font-medium' : ''}>{wish.giftTag}</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {wish.likes}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with QRIS instructions */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-white p-1 shrink-0 flex items-center justify-center shadow-md">
              <QrCode className="w-9 h-9 text-gray-900" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-white">
                Scan QRIS AirGuest di Meja Tamu Anda
              </h4>
              <p className="text-xs text-gray-300">
                Kirim amplop tanda kasih atau doa restu langsung muncul di layar ini secara touchless.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-semibold text-amber-300">
            <span>● 353 Tamu Hadir</span>
            <span>•</span>
            <span>25 Meja Terisi Penuh</span>
          </div>
        </div>

      </div>

    </div>
  );
};
