import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Globe2, 
  CheckCircle, 
  XCircle, 
  Zap, 
  Layers, 
  Scale 
} from 'lucide-react';

export const RfsPitchSection: React.FC = () => {
  return (
    <div className="space-y-12 pb-16">
      
      {/* Üst Başlık */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold font-mono">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Y COMBINATOR RFS 2026+ & HACKER NEWS TEKNOLOJİK KIRILMASI</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Siber Güvenlikte <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
            "Teknolojik Deprem"
          </span> Yaratan Otonom Savunma
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Geleneksel güvenlik testleri (pentest) haftalarca sürer ve pasif raporlar üretir. 
          AegisAI ise YC'nin <strong>"Autonomous Cyber Defense & AI Pentesting"</strong> vizyonunu hayata geçirerek 
          zafiyeti milisaniyeler içinde yakalar ve otonom <strong className="text-white">Git Diff yamaları</strong> ile kendi kendini onarır.
        </p>
      </div>

      {/* Karşılaştırma Matrisi (85 Puanlık Standart Tarayıcı vs 100+ Otonom Platform) */}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
            TEKNOLOJİK FARKLILAŞMA MATRİSİ
          </span>
          <h3 className="text-2xl font-bold text-white mt-1">
            Geleneksel Statik Analiz (SAST) vs. AegisAI Otonom Kalkan
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Standart Global Tarayıcı Klonu */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400">Standart Çözümler</span>
                <h4 className="text-lg font-bold text-slate-200">Geleneksel SAST (Snyk / SonarQube Klonu)</h4>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Temel Düzey
              </span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Kaynak koddaki bilinen zafiyet kalıplarını regex ile listeleme.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Statik CVSS v3 puanı ve CWE kategorizasyonu.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">Pasiftir: Kodu onarmaz, sadece "Burada açık var" deyip geliştiriciye yük bırakır.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">Türkiye yerel regülasyonları (KVKK 6698 Madde 12, USOM bültenleri) desteklenmez.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">BOLA/IDOR ve karmaşık iş mantığı açıklarını bağlamsal olarak analiz edemez.</span>
              </li>
            </ul>
          </div>

          {/* AegisAI İnovatif & Yerelleştirilmiş Platform */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-900 border-2 border-cyan-500/50 space-y-4 shadow-xl shadow-cyan-950/40">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-900/50">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400">Yenilikçi & Hibrit İnovasyon</span>
                <h4 className="text-lg font-bold text-white">AegisAI Otonom Siber Savunma</h4>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                100+ LİDER VİZYON
              </span>
            </div>

            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">✨ Otonom Güvenlik Yaması (Auto-Patch): </strong>
                  Zafiyeti bulmakla kalmaz; doğrudan üretime hazır Git Diff yamasını milisaniyeler içinde üretir.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">🇹🇷 USOM & KVKK 6698 Uyumluluk Motoru: </strong>
                  Türkiye siber tehdit bültenleri ve kişisel veri maskeleme denetimi yerleşik olarak çalışır.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">⚡ Çift Yönlü Güvenlik Testi (SAST + DAST): </strong>
                  SSRF, SQLi, BOLA ve Dosya Yükleme saldırı vektörlerini simüle eden dinamik kural motoru.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">🛡️ Tek Tıkla Canlı Sertleştirme: </strong>
                  "Yamayı Uygula" butonuyla kod canlıda anında %100 temiz ve güvenli hale getirilir.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">🧪 Kapsamlı Yazılım Test Süiti: </strong>
                  Terminalde <code className="text-cyan-300 font-mono">npm test</code> ile doğrulanan 10 adet birim ve regülasyon testi.
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* YC RFS 2026+ 3 Temel İlkesi */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Yapay Zeka Destekli Hücum vs. Savunma</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Saldırganlar sıfır-gün açıklarını otonom ajanlarla ararken insan gücüyle savunma yetersiz kalmaktadır. Savunmanın da otonomlaşması zorunludur.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Sıfır Bekleme (Zero-MTTR)</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Geleneksel kurumlarda bulunan bir açığın kapatılması ortalama 14 gün sürer. AegisAI auto-patch ile bu süre 1 saniyenin altına iner.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Scale className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Yerel Regülasyon Kalkanı</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Global araçların gözden kaçırdığı yerel veri kanunları (KVKK 6698) doğrudan kod aşamasında denetlenerek milyonlarca liralık cezalar önlenir.
          </p>
        </div>

      </div>

    </div>
  );
};
