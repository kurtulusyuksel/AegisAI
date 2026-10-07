export type VulnerabilitySeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export type ComplianceStandard = 'KVKK-6698' | 'USOM-TEHDIT' | 'OWASP-TOP-10' | 'BDDK-BILGI-GUVENLIGI' | 'CWE';

export interface VulnerabilityFinding {
  id: string;
  title: string;
  cweId: string;
  cweName: string;
  owaspCategory: string;
  severity: VulnerabilitySeverity;
  cvssScore: number;
  lineNumber: number;
  snippet: string;
  description: string;
  impact: string;
  remediationPlan: string;
  suggestedPatch: string;
  complianceTags: ComplianceStandard[];
}

export interface SecurityScanResult {
  scanId: string;
  timestamp: string;
  targetFileName: string;
  language: 'python' | 'typescript' | 'javascript' | 'go' | 'sql';
  linesScanned: number;
  overallRiskScore: number; // 0 - 100 (100 is maximum danger)
  securityGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  findings: VulnerabilityFinding[];
  metrics: {
    criticalCount: number;
    highCount: number;
    mediumCount: number;
    lowCount: number;
    kvkkViolationsCount: number;
    usomMatchesCount: number;
  };
  remediationDiff: {
    originalCode: string;
    patchedCode: string;
    patchDescription: string;
  };
}

export interface CodeTemplate {
  id: string;
  title: string;
  filename: string;
  language: 'python' | 'typescript' | 'javascript' | 'go' | 'sql';
  category: string;
  code: string;
  expectedVulnerability: string;
}

export interface UsomFeedAlert {
  id: string;
  date: string;
  title: string;
  threatType: string;
  riskLevel: 'KRİTİK' | 'YÜKSEK' | 'ORTA';
  affectedSystems: string;
  mitigation: string;
}
