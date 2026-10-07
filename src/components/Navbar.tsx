import React from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  GitCompare, 
  FileCheck2, 
  Sparkles, 
  Radar, 
  ExternalLink,
  Activity
} from 'lucide-react';

export type ActiveSecurityTab = 'dashboard' | 'scanner' | 'patchViewer' | 'compliance' | 'pitchRfs';

interface NavbarProps {
  activeTab: ActiveSecurityTab;
  setActiveTab: (tab: ActiveSecurityTab) => void;
  criticalCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  criticalCount 
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Marka */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none"
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-cyan-400/30">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                  Aegis<span className="text-cyan-400 font-mono">AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full font-mono uppercase tracking-wider">
                  YC RFS 2026+
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block font-mono">
                Autonomous Cyber Defense & Zero-Day Patching Platform
              </p>
            </div>
          </div>

          {/* Menü Butonları */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Radar className="w-4 h-4" />
              <span>Tehdit Paneli</span>
            </button>

            <button
              onClick={() => setActiveTab('scanner')}
              className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'scanner'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Kod Tarayıcı (SAST)</span>
              {criticalCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute -top-1 -right-1" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('patchViewer')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'patchViewer'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              <span>Otonom Yama (Diff)</span>
            </button>

            <button
              onClick={() => setActiveTab('compliance')}
              className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'compliance'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>USOM & KVKK Uyumu</span>
            </button>

            <button
              onClick={() => setActiveTab('pitchRfs')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'pitchRfs'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-amber-400 hover:text-amber-300 hover:bg-amber-950/40 border border-amber-500/30'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Girişim Vizyonu</span>
            </button>

          </nav>

          {/* Canlı Durum Bildirimi */}
          <div className="hidden lg:flex items-center space-x-3 text-xs font-mono">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI SHIELD: ACTIVE</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
