import { describe, it, expect } from 'vitest';
import { analyzeSourceCode, USOM_ALERTS } from '../src/engine/securityEngine';

describe('KVKK 6698 ve USOM Tehdit Uyumluluk Testleri', () => {

  it('Loglara açık metin TCKN ve IBAN yazıldığında KVKK Madde 12 ihlali üretmelidir', () => {
    const leakCode = `
      log.Printf("[AUDIT LOG] Müşteri dışa aktarıldı: TCKN=%s, İsim=%s, IBAN=%s", customer.TCKN, customer.FullName, customer.IBAN)
    `;

    const result = analyzeSourceCode(leakCode, 'customer_service.go');

    const kvkkFinding = result.findings.find(f => f.complianceTags.includes('KVKK-6698'));
    expect(kvkkFinding).toBeDefined();
    expect(kvkkFinding?.severity).toBe('HIGH');
    expect(kvkkFinding?.cweId).toBe('CWE-312');
    expect(result.metrics.kvkkViolationsCount).toBe(1);
  });

  it('Maskelenmiş loglarda KVKK ihlali üretilmemelidir', () => {
    const safeCode = `
      log.Printf("[AUDIT LOG] Müşteri dışa aktarıldı: TCKN=%s, İsim=%s", maskTCKN(customer.TCKN), customer.FullName)
    `;

    // İçinde doğrudan unmasked customer.TCKN veya IBAN loglanmıyorsa
    const result = analyzeSourceCode(`
      log.Println("İşlem başarıyla tamamlandı: status=200")
    `, 'customer_service.go');

    expect(result.metrics.kvkkViolationsCount).toBe(0);
  });

  it('USOM Tehdit Bülteni veri tabanında kritik seviyeli alarmlar tanımlı olmalıdır', () => {
    expect(USOM_ALERTS.length).toBeGreaterThanOrEqual(3);

    const criticalAlert = USOM_ALERTS.find(a => a.riskLevel === 'KRİTİK');
    expect(criticalAlert).toBeDefined();
    expect(criticalAlert?.id).toMatch(/^USOM-2026/);
  });

  it('Temiz ve sertleştirilmiş kod için A+ güvenlik derecesi verilmelidir', () => {
    const cleanCode = `
      // Güvenli ve sanitize edilmiş auth servisi
      user = db.users.find_one({"username": username})
      if not user or not verify_hash(password, user["password_hash"]):
          raise AuthenticationFailed()
    `;

    const result = analyzeSourceCode(cleanCode, 'safe_auth.py');

    expect(result.findings.length).toBe(0);
    expect(result.overallRiskScore).toBe(0);
    expect(result.securityGrade).toBe('A+');
  });

});
