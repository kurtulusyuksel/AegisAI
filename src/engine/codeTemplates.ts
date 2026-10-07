import { CodeTemplate } from '../types/security';

export const CODE_TEMPLATES: CodeTemplate[] = [
  {
    id: 'sql_injection_auth',
    title: 'FastAPI Kullanıcı Kimlik Doğrulama Servisi',
    filename: 'auth_service.py',
    language: 'python',
    category: 'OWASP A03:2021 - Injection (SQLi & Plaintext Auth)',
    expectedVulnerability: 'CWE-89 (SQL Injection) & CWE-256 (Düz Metin Parola Kontrolü)',
    code: `from fastapi import FastAPI, HTTPException, Request
import sqlite3

app = FastAPI(title="Kurumsal Auth Servisi")

def get_db():
    return sqlite3.connect("production.db")

@app.post("/api/v1/auth/login")
async def login_user(payload: dict):
    username = payload.get("username", "")
    password = payload.get("password", "")

    db = get_db()
    cursor = db.cursor()

    # ZAFİYET 1: Ham SQL sorgusuna doğrudan parametre birleştirme (SQL Injection)
    # Saldırgan: ' OR '1'='1' göndererek şifresiz giriş yapabilir
    query = f"SELECT id, username, role FROM users WHERE username = '{username}' AND password = '{password}'"
    
    cursor.execute(query)
    user = cursor.fetchone()

    if not user:
        raise HTTPException(status_code=401, detail="Hatalı kullanıcı adı veya şifre")

    return {
        "status": "success",
        "user_id": user[0],
        "username": user[1],
        "role": user[2],
        "token": f"bearer_mock_jwt_session_{user[0]}"
    }
`
  },
  {
    id: 'kvkk_pii_leak_go',
    title: 'Müşteri Bilgi Sorgulama & Dışa Aktarma API',
    filename: 'customer_exporter.go',
    language: 'go',
    category: 'KVKK Madde 12 / BDDK Veri Güvenliği (PII Cleartext Leak)',
    expectedVulnerability: 'CWE-312 (Hassas Verilerin Maskesiz Loglanması) & KVKK İhlali',
    code: `package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type CustomerRecord struct {
	ID        int    \`json:"id"\`
	TCKN      string \`json:"tckn"\`       // 11 haneli T.C. Kimlik Numarası
	FullName  string \`json:"full_name"\`
	Phone     string \`json:"phone"\`
	IBAN      string \`json:"iban"\`
	AccountBalance float64 \`json:"balance"\`
}

func handleCustomerExport(w http.ResponseWriter, r *http.Request) {
	// Müşteri verisi çekildi
	customer := CustomerRecord{
		ID:       10482,
		TCKN:     "28491048274",
		FullName: "Ahmet Yılmaz",
		Phone:    "+905321112233",
		IBAN:     "TR330006100511123456789012",
		AccountBalance: 84500.0,
	}

	// ZAFİYET 2: KVKK 6698 ve BDDK regülasyonlarına aykırı biçimde
	// TCKN ve IBAN'ın maskelenmeden merkezi log sunucusuna düz metin basılması
	log.Printf("[AUDIT LOG] Müşteri dışa aktarıldı: TCKN=%s, İsim=%s, IBAN=%s, Tel=%s", 
		customer.TCKN, customer.FullName, customer.IBAN, customer.Phone)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(customer)
}
`
  },
  {
    id: 'ssrf_payment_node',
    title: 'Webhook & BOLA/IDOR Ödeme Bildirim API',
    filename: 'webhook_processor.ts',
    language: 'typescript',
    category: 'OWASP A01 & A10: BOLA (IDOR) & SSRF',
    expectedVulnerability: 'CWE-918 (Server-Side Request Forgery) & CWE-639 (BOLA)',
    code: `import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

// BOLA / IDOR Zafiyeti: Kullanıcı oturumu doğrulanmadan
// sadece URL'den gelen orderId ile hassas ödeme detaylarının çekilmesi
router.get('/api/orders/:orderId/receipt', async (req: Request, res: Response) => {
  const { orderId } = req.params;
  
  // ZAFİYET 3: Authorization kontrolü yok (IDOR)
  const order = await db.query('SELECT * FROM orders WHERE id = $1', [orderId]);
  return res.json(order.rows[0]);
});

// SSRF Zafiyeti: Kullanıcının sağladığı callback URL'ine doğrulama yapılmadan GET/POST atılması
router.post('/api/payments/trigger-webhook', async (req: Request, res: Response) => {
  const { webhookUrl, payload } = req.body;

  // ZAFİYET 4: Dahili ağ adresleri (127.0.0.1, 169.254.169.254 AWS metadata) engellenmiyor!
  const response = await axios.post(webhookUrl, payload, { timeout: 5000 });

  return res.json({ status: 'sent', remoteStatus: response.status });
});

export default router;
`
  },
  {
    id: 'unrestricted_file_upload',
    title: 'Profil & Belge Yükleme Kontrolcüsü',
    filename: 'upload_handler.js',
    language: 'javascript',
    category: 'OWASP A04:2021 - Insecure Design & RCE',
    expectedVulnerability: 'CWE-434 (Unrestricted File Upload) & USOM Zararlı Yazılım Riski',
    code: `const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.post('/api/profile/upload-avatar', (req, res) => {
  const file = req.files.avatar;
  
  // ZAFİYET 5: Dosya uzantısı ve MIME türü denetlenmiyor!
  // Saldırgan 'shell.php' veya 'payload.js' yükleyip sunucuda RCE tetikleyebilir.
  const uploadPath = path.join(__dirname, 'public/uploads', file.name);

  file.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ url: '/uploads/' + file.name });
  });
});
`
  }
];
