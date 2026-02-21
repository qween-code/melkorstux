# Talent Bridge v2.0

Remote is fırsatlarını Türk yeteneklerle buluşturan referral platformu.

## Özellikler

- **Job Management** — İş ilanı ekleme, düzenleme, önceliklendirme
- **Multi-channel Posting** — Telegram bot, Discord webhook, içerik üretimi
- **Click Tracking** — Her kanal için tıklama analizi (`/api/go/:jobId?ch=telegram`)
- **Revenue Tracking** — Referral komisyon takibi
- **Content Engine** — Platform-specific şablon sistemi (TR/EN)
- **Competitor Analysis** — Rakip veritabanı ve karşılaştırma
- **Community Database** — 17+ dağıtım kanalı (Telegram/Discord/Reddit/LinkedIn)
- **Cron Automation** — Otomatik sabah/öğle/akşam paylaşımları
- **CLI Tool** — Terminal'den hızlı iş ekleme ve yönetim
- **Dashboard** — Tek HTML, build gerektirmeyen web arayüzü

## Hızlı Kurulum

```bash
# 1. Bağımlılıkları yükle ve veritabanını oluştur
npm run setup

# 2. Env dosyasını ayarla
cp .env.example .env
# .env dosyasını düzenle, referral kodlarını ve bot tokenlarını ekle

# 3. Örnek veri ekle (opsiyonel)
npm run db:seed

# 4. Sunucuyu başlat
npm run dev
```

Dashboard: http://localhost:3001

## Kullanım

### Web Dashboard

Tarayıcıda `http://localhost:3001` adresini aç. Dashboard'dan:
- İş ekle/düzenle
- Telegram/Discord'a tek tıkla paylaş
- İçerik üret ve kopyala
- Rakip analizini gör
- Gelir takibi yap

### CLI

```bash
# İş listesi
node src/cli/index.js list

# Yeni iş ekle (interaktif)
node src/cli/index.js add

# İş için içerik üret (tüm platformlar)
node src/cli/index.js gen <job-id>

# Telegram/Discord'a paylaş
node src/cli/index.js post <job-id>

# Dashboard istatistikleri
node src/cli/index.js stats

# Rakip analizi
node src/cli/index.js competitors
```

### Telegram Bot

```bash
# .env'de TELEGRAM_BOT_TOKEN ve TELEGRAM_CHANNEL_ID ayarla
npm run bot:telegram
```

Bot komutları: `/jobs`, `/top`, `/help`

### Discord

```bash
# .env'de DISCORD_WEBHOOK_URL ayarla
npm run bot:discord
```

### Cron (Otomatik Paylaşım)

```bash
# Settings'ten auto_post = true yap, sonra:
npm run cron
```

Zamanlama: 09:00 (sabah iş), 14:00 (günlük liste), 18:00 (Discord), 23:55 (metrik snapshot)

## API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/dashboard` | Dashboard özeti |
| GET | `/api/jobs` | İş listesi |
| POST | `/api/jobs` | Yeni iş ekle |
| GET | `/api/go/:id?ch=telegram` | Click tracking redirect |
| POST | `/api/post/telegram` | Telegram'a paylaş |
| POST | `/api/post/discord` | Discord'a paylaş |
| POST | `/api/content/generate` | İçerik üret |
| GET | `/api/competitors` | Rakip analizi |
| GET | `/api/communities` | Topluluk listesi |
| GET | `/api/revenue/stats` | Gelir istatistikleri |
| GET | `/api/platforms` | Platform listesi |

## Proje Yapısı

```
src/
├── server.js          # Express API server
├── db/
│   ├── database.js    # SQLite connection
│   ├── init.js        # Schema + seed data
│   └── seed.js        # Sample jobs
├── models/
│   └── index.js       # Data access layer
├── routes/
│   └── api.js         # REST API routes
├── templates/
│   └── engine.js      # Content template engine
├── bots/
│   ├── telegram.js    # Telegram bot + channel poster
│   └── discord.js     # Discord webhook poster
├── services/
│   ├── referral.js    # Referral link generator
│   └── scheduler.js   # Cron job scheduler
├── cli/
│   └── index.js       # CLI tool
public/
└── index.html         # Dashboard (single HTML)
```

## Referral Platformları

| Platform | Komisyon |
|----------|----------|
| Mercor | $500-2000/hire |
| Turing | %10 ilk 3 ay |
| Toptal | $500/hire |
| Lemon.io | $500/hire |
| Arc.dev | $250/hire |
| Gun.io | $500/hire |

## Lisans

MIT - Turhan Hamza (turhanhamza@gmail.com)
