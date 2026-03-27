# 🚀 MERCOR REFERRAL SİSTEMİ - ÜRÜN GEREKSİNİM DOKÜMANI (PRD)

---

## 📋 DOKÜMAN BİLGİLERİ

| Alan | Detay |
|------|-------|
| **Proje Adı** | MercorConnect - Referral Monetization System |
| **Versiyon** | 1.0 |
| **Tarih** | Ocak 2025 |
| **Sahibi** | Turhan Hamza |
| **Email** | turhanhamza@gmail.com |
| **Hedef** | Mercor üzerinden pasif gelir sistemi kurulması |

---

## 1. 🎯 VİZYON VE HEDEFLER

### 1.1 Vizyon
```
"Türkiye ve global pazarda, yetenekli bireyleri AI/Tech
şirketlerindeki remote iş fırsatlarıyla buluşturan ve bu
süreçten sürdürülebilir gelir elde eden bir sistem kurmak."
```

### 1.2 SMART Hedefler

| Zaman | Hedef | Metrik |
|-------|-------|--------|
| **Ay 1** | Sistem kurulumu | 5 platform aktif |
| **Ay 2** | İlk başvurular | 200 başvuru |
| **Ay 3** | İlk gelir | 3 işe alım = $2,250 |
| **Ay 6** | Ölçekleme | $5,000/ay gelir |
| **Ay 12** | Tam otomasyon | $10,000/ay pasif gelir |

---

## 2. 🏗️ SİSTEM MİMARİSİ

### 2.1 Genel Akış

```
┌─────────────────────────────────────────────────────────────────┐
│                      MERCORCONNECT SİSTEMİ                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐ │
│   │  MERCOR  │───▶│  İÇERİK  │───▶│ DAĞITIM  │───▶│  TAKİP   │ │
│   │   API    │    │  ÜRETME  │    │ KANALLARI│    │ ANALİTİK │ │
│   └──────────┘    └──────────┘    └──────────┘    └──────────┘ │
│        │               │               │               │        │
│        ▼               ▼               ▼               ▼        │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐ │
│   │İş İlanı  │    │Otomatik  │    │LinkedIn  │    │Dönüşüm   │ │
│   │Çekme     │    │Post      │    │Twitter   │    │Raporları │ │
│   │          │    │Oluşturma │    │Discord   │    │          │ │
│   │          │    │          │    │Telegram  │    │          │ │
│   │          │    │          │    │Reddit    │    │          │ │
│   └──────────┘    └──────────┘    └──────────┘    └──────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Teknik Stack

```yaml
Otomasyon:
  - Make.com (Integromat): Workflow otomasyon
  - Zapier: Yedek otomasyon
  - n8n: Self-hosted alternatif

İçerik Yönetimi:
  - Notion: Ana veritabanı
  - Airtable: İş takibi
  - Google Sheets: Analitik

Sosyal Medya:
  - Buffer: Planlı paylaşımlar
  - Typefully: Twitter thread'ler
  - Publer: Çoklu platform

Link Takip:
  - Bitly: Kısa linkler
  - UTM Builder: Kaynak takibi
  - Rebrandly: Özel domain

Analitik:
  - Google Analytics: Web trafiği
  - Social Blade: Sosyal medya
  - Notion Dashboard: Özet görünüm
```

---

## 3. 📍 PLATFORM STRATEJİSİ

### 3.1 Platform Öncelik Sıralaması

```
ÖNCELİK 1 (Yüksek ROI):
═══════════════════════
┌─────────────────────────────────────────────┐
│ 1. LinkedIn                                  │
│    ├── Profesyonel kitle                    │
│    ├── Yüksek dönüşüm oranı (%3-5)         │
│    └── Haftalık: 5 post + 20 DM             │
├─────────────────────────────────────────────┤
│ 2. Twitter/X                                 │
│    ├── Tech community aktif                 │
│    ├── Viral potansiyel yüksek              │
│    └── Günlük: 3 tweet + 1 thread           │
├─────────────────────────────────────────────┤
│ 3. Discord                                   │
│    ├── Developer toplulukları               │
│    ├── Doğrudan etkileşim                   │
│    └── Günlük: 10 sunucuda aktif            │
└─────────────────────────────────────────────┘

ÖNCELİK 2 (Orta ROI):
═══════════════════════
┌─────────────────────────────────────────────┐
│ 4. Telegram Grupları                         │
│    └── Haftalık: 15 grup paylaşımı          │
├─────────────────────────────────────────────┤
│ 5. Reddit                                    │
│    └── Haftalık: 5 kaliteli post            │
├─────────────────────────────────────────────┤
│ 6. Facebook Grupları                         │
│    └── Haftalık: 10 grup paylaşımı          │
└─────────────────────────────────────────────┘

ÖNCELİK 3 (Uzun Vadeli):
═══════════════════════
┌─────────────────────────────────────────────┐
│ 7. Medium/Blog                               │
│    └── Aylık: 4 SEO odaklı makale           │
├─────────────────────────────────────────────┤
│ 8. YouTube Shorts                            │
│    └── Haftalık: 3 kısa video               │
├─────────────────────────────────────────────┤
│ 9. TikTok                                    │
│    └── Haftalık: 5 video                    │
└─────────────────────────────────────────────┘
```

### 3.2 Platform Detayları

#### A) LinkedIn Stratejisi
```
HESAP KURULUMU:
══════════════
Başlık: "Tech Talent Connector | Helping Developers Find Remote AI Jobs"
Hakkında: Remote çalışma ve AI kariyer fırsatları hakkında 300 kelime
Banner: Profesyonel, "Remote Jobs" temalı

HAFTALIK TAKVİM:
════════════════
Pazartesi: AI/ML iş ilanı paylaşımı
Salı: Remote çalışma ipuçları (engagement)
Çarşamba: Başarı hikayesi/testimonial
Perşembe: Backend/Frontend iş ilanı
Cuma: Haftalık özet + en iyi fırsatlar
Cumartesi: Sektör haberi + yorum
Pazar: Motivasyon + gelecek hafta preview

GRUPLAR (Katılınacak):
═══════════════════════
1. Remote Work & Digital Nomads (2.1M)
2. Software Developers (1.8M)
3. AI & Machine Learning Network (900K)
4. Freelancers & Entrepreneurs (1.2M)
5. Türk Profesyoneller (150K)
6. Python Developers (500K)
7. JavaScript Developers (700K)
8. Remote OK (400K)
9. Tech Jobs Worldwide (300K)
10. Startup Jobs (250K)

DM STRATEJİSİ:
══════════════
Günde 20 hedefli DM:
- Son 30 günde "looking for job" paylaşanlar
- "Open to work" rozeti olanlar
- AI/ML, Software Engineer title'lı kişiler
```

#### B) Twitter/X Stratejisi
```
HESAP KURULUMU:
══════════════
Handle: @MercorJobsTR veya @RemoteAIJobs
Bio: "🚀 Curating the best remote AI & tech jobs |
     💰 $50-150/hr opportunities |
     🌍 Work from anywhere |
     👇 Latest jobs daily"

GÜNLÜK PROGRAM:
═══════════════
09:00 - Günün öne çıkan işi (tek post)
12:00 - Thread: Detaylı iş analizi (5-7 tweet)
15:00 - Quick tip: Interview/CV ipucu
18:00 - 3-5 iş ilanı hızlı paylaşım
21:00 - Engagement: Soru/anket

HASHTAG STRATEJİSİ:
══════════════════
Primer: #remotejobs #hiring #techjobs #AIjobs
Sekonder: #machinelearning #python #javascript #webdev
Türkçe: #uzaktançalışma #yazılımcı #işilanı #teknoloji
Niche: #OpenAI #Anthropic #startup #YCombinator
```

#### C) Discord Stratejisi
```
KATILIM LİSTESİ (30 Sunucu):
════════════════════════════
Tech/Genel:
1. Reactiflux (200K+)
2. Python Discord (350K+)
3. The Programmer's Hangout (150K+)
4. Coding Den (100K+)
5. DevCord (80K+)

AI/ML:
6. MLOps Community (50K+)
7. Weights & Biases (30K+)
8. Hugging Face (100K+)
9. AI Discord (40K+)

Remote/Freelance:
10. Remote Work Hub (25K+)
11. Freelance Designers & Developers (30K+)
12. Digital Nomads World (20K+)

Job Boards:
13. Hiring Cafe (15K+)
14. Tech Jobs (10K+)

Türkçe:
15. Türk Yazılımcılar (20K+)
16. Türk Oyun Geliştiricileri (15K+)
17. Pardus Türkiye (10K+)

AKTİVİTE PLANI:
═══════════════
- Her sunucuda job-board kanalı bul
- Kuralları oku ve uy
- Önce 1 hafta aktif üye ol, sonra paylaş
- Günde toplam 10-15 iş paylaşımı
```

#### D) Telegram Stratejisi
```
GRUP LİSTESİ (50 Grup):
══════════════════════
Global (İngilizce):
1. Remote Jobs Worldwide (50K+)
2. Freelance Programmers (40K+)
3. Python Jobs (30K+)
4. JavaScript Developers (45K+)
5. AI/ML Jobs (25K+)
6. Web3 Jobs (35K+)
7. Startup Jobs Global (20K+)
8. Tech Nomads (15K+)
9. DevOps Jobs (20K+)
10. Data Science Jobs (30K+)

Türkiye:
11. Yazılımcılar Türkiye (15K+)
12. Freelancer Türkiye (10K+)
13. Remote Çalışanlar TR (8K+)
14. IT Jobs Türkiye (12K+)
15. Startup Türkiye (10K+)

Hindistan (Büyük pazar):
16. Indian Developers (100K+)
17. Remote Jobs India (50K+)

Latin Amerika:
18. Devs Latinoamérica (40K+)
19. Tech Jobs LATAM (30K+)

Doğu Avrupa:
20. Ukrainian IT Jobs (35K+)
21. Polish Developers (25K+)
```

#### E) Reddit Stratejisi
```
SUBREDDIT LİSTESİ:
═════════════════
r/remotejobs (1.2M) - Ana hedef
r/forhire (600K) - [Hiring] flairı
r/freelance (350K) - Freelance odaklı
r/cscareerquestions (800K) - Kariyer tavsiyeleri
r/MachineLearning (2.8M) - ML işleri
r/learnprogramming (4M) - Entry level
r/webdev (2M) - Web geliştirici
r/devops (300K) - DevOps işleri
r/datascience (500K) - Data işleri
r/digitalnomad (2M) - Remote lifestyle

KURAL: Spam yapmadan değer katarak paylaş
- Önce 2 hafta yorum yap, karma kazan
- Sonra haftada 2-3 kaliteli post
- Her zaman özgün içerik
```

---

## 4. 📝 İÇERİK ŞABLONLARİ

### 4.1 LinkedIn Post Şablonları

```
ŞABLON 1 - TEK İŞ İLANI:
═══════════════════════
🚀 [ŞİRKET_ADI] is hiring [POZİSYON]!

💰 Salary: $[MIN]-$[MAX]/hour
🌍 Location: Remote (Worldwide)
🛠 Stack: [TECH_STACK]

What you'll do:
• [SORUMLULUK_1]
• [SORUMLULUK_2]
• [SORUMLULUK_3]

Requirements:
✅ [GEREKSINIM_1]
✅ [GEREKSINIM_2]
✅ [GEREKSINIM_3]

👉 Apply now: [REFERRAL_LINK]

#remotejobs #hiring #[TECH_TAG] #[ROLE_TAG]

---

ŞABLON 2 - HAFTALIK LİSTE:
═════════════════════════
📢 This Week's TOP 5 Remote AI Jobs!

1️⃣ Senior ML Engineer @ [ŞİRKET]
   💵 $80-120/hr | 🌍 Remote

2️⃣ AI Research Scientist @ [ŞİRKET]
   💵 $100-150/hr | 🌍 Remote

3️⃣ Data Engineer @ [ŞİRKET]
   💵 $60-90/hr | 🌍 Remote

4️⃣ Full Stack Developer @ [ŞİRKET]
   💵 $50-80/hr | 🌍 Remote

5️⃣ DevOps Engineer @ [ŞİRKET]
   💵 $70-100/hr | 🌍 Remote

🔗 All applications: [REFERRAL_LINK]

Which one catches your eye? 👇

---

ŞABLON 3 - BAŞARI HİKAYESİ:
══════════════════════════
"I was stuck in a 9-5 making $40K/year...

6 months ago, I took a chance on remote work.

Today? I'm earning $120/hour working from Bali. 🌴

Here's what changed:
✅ Applied to AI companies via Mercor
✅ Passed their skills assessment
✅ Got matched with 3 companies
✅ Picked the best offer

The remote AI job market is BOOMING.

Companies like OpenAI, Anthropic, and AI startups
are desperately seeking talent.

Don't wait. Start here: [REFERRAL_LINK]

What's holding you back from remote work? 👇"
```

### 4.2 Twitter Thread Şablonu

```
THREAD: "How to Land a $100/hr Remote AI Job"

🧵 TWEET 1:
I've helped 50+ developers land remote AI jobs
paying $50-150/hour.

Here's the exact playbook (save this 🔖):

---

🧵 TWEET 2:
Step 1: Skills Assessment

AI companies don't care about your degree.
They care about what you can BUILD.

Top skills in demand:
• Python (must-have)
• PyTorch/TensorFlow
• LLMs & Prompt Engineering
• Cloud (AWS/GCP)

---

🧵 TWEET 3:
Step 2: Portfolio That Converts

Forget generic projects.

Build these instead:
• Fine-tuned LLM for specific task
• RAG application with real data
• ML pipeline with monitoring
• Open source contribution

---

🧵 TWEET 4:
Step 3: Right Platform

LinkedIn? Too competitive.
Indeed? Underpaid jobs.

The secret? AI-specific platforms.

Mercor matches you with companies
actively hiring for AI roles.

They handle screening, you handle interviews.

---

🧵 TWEET 5:
Step 4: Interview Prep

AI interviews are different:
• Live coding (LeetCode Medium)
• System design (ML systems)
• Behavioral (async communication)

Practice: 2 hours/day for 2 weeks.

---

🧵 TWEET 6:
Step 5: Negotiate Like a Pro

Never accept first offer.

Counter with:
• Market data (Levels.fyi)
• Your unique value
• Long-term commitment

Remote AI roles have 20-40% negotiation room.

---

🧵 TWEET 7:
Ready to start?

1. Sign up: [REFERRAL_LINK]
2. Complete skills test
3. Get matched with companies
4. Interview
5. Start earning

Time from signup to first paycheck: ~3 weeks

---

🧵 TWEET 8:
If this helped, please:

1. Retweet tweet #1
2. Follow for daily AI job tips
3. Drop a 🚀 if you're applying

Your remote career starts now.

[REFERRAL_LINK]
```

### 4.3 Discord/Telegram Mesaj Şablonu

```
KISA FORMAT:
═══════════
🔥 HOT JOB ALERT

Position: Senior ML Engineer
Company: YC-backed AI Startup
Pay: $90-130/hour
Location: 100% Remote

Stack: Python, PyTorch, AWS
Experience: 3+ years

Quick apply: [REFERRAL_LINK]

---

DETAYLI FORMAT:
═══════════════
━━━━━━━━━━━━━━━━━━━━━━━━
🚀 REMOTE JOB OPPORTUNITY
━━━━━━━━━━━━━━━━━━━━━━━━

📌 Role: AI/ML Engineer
🏢 Company: [ŞİRKET] (Series A, $20M raised)
💰 Compensation: $100-150/hour
🌍 Location: Remote - Anywhere
⏰ Type: Full-time / Contract available

📋 Requirements:
→ 4+ years Python experience
→ Deep learning frameworks (PyTorch preferred)
→ Production ML system experience
→ Strong communication skills

🎁 Benefits:
→ Flexible hours
→ Latest hardware provided
→ Learning budget $2K/year
→ Async-first culture

🔗 Apply: [REFERRAL_LINK]

💬 DM me for referral tips!
━━━━━━━━━━━━━━━━━━━━━━━━
```

### 4.4 Reddit Post Şablonu

```
TITLE: [Hiring] Remote AI/ML Engineer - $80-130/hr -
       YC-backed Startup (Worldwide)

BODY:
Hi r/remotejobs!

I've been connecting developers with AI companies and
wanted to share a great opportunity.

**About the Role:**
A YC-backed AI startup is looking for ML Engineers
to work on cutting-edge LLM applications. Fully remote,
async-friendly, and they hire worldwide.

**Compensation:**
- $80-130/hour depending on experience
- Paid in USD
- Contract-to-hire possible

**Tech Stack:**
- Python, PyTorch
- LangChain, Vector DBs
- AWS/GCP
- FastAPI/Flask

**Requirements:**
- 3+ years ML experience
- Built production ML systems
- Strong Python skills
- Good written communication

**How to Apply:**
Apply through Mercor (they handle initial screening):
[REFERRAL_LINK]

Happy to answer questions in comments!

---

*Disclosure: This is a referral link. I may receive
compensation if you're hired, but I only share roles
I genuinely think are valuable.*
```

---

## 5. 🗓️ UYGULAMA TAKVİMİ

### 5.1 Faz 1: Kurulum (Hafta 1-2)

```
HAFTA 1 - ALTYAPI:
═════════════════
GÜN 1-2: Hesap Kurulumları
├── [ ] Mercor hesabı doğrulama
├── [ ] Referral link alma
├── [ ] LinkedIn profil optimizasyonu
├── [ ] Twitter hesabı kurulumu
├── [ ] Buffer hesabı (ücretsiz plan)
└── [ ] Bitly hesabı (link takip)

GÜN 3-4: Araç Kurulumları
├── [ ] Notion workspace oluşturma
├── [ ] İş takip veritabanı kurma
├── [ ] İçerik takvimi oluşturma
├── [ ] UTM parametreleri ayarlama
└── [ ] Google Sheet analitik tablosu

GÜN 5-7: İlk İçerikler
├── [ ] 20 LinkedIn post hazırlama
├── [ ] 30 Tweet hazırlama
├── [ ] 5 Twitter thread yazma
├── [ ] 10 Discord mesajı hazırlama
└── [ ] 10 Telegram mesajı hazırlama

HAFTA 2 - TOPLULUK:
══════════════════
GÜN 8-10: Platform Katılımları
├── [ ] 30 LinkedIn grubuna katıl
├── [ ] 30 Discord sunucusuna katıl
├── [ ] 50 Telegram grubuna katıl
├── [ ] 10 Facebook grubuna katıl
└── [ ] Reddit hesaplarında karma kazan

GÜN 11-14: Aktif Katılım
├── [ ] Her platformda günlük etkileşim
├── [ ] Topluluk kurallarını öğrenme
├── [ ] İlk organik paylaşımlar
├── [ ] Geri bildirim toplama
└── [ ] Strateji ayarlaması
```

### 5.2 Faz 2: Büyüme (Hafta 3-8)

```
HAFTALIK RUTİN:
═══════════════

PAZARTESİ:
├── 09:00 - Mercor'dan yeni işleri kontrol
├── 10:00 - Haftanın içeriklerini planla
├── 11:00 - LinkedIn post #1
├── 14:00 - Twitter thread
├── 16:00 - Discord paylaşımları (5 sunucu)
└── 18:00 - Telegram paylaşımları (10 grup)

SALI:
├── 09:00 - Engagement kontrolü
├── 10:00 - LinkedIn post #2
├── 12:00 - 3 Tweet
├── 14:00 - Discord paylaşımları (5 sunucu)
├── 16:00 - LinkedIn DM'ler (20 kişi)
└── 18:00 - Reddit post

ÇARŞAMBA:
├── 09:00 - Analytics inceleme
├── 10:00 - LinkedIn post #3
├── 12:00 - Twitter thread #2
├── 14:00 - Telegram paylaşımları (10 grup)
├── 16:00 - Facebook grup paylaşımları
└── 18:00 - Discord topluluk etkileşimi

PERŞEMBE:
├── 09:00 - Yeni işleri kontrol
├── 10:00 - LinkedIn post #4
├── 12:00 - 3 Tweet
├── 14:00 - Discord paylaşımları (5 sunucu)
├── 16:00 - LinkedIn DM'ler (20 kişi)
└── 18:00 - Medium makale yazımı

CUMA:
├── 09:00 - Haftalık performans özeti
├── 10:00 - LinkedIn post #5 (Weekly Roundup)
├── 12:00 - Twitter haftalık özet
├── 14:00 - Telegram haftalık liste
├── 16:00 - Discord announcement
└── 18:00 - Gelecek hafta planlaması

CUMARTESİ:
├── 10:00 - Otomatik paylaşımlar çalışır
├── 14:00 - Engagement yanıtlama
└── 16:00 - Yeni topluluklar araştırma

PAZAR:
├── Dinlenme + otomatik paylaşımlar
└── 18:00 - Haftalık analiz raporu
```

### 5.3 Faz 3: Otomasyon (Hafta 9-12)

```
OTOMASYON AKIŞLARI:
══════════════════

AKIŞ 1: İş İlanı → İçerik (Make.com)
┌─────────────────────────────────────────┐
│ Tetikleyici: Yeni Mercor iş ilanı       │
│              (günlük kontrol)            │
├─────────────────────────────────────────┤
│ Adım 1: İş detaylarını çek              │
│ Adım 2: ChatGPT ile içerik oluştur      │
│ Adım 3: Notion'a kaydet                 │
│ Adım 4: Buffer'a planla                 │
│ Adım 5: Bitly link oluştur              │
└─────────────────────────────────────────┘

AKIŞ 2: Otomatik Paylaşım Takvimi
┌─────────────────────────────────────────┐
│ Buffer Scheduling:                       │
│ ├── LinkedIn: 09:00, 12:00, 17:00       │
│ ├── Twitter: 08:00, 11:00, 14:00, 18:00 │
│ └── Facebook: 10:00, 15:00              │
└─────────────────────────────────────────┘

AKIŞ 3: Analytics Toplama
┌─────────────────────────────────────────┐
│ Haftalık otomatik rapor:                │
│ ├── Bitly tıklama verileri              │
│ ├── LinkedIn post performansı           │
│ ├── Twitter engagement                  │
│ └── Google Sheets'e kaydet              │
└─────────────────────────────────────────┘
```

### 5.4 Faz 4: Ölçekleme (Ay 4-12)

```
BÜYÜME STRATEJİLERİ:
═══════════════════

AY 4-6: İçerik Çeşitlendirme
├── YouTube Shorts başlangıç
├── TikTok hesabı açılışı
├── Podcast görünümleri
├── Blog SEO içerikleri
└── Newsletter başlatma

AY 7-9: Ekip Genişletme
├── Virtual assistant işe alma
├── İçerik yazarı (freelance)
├── Topluluk yöneticisi
└── Süreç dokümantasyonu

AY 10-12: Çoklu Gelir Kaynakları
├── Premium referral partnerlikleri
├── Kariyer koçluğu hizmeti
├── CV inceleme servisi
├── Interview prep kursu
└── Şirketlere doğrudan tanıtım
```

---

## 6. 💰 FİNANSAL PROJEKSIYONLAR

### 6.1 Gelir Modeli

```
REFERRAL GELİR HESAPLAMASI:
══════════════════════════

Mercor Referral Yapısı:
├── Entry Level İşe Alım: $500
├── Mid Level İşe Alım: $750
├── Senior Level İşe Alım: $1,000
└── Executive Level: $2,000

Ortalama Komisyon: $750/işe alım
```

### 6.2 Aylık Projeksiyon

```
AY 1-3 (Başlangıç):
══════════════════
Toplam Reach: 10,000 kişi/ay
├── Tıklama Oranı: %2 = 200 tıklama
├── Başvuru Oranı: %30 = 60 başvuru
├── Mülakat Oranı: %15 = 9 mülakat
├── İşe Alım Oranı: %33 = 3 işe alım
└── Gelir: 3 × $750 = $2,250/ay

AY 4-6 (Büyüme):
══════════════════
Toplam Reach: 50,000 kişi/ay
├── Tıklama: 1,000
├── Başvuru: 300
├── Mülakat: 45
├── İşe Alım: 15
└── Gelir: 15 × $750 = $11,250/ay

AY 7-12 (Olgunluk):
══════════════════
Toplam Reach: 150,000 kişi/ay
├── Tıklama: 3,000
├── Başvuru: 900
├── Mülakat: 135
├── İşe Alım: 45
└── Gelir: 45 × $750 = $33,750/ay
```

### 6.3 Gider Bütçesi

```
AYLIK GİDERLER:
══════════════

Araçlar:
├── Buffer Pro: $15/ay
├── Bitly Pro: $29/ay
├── Canva Pro: $13/ay
├── Make.com: $9/ay
├── Notion: $0 (free)
├── Airtable: $0 (free)
└── Toplam Araçlar: $66/ay

Reklam (Ay 3+):
├── LinkedIn Ads: $200/ay
├── Twitter Ads: $100/ay
└── Toplam Reklam: $300/ay

Ekip (Ay 7+):
├── Virtual Assistant: $500/ay
├── Content Writer: $300/ay
└── Toplam Ekip: $800/ay

TOPLAM GİDER:
├── Ay 1-3: $66/ay
├── Ay 4-6: $366/ay
└── Ay 7-12: $1,166/ay
```

### 6.4 Kar Projeksiyonu

```
NET KAR TAHMİNİ (12 AY):
════════════════════════

        Gelir    Gider    Net Kar
Ay 1    $750     $66      $684
Ay 2    $1,500   $66      $1,434
Ay 3    $2,250   $66      $2,184
Ay 4    $5,000   $366     $4,634
Ay 5    $7,500   $366     $7,134
Ay 6    $11,250  $366     $10,884
Ay 7    $15,000  $1,166   $13,834
Ay 8    $20,000  $1,166   $18,834
Ay 9    $25,000  $1,166   $23,834
Ay 10   $30,000  $1,166   $28,834
Ay 11   $33,750  $1,166   $32,584
Ay 12   $33,750  $1,166   $32,584
────────────────────────────────
TOPLAM  $185,750 $7,282   $178,468

Yıllık Net Kar: ~$178,000
```

---

## 7. 📊 KPI VE METRİKLER

### 7.1 Haftalık Takip Metrikleri

```
NOTION DASHBOARD:
════════════════

┌─────────────────────────────────────────────────────┐
│                  HAFTALIK KPI'LAR                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Reach          ████████████░░░░  25,400 / 30,000  │
│  Tıklamalar     ██████████░░░░░░  512 / 600        │
│  Başvurular     ████████░░░░░░░░  153 / 200        │
│  Mülakatlar     ██████░░░░░░░░░░  23 / 30          │
│  İşe Alımlar    █████░░░░░░░░░░░  7 / 10           │
│                                                     │
│  Haftalık Gelir: $5,250                            │
│  Aylık Tahmini: $21,000                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 7.2 Platform Performans Tablosu

```
PLATFORM KARŞILAŞTIRMA:
══════════════════════

Platform     | Reach | CTR  | Conv | ROI
─────────────|────---|------|------|────
LinkedIn     | 15K   | 3.2% | 2.1% | ⭐⭐⭐⭐⭐
Twitter      | 25K   | 1.8% | 0.9% | ⭐⭐⭐⭐
Discord      | 8K    | 4.5% | 3.2% | ⭐⭐⭐⭐⭐
Telegram     | 12K   | 2.1% | 1.5% | ⭐⭐⭐⭐
Reddit       | 20K   | 1.2% | 0.7% | ⭐⭐⭐
Facebook     | 10K   | 1.5% | 0.8% | ⭐⭐⭐
```

### 7.3 A/B Test Planı

```
TEST 1: Başlık Formatları
├── A: "🚀 [Company] is hiring..."
├── B: "HOT: $150/hr Remote Job..."
└── Metrik: CTR karşılaştırması

TEST 2: CTA Türleri
├── A: "Apply now →"
├── B: "Don't miss this opportunity"
└── Metrik: Conversion rate

TEST 3: Post Zamanları
├── A: Sabah (09:00)
├── B: Öğlen (12:00)
├── C: Akşam (18:00)
└── Metrik: Engagement rate

TEST 4: İçerik Uzunluğu
├── A: Kısa (50 kelime)
├── B: Orta (150 kelime)
├── C: Uzun (300+ kelime)
└── Metrik: Save/Share rate
```

---

## 8. ⚠️ RİSK YÖNETİMİ

### 8.1 Risk Matrisi

```
┌─────────────────────────────────────────────────────────┐
│                     RİSK MATRİSİ                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  YÜKSEK   │ Platform Ban │ Mercor Politika │           │
│  ETKİ     │ Riski        │ Değişikliği     │           │
│           │ ────────────────────────────────           │
│  ORTA     │ Spam         │ Düşük           │           │
│  ETKİ     │ Şikayetleri  │ Dönüşüm         │           │
│           │ ────────────────────────────────           │
│  DÜŞÜK    │ Teknik       │ Rakip           │           │
│  ETKİ     │ Sorunlar     │ Artışı          │           │
│           │              │                 │           │
│           └──────────────┴─────────────────┘           │
│              DÜŞÜK         ORTA       YÜKSEK           │
│              OLASILIK     OLASILIK    OLASILIK         │
└─────────────────────────────────────────────────────────┘
```

### 8.2 Risk Azaltma Stratejileri

```
RİSK: Platform Ban
══════════════════
Önlem:
├── Her platform için ayrı strateji
├── Organik görünüm, spam yok
├── Platform kurallarına tam uyum
├── Yedek hesaplar hazır tutma
├── Çoklu platform çeşitliliği
└── Her zaman değer odaklı içerik

RİSK: Mercor Politika Değişikliği
═════════════════════════════════
Önlem:
├── Sözleşmeyi detaylı okuma
├── Politika güncellemelerini takip
├── Alternatif platformlar (Toptal, Turing, Andela)
├── Doğrudan şirket ilişkileri kurma
└── Çoklu gelir kaynağı oluşturma

RİSK: Düşük Dönüşüm
═══════════════════
Önlem:
├── Sürekli A/B test
├── İçerik optimizasyonu
├── Hedef kitle analizi
├── Feedback toplama
└── Strateji pivotu hazırlığı
```

---

## 9. 📁 EKLER

### 9.1 Notion Veritabanı Yapısı

```
DATABASE 1: İş İlanları
═══════════════════════
Fields:
├── Job ID (Auto)
├── Title (Text)
├── Company (Text)
├── Salary Range (Text)
├── Tech Stack (Multi-select)
├── Posted Date (Date)
├── Status (Select: Active/Filled/Expired)
├── Referral Link (URL)
├── Performance (Relation → Analytics)
└── Notes (Text)

DATABASE 2: İçerik Takvimi
══════════════════════════
Fields:
├── Content ID (Auto)
├── Platform (Select)
├── Post Type (Select)
├── Scheduled Date (Date)
├── Status (Select: Draft/Scheduled/Posted)
├── Content (Text)
├── Related Job (Relation → Jobs)
├── Performance (Relation → Analytics)
└── A/B Test Group (Select)

DATABASE 3: Analytics
═════════════════════
Fields:
├── Entry ID (Auto)
├── Date (Date)
├── Platform (Select)
├── Impressions (Number)
├── Clicks (Number)
├── Applications (Number)
├── Interviews (Number)
├── Hires (Number)
├── Revenue (Number)
└── Notes (Text)

DATABASE 4: Topluluklar
═══════════════════════
Fields:
├── Community ID (Auto)
├── Platform (Select)
├── Name (Text)
├── URL (URL)
├── Member Count (Number)
├── Join Date (Date)
├── Status (Select: Active/Inactive/Banned)
├── Posting Rules (Text)
├── Best Post Times (Text)
├── Performance Score (Number)
└── Notes (Text)
```

### 9.2 Otomasyon Workflow Detayları

```
MAKE.COM WORKFLOW 1: Günlük İş Çekme
════════════════════════════════════

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Schedule   │────▶│  HTTP GET    │────▶│   Filter     │
│  (Daily 8AM) │     │  Mercor API  │     │  (New Jobs)  │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Buffer     │◀────│   OpenAI     │◀────│   Notion     │
│  (Schedule)  │     │  (Generate)  │     │  (Store)     │
└──────────────┘     └──────────────┘     └──────────────┘


MAKE.COM WORKFLOW 2: Haftalık Rapor
═══════════════════════════════════

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Schedule   │────▶│  Bitly API   │────▶│   Notion     │
│ (Sun 9PM)    │     │  (Get Stats) │     │  (Get Data)  │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Email     │◀────│   OpenAI     │◀────│   Sheets     │
│   (Send)     │     │  (Summarize) │     │  (Calculate) │
└──────────────┘     └──────────────┘     └──────────────┘
```

### 9.3 Günlük Checklist

```
GÜNLÜK GÖREVLER:
════════════════

SABAH (09:00-10:00):
├── [ ] Mercor'da yeni işleri kontrol et
├── [ ] LinkedIn bildirimlerini yanıtla
├── [ ] Twitter engagement'ları kontrol et
├── [ ] Günün ilk postunu paylaş
└── [ ] Analytics'e göz at

ÖĞLE (12:00-13:00):
├── [ ] LinkedIn post #2
├── [ ] Twitter thread/posts
├── [ ] Discord mesajlarını kontrol et
└── [ ] Telegram gruplarında paylaşım

AKŞAM (17:00-18:00):
├── [ ] LinkedIn DM outreach (20 kişi)
├── [ ] Günün son postları
├── [ ] Engagement yanıtlama
├── [ ] Yarının içeriklerini planla
└── [ ] Günlük metrikleri kaydet
```

---

## 10. ✅ SONRAKI ADIMLAR

### Acil Yapılacaklar (48 Saat İçinde):

```
1. [ ] Mercor hesabına giriş yap
2. [ ] Referral link'ini al ve kaydet
3. [ ] LinkedIn profilini optimize et
4. [ ] Buffer ücretsiz hesabı aç
5. [ ] Bitly hesabı oluştur
6. [ ] Notion workspace kur
7. [ ] İlk 5 içeriği hazırla
8. [ ] İlk LinkedIn postunu paylaş
```

---

## 📞 DESTEK

Bu PRD'yi uygulamaya başladığında sorularını sorabilirsin. Her aşamada:
- Daha detaylı şablonlar
- Platform-spesifik stratejiler
- Otomasyon kodları
- Analiz yorumları

sağlayabilirim.

---

**Doküman Sonu**

*Son Güncelleme: Ocak 2025*
*Versiyon: 1.0*