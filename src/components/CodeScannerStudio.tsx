import React, { useState } from 'react';
import { 
  SecurityScanResult, 
  CodeTemplate, 
  VulnerabilityFinding 
} from '../types/security';
import { CODE_TEMPLATES } from '../engine/codeTemplates';
import { 
  Terminal, 
  Play, 
  AlertTriangle, 
  ShieldCheck, 
  Code, 
  Sparkles, 
  ArrowRight,
  FileCode,
  Layers,
  Bug
} from 'lucide-react';
import { ActiveSecurityTab } from './Navbar';

interface CodeScannerStudioProps {
  currentCode: string;
  setCurrentCode: (code: string) => void;
  currentFilename: string;
  setCurrentFilename: (filename: string) => void;
  scanResult: SecurityScanResult;
  onScan: (codeToScan?: string, filenameToScan?: string) => void;
  onNavigate: (tab: ActiveSecurityTab) => void;
  isScanning: boolean;
}

export const CodeScannerStudio: React.FC<CodeScannerStudioProps> = ({
  currentCode,
  setCurrentCode,
  currentFilename,
  setCurrentFilename,
  scanResult,
  onScan,
  onNavigate,
  isScanning
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('sql_injection_auth');

  const handleSelectTemplate = (template: CodeTemplate) => {
    setSelectedTemplateId(template.id);
    setCurrentCode(template.code);
    setCurrentFilename(template.filename);
    onScan(template.code, template.filename);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Üst Başlık & Eylemler */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Terminal className="w-5 h-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Otonom Kaynak Kod Tarayıcı (SAST Studio)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kaynak kodu satır satır analiz edin; SQLi, SSRF, IDOR ve KVKK veri sızıntılarını tespit edin.
          </p>
        </div>

        <button
          onClick={() => onScan()}
          disabled={isScanning}
          className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all text-xs font-mono uppercase disabled:opacity-50 active:scale-95 shrink-0"
        >
          <Play className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'KOD TARANIYOR...' : 'YAPAY ZEKA İLE TARA (SCAN)'}</span>
        </button>
      </div>

      {/* Hazır Zafiyetli Senaryo Şablonları */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center space-x-2">
          <Bug className="w-4 h-4 text-cyan-400" />
          <span>Gerçekçi Kurumsal Zafiyet Şablonları (Tek Tıkla Yükle)</span>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {CODE_TEMPLATES.map(tmpl => (
            <button
              key={tmpl.id}
              onClick={() => handleSelectTemplate(tmpl)}
              className={`text-left p-3 rounded-xl border text-xs transition-all ${
                selectedTemplateId === tmpl.id
                  ? 'bg-cyan-950/40 border-cyan-500 text-white font-bold shadow-md shadow-cyan-950/50'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-cyan-400 text-[11px]">{tmpl.filename}</span>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  {tmpl.language}
                </span>
              </div>
              <div className="truncate text-slate-200">{tmpl.title}</div>
              <div className="text-[10px] text-rose-400 mt-1 truncate font-mono">
                {tmpl.expectedVulnerability}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* İki Bölümlü Editör & Zafiyet Listesi */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SOL: Kod Editörü (6 Kolon) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs font-bold text-white">{currentFilename}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              {currentCode.split('\n').length} Satır • Düzenlenebilir Editör
            </span>
          </div>

          <div className="relative flex-1 bg-[#070b14] p-3 font-mono text-xs text-slate-200 min-h-[460px]">
            <textarea
              value={currentCode}
              onChange={e => setCurrentCode(e.target.value)}
              className="w-full h-full min-h-[440px] bg-transparent text-slate-200 resize-none outline-none font-mono text-xs leading-relaxed selection:bg-cyan-600 selection:text-white"
              spellCheck={false}
            />
          </div>

          <div className="bg-slate-950/80 px-4 py-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>İpucu: Kendi kodunuzu buraya yapıştırıp taratabilirsiniz.</span>
            <span className="text-cyan-400 font-mono">SAST Engine v3.8</span>
          </div>
        </div>

        {/* SAĞ: Zafiyet Bulguları Listesi (6 Kolon) */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="flex items-center justify-between bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold text-white font-mono uppercase">
                Zafiyet Raporu: {scanResult.findings.length} Bulgu
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onNavigate('patchViewer')}
                className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md shadow-emerald-600/20 transition-all font-mono"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Otonom Yamala (Diff)</span>
              </button>
            </div>
          </div>

          {/* Bulgular Listesi */}
          {scanResult.findings.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/50 border border-slate-800 rounded-2xl space-y-3">
              <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Sıfır Güvenlik Zafiyeti</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Kaynak kod analiz edildi ve hiçbir OWASP veya KVKK güvenlik kusuru saptanmadı. Kod güvenli ve sertleştirilmiş durumda.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-1">
              {scanResult.findings.map(finding => {
                const isCritical = finding.severity === 'CRITICAL';
                return (
                  <div
                    key={finding.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isCritical
                        ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/20 border-rose-500/50 shadow-md'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-800">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            isCritical ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {finding.severity} (CVSS {finding.cvssScore})
                          </span>
                          <span className="text-[10px] font-mono text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            {finding.cweId}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            Satır #{finding.lineNumber}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1.5">{finding.title}</h4>
                      </div>
                    </div>

                    {/* Zafiyetli Kod Parçacığı */}
                    <div className="mt-2.5 p-2 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-rose-300 overflow-x-auto">
                      <code>{finding.snippet}</code>
                    </div>

                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {finding.description}
                    </p>

                    <div className="mt-2.5 p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-[11px] text-slate-200 space-y-1">
                      <div className="font-bold text-emerald-400 flex items-center space-x-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Yapay Zeka Onarım Önerisi:</span>
                      </div>
                      <p className="text-slate-300 font-mono text-[10px] overflow-x-auto">
                        {finding.suggestedPatch}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800 text-[10px]">
                      <span className="text-slate-400">Etki: <strong className="text-slate-200">{finding.impact}</strong></span>
                      <button
                        onClick={() => onNavigate('patchViewer')}
                        className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center space-x-1"
                      >
                        <span>Yamayı Görüntüle</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
