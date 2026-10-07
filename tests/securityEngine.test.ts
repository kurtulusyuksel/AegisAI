import { describe, it, expect } from 'vitest';
import { analyzeSourceCode, generateRemediationPatch } from '../src/engine/securityEngine';

describe('AegisAI Otonom Siber Güvenlik ve SAST Motoru Birim Testleri', () => {

  it('SQL Injection zafiyetini (CWE-89) doğru tespit etmeli ve kritik CVSS puanı vermelidir', () => {
    const vulnerableSqlCode = `
      query = f"SELECT * FROM users WHERE username = '{username}'"
      cursor.execute(query)
    `;

    const result = analyzeSourceCode(vulnerableSqlCode, 'auth.py');

    expect(result.findings.length).toBeGreaterThan(0);
    const sqlFinding = result.findings.find(f => f.cweId === 'CWE-89');
    expect(sqlFinding).toBeDefined();
    expect(sqlFinding?.severity).toBe('CRITICAL');
    expect(sqlFinding?.cvssScore).toBeGreaterThanOrEqual(9.0);
    expect(result.overallRiskScore).toBeGreaterThanOrEqual(30);
  });

  it('SSRF (Server-Side Request Forgery - CWE-918) açığını doğru tespit etmelidir', () => {
    const vulnerableSsrfCode = `
      const response = await axios.post(webhookUrl, payload, { timeout: 5000 });
    `;

    const result = analyzeSourceCode(vulnerableSsrfCode, 'webhook.ts');
    const ssrfFinding = result.findings.find(f => f.cweId === 'CWE-918');

    expect(ssrfFinding).toBeDefined();
    expect(ssrfFinding?.severity).toBe('HIGH');
    expect(ssrfFinding?.cvssScore).toBeGreaterThanOrEqual(8.0);
  });

  it('BOLA / IDOR yetkisiz nesne erişimini (CWE-639) tespit etmelidir', () => {
    const idorCode = `
      const { orderId } = req.params;
      const order = await db.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    `;

    const result = analyzeSourceCode(idorCode, 'order_controller.ts');
    const idorFinding = result.findings.find(f => f.cweId === 'CWE-639');

    expect(idorFinding).toBeDefined();
    expect(idorFinding?.severity).toBe('HIGH');
  });

  it('Kısıtlanmamış dosya yükleme (CWE-434) ve RCE riskini tespit etmelidir', () => {
    const uploadCode = `
      const uploadPath = path.join(__dirname, 'public/uploads', file.name);
      file.mv(uploadPath, (err) => {});
    `;

    const result = analyzeSourceCode(uploadCode, 'upload.js');
    const uploadFinding = result.findings.find(f => f.cweId === 'CWE-434');

    expect(uploadFinding).toBeDefined();
    expect(uploadFinding?.severity).toBe('CRITICAL');
  });

  it('Otonom güvenlik yaması uygulandığında zafiyetler sıfırlanmalıdır (Zero-Day Remediation)', () => {
    const originalVulnerable = `
      query = f"SELECT id, username, role FROM users WHERE username = '{username}' AND password = '{password}'"
      cursor.execute(query)
    `;

    const scanBefore = analyzeSourceCode(originalVulnerable, 'auth_service.py');
    expect(scanBefore.findings.length).toBeGreaterThan(0);

    // Yamayı üret
    const patch = generateRemediationPatch(originalVulnerable, scanBefore.findings, 'auth_service.py');
    expect(patch.patchedCode).not.toEqual(originalVulnerable);

    // Yamalı kodu tekrar tara
    const scanAfter = analyzeSourceCode(patch.patchedCode, 'auth_service.py');
    expect(scanAfter.findings.length).toBe(0);
    expect(scanAfter.securityGrade).toBe('A+');
    expect(scanAfter.overallRiskScore).toBe(0);
  });

});
