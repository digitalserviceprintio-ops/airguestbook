import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Clock, 
  FileText, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Wallet, 
  Gift, 
  Send,
  Users,
  Building
} from 'lucide-react';

interface LaporanAnalitikViewProps {
  onExportPDF: () => void;
  onExportExcel: () => void;
  onSendWhatsAppReport: () => void;
}

export const LaporanAnalitikView: React.FC<LaporanAnalitikViewProps> = ({
  onExportPDF,
  onExportExcel,
  onSendWhatsAppReport
}) => {
  const arrivalHours = [
    { time: '17:30', count: 12, height: '15%' },
    { time: '18:00', count: 28, height: '35%' },
    { time: '18:30', count: 64, height: '70%' },
    { time: '19:00', count: 98, height: '100%', peak: true },
    { time: '19:30', count: 82, height: '85%' },
    { time: '20:00', count: 46, height: '48%' },
    { time: '20:30', count: 18, height: '20%' },
    { time: '21:00', count: 5, height: '8%' },
  ];

  const breakdownByCategory = [
    { label: 'Keluarga & Kerabat', amount: 'Rp 32.400.000', percent: 39, color: 'bg-amber-500' },
    { label: 'VVIP & VIP Sahabat', amount: 'Rp 26.800.000', percent: 32, color: 'bg-blue-500' },
    { label: 'Kolega Kantor & Bisnis', amount: 'Rp 14.500.000', percent: 18, color: 'bg-emerald-500' },
    { label: 'Alumni & Sahabat Kampus', amount: 'Rp 8.900.000', percent: 11, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Banner */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
            <span>EVENT INTELLIGENCE &amp; AUDIT</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500 font-normal">Laporan Real-Time</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Laporan Kehadiran &amp; Kas Keuangan
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Audit akurat dan rekapitulasi data tamu, souvenir, serta total amplop digital dan tunai.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start lg:self-auto">
          <button
            onClick={onExportPDF}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 shadow-2xs transition-colors"
          >
            <Download className="w-4 h-4 text-gray-600" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={onExportExcel}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 shadow-2xs transition-colors"
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Export Excel (.XLSX)</span>
          </button>

          <button
            onClick={onSendWhatsAppReport}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-98 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Ringkasan WA</span>
          </button>
        </div>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700 uppercase text-[10px] tracking-wider">TOTAL AMPLOP MASUK</span>
            <Wallet className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight my-1">
            Rp 82.600.000
          </div>
          <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500 space-y-0.5">
            <p className="flex justify-between">
              <span>QRIS &amp; Transfer:</span>
              <strong className="text-gray-800">Rp 48.750.000</strong>
            </p>
            <p className="flex justify-between">
              <span>Tunai / Kotak Fisik:</span>
              <strong className="text-gray-800">Rp 33.850.000</strong>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700 uppercase text-[10px] tracking-wider">RASIO KEHADIRAN</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight my-1">
            78.4%
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 my-2 overflow-hidden">
            <div className="bg-emerald-500 h-1.5 rounded-full w-[78.4%]"></div>
          </div>
          <div className="text-[11px] text-gray-500">
            353 hadir dari 450 total undangan
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700 uppercase text-[10px] tracking-wider">JAM KEDATANGAN PUNCAK</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight my-1">
            19:00 - 19:30 WIB
          </div>
          <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500">
            Arus puncak 98 tamu dalam 30 menit
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700 uppercase text-[10px] tracking-wider">SOUVENIR KELUAR</span>
            <Gift className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight my-1 flex items-baseline gap-1.5">
            <span>298</span>
            <span className="text-xs font-medium text-gray-500">/ 350 Paket</span>
          </div>
          <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500 flex justify-between">
            <span>Tersisa di Meja:</span>
            <strong className="text-amber-800 font-bold">52 Paket</strong>
          </div>
        </div>

      </div>

      {/* 2 Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Kurva Arus Kedatangan Tamu (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-base text-gray-900">
                Arus Kedatangan Tamu (Per 30 Menit)
              </h2>
              <p className="text-xs text-gray-500">
                Pencatatan real-time via gerbang QRIS, NFC Stand, dan AirDrop Scanner
              </p>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Sinkron Live
            </span>
          </div>

          {/* Bar chart visualization */}
          <div className="overflow-x-auto pb-2">
            <div className="h-56 min-w-[360px] flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-gray-100">
              {arrivalHours.map((item) => (
                <div key={item.time} className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end">
                  <span className="text-[10px] font-bold text-gray-600 group-hover:text-amber-600">
                    {item.count}
                  </span>
                  <div 
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      item.peak ? 'bg-amber-500 shadow-xs' : 'bg-amber-200/70 hover:bg-amber-300'
                    }`}
                    style={{ height: item.height }}
                  ></div>
                  <span className="text-[10px] text-gray-400 font-mono mt-1 text-center whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-amber-500"></span>
              Puncak Kepadatan Acara
            </span>
            <span>Total Check-in: 353 Tamu</span>
          </div>
        </div>

        {/* Right: Pembagian Kategori Amplop (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-base text-gray-900">
                Distribusi Amplop per Kategori
              </h2>
              <p className="text-xs text-gray-500">
                Total perolehan berdasarkan relasi undangan
              </p>
            </div>
            <PieChart className="w-4 h-4 text-amber-600" />
          </div>

          <div className="space-y-3.5 mt-4">
            {breakdownByCategory.map((cat) => (
              <div key={cat.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-gray-800 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-xs ${cat.color}`}></span>
                    {cat.label}
                  </span>
                  <span className="font-bold text-gray-900">
                    {cat.amount}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full ${cat.color}`}
                    style={{ width: `${cat.percent}%` }}
                  ></div>
                </div>
                <div className="text-right text-[10px] text-gray-400 mt-0.5 font-medium">
                  {cat.percent}% dari total
                </div>
              </div>
            ))}
          </div>

          {/* Audit Verification Stamp */}
          <div className="mt-5 p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 flex items-center gap-2.5 text-xs text-amber-900">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Tervalidasi oleh Saksi Keuangan &amp; Bendahara Keluarga: <strong>H. Rahmat M.</strong></span>
          </div>
        </div>

      </div>

    </div>
  );
};
