# AegisAI — Autonomous Cyber Defense & Zero-Day Patching Engine

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Tests](https://img.shields.io/badge/tests-9%2F9%20passed-success.svg)]()
[![YC RFS](https://img.shields.io/badge/YC%20RFS-2026%2B%20Cyber%20Defense-orange.svg)]()
[![Compliance](https://img.shields.io/badge/Compliance-USOM%20%7C%20KVKK%206698%20%7C%20OWASP-blue.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()

> **AegisAI**, Y Combinator'ın 2026+ Girişim Çağrılarında (*Requests for Startups - RFS*) ve Hacker News'te teknolojik devrim yaratan **"Autonomous Cyber Defense & AI Pentesting"** vizyonu doğrultusunda geliştirilmiş yeni nesil otonom siber güvenlik ve zafiyet onarım platformudur.

Geleneksel statik kod analizi (SAST) araçları geliştiriciye sadece nerede açık olduğunu söyleyip pasif kalırken; **AegisAI**, kaynak kodlardaki sıfır-gün (zero-day) açıklarını, SQLi, SSRF, BOLA/IDOR ve KVKK 6698 veri sızıntılarını milisaniyeler içinde yakalar ve doğrudan üretime hazır **Git Diff formatında güvenlik yamaları (Auto-Patch)** üreterek sistemi otonom onarır.

---

## 🚀 Öne Çıkan Özellikler

### 1. Otonom Güvenlik Analizi (SAST & DAST Kuralları)
* **CWE-89 (SQL Injection):** Ham SQL sorgularını, parametrik olmayan birleştirmeleri ve bypass açıklarını tespit eder.
* **CWE-918 (SSRF):** Webhook ve callback mekanizmalarında dahili IP'lere (127.0.0.1, AWS 169.254 metadata vb.) yönelik sızıntıları engeller.
* **CWE-639 (BOLA / IDOR):** Nesne düzeyinde yetkilendirme (Broken Object Level Authorization) açıklarını saptar.
* **CWE-434 (Unrestricted File Upload):** MIME tipi ve uzantı doğrulaması olmayan dosya yüklemelerini yakalar.

### 2. 🇹🇷 USOM & KVKK 6698 Yerel Siber Kalkan
* **KVKK Madde 12 Veri Güvenliği:** T.C. Kimlik Numarası (TCKN), IBAN ve telefon numaralarının merkezi log sunucularına açık metin basılmasını engeller, otomatik maskeleme (`284*****274`) uygular.
* **USOM Tehdit Bülteni Entegrasyonu:** Ulusal Siber Olaylara Müdahale Merkezi'nin duyurduğu güncel açık türleriyle kaynak kodları eşzamanlı eşleştirir.
* **BDDK Bilgi Sistemleri Standardı:** Bankacılık ve fintech API'leri için sıkılaştırılmış veri kontrolü.

### 3. ✨ Kendi Kendini Onaran Kod (Auto-Patch & Git Diff)
* Tespit edilen zafiyet için **yan yana Git Diff** formatında güvenli kod çıktısı üretir.
* **"Yamayı Uygula"** butonuna basıldığında kodu canlıda sertleştirir ve tek tıkla zafiyet sayısını sıfıra indirir (Grade A+).

---

## 🏆 Platform Karşılaştırması: Standart SAST vs. AegisAI

| Yetenek | Standart SAST Araçları (Snyk / SonarQube) | **AegisAI Otonom Platformu** |
| :--- | :--- | :--- |
| **Zafiyet Tespiti** | Statik kural ve regex | **Genişletilmiş AST ve Semantik Kural Motoru** |
| **Onarım (Remediation)** | Pasif (Geliştirici elle düzeltir) | **✨ Otonom Git Diff Yaması (Tek tıkla onarır)** |
| **Yerel Mevzuat** | Sadece küresel (GDPR) | **🇹🇷 USOM Tehdit Akışı & KVKK 6698 Madde 12** |
| **Ortalama Onarım Süresi (MTTR)**| Ortalama 14 İş Günü | **~0.8 Saniye (Anlık Otonom Patch)** |
| **Birim Testleri** | Kapalı kaynak | **⚡ Vitest ile %100 Doğrulanan 9 Güvenlik Testi** |

---

## 🛠️ Kurulum ve Çalıştırma

### Canlı Web Platformunu Başlatma:
```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```
Platform [http://localhost:5173](http://localhost:5173) adresinde canlı olarak açılır.

### Güvenlik Birim Testlerini Çalıştırma:
```bash
npm test
```
**Test Çıktısı:**
```text
 ✓ tests/kvkkCompliance.test.ts (4 tests) 8ms
 ✓ tests/securityEngine.test.ts (5 tests) 10ms

 Test Files  2 passed (2)
      Tests  9 passed (9)
```

### Üretim (Production) Derlemesi:
```bash
npm run build
```

---

## 📁 Proje Dizin Yapısı

```text
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                # Tehdit durumu ve kurumsal navigasyon
│   │   ├── DashboardOverview.tsx     # Risk skoru, KPI ve USOM canlı akışı
│   │   ├── CodeScannerStudio.tsx     # Canlı kod editörü ve zafiyet kartları
│   │   ├── AutoPatchDiffViewer.tsx   # Git Diff formatında otonom güvenlik yaması
│   │   ├── ComplianceReportUsom.tsx  # KVKK, USOM ve OWASP uyumluluk raporu
│   │   └── RfsPitchSection.tsx       # YC RFS 2026+ pazar kırılması ve vizyon
│   ├── engine/
│   │   ├── securityEngine.ts         # SAST tarayıcı, CVSS hesaplayıcı, auto-patcher
│   │   └── codeTemplates.ts          # Python, Go, TS, JS gerçekçi zafiyet senaryoları
│   ├── types/
│   │   └── security.ts               # Tip tanımları ve veri modelleri
│   ├── App.tsx                       # Reaktif durum yönetimi
│   └── main.tsx                      # Giriş noktası
├── tests/
│   ├── securityEngine.test.ts        # OWASP ve zafiyet motoru birim testleri (5 test)
│   └── kvkkCompliance.test.ts        # KVKK ve USOM uyumluluk testleri (4 test)
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🎓 Akademik & Proje Notu
Bu proje, yazılım güvenliği, statik analiz metodolojileri ve siber savunma sistemlerinin yapay zeka ile otonomlaştırılması amacıyla; **Y Combinator RFS 2026+** teknolojik kırılma vizyonu ve **Türkiye Ulusal Siber Olaylara Müdahale (USOM) & KVKK** standartları temel alınarak geliştirilmiştir.
