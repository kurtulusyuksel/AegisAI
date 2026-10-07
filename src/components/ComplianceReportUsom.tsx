import React, { useState } from 'react';
import { SecurityScanResult } from '../types/security';
import { 
  FileCheck2, 
  ShieldCheck, 
  Download, 
  Copy, 
  Check, 
  Lock, 
  Scale, 
  AlertCircle,
  Building2,
  FileText
} from 'lucide-react';

interface ComplianceReportUsomProps {
  scanResult: SecurityScanResult;
}

export const ComplianceReportUsom: React.FC<ComplianceReportUsomProps> = ({ scanResult }) => {
  const [copied, setCopied] = useState(false);

  const complianceData = {
    denetim_basligi: "AegisAI Kurumsal Siber Güvenlik & Regülasyon Uyumluluk Raporu",
    tarih: scanResult.timestamp,
    taranan_dosya: scanResult.targetFileName,
    genel_guvenlik_derecesi: scanResult.securityGrade,
    risk_skoru: scanResult.overallRiskScore,
    kvkk_6698_uyumu: scanResult.metrics.kvkkViolationsCount === 0 ? "TAM UYUMLU" : "İHLAL MEVCUT",
    usom_eslesmesi: `${scanResult.metrics.usomMatchesCount} Eşleşen Tehdit Kategorisi`,
    owasp_top10_ihlal_sayisi: scanResult.findings.length,
    bulgular: scanResult.findings.map(f => ({
      cwe: f.cweId,
      baslik: f.title,
      seviye: f.severity,
      cvss: f.cvssScore,
      satir: f.lineNumber,
      oneri: f.remediationPlan
    }))
  };

  const jsonString = JSON.stringify(complianceData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AegisAI_Compliance_Report_${scanResult.targetFileName}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Başlık ve Eylemler */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Scale className="w-5 h-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              USOM, KVKK & Regülasyon Uyumluluk Raporu
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Türkiye Cumhuriyeti regülasyonlarına (KVKK 6698, USOM, BDDK) ve uluslararası standartlara (OWASP, CWE) uygunluk denetimi.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all font-mono"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Kopyalandı!' : 'JSON Kopyala'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center space-x-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-extrabold px-4 py-2 rounded-xl text-xs shadow-lg shadow-cyan-600/20 transition-all font-mono"
          >
            <Download className="w-4 h-4" />
            <span>Raporu İndir (.json)</span>
          </button>
        </div>
      </div>

      {/* Regülasyon Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* KVKK 6698 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              KVKK 6698 MADDE 12
            </span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
              scanResult.metrics.kvkkViolationsCount === 0 
                ? 'bg-emerald-500/20 text-emerald-300' 
                : 'bg-rose-500/20 text-rose-300'
            }`}>
              {scanResult.metrics.kvkkViolationsCount === 0 ? 'UYUMLU' : 'İHLAL TESPİT EDİLDİ'}
            </span>
          </div>
          <h3 className="text-base font-bold text-white">Veri Güvenliği ve PII Maskeleme</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Kişisel Verilerin Korunması Kanunu teknik tedbirler rehberine göre TCKN, telefon ve IBAN gibi veriler loglara veya yetkisiz arayüzlere maskelenmeden yazılamaz.
          </p>
        </div>

        {/* USOM */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              USOM TEHDİT BÜLTENİ
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              SENKRONİZE
            </span>
          </div>
          <h3 className="text-base font-bold text-white">Kritik Tehdit Göstergeleri</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Ulusal Siber Olaylara Müdahale Merkezi'nin duyurduğu sıfır-gün güvenlik açıkları ve zafiyet kategorileriyle anlık eşleştirme sağlanır.
          </p>
        </div>

        {/* OWASP & BDDK */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">
              OWASP & BDDK
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
              BANKACILIK SEVİYESİ
            </span>
          </div>
          <h3 className="text-base font-bold text-white">Açık Kaynak Kod Standartları</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            BDDK Bilgi Sistemleri Yönetmeliği uyarınca bankacılık ve ödeme altyapılarında BOLA/IDOR, SQLi ve SSRF kontrolleri zorunlu tutulmuştur.
          </p>
        </div>

      </div>

      {/* JSON Denetim Çıktısı */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <span className="text-xs font-mono text-slate-400 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Denetim Raporu Veri Çıktısı (Enterprise Compliance JSON)</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Standart ISO/IEC 27001 Denetim Formatı</span>
        </div>

        <pre className="font-mono text-xs text-slate-300 overflow-x-auto max-h-[350px] leading-relaxed">
          {jsonString}
        </pre>
      </div>

    </div>
  );
};
