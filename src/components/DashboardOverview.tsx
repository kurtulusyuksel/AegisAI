import React from 'react';
import { SecurityScanResult } from '../types/security';
import { USOM_ALERTS } from '../engine/securityEngine';
import { CyberDefenseCore3D } from './CyberDefenseCore3D';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  Radio, 
  ArrowRight, 
  Lock, 
  Zap,
  GlobeLock,
  Cpu,
  Layers,
  Terminal
} from 'lucide-react';
import { ActiveSecurityTab } from './Navbar';

interface DashboardOverviewProps {
  scanResult: SecurityScanResult;
  onNavigate: (tab: ActiveSecurityTab) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ scanResult, onNavigate }) => {
  const { metrics, overallRiskScore, securityGrade } = scanResult;

  const isSafe = metrics.criticalCount === 0 && metrics.highCount === 0;

  return (
    <div className="space-y-8 pb-16">
      
      {/* 3D Holo-Core ve Hero Bölümü */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Sol: Hero Açıklama (7 Kolon) */}
        <div className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900/90 via-[#0a1226]/90 to-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-4 font-mono">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>USOM & OWASP OTONOM SAVUNMA MOTORU CANLI</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Yapay Zeka Destekli <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Otonom Siber Savunma
              </span> & Zero-Day Kalkanı
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed font-normal">
              Kaynak kodlardaki sıfır-gün açıklarını, SQLi, SSRF, IDOR zafiyetlerini ve KVKK 6698 veri sızıntılarını milisaniyeler içinde tespit edin. 
              Doğrudan üretime hazır <strong className="text-white">Git Diff güvenlik yamaları</strong> ile sistemi kendi kendine onarın.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-slate-800/80">
            <button
              onClick={() => onNavigate('scanner')}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 text-xs font-mono uppercase"
            >
              <span>KOD TARAMASINI BAŞLAT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('patchViewer')}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-4 py-2.5 rounded-xl transition-all text-xs font-mono"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Otonom Yamayı Gör</span>
            </button>
          </div>
        </div>

        {/* Sağ: 3D İnteraktif Holo-Core (5 Kolon) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <CyberDefenseCore3D
            isCompromised={!isSafe}
            riskScore={overallRiskScore}
            criticalCount={metrics.criticalCount}
          />
        </div>

      </div>

      {/* KPI & Siber Metrik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Güvenlik Notu & Risk Skoru */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between shadow-lg backdrop-blur-md">
          <div>
            <div className="text-[10px] text-slate-400 font-mono tracking-wider">GÜVENLİK DERECESİ</div>
            <div className="text-3xl font-black font-mono mt-1 flex items-baseline space-x-2">
              <span className={isSafe ? 'text-emerald-400' : 'text-rose-400'}>{securityGrade}</span>
              <span className="text-xs text-slate-500 font-normal">Risk: {overallRiskScore}/100</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {isSafe ? 'Sistem Tam Korumada' : `${metrics.criticalCount} Kritik Risk Mevcut!`}
            </div>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
            isSafe ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}>
            {isSafe ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
          </div>
        </div>

        {/* Kritik Açıklar */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between shadow-lg backdrop-blur-md">
          <div>
            <div className="text-[10px] text-slate-400 font-mono tracking-wider">KRİTİK ZAFİYETLER</div>
            <div className="text-3xl font-black text-rose-400 font-mono mt-1">
              {metrics.criticalCount} <span className="text-xs text-slate-400 font-normal">Adet</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">CVSS 9.0+ Zero-Day Riski</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* KVKK / PII Sızıntıları */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between shadow-lg backdrop-blur-md">
          <div>
            <div className="text-[10px] text-slate-400 font-mono tracking-wider">KVKK 6698 İHLALLERİ</div>
            <div className="text-3xl font-black text-amber-400 font-mono mt-1">
              {metrics.kvkkViolationsCount} <span className="text-xs text-slate-400 font-normal">Açık Metin</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">TCKN, IBAN Açık Loglar</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
        </div>

        {/* MTTR Süre Tasarrufu */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between shadow-lg backdrop-blur-md">
          <div>
            <div className="text-[10px] text-slate-400 font-mono tracking-wider">ORTALAMA ONARIM (MTTR)</div>
            <div className="text-3xl font-black text-cyan-400 font-mono mt-1">
              ~0.8 <span className="text-xs text-slate-400 font-normal">saniye</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Manuel 14 güne kıyasla</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* USOM Canlı Tehdit Akışı ve Zafiyet Önizlemesi */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sol: USOM Canlı Tehdit Akışı (7 Kolon) */}
        <div className="lg:col-span-7 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                🇹🇷 USOM (Ulusal Siber Olaylara Müdahale) Canlı Tehdit Akışı
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              Eşzamanlı Yayın
            </span>
          </div>

          <div className="space-y-3">
            {USOM_ALERTS.map(alert => (
              <div 
                key={alert.id}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">{alert.id}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded font-bold bg-rose-950/60 text-rose-400 border border-rose-800">
                    {alert.riskLevel} RİSK
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white">{alert.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{alert.mitigation}</p>
                <div className="text-[10px] text-slate-500 font-mono pt-1">
                  Kapsam: {alert.affectedSystems} • Tarih: {alert.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ: Aktif Kod Durumu ve Auto-Patch (5 Kolon) */}
        <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Aktif Denetim: {scanResult.targetFileName}
              </h3>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Taranan Satır:</span>
                <span className="font-mono text-white font-bold">{scanResult.linesScanned} Satır</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Hedef Dil:</span>
                <span className="font-mono text-cyan-400 font-bold uppercase">{scanResult.language}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Zafiyet Sayısı:</span>
                <span className="font-mono text-rose-400 font-bold">{scanResult.findings.length} Adet</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Otonom Yama:</span>
                <span className="font-mono text-emerald-400 font-bold">HAZIR (%100 Çözüm)</span>
              </div>
            </div>

            {/* Zafiyet Özeti */}
            <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <div className="font-semibold text-white mb-1">Müdahale Özeti:</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {scanResult.remediationDiff.patchDescription}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('patchViewer')}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-xs font-mono uppercase"
          >
            <span>Yapay Zeka Yamasını İncele & Uygula</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
