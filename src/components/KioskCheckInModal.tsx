import React, { useState, useEffect } from 'react';
import { 
  X, 
  QrCode, 
  CheckCircle2, 
  Gift, 
  UserCheck, 
  Sparkles, 
  Radio, 
  Printer,
  Camera
} from 'lucide-react';
import { Guest } from '../types';

interface KioskCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  guests: Guest[];
  onCheckInGuest: (guestId: string) => void;
}

export const KioskCheckInModal: React.FC<KioskCheckInModalProps> = ({
  isOpen,
  onClose,
  guests,
  onCheckInGuest,
}) => {
  const [selectedGuestId, setSelectedGuestId] = useState<string>('');
  const [scannedGuest, setScannedGuest] = useState<Guest | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setScannedGuest(null);
      setIsScanning(true);
      setSelectedGuestId(guests[2]?.id || guests[0]?.id || '');
    }
  }, [isOpen, guests]);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    const target = guests.find((g) => g.id === selectedGuestId);
    if (!target) return;

    setIsScanning(false);
    onCheckInGuest(target.id);
    setScannedGuest({
      ...target,
      attendanceStatus: 'Sudah Hadir',
      checkInTime: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      souvenirTaken: true,
    });
  };

  const handleResetScan = () => {
    setScannedGuest(null);
    setIsScanning(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#18181B] text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-sm sm:text-base leading-tight truncate">
                AirGuest Touchless Scanner
              </h3>
              <p className="text-[10px] sm:text-[11px] text-amber-400 font-medium truncate">
                Pindai Barcode Tamu / AirDrop Proximity Gate
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
        <div className="p-4 sm:p-6">
          {isScanning ? (
            <div className="flex flex-col items-center text-center space-y-4">
              
              {/* Camera viewfinder mockup */}
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 max-w-full bg-gray-950 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-amber-500 shadow-inner">
                {/* Crosshairs */}
                <div className="absolute inset-4 border border-dashed border-amber-400/60 rounded-xl"></div>
                
                {/* Laser animation line */}
                <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#f59e0b] animate-bounce top-1/2 -translate-y-1/2"></div>
                
                <div className="flex flex-col items-center gap-2 text-gray-400 text-xs">
                  <Camera className="w-8 h-8 text-amber-400 animate-pulse" />
                  <span>Arahkan QR Tiket ke Kamera</span>
                </div>

                <div className="absolute bottom-2 left-0 right-0 text-[10px] text-amber-300 font-mono">
                  Optical AI Detection: Active
                </div>
              </div>

              {/* Simulation selector for testing */}
              <div className="w-full text-left bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Simulasi Pindai Undangan Tamu:
                </label>
                <select
                  value={selectedGuestId}
                  onChange={(e) => setSelectedGuestId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-gray-300 focus:outline-hidden focus:border-amber-500 font-medium"
                >
                  {guests.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} ({g.category} • {g.table})
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleSimulateScan}
                  className="w-full mt-3 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-98 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Pindai Sekarang (Simulasi Touchless)</span>
                </button>
              </div>

            </div>
          ) : scannedGuest ? (
            /* Scanned Success View */
            <div className="space-y-4 text-center animate-in zoom-in-95 duration-200">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  CHECK-IN BERHASIL TERVERIFIKASI
                </span>
                <h4 className="text-xl font-extrabold text-gray-900 mt-2">
                  {scannedGuest.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {scannedGuest.category} • {scannedGuest.pax} Orang
                </p>
              </div>

              <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Alokasi Meja:</span>
                  <strong className="text-gray-900 font-bold">{scannedGuest.table}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Waktu Kedatangan:</span>
                  <span className="font-mono text-gray-800">{scannedGuest.checkInTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paket Souvenir:</span>
                  <strong className="text-amber-800 font-bold flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5" /> 1 Paket Exclusive AirGuest
                  </strong>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => alert(`Mencetak kupon souvenir untuk ${scannedGuest.name}...`)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Kupon Souvenir</span>
                </button>
                <button
                  onClick={handleResetScan}
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  Scan Tamu Berikutnya
                </button>
              </div>

            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
};
