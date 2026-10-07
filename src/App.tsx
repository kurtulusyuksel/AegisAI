import React, { useState } from 'react';
import { Navbar, ActiveSecurityTab } from './components/Navbar';
import { DashboardOverview } from './components/DashboardOverview';
import { CodeScannerStudio } from './components/CodeScannerStudio';
import { AutoPatchDiffViewer } from './components/AutoPatchDiffViewer';
import { ComplianceReportUsom } from './components/ComplianceReportUsom';
import { RfsPitchSection } from './components/RfsPitchSection';
import { CyberBackground3D } from './components/CyberBackground3D';
import { CODE_TEMPLATES } from './engine/codeTemplates';
import { analyzeSourceCode } from './engine/securityEngine';
import { SecurityScanResult } from './types/security';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveSecurityTab>('dashboard');
  const [currentCode, setCurrentCode] = useState<string>(CODE_TEMPLATES[0].code);
  const [currentFilename, setCurrentFilename] = useState<string>(CODE_TEMPLATES[0].filename);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const [scanResult, setScanResult] = useState<SecurityScanResult>(() => 
    analyzeSourceCode(CODE_TEMPLATES[0].code, CODE_TEMPLATES[0].filename)
  );

  const handleScan = (codeToScan?: string, filenameToScan?: string) => {
    setIsScanning(true);
    const code = codeToScan !== undefined ? codeToScan : currentCode;
    const filename = filenameToScan !== undefined ? filenameToScan : currentFilename;

    setTimeout(() => {
      const result = analyzeSourceCode(code, filename);
      setScanResult(result);
      setIsScanning(false);
    }, 350);
  };

  const handleApplyPatch = (newCode: string) => {
    setCurrentCode(newCode);
    const result = analyzeSourceCode(newCode, currentFilename);
    setScanResult(result);
  };

  return (
    <div className="relative min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-cyan-600 selection:text-white overflow-x-hidden">
      
      {/* 3D WebGL Siber Arka Plan (Parçacıklar & Dalgalanan Grid) */}
      <CyberBackground3D />

      {/* Ön Plan Arayüz Katmanı */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Üst Menü */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          criticalCount={scanResult.metrics.criticalCount}
        />

        {/* Ana Gövde */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              scanResult={scanResult}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'scanner' && (
            <CodeScannerStudio
              currentCode={currentCode}
              setCurrentCode={setCurrentCode}
              currentFilename={currentFilename}
              setCurrentFilename={setCurrentFilename}
              scanResult={scanResult}
              onScan={handleScan}
              onNavigate={setActiveTab}
              isScanning={isScanning}
            />
          )}

          {activeTab === 'patchViewer' && (
            <AutoPatchDiffViewer
              scanResult={scanResult}
              onApplyPatch={handleApplyPatch}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'compliance' && (
            <ComplianceReportUsom
              scanResult={scanResult}
            />
          )}

          {activeTab === 'pitchRfs' && (
            <RfsPitchSection />
          )}
        </main>

        {/* Kurumsal Altbilgi */}
        <footer className="border-t border-slate-900/80 bg-[#060911]/90 backdrop-blur-md py-6 text-xs text-slate-500 mt-12">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-slate-300 font-mono text-sm">Aegis<span className="text-cyan-400">AI</span></span>
              <span>— Autonomous Cyber Defense & Zero-Day Patching Engine</span>
            </div>
            <div className="flex items-center space-x-4 text-slate-400 font-mono text-[11px]">
              <span>YC RFS 2026+ Cyber Defense</span>
              <span>•</span>
              <span>USOM & KVKK 6698 Compliant</span>
              <span>•</span>
              <span>OWASP Top 10 SAST/DAST</span>
            </div>
          </div>
        </footer>

      </div>

    </div>
  );
};

export default App;
