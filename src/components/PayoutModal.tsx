import React, { useState } from 'react';
import { X, Wallet, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  onConfirmPayout: (amount: number) => void;
}

export const PayoutModal: React.FC<PayoutModalProps> = ({
  isOpen,
  onClose,
  availableBalance,
  onConfirmPayout,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(availableBalance);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePayout = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onConfirmPayout(selectedAmount);
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#18181B] text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-sm sm:text-base leading-tight truncate">
                Tarik Dana Amplop Digital
              </h3>
              <p className="text-[10px] sm:text-[11px] text-amber-400 font-medium truncate">
                Pencairan Instan Real-Time ke Rekening Pengantin
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {isSuccess ? (
            <div className="text-center py-6 space-y-3 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-lg font-extrabold text-gray-900">
                Pencairan Berhasil Diproses!
              </h4>
              <p className="text-xs text-gray-500">
                Dana sebesar <strong>Rp {selectedAmount.toLocaleString('id-ID')}</strong> sedang ditransfer ke rekening BCA Sarah Octavia via BI-FAST instan.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
                <span className="text-[11px] text-amber-800 font-bold uppercase tracking-wider">
                  SALDO TERSEDIA
                </span>
                <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
                  Rp {availableBalance.toLocaleString('id-ID')}
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Seluruh persembahan amplop via QRIS &amp; Transfer terverifikasi.
                </p>
              </div>

              {/* Rekening Tujuan */}
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                <span className="text-gray-500 font-medium">Rekening Tujuan Terdaftar:</span>
                <p className="font-bold text-gray-900 mt-0.5">Bank Central Asia (BCA)</p>
                <p className="font-mono text-gray-700">8801-9238-1129 • Sarah Octavia</p>
              </div>

              {/* Quick Amount Choices */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Pilih Nominal Penarikan:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[10000000, 25000000, availableBalance].map((amt, idx) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSelectedAmount(amt)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                        selectedAmount === amt
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      {idx === 2 ? 'Tarik Semua' : `Rp ${(amt / 1000000).toFixed(0)} Jt`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
                <span>Biaya Transaksi BI-FAST:</span>
                <strong className="text-emerald-600 font-bold">Gratis (AirGuest Pro)</strong>
              </div>

              <button
                onClick={handlePayout}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 active:scale-98 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>Konfirmasi Tarik Dana</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
