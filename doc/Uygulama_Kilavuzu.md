# 🚀 MERCORCONNECT - UYGULAMA BAŞLANGIÇ KILAVUZU

---

## AŞAMA 1: HEMEN ŞİMDİ YAPILACAKLAR

### 1.1 Mercor Hesap Kurulumu

```
ADIM ADIM:
══════════

1. https://work.mercor.com/explore adresine git
2. turhanhamza@gmail.com ile giriş yap
3. Profil → Referral Program bölümüne git
4. Benzersiz referral linkini kopyala
   Format: https://mercor.com/r/turhanhamza veya benzeri

5. Bu linki hemen kaydet:
   ├── Notion'a
   ├── Google Keep'e
   ├── Telefon notlarına
   └── Bir Word/txt dosyasına
```

### 1.2 Referral Link Yapısı

```
ANA LİNK:
https://mercor.com/r/[SENIN_KODUN]

UTM PARAMETRELERİYLE:
https://mercor.com/r/[KODUN]?utm_source=linkedin&utm_medium=post&utm_campaign=ai_jobs

PLATFORM BAZLI LİNKLER:
═══════════════════════
LinkedIn:  bit.ly/mercor-linkedin-turhan
Twitter:   bit.ly/mercor-twitter-turhan
Discord:   bit.ly/mercor-discord-turhan
Telegram:  bit.ly/mercor-telegram-turhan
Reddit:    bit.ly/mercor-reddit-turhan
Facebook:  bit.ly/mercor-facebook-turhan
```

---

## AŞAMA 2: ARAÇ KURULUMU (30 DAKİKA)

### 2.1 Bitly Hesabı (Link Takip)

```
ADIM 1: https://bitly.com adresine git
ADIM 2: Ücretsiz hesap oluştur
ADIM 3: Şu linkleri oluştur:

┌─────────────────────────────────────────────────────────────┐
│                    BİTLY DASHBOARD                          │
├─────────────────────────────────────────────────────────────┤
│ Orijinal Link          →  Kısa Link                         │
│─────────────────────────────────────────────────────────────│
│ mercor.com/r/xxx?utm_source=linkedin  → bit.ly/mcr-li      │
│ mercor.com/r/xxx?utm_source=twitter   → bit.ly/mcr-tw      │
│ mercor.com/r/xxx?utm_source=discord   → bit.ly/mcr-dc      │
│ mercor.com/r/xxx?utm_source=telegram  → bit.ly/mcr-tg      │
│ mercor.com/r/xxx?utm_source=reddit    → bit.ly/mcr-rd      │
│ mercor.com/r/xxx?utm_source=facebook  → bit.ly/mcr-fb      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Buffer Hesabı (Sosyal Medya Planlama)

```
ADIM 1: https://buffer.com adresine git
ADIM 2: Ücretsiz hesap oluştur (3 kanal, 10 post/kanal)
ADIM 3: Şu hesapları bağla:
        ├── LinkedIn profili
        ├── Twitter hesabı
        └── Facebook sayfası (opsiyonel)

ÜCRETSIZ PLAN LİMİTLERİ:
├── 3 sosyal kanal
├── Kanal başına 10 planlı post
├── Temel analitik
└── Yeterli başlangıç için!
```

### 2.3 Notion Workspace (Ücretsiz)

```
ADIM 1: https://notion.so adresine git
ADIM 2: Hesap oluştur
ADIM 3: Yeni workspace: "MercorConnect"
```

---

## AŞAMA 3: NOTİON VERİTABANI KURULUMU

### 3.1 Ana Dashboard Sayfası

Notion'da şu yapıyı oluştur:

```
📊 MERCORCONNECT DASHBOARD
═══════════════════════════

🎯 Bu Haftanın Hedefleri
├── Reach: 5,000 kişi
├── Tıklama: 100
├── Başvuru: 30
└── İşe Alım: 1

📈 Anlık Metrikler
├── Toplam Başvuru: [sayı]
├── Toplam İşe Alım: [sayı]
├── Toplam Gelir: $[miktar]
└── Bu Ay Gelir: $[miktar]

🔗 Hızlı Linkler
├── Mercor Dashboard
├── Bitly Analytics
├── Buffer Queue
└── LinkedIn Analytics

📋 Veritabanları
├── → İş İlanları DB
├── → İçerik Takvimi DB
├── → Topluluklar DB
└── → Analytics DB
```

### 3.2 İş İlanları Veritabanı

```
DATABASE: İş İlanları
═════════════════════

| Job ID | Başlık | Şirket | Maaş | Tech Stack | Tarih | Durum | Link |
|--------|--------|--------|------|------------|-------|-------|------|
| J001 | Senior ML Engineer | AI Startup | $100-150/hr | Python, PyTorch | 15/01 | ✅ Aktif | bit.ly/xxx |
| J002 | Full Stack Dev | Tech Corp | $60-90/hr | React, Node | 15/01 | ✅ Aktif | bit.ly/xxx |
| J003 | Data Scientist | DataCo | $80-120/hr | Python, SQL | 14/01 | ⏸️ Dolu | bit.ly/xxx |
| J004 | DevOps Engineer | CloudTech | $70-100/hr | AWS, K8s | 14/01 | ✅ Aktif | bit.ly/xxx |
| J005 | AI Research | Lab Inc | $120-180/hr | PyTorch, Papers | 13/01 | ✅ Aktif | bit.ly/xxx |

PROPERTY TYPES:
├── Job ID: Auto-number
├── Başlık: Title
├── Şirket: Text
├── Maaş: Text
├── Tech Stack: Multi-select
├── Tarih: Date
├── Durum: Select (Aktif/Dolu/Expired)
├── Link: URL
├── Tıklama: Number
├── Başvuru: Number
└── İşe Alım: Number
```

### 3.3 İçerik Takvimi Veritabanı

```
DATABASE: İçerik Takvimi
════════════════════════

| Tarih | Platform | İçerik Tipi | Durum | İçerik | İlgili İş |
|-------|----------|-------------|-------|--------|-----------|
| 15/01 09:00 | LinkedIn | Tek İlan | ✅ Paylaşıldı | "🚀 Senior ML..." | J001 |
| 15/01 12:00 | Twitter | Thread | 📝 Taslak | "How to land..." | - |
| 15/01 15:00 | Discord | Job Post | ⏰ Planlandı | "HOT: $150/hr..." | J001 |
| 15/01 18:00 | Telegram | Liste | ⏰ Planlandı | "Top 5 jobs..." | Multiple |
| 16/01 09:00 | LinkedIn | Tip | 📝 Taslak | "Interview tip..." | - |

PROPERTY TYPES:
├── Tarih: Date with time
├── Platform: Select (LinkedIn/Twitter/Discord/Telegram/Reddit/Facebook)
├── İçerik Tipi: Select (Tek İlan/Liste/Thread/Tip/Engagement)
├── Durum: Select (Taslak/Planlandı/Paylaşıldı/Başarısız)
├── İçerik: Text (Long)
├── İlgili İş: Relation → İş İlanları
├── Tıklama: Number
└── Engagement: Number
```

### 3.4 Topluluklar Veritabanı

```
DATABASE: Topluluklar
═════════════════════

| Platform | İsim | Üye Sayısı | Katılım | Durum | Paylaşım Kuralı | Son Paylaşım |
|----------|------|------------|---------|-------|-----------------|--------------|
| LinkedIn | Remote Work & Digital Nomads | 2.1M | 10/01 | ✅ Aktif | Günde 1 post | 14/01 |
| Discord | Reactiflux | 200K | 11/01 | ✅ Aktif | #jobs kanalı | 14/01 |
| Telegram | Remote Jobs Worldwide | 50K | 10/01 | ✅ Aktif | Sınırsız | 15/01 |
| Reddit | r/remotejobs | 1.2M | 08/01 | ⏸️ Karma Kazan | Haftada 2 | - |
| Facebook | Freelancers TR | 50K | 12/01 | ✅ Aktif | Günde 1 | 13/01 |

PROPERTY TYPES:
├── Platform: Select
├── İsim: Text
├── URL: URL
├── Üye Sayısı: Number
├── Katılım Tarihi: Date
├── Durum: Select (Aktif/Beklemede/Yasaklı/Ayrıldı)
├── Paylaşım Kuralı: Text
├── Son Paylaşım: Date
├── Toplam Paylaşım: Number
├── Toplam Tıklama: Number
└── Notlar: Text
```

### 3.5 Haftalık Analytics Veritabanı

```
DATABASE: Haftalık Analytics
════════════════════════════

| Hafta | Platform | Reach | Tıklama | CTR | Başvuru | İşe Alım | Gelir |
|-------|----------|-------|---------|-----|---------|----------|-------|
| H1 | LinkedIn | 5,200 | 156 | 3.0% | 47 | 2 | $1,500 |
| H1 | Twitter | 8,400 | 134 | 1.6% | 28 | 1 | $750 |
| H1 | Discord | 2,100 | 89 | 4.2% | 31 | 1 | $750 |
| H1 | Telegram | 3,800 | 72 | 1.9% | 18 | 0 | $0 |
| H1 | TOPLAM | 19,500 | 451 | 2.3% | 124 | 4 | $3,000 |
```

---

## AŞAMA 4: LINKEDIN OPTİMİZASYONU

### 4.1 Profil Güncellemesi

```
LINKEDIN PROFİL ŞABLONU:
════════════════════════

BAŞLIK (Headline):
"🚀 Connecting Tech Talent with Remote AI Opportunities |
$50-150/hr Positions | Helping Developers Work From Anywhere"

HAKKINDA (About):
═══════════════════
I help talented developers and AI professionals find
remote jobs that pay $50-150/hour at top tech companies.

🎯 What I Do:
• Curate high-paying remote AI/ML positions
• Connect candidates with YC-backed startups
• Share insider tips on landing remote tech jobs

💼 Companies in my network:
• AI startups backed by Y Combinator
• OpenAI, Anthropic contractors
• Series A-C funded tech companies
• Fortune 500 remote programs

🔥 Featured Positions (Updated Weekly):
• ML Engineers: $80-150/hr
• Full Stack Developers: $50-100/hr
• Data Scientists: $70-130/hr
• DevOps Engineers: $60-120/hr

📩 Looking for remote opportunities?
→ DM me "REMOTE" for current openings
→ Follow for daily job posts
→ Click the link below to apply

#RemoteJobs #AIJobs #TechCareers #Hiring

FEATURED (Öne Çıkan):
═════════════════════
"🔥 Current Remote Opportunities"
Link: [Ana Referral Link]

BANNER IMAGE:
═════════════
Canva'da oluştur:
├── Boyut: 1584 x 396 px
├── Tema: Profesyonel, mavi tonları
├── Text: "Remote AI Jobs | $50-150/hr | Work Anywhere"
├── Icons: Laptop, globe, money
└── CTA: "Follow for daily opportunities"
```

### 4.2 LinkedIn Banner Tasarımı

```
CANVA TASARIM ADIMLARI:
═══════════════════════

1. canva.com'a git
2. "LinkedIn Banner" ara
3. Şablonlardan profesyonel birini seç
4. Şu elementleri ekle:

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   💼 REMOTE AI & TECH JOBS                                 │
│                                                             │
│   🌍 Work From Anywhere    💰 $50-150/hour                  │
│                                                             │
│   "Connecting talent with top tech opportunities"          │
│                                                             │
│   ✅ ML Engineers  ✅ Full Stack  ✅ Data Science           │
│                                                             │
│   [FOLLOW FOR DAILY JOBS]                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Renk Paleti:
├── Primary: #0077B5 (LinkedIn Blue)
├── Secondary: #00A0DC (Light Blue)
├── Accent: #7FC15E (Green - money/success)
└── Text: #FFFFFF (White)
```

---

## AŞAMA 5: TWITTER/X HESAP KURULUMU

### 5.1 Profil Optimizasyonu

```
TWITTER PROFİL ŞABLONU:
═══════════════════════

Username: @RemoteAIJobsHQ veya @TurhanJobs veya @MercorJobsTR

Display Name:
Remote AI Jobs 🚀 | $50-150/hr

Bio (160 karakter):
🎯 Daily remote AI & tech job postings
💰 $50-150/hour positions
🌍 Work from anywhere
👇 Apply now

Location: 🌍 Remote - Worldwide

Website: [Referral Link]

BANNER (1500x500):
════════════════════
Canva'da oluştur, benzer tema:
"🔥 Hot Remote Jobs Daily | AI/ML | Full Stack | DevOps"

PINNED TWEET:
═════════════
"🧵 THREAD: How to land a $100/hr remote AI job

I've helped 100+ developers get hired.

Here's the exact playbook (save this):

👇"
[Thread devam eder]
```

### 5.2 Twitter İçerik Planı

```
GÜNLÜK TWEET PROGRAMI:
═════════════════════

08:00 - Morning Job Alert
"🌅 Good morning!

Here's a HOT remote position:

🏢 [Company] - [Title]
💰 $[XX]-[XX]/hour
🛠 [Tech Stack]
🌍 Remote worldwide

Apply: [link]

RT to help someone get hired! 🔄"

11:00 - Quick Tip
"💡 Remote interview tip:

[Pratik bir ipucu]

Save this for your next interview 📌"

14:00 - Job List
"📢 3 Remote positions open RIGHT NOW:

1️⃣ [Job 1] - $XX/hr
2️⃣ [Job 2] - $XX/hr
3️⃣ [Job 3] - $XX/hr

All remote, all hiring 🔥

Links in thread 👇"

18:00 - Engagement
"Quick poll:

What's your biggest challenge in finding remote work?

🔵 Finding legit opportunities
🟢 Passing technical interviews
🟡 Negotiating salary
🔴 Time zone differences

Reply below 👇"

21:00 - Day Wrap
"That's a wrap for today! 🌙

Posted [X] jobs
Helped [X] apply

Tomorrow: More $100+/hr positions

Follow + 🔔 to never miss an opportunity

#remotejobs #hiring"
```

---

## AŞAMA 6: DISCORD SUNUCU KATILIMI

### 6.1 Katılım Listesi ve Linkler

```
ÖNCELİK 1 - HEMEN KATIL (Bu Hafta):
═══════════════════════════════════

1. Reactiflux
   └── discord.gg/reactiflux
   └── Kanal: #job-board

2. Python Discord
   └── discord.gg/python
   └── Kanal: #jobs

3. The Programmer's Hangout
   └── discord.gg/programming
   └── Kanal: #job-listings

4. Coding Den
   └── discord.gg/code
   └── Kanal: #jobs

5. TypeScript Community
   └── discord.gg/typescript
   └── Kanal: #jobs

6. Node.js
   └── discord.gg/nodejs
   └── Kanal: #jobs

7. Rust Programming
   └── discord.gg/rust-lang
   └── Kanal: #jobs

8. Go (Golang)
   └── discord.gg/golang
   └── Kanal: #job-board

9. Vue.js
   └── discord.gg/vue
   └── Kanal: #jobs

10. DevCord
    └── discord.gg/devcord
    └── Kanal: #job-board

ÖNCELİK 2 - İLK AY İÇİNDE:
══════════════════════════

11-15. AI/ML Sunucuları:
├── MLOps Community
├── Weights & Biases
├── Hugging Face
├── AI Alignment
└── LangChain

16-20. Remote Work:
├── Remote Work Hub
├── Digital Nomads World
├── Freelance Devs
├── Indie Hackers
└── WFH Community

21-30. Niche Tech:
├── AWS Community
├── GCP Community
├── Kubernetes
├── Docker
├── Linux
├── Cybersecurity
├── Data Engineering
├── Web3 Devs
├── Game Dev
└── Mobile Devs
```

### 6.2 Discord Paylaşım Protokolü

```
KATILIM SONRASI ADIMLAR:
════════════════════════

GÜN 1-3: Gözlem
├── Kuralları oku
├── Job kanalını bul
├── Başkalarının postlarını incele
├── Format ve ton'u öğren
├── PAYLAŞIM YAPMA

GÜN 4-7: Hafif Katılım
├── Genel kanallarda yardımcı ol
├── Sorulara cevap ver
├── Kendini tanıt
├── Hala job postlama

HAFTA 2+: Paylaşım Başlangıç
├── Kurallara uygun post formatı
├── Günde MAX 1-2 iş/sunucu
├── Spam yapma
├── Engagement'a cevap ver

ÖRNEK POST:
═══════════
📢 **Remote Opportunity**

**Position:** Senior ML Engineer
**Company:** YC-backed AI Startup
**Compensation:** $100-150/hour
**Location:** 100% Remote (Worldwide)

**Tech Stack:**
• Python, PyTorch
• LLMs, RAG
• AWS/GCP

**Requirements:**
• 4+ years ML experience
• Production system experience
• Strong communication

**Apply:** <link>

DM me for questions!
```

---

## AŞAMA 7: TELEGRAM GRUP KATILIMI

### 7.1 Grup Listesi

```
GLOBAL GRUPLAR (İngilizce):
══════════════════════════

1. @RemoteJobsWorldwide - 50K+
2. @FreelanceProgrammers - 40K+
3. @PythonJobs - 30K+
4. @JavaScriptJobs - 45K+
5. @AIMLJobs - 25K+
6. @DataScienceJobs - 30K+
7. @DevOpsJobs - 20K+
8. @StartupJobsGlobal - 20K+
9. @WebDevJobs - 35K+
10. @TechNomads - 15K+
11. @RemoteFirst - 25K+
12. @FullStackJobs - 20K+
13. @BackendJobs - 15K+
14. @FrontendJobs - 18K+
15. @MobileDevJobs - 12K+

TÜRKÇE GRUPLAR:
═══════════════
16. @YazilimcilarTR - 15K+
17. @FreelancerTurkiye - 10K+
18. @RemoteCalisanlarTR - 8K+
19. @ITJobsTurkiye - 12K+
20. @StartupTurkiye - 10K+
21. @YazilimIsIlanlari - 8K+
22. @TeknolojiKariyeri - 5K+

BÖLGESEL (Büyük Pazarlar):
══════════════════════════
23-27. Hindistan (5 grup)
28-32. Latin Amerika (5 grup)
33-37. Doğu Avrupa (5 grup)
38-42. Güneydoğu Asya (5 grup)
```

### 7.2 Telegram Mesaj Şablonları

```
ŞABLON 1 - TEK İŞ:
══════════════════
🔥 **HOT REMOTE JOB**

📌 **Senior ML Engineer**
🏢 YC-backed AI Startup
💰 $100-150/hour
🌍 Remote - Worldwide
🛠 Python, PyTorch, AWS

Requirements:
✅ 4+ years ML experience
✅ Production systems
✅ Strong English

👉 Apply: [link]

---

ŞABLON 2 - GÜNLÜK LİSTE:
════════════════════════
📢 **Today's Remote Opportunities**

1️⃣ **ML Engineer** - $100-150/hr
   🏢 AI Startup | 🌍 Remote

2️⃣ **Full Stack Dev** - $60-90/hr
   🏢 Tech Corp | 🌍 Remote

3️⃣ **Data Scientist** - $80-120/hr
   🏢 DataCo | 🌍 Remote

All positions: [link]

💬 DM for questions

---

ŞABLON 3 - HAFTALIK ÖZET:
═════════════════════════
📊 **WEEKLY JOB ROUNDUP**

This week's best remote opportunities:

🥇 Top Paying: AI Research - $180/hr
🏆 Most Popular: Full Stack - 200+ applicants
🔥 Hot Category: LLM/AI Engineering

Total new positions: 45
Average salary: $95/hr

Browse all: [link]

See you next week! 🚀
```

---

## AŞAMA 8: İLK HAFTA EYLEM PLANI

### 8.1 Gün Gün Program

```
═══════════════════════════════════════════════════════════════
                        HAFTA 1 - GÜNLÜK PLAN
═══════════════════════════════════════════════════════════════

📅 GÜN 1 (BUGÜN):
═════════════════
□ 09:00 - Mercor'a giriş, referral link al
□ 09:30 - Bitly hesabı oluştur, 6 link oluştur
□ 10:00 - Buffer hesabı oluştur
□ 10:30 - Notion workspace oluştur
□ 11:00 - 4 veritabanını kur (kopyala-yapıştır)
□ 12:00 - ÖĞLE ARASI
□ 13:00 - LinkedIn profil güncellemesi
□ 14:00 - LinkedIn banner tasarımı (Canva)
□ 15:00 - Twitter hesabı oluştur/optimize et
□ 16:00 - Twitter banner tasarımı
□ 17:00 - İlk 5 Discord sunucusuna katıl
□ 18:00 - İlk 10 Telegram grubuna katıl
□ 19:00 - Günü değerlendir, yarını planla

📅 GÜN 2:
═════════
□ 09:00 - Mercor'dan 10 aktif iş seç
□ 10:00 - Bu işleri Notion'a ekle
□ 11:00 - 5 LinkedIn post hazırla
□ 12:00 - ÖĞLE ARASI
□ 13:00 - 10 Tweet + 1 Thread hazırla
□ 14:00 - 5 Discord mesajı hazırla
□ 15:00 - 5 Telegram mesajı hazırla
□ 16:00 - İlk LinkedIn postunu paylaş
□ 17:00 - İlk Tweet serisini paylaş
□ 18:00 - 10 LinkedIn grubuna katıl
□ 19:00 - 5 daha Discord sunucusuna katıl

📅 GÜN 3:
═════════
□ 09:00 - Analytics kontrol (Bitly, LinkedIn)
□ 10:00 - LinkedIn post #2
□ 11:00 - Twitter thread paylaş
□ 12:00 - ÖĞLE ARASI
□ 13:00 - Discord sunucularında gözlem
□ 14:00 - Telegram gruplarına ilk paylaşımlar
□ 15:00 - 10 daha LinkedIn grubuna katıl
□ 16:00 - Buffer'da 3 günlük içerik planla
□ 17:00 - Reddit hesabı kur, subreddit'lere katıl
□ 18:00 - Reddit'te yorum yap (karma kazan)
□ 19:00 - Performans değerlendirmesi

📅 GÜN 4:
═════════
□ 09:00 - LinkedIn post #3
□ 10:00 - Twitter posts (3 adet)
□ 11:00 - Yeni işleri Mercor'dan kontrol et
□ 12:00 - ÖĞLE ARASI
□ 13:00 - Notion'ı güncelle
□ 14:00 - LinkedIn DM outreach başlat (20 kişi)
□ 15:00 - Discord'da ilk job postları (kurallara uygun)
□ 16:00 - Telegram gruplarına devam
□ 17:00 - 10 daha Discord sunucusu
□ 18:00 - Facebook gruplarına katıl (5 grup)
□ 19:00 - A/B test sonuçlarını değerlendir

📅 GÜN 5:
═════════
□ 09:00 - LinkedIn post #4
□ 10:00 - Twitter thread #2
□ 11:00 - Tüm analytics'i derle
□ 12:00 - ÖĞLE ARASI
□ 13:00 - Haftalık özet post hazırla
□ 14:00 - LinkedIn'de haftalık roundup paylaş
□ 15:00 - Twitter'da haftalık özet
□ 16:00 - Telegram'da haftalık liste
□ 17:00 - LinkedIn DM outreach (20 kişi)
□ 18:00 - Discord engagement yanıtlama
□ 19:00 - Gelecek hafta planlaması

📅 GÜN 6 (Hafta Sonu):
══════════════════════
□ 10:00 - Hafta 1 tam analizi
□ 11:00 - Neyin çalıştığını belirle
□ 12:00 - Neyin çalışmadığını belirle
□ 14:00 - Hafta 2 içeriklerini hazırla (batch)
□ 16:00 - 20 LinkedIn post hazırla
□ 17:00 - 30 Tweet hazırla
□ 18:00 - Buffer'a yükle

📅 GÜN 7 (Hafta Sonu):
══════════════════════
□ DİNLENME + Otomatik paylaşımlar
□ 18:00 - Haftalık rapor oluştur
□ 19:00 - Hafta 2 planını finalize et
```

---

## AŞAMA 9: İÇERİK BANKASI (HAZIR KULLAN)

### 9.1 LinkedIn Postları (20 Adet)

```
POST 1:
═══════
🚀 The AI job market is EXPLODING.

Companies are paying $100-150/hour for ML Engineers.
And they can't find enough talent.

Here's what they're looking for:
• Python + PyTorch/TensorFlow
• LLM experience (fine-tuning, RAG)
• Production ML systems
• Strong communication

The best part? Most positions are 100% REMOTE.

I'm sharing these opportunities daily.

Current hot position:
Senior ML Engineer - $120/hr - Remote

Apply here: [LINK]

Follow for daily AI job posts 🔔

#AIjobs #remotework #hiring #machinelearning

---

POST 2:
═══════
📢 5 High-Paying Remote Positions This Week:

1️⃣ Senior ML Engineer
   💰 $100-150/hr | 🏢 YC Startup

2️⃣ Full Stack Developer
   💰 $60-90/hr | 🏢 Tech Corp

3️⃣ Data Scientist
   💰 $80-120/hr | 🏢 DataCo

4️⃣ DevOps Engineer
   💰 $70-100/hr | 🏢 CloudTech

5️⃣ AI Research Scientist
   💰 $120-180/hr | 🏢 AI Lab

All positions: [LINK]

Which one catches your eye? 👇

---

POST 3:
═══════
"But I don't have a CS degree..."

Let me tell you something:

The highest-paid developer I know?
Self-taught. Started at 28.
Now earning $150/hr remote.

AI companies care about:
✅ What you can BUILD
✅ Your GitHub portfolio
✅ Communication skills
✅ Problem-solving ability

They DON'T care about:
❌ Where you went to school
❌ Your age
❌ Your location

The opportunity is NOW.

Start here: [LINK]

---

POST 4:
═══════
🔥 HOT OPPORTUNITY ALERT

A YC-backed AI startup just opened 3 positions:

Position: AI/ML Engineer
Location: 100% Remote (Worldwide)
Pay: $100-150/hour
Team: 15 engineers, async-first

Tech Stack:
• Python, PyTorch
• LLMs (GPT-4, Claude)
• Vector databases
• AWS/GCP

What makes this special:
• Work from anywhere
• Flexible hours
• Cutting-edge AI work
• Top-tier compensation

Apply before they fill up: [LINK]

---

POST 5:
═══════
I helped 3 people get hired this week.

Total compensation increase: $180,000/year

Here's what they did differently:

1. Applied to AI-specific roles
   (Less competition than general dev jobs)

2. Built relevant portfolio projects
   (Fine-tuned LLMs, RAG applications)

3. Used the right platform
   (Not LinkedIn Jobs, not Indeed)

4. Prepared for async interviews
   (Written communication matters)

Want to be next?

Start here: [LINK]

Drop a 🚀 if you're looking for remote work!

---

POST 6:
═══════
$50/hr vs $150/hr developers

What's the difference?

$50/hr developer:
• Knows one framework
• Waits for instructions
• Writes code

$150/hr developer:
• Understands systems
• Proposes solutions
• Solves business problems

The gap isn't about years of experience.

It's about POSITIONING.

AI roles pay premium because they:
✅ Require specialized skills
✅ Have huge business impact
✅ Are in high demand

Ready to level up? [LINK]

---

POST 7:
═══════
Remote work changed my life.

2 years ago:
• Commuting 2 hours/day
• Fixed 9-5 schedule
• $60K salary
• Burnout

Today:
• Work from anywhere
• Flexible hours
• $150K+ income
• Actually enjoying work

The remote AI job market made this possible.

If you're still grinding in an office for below-market pay...

There's another way: [LINK]

---

POST 8:
═══════
🎯 Weekly Job Alert - Top Remote AI Positions

This week I'm seeing strong demand for:

📈 TRENDING ROLES:
• LLM Engineers (+45% YoY)
• AI Safety Researchers (+80% YoY)
• ML Ops Engineers (+35% YoY)

💰 SALARY RANGES:
• Entry Level: $50-80/hr
• Mid Level: $80-120/hr
• Senior Level: $120-180/hr

🌍 LOCATIONS HIRING:
• USA (remote OK)
• Europe (remote OK)
• Worldwide (async-first)

Browse all positions: [LINK]

What role are you targeting? 👇

---

POST 9:
═══════
Stop applying on LinkedIn Jobs.

Here's why:

📊 The numbers:
• Average LinkedIn job post: 250+ applicants
• AI-specific platforms: 30-50 applicants

Your resume gets lost in the noise.

What works instead:

1. Specialized platforms (like Mercor)
2. Direct company applications
3. Referral networks
4. Niche job boards

I share curated opportunities daily.

Less competition. Higher pay. Remote.

Start here: [LINK]

---

POST 10:
════════
The interview that changed everything:

Interviewer: "Tell me about a time you failed"

Old me: "I don't really fail..."

New me: "Let me tell you about the ML model that cost us $50K and what I learned..."

Vulnerability + learning = hired.

More interview tips in comments 👇

Also hiring: [LINK]
```

### 9.2 Daha Fazla Post (11-20)

```
POST 11:
════════
🔥 Just landed: New AI Research positions

One of the top AI labs is hiring:
• AI Research Scientist: $150-200/hr
• Research Engineer: $120-160/hr

Requirements:
• PhD preferred (not required)
• Published papers (bonus)
• Strong Python/PyTorch
• LLM/Foundation model experience

Remote-friendly. Worldwide applicants welcome.

This won't last long: [LINK]

---

POST 12:
════════
The myth of "not enough experience"

Truth: Companies are hiring developers with:
• 2-3 years experience
• Strong fundamentals
• Good communication
• Willingness to learn

I've seen "senior" roles filled by people with 3 years.

The AI field moves so fast that everyone is learning.

Your fresh perspective is an ASSET.

Apply anyway: [LINK]

---

POST 13:
════════
Friday = New opportunities drop 📢

3 positions just opened:

1. Computer Vision Engineer
   • $90-130/hr
   • PyTorch, OpenCV
   • Remote

2. NLP Specialist
   • $100-140/hr
   • Transformers, BERT
   • Remote

3. ML Platform Engineer
   • $80-120/hr
   • MLOps, K8s
   • Remote

Weekend project: Apply to all 3.

Links: [LINK]

---

POST 14:
════════
Real talk about remote AI salaries:

🇺🇸 USA-based companies paying global talent:
• Junior: $50-70/hr ($100K+/yr)
• Mid: $70-100/hr ($140K+/yr)
• Senior: $100-150/hr ($200K+/yr)

These aren't unicorns. These are real offers.

The catch? You need to:
✅ Pass technical screens
✅ Communicate clearly
✅ Work async effectively

Current openings: [LINK]

---

POST 15:
════════
My DMs are full of the same question:

"How do I transition into AI/ML?"

Here's the fastest path:

Week 1-4: Python fundamentals
Week 5-8: ML basics (scikit-learn)
Week 9-12: Deep learning (PyTorch)
Week 13-16: Build 3 portfolio projects
Week 17-20: Apply to 50 positions

Total time: 5 months
Potential outcome: $100K+ job

Start today. Thank yourself in 6 months.

Opportunities waiting: [LINK]

---

POST 16:
════════
What $100/hr remote developers do differently:

Morning routine:
• Deep work: 4 hours
• No meetings before noon
• Single-tasking

Communication:
• Over-document everything
• Async by default
• Clear written updates

Skill development:
• Learn in public
• Ship side projects
• Stay curious

Want to work with teams that value this?

Check these roles: [LINK]

---

POST 17:
════════
🚨 URGENT HIRE: Senior LLM Engineer

A well-funded AI startup needs someone ASAP.

Details:
• $130-170/hr
• Fully remote
• Start within 2 weeks
• 6-month contract (extension likely)

Requirements:
• Fine-tuning LLMs
• RAG implementation
• Production deployment
• Strong Python

Fast application = advantage

Apply NOW: [LINK]

---

POST 18:
════════
Why AI companies pay more (simple economics):

Revenue per developer:
• Traditional SaaS: $200K-500K
• AI/ML products: $500K-2M+

When you generate more value, you capture more value.

AI is the leverage multiplier of our generation.

Get positioned now: [LINK]

---

POST 19:
════════
Rejected from 47 applications.

Then I changed ONE thing:

Before: Generic "I'm a software engineer" intro

After: "I build ML systems that reduced inference costs by 40% at my last role"

Specificity wins.

Numbers win.

Impact wins.

More tips + current openings: [LINK]

---

POST 20:
════════
Sunday reflection:

This week I connected 12 developers with interviews.

3 got offers.

Combined salary increase: $240K/year.

This is why I do this.

If you're thinking about making a change in 2025...

The AI job market is your best bet.

Start here: [LINK]

See you Monday with fresh opportunities. 🚀
```

---

## AŞAMA 10: TAKİP VE OPTİMİZASYON

### 10.1 Günlük Tracking Sheet

```
GOOGLE SHEETS YAPISI:
═════════════════════

Sheet 1: Daily Metrics
─────────────────────────────────────────────────────────────
Date | Platform | Posts | Impressions | Clicks | CTR | Apps
─────────────────────────────────────────────────────────────
15/01 | LinkedIn | 2 | 1,240 | 38 | 3.1% | 12
15/01 | Twitter | 5 | 2,890 | 43 | 1.5% | 8
15/01 | Discord | 3 | 450 | 28 | 6.2% | 15
15/01 | Telegram | 4 | 890 | 19 | 2.1% | 6
─────────────────────────────────────────────────────────────
15/01 | TOTAL | 14 | 5,470 | 128 | 2.3% | 41
─────────────────────────────────────────────────────────────

Sheet 2: Weekly Summary
─────────────────────────────────────────────────────────────
Week | Reach | Clicks | Apps | Interviews | Hires | Revenue
─────────────────────────────────────────────────────────────
W1 | 25,400 | 512 | 153 | 23 | 4 | $3,000
W2 | 32,100 | 689 | 201 | 31 | 6 | $4,500
W3 | 41,800 | 892 | 267 | 42 | 8 | $6,000
─────────────────────────────────────────────────────────────

Sheet 3: Content Performance
─────────────────────────────────────────────────────────────
Post ID | Platform | Type | Impressions | Engagement | Clicks
─────────────────────────────────────────────────────────────
P001 | LinkedIn | Single Job | 2,340 | 156 | 89
P002 | LinkedIn | Weekly List | 3,120 | 234 | 145
P003 | Twitter | Thread | 5,670 | 312 | 178
P004 | Twitter | Single Tweet | 1,890 | 67 | 34
─────────────────────────────────────────────────────────────
```

### 10.2 Haftalık Review Checklist

```
HER PAZAR GÖZDEN GEÇİR:
═══════════════════════

□ PERFORMANS ANALİZİ
  ├── Hangi platform en çok tıklama aldı?
  ├── Hangi içerik tipi en iyi performans gösterdi?
  ├── En iyi paylaşım saatleri hangileri?
  ├── Hangi iş ilanları en çok ilgi çekti?
  └── Conversion rate nedir?

□ OPTİMİZASYON KARARLARI
  ├── Düşük performans gösteren platformları azalt
  ├── Yüksek performans gösterenlere odaklan
  ├── İçerik tiplerini ayarla
  ├── Paylaşım zamanlarını optimize et
  └── Yeni topluluklar keşfet

□ GELECEK HAFTA PLANI
  ├── Hedef metrikleri belirle
  ├── İçerik takvimini oluştur
  ├── Yeni stratejileri test et
  └── Kaynakları yeniden dağıt
```

---

## 🎯 SONUÇ: BAŞLANGIÇ KONTROL LİSTESİ

```
═══════════════════════════════════════════════════════════════
                 BUGÜN TAMAMLANACAKLAR
═══════════════════════════════════════════════════════════════

□ Mercor hesabına gir → Referral link al
□ Bitly hesabı oluştur → 6 tracking link yarat
□ Buffer hesabı oluştur → LinkedIn/Twitter bağla
□ Notion workspace kur → 4 database oluştur
□ LinkedIn profil güncelle → Banner ekle
□ Twitter hesabı optimize et → Banner ekle
□ 5 Discord sunucusuna katıl
□ 10 Telegram grubuna katıl
□ İlk 5 LinkedIn postunu hazırla
□ İlk LinkedIn postunu PAYLAŞ

═══════════════════════════════════════════════════════════════
                 HAFTA SONUNA KADAR
═══════════════════════════════════════════════════════════════

□ 20 LinkedIn post hazır
□ 30 Tweet hazır
□ 30 Discord sunucusunda üye
□ 50 Telegram grubunda üye
□ Günlük paylaşım rutini oturmuş
□ İlk 100 tıklama elde edilmiş
□ İlk 30 başvuru sağlanmış
```
# 🚀 MERCORCONNECT - UYGULAMA DEVAM

---

## AŞAMA 11: REDDIT STRATEJİSİ (DETAYLI)

### 11.1 Reddit Hesap Kurulumu

```
REDDIT HESAP OLUŞTURMA:
═══════════════════════

1. reddit.com'a git
2. Yeni hesap oluştur
   Username önerileri:
   ├── RemoteAIRecruiter
   ├── TechJobsConnector
   ├── AICareerHelper
   └── RemoteWorkAdvocate

3. Profil ayarları:
   ├── Avatar: Profesyonel görünüm
   ├── Banner: "Helping devs find remote AI jobs"
   └── Bio: "Connecting developers with $50-150/hr remote opportunities"

⚠️ UYARI: Reddit spam'e çok hassas!
├── İlk 2 hafta sadece yorum yap
├── Karma puanı kazan (min 100)
├── Topluluk kurallarını öğren
└── Sonra paylaşım yap
```

### 11.2 Subreddit Katılım Planı

```
HAFTA 1-2: KARMA KAZANMA (Paylaşım yok!)
════════════════════════════════════════

r/cscareerquestions (800K)
├── Kariyer sorularına yardımcı yanıtlar ver
├── CV inceleme feedbacki ver
├── Interview deneyimlerini paylaş
└── Günde 5-10 kaliteli yorum

r/learnprogramming (4M)
├── Başlangıç sorularına yardım et
├── Kaynak önerileri yap
├── Hata ayıklama yardımı
└── Günde 5-10 yorum

r/experienceddevs (200K)
├── Senior seviye tartışmalara katıl
├── Remote work deneyimlerini paylaş
└── Günde 3-5 yorum

KARMA HEDEFİ:
├── Hafta 1 sonu: 100+ karma
├── Hafta 2 sonu: 250+ karma
└── Hafta 3: Paylaşım başlat

KARMA KAZANMA TAKTİKLERİ:
═════════════════════════
✅ "New" sekmesinde ilk yorumcu ol
✅ Detaylı, yardımcı yanıtlar ver
✅ Kişisel deneyimlerini paylaş
✅ Sorular sor (engagement)
✅ Popüler postlara kaliteli yorum

❌ YAPMA:
├── Tek kelimelik yanıtlar
├── Link paylaşımı (henüz)
├── Kendini tanıtma
└── Reklam/spam
```

### 11.3 Reddit Yorum Şablonları (Karma Kazanma)

```
ŞABLON 1: Kariyer Tavsiyesi
═══════════════════════════
"Great question! I've been in tech for X years and here's what I've learned:

1. [Specific advice point 1]
2. [Specific advice point 2]
3. [Specific advice point 3]

When I was in a similar situation, I [personal experience].

The key thing that worked for me was [actionable insight].

Hope this helps! Feel free to DM if you have more questions."

---

ŞABLON 2: Teknik Yardım
═══════════════════════
"I've dealt with this exact issue before. Here's what solved it for me:

```python
# Örnek kod veya çözüm
```

The reason this works is [explanation].

A few things to watch out for:
- [Pitfall 1]
- [Pitfall 2]

Let me know if you need more details!"

---

ŞABLON 3: Remote Work Sorusu
════════════════════════════
"I've been working remotely for [X] years now. Here's my experience:

Pros:
- [Pro 1 with personal example]
- [Pro 2 with personal example]

Challenges:
- [Challenge 1 and how I solved it]
- [Challenge 2 and how I solved it]

For finding remote positions, I've had the best luck with [general advice - no links yet].

The key is [actionable tip]."
```

### 11.4 Reddit Post Şablonları (Hafta 3+)

```
ŞABLON 1: [Hiring] Post (r/forhire, r/remotejobs)
═════════════════════════════════════════════════

Title: [Hiring] Remote ML Engineer - $100-150/hr -
       YC-backed Startup (Worldwide)

Body:
---
**About the Company:**
A YC-backed AI startup building next-generation LLM applications.
Series A funded, 20-person team, fully remote and async-first.

**The Role:**
We're looking for an ML Engineer to work on our core AI infrastructure.

**Compensation:**
- $100-150/hour (depending on experience)
- Paid in USD via wire transfer
- Contract with potential full-time conversion

**Tech Stack:**
- Python, PyTorch
- LangChain, Vector DBs (Pinecone/Weaviate)
- AWS (SageMaker, Lambda)
- FastAPI

**Requirements:**
- 3+ years ML/AI experience
- Production ML systems experience
- Strong Python skills
- Excellent written communication
- Comfortable with async work

**Nice to Have:**
- LLM fine-tuning experience
- RAG implementation experience
- Open source contributions

**How to Apply:**
Apply through our hiring platform: [LINK]

**Timeline:**
- Applications reviewed weekly
- Technical interview within 1 week of application
- Decision within 2 weeks

---
*I'm happy to answer questions in the comments!*

*Disclosure: This is a referral link.*
---

---

ŞABLON 2: Değer Odaklı Post
═══════════════════════════

Title: I've been tracking remote AI salaries for 6 months -
       here's what companies are actually paying

Body:
---
Hey r/remotejobs,

I've been connecting developers with remote AI positions for the
past 6 months and wanted to share some data.

**Salary Ranges I'm Seeing (USD/hour):**

| Role | Entry | Mid | Senior |
|------|-------|-----|--------|
| ML Engineer | $50-70 | $70-100 | $100-150 |
| Data Scientist | $45-65 | $65-90 | $90-130 |
| Full Stack (AI) | $40-60 | $60-85 | $85-120 |
| DevOps/MLOps | $50-70 | $70-95 | $95-140 |
| AI Research | $60-80 | $80-120 | $120-180 |

**Trends I'm noticing:**

1. **LLM experience = premium.** Companies pay 20-30% more for
   developers with GPT/Claude fine-tuning experience.

2. **Async communication skills matter.** Many candidates fail
   because of poor written communication.

3. **Location doesn't matter as much.** I'm seeing devs from
   Turkey, Eastern Europe, and South America land US-rate positions.

4. **The market is competitive but not saturated.** Quality
   candidates still get multiple offers.

**What's hot right now:**
- RAG implementations
- LLM evaluation/testing
- AI safety
- Multi-modal models

Happy to answer questions!

---
*If anyone's looking, I do share opportunities regularly.
Check my profile or DM me.*
---

---

ŞABLON 3: AMA Style Post
════════════════════════

Title: I help developers land remote AI jobs ($50-150/hr).
       AMA about the current market.

Body:
---
Hey everyone,

I've been working as a tech talent connector for the past year,
specifically focused on AI/ML roles. I've helped 50+ developers
find remote positions.

**Some quick stats:**
- Average salary increase: 40%
- Most common role: ML Engineer
- Most in-demand skill: LLM/Python
- Average time to hire: 3 weeks

**I can answer questions about:**
- Current salary ranges
- What companies are looking for
- How to stand out in applications
- Technical interview prep
- Negotiation tips
- Remote work best practices

AMA!

---
*I'll be here for the next few hours answering questions.*
---
```

### 11.5 Reddit Paylaşım Takvimi

```
HAFTALIK REDDIT PROGRAMI (Hafta 3+):
════════════════════════════════════

PAZARTESİ:
├── r/remotejobs - 1 [Hiring] post
├── r/cscareerquestions - 10 yorum
└── r/MachineLearning - 5 yorum

ÇARŞAMBA:
├── r/forhire - 1 [Hiring] post
├── r/freelance - 5 yorum
└── r/experienceddevs - 5 yorum

CUMA:
├── r/remotejobs - 1 değer odaklı post
├── r/learnprogramming - 10 yorum
└── r/datascience - 5 yorum

⚠️ KURALLAR:
├── Aynı subreddit'e günde MAX 1 post
├── Her post arasında 2+ gün
├── Yorumlara mutlaka cevap ver
├── Downvote alırsan dur, strateji değiştir
└── Moderatör uyarılarına hemen uy
```

---

## AŞAMA 12: FACEBOOK GRUPLARIM STRATEJİSİ

### 12.1 Facebook Grup Listesi

```
GLOBAL GRUPLAR (İngilizce):
══════════════════════════

1. Remote Work & Jobs Worldwide (500K+)
   └── facebook.com/groups/remoteworkjobs

2. Digital Nomad Jobs (300K+)
   └── facebook.com/groups/digitalnomajobs

3. Freelance Web Developers (400K+)
   └── facebook.com/groups/freelancewebdev

4. Software Developer Community (350K+)
   └── facebook.com/groups/softwaredevcommunity

5. Python Developers (200K+)
   └── facebook.com/groups/pythondev

6. JavaScript Developers (250K+)
   └── facebook.com/groups/javascriptdev

7. Remote OK - Remote Jobs (150K+)
   └── facebook.com/groups/remoteok

8. Work From Home Jobs (400K+)
   └── facebook.com/groups/wfhjobs

9. AI & Machine Learning (180K+)
   └── facebook.com/groups/aimlcommunity

10. Tech Jobs Worldwide (120K+)
    └── facebook.com/groups/techjobsworldwide

TÜRKÇE GRUPLAR:
═══════════════

11. Yazılımcılar - Pair Programming Türkiye (50K+)
12. Freelancer Türkiye (40K+)
13. Remote Çalışanlar Türkiye (30K+)
14. Startup Türkiye (25K+)
15. IT Profesyonelleri Türkiye (35K+)
16. Web Geliştiriciler Türkiye (45K+)
17. Dijital Nomad Türkiye (15K+)
18. Yazılım Mühendisleri (30K+)
19. Python Türkiye (20K+)
20. Kariyer ve İş İlanları (60K+)
```

### 12.2 Facebook Post Şablonları

```
ŞABLON 1: TEK İŞ İLANI (Türkçe)
═══════════════════════════════

🚀 REMOTE İŞ FIRSATI - ML Engineer

Merhaba arkadaşlar,

YC destekli bir AI startup, remote ML Engineer arıyor.

📌 Detaylar:
├── 💰 Maaş: $100-150/saat
├── 🌍 Lokasyon: %100 Remote (Türkiye'den çalışabilirsiniz)
├── 🛠 Stack: Python, PyTorch, AWS
└── ⏰ Tip: Full-time veya Contract

📋 Gereksinimler:
├── 3+ yıl ML deneyimi
├── Production sistem deneyimi
├── İyi derecede İngilizce
└── Async çalışma becerisi

Bu pozisyon için başvurular açık. Link yorumlarda 👇

Sorularınız varsa yazabilirsiniz!

#remotejobs #mljobs #yapayazeka #uzaktancalisma

---

ŞABLON 2: HAFTALIK LİSTE (İngilizce)
════════════════════════════════════

📢 THIS WEEK'S TOP REMOTE OPPORTUNITIES

Hey everyone! Here are the best remote positions I found this week:

🔥 HIGH PRIORITY (Closing Soon):

1️⃣ Senior ML Engineer
   💰 $120-150/hr | 🏢 YC Startup
   🛠 Python, PyTorch, LLMs

2️⃣ Full Stack Developer
   💰 $70-100/hr | 🏢 Tech Scale-up
   🛠 React, Node.js, AWS

3️⃣ Data Scientist
   💰 $90-130/hr | 🏢 FinTech
   🛠 Python, SQL, ML

📌 ALL POSITIONS:
✅ 100% Remote
✅ Worldwide accepted
✅ USD payment
✅ Async-friendly

Application link in comments! 👇

Who's applying this week? 🙋‍♂️

---

ŞABLON 3: BAŞARI HİKAYESİ
═════════════════════════

🎉 SUCCESS STORY - From $30K to $120K in 6 months

I wanted to share an inspiring story from our community.

Meet [Name] (shared with permission):

📍 BEFORE:
- Working at local company
- $30K/year salary
- 2-hour daily commute
- Limited growth

📍 AFTER (6 months later):
- Remote ML Engineer
- $120K/year ($60/hr)
- Working from home
- Learning cutting-edge AI

🔑 WHAT CHANGED:
1. Focused on AI/ML skills
2. Built relevant portfolio
3. Applied through right channels
4. Prepared for async interviews

The remote AI job market is real.
The opportunities are there.
You just need to take the first step.

Want to start your journey? Link in comments 👇

Drop a 🔥 if you're inspired!
```

### 12.3 Facebook Paylaşım Kuralları

```
FACEBOOK GRUPLARDA BAŞARI İÇİN:
═══════════════════════════════

✅ YAPIN:
├── Gruba katılmadan önce kuralları okuyun
├── İlk 3-5 gün sadece gözlemleyin
├── Başkalarının postlarına yorum yapın
├── Değer katan içerikler paylaşın
├── Soruları cevaplayın
├── Admin'lerle iyi ilişki kurun
└── Sabırlı olun

❌ YAPMAYIN:
├── Hemen link paylaşmayın
├── Günde birden fazla post atmayın
├── Aynı içeriği her gruba kopyalamayın
├── Spam yapmayın
├── Grup kurallarını ihlal etmeyin
└── Self-promotion'da aşırıya kaçmayın

PAYLAŞIM SIKLIĞI:
├── Büyük gruplar (100K+): Haftada 2-3 post
├── Orta gruplar (20-100K): Haftada 3-4 post
├── Küçük gruplar (<20K): Haftada 1-2 post
└── Aynı gruba günde MAX 1 post
```

---

## AŞAMA 13: YOUTUBE SHORTS STRATEJİSİ

### 13.1 YouTube Kanal Kurulumu

```
KANAL BİLGİLERİ:
════════════════

Kanal Adı: "Remote AI Jobs" veya "Tech Career Insider"

Açıklama:
"🚀 Daily remote job opportunities in AI & Tech
💰 $50-150/hour positions
🌍 Work from anywhere

I help developers find high-paying remote positions at top AI companies.

New videos every day!

📩 Want personalized job matches? Check the link below.

🔗 Apply now: [REFERRAL LINK]"

Banner (2560x1440):
├── Text: "Remote AI Jobs | $50-150/hr"
├── Icons: Laptop, globe, money
├── CTA: "Subscribe for daily opportunities"
└── Renk: Profesyonel mavi/yeşil

Profil Resmi:
├── Logo veya profesyonel fotoğraf
└── 800x800 px
```

### 13.2 YouTube Shorts İçerik Fikirleri

```
İÇERİK KATEGORİLERİ:
═══════════════════

KATEGORİ 1: İş İlanı Tanıtımları (40%)
──────────────────────────────────────
"This company is paying $150/hr for ML Engineers 🤯"
"Remote job alert: $100K+ working from home"
"They're hiring worldwide - here's how to apply"
"This AI startup just raised $50M and they're hiring"
"$80/hr to write Python code from anywhere"

KATEGORİ 2: Kariyer İpuçları (30%)
──────────────────────────────────
"3 mistakes killing your remote job applications"
"How I got a $150/hr remote job"
"The #1 skill remote companies want"
"Why your resume gets rejected"
"Interview tip that got me hired"
"What AI companies actually look for"

KATEGORİ 3: Sektör Bilgisi (20%)
────────────────────────────────
"AI jobs that will pay $200K in 2025"
"Skills that will be obsolete in 2 years"
"Why AI engineers get paid so much"
"Remote work trends you need to know"
"The future of tech hiring"

KATEGORİ 4: Motivasyon (10%)
────────────────────────────
"From $40K to $200K - my remote journey"
"You don't need a CS degree"
"Why I left my 9-5 for remote work"
"This changed my career forever"
```

### 13.3 YouTube Shorts Script Şablonları

```
SCRIPT 1: İş İlanı (30 saniye)
══════════════════════════════

[Hook - 0-3 saniye]
"This AI company is paying $150 per hour for remote engineers"

[Content - 3-25 saniye]
"They're a YC-backed startup working on cutting-edge LLMs.
Here's what they need:
- Python and PyTorch experience
- 3 plus years in machine learning
- Good communication skills

The best part? They hire worldwide.
You can work from Turkey, India, Brazil, anywhere.

[CTA - 25-30 saniye]
Link to apply is in my bio.
Follow for more jobs like this."

---

SCRIPT 2: Kariyer İpucu (45 saniye)
═══════════════════════════════════

[Hook - 0-3 saniye]
"This one mistake is killing your remote job applications"

[Problem - 3-15 saniye]
"I review hundreds of applications every month.
And 80% of people make the same mistake.
They apply with a generic resume."

[Solution - 15-35 saniye]
"Here's what works instead:
Number 1: Customize your resume for EACH job
Number 2: Use the exact keywords from the job description
Number 3: Add numbers and metrics to show impact

I've seen candidates double their interview rate
just by making these changes."

[CTA - 35-45 saniye]
"Want more tips like this? Follow me.
And if you're looking for remote AI jobs,
link in bio."

---

SCRIPT 3: Trend/Haber (30 saniye)
═════════════════════════════════

[Hook - 0-3 saniye]
"AI engineers will make $300K by 2025. Here's why."

[Content - 3-25 saniye]
"The AI market is growing 40% year over year.
But there aren't enough qualified engineers.
Companies like OpenAI, Anthropic, and Google
are competing for the same talent.

Basic supply and demand.
Few engineers, high demand, massive salaries.

[CTA - 25-30 saniye]
"The opportunity is NOW.
Follow for remote AI job opportunities."
```

### 13.4 YouTube Shorts Üretim Planı

```
SHORTS ÜRETİM WORKFLOW:
═══════════════════════

HAFTALIK (7 Shorts):
├── Pazartesi: İş ilanı #1
├── Salı: Kariyer ipucu
├── Çarşamba: İş ilanı #2
├── Perşembe: Sektör bilgisi
├── Cuma: İş ilanı #3
├── Cumartesi: Motivasyon
└── Pazar: Haftalık roundup

ÜRETİM ARAÇLARI:
├── Script: ChatGPT/Claude ile yaz
├── Kayıt: Telefon kamerası yeterli
├── Edit: CapCut (ücretsiz)
├── Captions: CapCut auto-captions
├── Thumbnail: Canva
└── Yükleme: YouTube Studio

KAYIT İPUÇLARI:
├── Dikey format (9:16)
├── İyi aydınlatma (pencere önü)
├── Temiz arka plan
├── Telefon göz hizasında
├── Enerjik konuşma
├── 30-60 saniye arası
└── Captions MUTLAKA ekle

BATCH PRODUCTION:
├── Pazar günü 7 script yaz
├── Pazartesi hepsini kaydet (1-2 saat)
├── Pazartesi/Salı edit
├── Hafta boyunca günlük yayınla
└── Her video için ayrı thumbnail
```

---

## AŞAMA 14: MEDIUM/BLOG STRATEJİSİ

### 14.1 Medium Hesap Kurulumu

```
MEDIUM PROFİL:
══════════════

Username: @remotaijobs veya @techcareerinsider

Bio:
"I help developers land $100K+ remote AI jobs.
Daily job opportunities | Career tips | Industry insights
🔗 Browse open positions: [LINK]"

Profile Image: Profesyonel fotoğraf

PUBLICATION OLUŞTURMA (Opsiyonel):
├── Name: "Remote AI Careers"
├── Description: "Your guide to landing high-paying remote AI jobs"
├── Editors: Sadece sen
└── Submissions: Kapalı
```

### 14.2 Medium Makale Şablonları

```
MAKALE 1: Ultimate Guide (2000+ kelime)
═══════════════════════════════════════

Title: "The Complete Guide to Landing a $100K+ Remote AI Job in 2025"

Structure:
---
# Introduction
- Hook: Salary stats
- Promise: What they'll learn
- Credibility: Your background

# Part 1: Understanding the AI Job Market
- Current state of AI hiring
- Salary ranges by role
- Most in-demand skills
- Remote work trends

# Part 2: Building Your Profile
- Must-have technical skills
- Portfolio projects that stand out
- GitHub optimization
- LinkedIn profile tips

# Part 3: Finding Opportunities
- Where to look (include your link naturally)
- How to evaluate companies
- Red flags to avoid
- Networking strategies

# Part 4: Application Process
- Resume optimization
- Cover letter templates
- Following up effectively

# Part 5: Interview Preparation
- Technical interview types
- Common questions
- Live coding tips
- System design basics

# Part 6: Negotiation
- Know your worth
- Counter-offer strategies
- Beyond salary: equity, benefits

# Conclusion
- Summary of key points
- Call to action
- Link to opportunities
---

---

MAKALE 2: Listicle (1000-1500 kelime)
═════════════════════════════════════

Title: "15 Highest-Paying Remote AI Jobs in 2025 (With Salary Data)"

Structure:
---
# Introduction
Brief overview of AI job market

# The Jobs

## 1. AI Research Scientist
- Salary: $150-250K
- Requirements
- Where to find: [your link]

## 2. Machine Learning Engineer
- Salary: $120-200K
- Requirements
- Where to find: [your link]

[Continue for all 15 jobs]

# How to Get Started
- Step-by-step action plan
- Resources
- Your platform link

# Conclusion
CTA to apply
---

---

MAKALE 3: Case Study (1500 kelime)
══════════════════════════════════

Title: "How I Went from $50K to $180K by Switching to Remote AI Jobs"

Structure:
---
# The Situation
- Where I was (or candidate's story)
- The frustrations
- The turning point

# The Decision
- Why AI/ML
- Why remote
- Initial fears

# The Process
- Skills I developed
- How I found opportunities
- Application strategy

# The Interviews
- What companies asked
- How I prepared
- Lessons learned

# The Outcome
- The offer
- Lifestyle changes
- Financial impact

# Your Turn
- Key takeaways
- First steps to take
- Where to apply [your link]
---
```

### 14.3 SEO Optimizasyonu

```
MEDIUM SEO CHECKLIST:
═════════════════════

BAŞLIK:
├── Ana anahtar kelimeyi başta kullan
├── Rakam ekle (sayılar dikkat çeker)
├── Yıl ekle (2025)
├── 60 karakterin altında tut
└── Merak uyandır

ÖRNEKLER:
✅ "15 Highest-Paying Remote AI Jobs in 2025"
✅ "How to Land a $150/hr Remote ML Job (Step-by-Step)"
✅ "The Complete Guide to Remote AI Careers in 2025"
❌ "Some Thoughts on AI Jobs"
❌ "Jobs in AI"

TAGS (5 adet seç):
├── Remote Work
├── Artificial Intelligence
├── Machine Learning
├── Career Advice
├── Jobs
├── Tech Careers
├── Software Engineering
├── Data Science
└── Freelancing

İÇERİK İÇİ SEO:
├── H2/H3 başlıklarda anahtar kelime
├── İlk 100 kelimede ana kelime
├── Doğal link yerleştirme
├── İç linkler (diğer makalelerine)
├── Görsel alt text'leri
└── 7-10 dk okuma süresi ideal

YAYINLAMA ZAMANLARI:
├── Salı-Perşembe en iyi
├── 08:00-10:00 veya 17:00-19:00
└── Hafta sonu kaçın
```

---

## AŞAMA 15: EMAIL OUTREACH STRATEJİSİ

### 15.1 LinkedIn DM Kampanyası

```
DM HEDEF KİTLESİ:
═════════════════

Arama filtreleri:
├── Title: "Software Engineer" OR "ML Engineer" OR "Data Scientist"
├── Keywords: "open to work" OR "looking for" OR "seeking"
├── Location: Worldwide
└── Connections: 2nd degree

GÜNLÜK HEDEF: 20 DM

DM WORKFLOW:
├── 1. Profili incele (30 sn)
├── 2. Ortak nokta bul
├── 3. Kişiselleştirilmiş mesaj gönder
├── 4. Notion'a kaydet
└── 5. 3 gün sonra follow-up

LINKEDIN DM LİMİTLERİ:
├── Free: ~100 bağlantı isteği/hafta
├── Free: ~50 mesaj/gün (bağlı olanlara)
├── Premium: Daha yüksek limitler
└── InMail: 50/ay (Premium)
```

### 15.2 LinkedIn DM Şablonları

```
ŞABLON 1: İlk Mesaj (Bağlantı İsteği)
═════════════════════════════════════

"Hi [Name],

I noticed you're a [Title] with [Company/Skill] experience.
I'm connecting developers with remote AI opportunities
paying $80-150/hr.

Would love to connect and share some positions that might
interest you!

Best,
Turhan"

---

ŞABLON 2: Bağlantı Kabul Sonrası
════════════════════════════════

"Thanks for connecting, [Name]!

I wanted to reach out because I have some exciting remote
positions that match your background:

🔥 Current opportunities:
• Senior ML Engineer - $120-150/hr (YC startup)
• Full Stack Developer - $80-100/hr (AI company)
• Data Scientist - $90-130/hr (FinTech)

All are 100% remote and hiring worldwide.

Interested in any of these? I can share the direct
application links.

Best,
Turhan"

---

ŞABLON 3: Follow-Up (3 gün sonra)
═════════════════════════════════

"Hey [Name],

Just following up on my previous message. The ML Engineer
position I mentioned is getting a lot of applications.

If you're interested, I'd recommend applying soon before
they close it.

Let me know if you have any questions about the role!

Turhan"

---

ŞABLON 4: "Open to Work" Profillerine
═════════════════════════════════════

"Hi [Name],

I saw you're open to new opportunities. Great timing!

I work with AI companies hiring remote engineers, and I
have a few positions that could be a great fit for someone
with your [Python/ML/etc] background.

Salaries range from $80-150/hr, all fully remote.

Would you be interested in hearing more?

Best,
Turhan"

---

ŞABLON 5: Specific Skill Match
══════════════════════════════

"Hey [Name],

Your experience with [LLMs/PyTorch/specific skill] caught
my attention.

I have a client specifically looking for someone with this
skill set. It's a $130-160/hr remote position with a
well-funded AI startup.

Would this be something you'd consider?

Happy to share more details!

Turhan"
```

### 15.3 DM Takip Sistemi

```
NOTION DATABASE: DM Outreach
════════════════════════════

| Tarih | İsim | LinkedIn | Title | Durum | Mesaj# | Yanıt | Not |
|-------|------|----------|-------|-------|--------|-------|-----|
| 15/01 | John S. | /in/johns | ML Eng | ✅ Kabul | 2 | İlgili | Link gönderildi |
| 15/01 | Sarah M. | /in/sarahm | Data Sci | ⏳ Beklemede | 1 | - | Follow-up 18/01 |
| 15/01 | Alex K. | /in/alexk | Full Stack | ❌ Red | 1 | "Değil" | - |
| 14/01 | Mike T. | /in/miket | ML Eng | 🎯 Başvurdu | 3 | Başvurdu | Takip et |

STATUS OPTIONS:
├── ⏳ Beklemede (bağlantı isteği gönderildi)
├── ✅ Kabul (bağlantı kabul edildi)
├── 💬 Mesajlaşma (aktif konuşma)
├── 🎯 Başvurdu (linke tıkladı/başvurdu)
├── ❌ Red (ilgilenmedi)
└── 🔕 Yanıt yok (2+ mesaj, yanıt yok)

FOLLOW-UP KURALLARI:
├── İlk mesaj → 3 gün bekle
├── Follow-up 1 → 5 gün bekle
├── Follow-up 2 → 7 gün bekle
├── Yanıt yoksa → Durdur
└── MAX 3 mesaj/kişi
```

---

## AŞAMA 16: OTOMASYON KURULUMU

### 16.1 Make.com (Integromat) Workflow

```
MAKE.COM HESAP KURULUMU:
════════════════════════

1. make.com adresine git
2. Ücretsiz hesap oluştur
3. İlk scenario'yu oluştur

FREE PLAN:
├── 1,000 operations/ay
├── 2 aktif scenario
├── 15 dakika minimum interval
└── Başlangıç için yeterli
```

### 16.2 Otomasyon Senaryoları

```
SENARYO 1: Mercor → Notion → Buffer
═══════════════════════════════════

[Schedule]          [HTTP Request]       [Iterator]
  Her gün    ───▶    Mercor API    ───▶   Her iş için
  09:00              GET /jobs            tekrarla
                                             │
                                             ▼
[Notion]            [OpenAI]            [Filter]
Yeni kayıt   ◀───   Post oluştur  ◀───  Yeni iş mi?
ekle
    │
    ▼
[Buffer]            [Bitly]
Post planla  ◀───   Link kısalt


SENARYO ADIMLARI:
1. Trigger: Her gün 09:00'da çalış
2. HTTP: Mercor'dan aktif işleri çek
3. Filter: Son 24 saatteki yeni işleri filtrele
4. Iterator: Her iş için döngü başlat
5. OpenAI: İş detaylarından post oluştur
6. Bitly: Tracking link oluştur
7. Notion: Veritabanına kaydet
8. Buffer: Sosyal medyaya planla

---

SENARYO 2: Haftalık Analytics Raporu
════════════════════════════════════

[Schedule]          [Bitly API]         [Notion API]
Her Pazar   ───▶    Tıklama     ───▶    Haftalık
21:00               verilerini           verileri
                    çek                  çek
                         │                  │
                         └───────┬──────────┘
                                 ▼
                          [Google Sheets]
                          Verileri
                          birleştir
                                 │
                                 ▼
                          [OpenAI]
                          Özet rapor
                          oluştur
                                 │
                                 ▼
                          [Email]
                          Raporu
                          gönder
```

### 16.3 Manuel Konfigürasyon (Make.com olmadan)

```
OTOMATİK OLMADAN MANUEL WORKFLOW:
═════════════════════════════════

GÜNLÜK (15 dakika):
├── 09:00 - Mercor'u kontrol et
├── 09:05 - Yeni işleri Notion'a ekle
├── 09:10 - Buffer'da planla
└── 09:15 - Bitti!

HAFTALIK (30 dakika):
├── Pazar 20:00 - Bitly istatistikleri topla
├── Pazar 20:10 - Notion analytics güncelle
├── Pazar 20:20 - Google Sheets'e aktar
└── Pazar 20:30 - Haftalık değerlendirme

BATCH CONTENT (2 saat, Pazar):
├── 14:00 - 20 LinkedIn post yaz
├── 15:00 - 30 Tweet yaz
├── 15:30 - Buffer'a yükle
└── 16:00 - Hafta planı tamamlandı
```

---

## AŞAMA 17: ÖLÇEKLEME PLANI (AY 4-12)

### 17.1 Ay 4-6: Genişleme

```
HEDEFLER:
═════════

Ay 4:
├── Günlük 3 saat → 1.5 saate düşür
├── YouTube Shorts başlat (günlük)
├── TikTok hesabı aç
├── $5,000/ay gelir hedefi
└── İlk VA (Virtual Assistant) işe al

Ay 5:
├── Newsletter başlat (haftalık)
├── Email list: 1,000+ abone
├── Paid ads test ($100/ay)
├── $7,500/ay gelir hedefi
└── İçerik template'leri otomatikleştir

Ay 6:
├── Podcast görünümleri (misafir)
├── Webinar/workshop düzenle
├── $10,000/ay gelir hedefi
├── 2. platform (Toptal/Turing) ekle
└── Süreçleri dokümante et
```

### 17.2 Ay 7-12: Ölçekleme

```
HEDEFLER:
═════════

Ay 7-9:
├── Ekip genişlet (2-3 VA)
├── Aylık $15,000+ gelir
├── Birden fazla referral programı
├── Premium hizmetler ekle:
│   ├── CV inceleme ($50)
│   ├── Interview prep ($100)
│   └── Kariyer koçluğu ($200)
└── Passive income %70+

Ay 10-12:
├── Aylık $25,000+ gelir
├── Tam otomatik operasyon
├── Ekip 3-5 kişi
├── Şirketlere doğrudan satış
├── White-label fırsatları
└── Exit stratejisi/ölçekleme planı
```

### 17.3 Gelir Çeşitlendirme

```
GELİR KAYNAKLARI (Ay 6+):
═════════════════════════

1. REFERRAL KOMİSYONLARI (%60)
   ├── Mercor: $500-2,000/işe alım
   ├── Toptal: $500-1,000/işe alım
   ├── Turing: $300-750/işe alım
   └── Andela: $400-800/işe alım

2. PREMİUM HİZMETLER (%25)
   ├── CV İnceleme: $50-100
   ├── LinkedIn Optimizasyon: $100-200
   ├── Interview Prep (1 saat): $100-150
   ├── Kariyer Koçluğu (paket): $300-500
   └── Şirketlere Danışmanlık: $1,000+

3. DİJİTAL ÜRÜNLER (%10)
   ├── Interview Prep E-book: $29
   ├── Resume Templates: $19
   ├── LinkedIn Guide: $39
   └── Kurs/Workshop: $99-299

4. SPONSORLUKLAR (%5)
   ├── Newsletter sponsorları
   ├── YouTube sponsorları
   └── Podcast sponsorları

TAHMİNİ AY 12 GELİRİ:
├── Referral: $18,000
├── Premium: $7,500
├── Dijital: $3,000
├── Sponsor: $1,500
└── TOPLAM: $30,000/ay
```

---

## AŞAMA 18: ARAÇ VE KAYNAK LİSTESİ

### 18.1 Tüm Araçlar (Maliyet Dahil)

```
ÜCRETSİZ ARAÇLAR:
═════════════════

| Araç | Kullanım | Link |
|------|----------|------|
| Notion | Veritabanı, planlama | notion.so |
| Google Sheets | Analytics | sheets.google.com |
| Canva | Tasarım (free tier) | canva.com |
| Buffer | Sosyal medya (3 kanal) | buffer.com |
| Bitly | Link kısaltma (temel) | bitly.com |
| ChatGPT | İçerik oluşturma | chat.openai.com |
| CapCut | Video edit | capcut.com |
| Grammarly | Yazım kontrolü | grammarly.com |
| Hunter.io | Email bulma (50/ay) | hunter.io |
| Calendly | Randevu planlama | calendly.com |

ÜCRETL ARAÇLAR (Gerektiğinde):
══════════════════════════════

| Araç | Fiyat | Ne Zaman |
|------|-------|----------|
| Buffer Pro | $15/ay | 3+ kanal gerekince |
| Bitly Pro | $29/ay | Detaylı analytics için |
| Canva Pro | $13/ay | Daha fazla template |
| Make.com | $9/ay | Otomasyon için |
| LinkedIn Premium | $30/ay | InMail için |
| Notion AI | $10/ay | AI özellikler |
| ChatGPT Plus | $20/ay | GPT-4 erişimi |
| Typefully | $15/ay | Twitter otomasyon |
| Hootsuite | $49/ay | İleri seviye SMM |
| Ahrefs | $99/ay | SEO (blog için) |

BAŞLANGIÇ BÜTÇESİ:
├── Ay 1-3: $0 (sadece ücretsiz)
├── Ay 4-6: ~$50-100/ay
└── Ay 7+: ~$150-300/ay
```

### 18.2 Öğrenme Kaynakları

```
ÜCRETSİZ KURSLAR:
═════════════════

Referral/Affiliate Marketing:
├── YouTube: "Pat Flynn - Affiliate Marketing"
├── YouTube: "Miles Beckler"
└── HubSpot Academy: Inbound Marketing

Sosyal Medya:
├── YouTube: "Gary Vee"
├── YouTube: "Alex Hormozi"
├── Hootsuite Academy (ücretsiz sertifika)
└── Buffer Blog

Copywriting:
├── YouTube: "Alex Cattoni"
├── Copyblogger Blog
└── Copyhackers Blog

LinkedIn:
├── YouTube: "Justin Welsh"
├── LinkedIn Learning (1 ay ücretsiz)
└── "LinkedIn Riches" YouTube kanal

Twitter Growth:
├── YouTube: "Dickie Bush"
├── Ship 30 for 30 Blog
└── "How to Twitter" by Sahil Bloom

Video Content:
├── YouTube: "Ali Abdaal" (produktivite)
├── YouTube: "Peter McKinnon" (video)
└── CapCut tutorials
```

---

## 📋 MASTER CHECKLIST

```
═══════════════════════════════════════════════════════════════
                    UYGULAMA MASTER CHECKLIST
═══════════════════════════════════════════════════════════════

□ AŞAMA 1: TEMEL KURULUM (Gün 1)
  ├── □ Mercor hesabı doğrulama
  ├── □ Referral link alma
  ├── □ Bitly hesabı + 6 tracking link
  ├── □ Buffer hesabı + LinkedIn/Twitter bağlama
  └── □ Notion workspace + 4 veritabanı

□ AŞAMA 2: PROFİL OPTİMİZASYONU (Gün 1-2)
  ├── □ LinkedIn profil güncelleme
  ├── □ LinkedIn banner tasarımı
  ├── □ Twitter hesap optimizasyonu
  ├── □ Twitter banner tasarımı
  └── □ Medium/Blog hesabı

□ AŞAMA 3: TOPLULUK KATILIMI (Gün 2-7)
  ├── □ 30 LinkedIn grubu
  ├── □ 30 Discord sunucusu
  ├── □ 50 Telegram grubu
  ├── □ 20 Facebook grubu
  └── □ 10 Reddit subreddit

□ AŞAMA 4: İÇERİK HAZIRLIĞI (Gün 2-3)
  ├── □ 20 LinkedIn post
  ├── □ 30 Tweet + 5 Thread
  ├── □ 15 Discord mesajı
  ├── □ 15 Telegram mesajı
  └── □ 5 Facebook post

□ AŞAMA 5: PAYLAŞIM BAŞLANGIÇ (Gün 3+)
  ├── □ İlk LinkedIn post
  ├── □ İlk Twitter thread
  ├── □ Buffer'da haftalık plan
  ├── □ Discord/Telegram ilk paylaşımlar
  └── □ Günlük rutin oturdu

□ AŞAMA 6: OUTREACH (Hafta 2+)
  ├── □ Günlük 20 LinkedIn DM
  ├── □ DM tracking sistemi
  ├── □ Follow-up rutini
  └── □ Response optimization

□ AŞAMA 7: ANALİZ VE OPTİMİZASYON (Hafta 2+)
  ├── □ Haftalık analytics review
  ├── □ A/B test sonuçları
  ├── □ Platform performans karşılaştırması
  ├── □ İçerik optimizasyonu
  └── □ Strateji pivotları

□ AŞAMA 8: ÖLÇEKLEME (Ay 2+)
  ├── □ YouTube Shorts başlangıç
  ├── □ Medium makaleler (SEO)
  ├── □ Newsletter başlangıç
  ├── □ Otomasyon kurulumu
  └── □ Ekip planlaması

═══════════════════════════════════════════════════════════════
```

---

## 🚀 BAŞLA!

```
ŞİMDİ YAPMAN GEREKEN:
═════════════════════

1. Bu mesajı BOOKMARK'la (kaydet)

2. Yeni bir tarayıcı sekmesi aç:
   https://work.mercor.com

3. turhanhamza@gmail.com ile giriş yap

4. Referral linkini bul ve kopyala

5. Bitly'e git ve ilk linki oluştur

6. Notion'ı aç ve workspace'i kur

7. LinkedIn profilini güncelle

8. İlk postunu BUGÜN paylaş!

═══════════════════════════════════════════════════════════════

Soru sormak istersen buradayım.

Her adımda yardımcı olabilirim:
• Teknik sorunlar
• İçerik fikirleri
• Strateji ayarlamaları
• Analytics yorumlama
• Ölçekleme planlaması

başlayabilirsin  dökümantasyon doc klasöründe olsun. sonrasında bana benzersiz bir site yapmanı istiyorum