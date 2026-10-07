import React, { useState } from 'react';
import { SecurityScanResult } from '../types/security';
import { 
  GitCompare, 
  Check, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { ActiveSecurityTab } from './Navbar';

interface AutoPatchDiffViewerProps {
  scanResult: SecurityScanResult;
  onApplyPatch: (newCode: string) => void;
  onNavigate: (tab: ActiveSecurityTab) => void;
}

export const AutoPatchDiffViewer: React.FC<AutoPatchDiffViewerProps> = ({
  scanResult,
  onApplyPatch,
  onNavigate
}) => {
  const [copied, setCopied] = useState(false);
  const [patchApplied, setPatchApplied] = useState(false);

  const { remediationDiff, targetFileName, findings } = scanResult;

  const handleCopyPatch = () => {
    navigator.clipboard.writeText(remediationDiff.patchedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    onApplyPatch(remediationDiff.patchedCode);
    setPatchApplied(true);
    setTimeout(() => {
      onNavigate('scanner');
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Başlık ve Eylemler */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <GitCompare className="w-5 h-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Otonom Güvenlik Yaması (Git Diff Auto-Patch)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Yapay zeka zafiyeti tespit etti ve üretime hazır güvenli kod yamasını çıkardı.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopyPatch}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all font-mono"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Kopyalandı!' : 'Yamalı Kodu Kopyala'}</span>
          </button>

          <button
            onClick={handleApply}
            disabled={patchApplied || findings.length === 0}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/25 transition-all text-xs font-mono uppercase disabled:opacity-50 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>{patchApplied ? 'YAMA UYGULANDI!' : 'YAMAYI CANLI KODA UYGULA'}</span>
          </button>
        </div>
      </div>

      {/* Yama Açıklaması Bildirimi */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950/30 border border-emerald-900/40 shadow-lg flex items-start space-x-3">
        <FileCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
            AegisAI Otonom Sertleştirme Raporu ({targetFileName})
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {remediationDiff.patchDescription}
          </p>
        </div>
      </div>

      {/* Yan Yana Git Diff Görünümü */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sol: Orijinal Zafiyetli Kod */}
        <div className="bg-slate-900 border border-rose-900/40 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="bg-rose-950/40 px-4 py-2.5 border-b border-rose-900/40 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-rose-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>ORİJİNAL KOD (ZAFİYETLİ)</span>
            </span>
            <span className="text-[10px] text-rose-400 font-mono">
              {findings.length} Aktif Kusur
            </span>
          </div>

          <div className="p-4 bg-[#080c14] font-mono text-xs text-slate-300 overflow-x-auto max-h-[500px] leading-relaxed">
            <pre>{remediationDiff.originalCode}</pre>
          </div>
        </div>

        {/* Sağ: Güvenlik Yaması Uygulanmış Kod */}
        <div className="bg-slate-900 border border-emerald-900/50 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="bg-emerald-950/40 px-4 py-2.5 border-b border-emerald-900/40 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>YAPAY ZEKA İLE YAMALANMIŞ KOD (SERTLEŞTİRİLMİŞ)</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">
              %100 Güvenli (Zero Vuln)
            </span>
          </div>

          <div className="p-4 bg-[#080f14] font-mono text-xs text-emerald-200 overflow-x-auto max-h-[500px] leading-relaxed">
            <pre>{remediationDiff.patchedCode}</pre>
          </div>
        </div>

      </div>

    </div>
  );
};
