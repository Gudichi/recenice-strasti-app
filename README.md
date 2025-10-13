# Rečenice Strasti - Članstvo Web App

Mini members-only web app za program Rečenice Strasti, napravljen s Next.js 15, TypeScript, i shadcn/ui komponentama.

## 🚀 Brzo pokretanje

```bash
# Instaliraj dependencies
npm install

# Pokreni development server
npm run dev
```

Aplikacija će biti dostupna na [http://localhost:3000](http://localhost:3000)

## 📁 Struktura projekta

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Dashboard
│   ├── login/             # Prijava stranica
│   ├── welcome/           # Dobrodošlica stranica
│   ├── modul/[slug]/      # Modul stranice
│   └── lekcija/[module]/[lesson]/ # Lekcija stranice
├── components/            # React komponente
│   ├── ui/               # shadcn/ui komponente
│   ├── brand-header.tsx  # Header s avatarom
│   └── breadcrumb-nav.tsx # Navigacijski krušni put
├── content/              # Sadržaj (MDX/MD fajlovi)
│   └── modules/          # Moduli i lekcije
├── lib/                  # Utility funkcije
│   ├── content.ts        # Content management
│   ├── routes.ts         # Type-safe routing
│   └── utils.ts          # Helper funkcije
└── netlify.toml          # Netlify konfiguracija
```

## 🎨 Značajke

- **Dark UI** - Tamna tema po defaultu
- **TypeScript** - Potpuna type safety
- **Responsive** - Radi na svim uređajima
- **Accessibility** - WCAG kompatibilno
- **Croatian Language** - Potpuna podrška za hrvatski jezik

## 📱 Stranice

### Dashboard (`/`)
- Dobrodošnica s imenom korisnika
- Globalni progress bar (42% placeholder)
- Link na "Lekcija na kojoj si stala"
- Grid s 7 modula (4 osnovna + 3 bonus)

### Prijava (`/login`)
- Email input + "Pošalji kod" dugme
- OTP kod input (placeholder logika)
- Automatski redirect na dashboard

### Dobrodošlica (`/welcome`)
- Poruka "Poslali smo ti kod na {email}"
- OTP kod input
- Link za promjenu email adrese

### Modul (`/modul/[slug]`)
- Breadcrumb navigacija
- Lista lekcija kao kartice
- Click za otvaranje lekcije

### Lekcija (`/lekcija/[module]/[lesson]`)
- Breadcrumb navigacija
- Markdown sadržaj
- "Prijeđi na sljedeću lekciju" dugme
- Automatska navigacija između lekcija/modula

## 🔧 Development

```bash
# Development server
npm run dev

# Build za produkciju
npm run build

# Start produkcijski server
npm start

# Linting
npm run lint
```

## 📦 Dependencies

### Glavne
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI komponente

### UI Komponente
- `@radix-ui/react-*` - Headless UI primitives
- `lucide-react` - Ikonice
- `clsx` & `tailwind-merge` - Conditional styling

## 🌐 Deploy na Netlify

### UI Path (Preporučeno)

1. **Konektuj GitHub repo:**
   - Idi na [Netlify](https://netlify.com)
   - Klikni "New site from Git"
   - Izaberi GitHub i repo `recenice-strasti-app`

2. **Build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** 18

3. **Environment variables:**
   - Dodaj sve potrebne env varijable (kada budu potrebne)

4. **Deploy:**
   - Klikni "Deploy site"
   - Netlify će automatski buildati i deployovati

### CLI Path (Opcijski)

```bash
# Instaliraj Netlify CLI
npm install -g netlify-cli

# Login u Netlify
netlify login

# Initialize projekt
netlify init

# Deploy
netlify deploy --build
```

## 🔐 GitHub Setup (Manual)

Pošto GitHub CLI nije dostupan, izvršite ove korake ručno:

```bash
# Kreiraj novi repo na GitHub.com
# Naziv: recenice-strasti-app
# Public
# Bez README, .gitignore, ili license

# Dodaj remote i push
git remote add origin https://github.com/YOUR_USERNAME/recenice-strasti-app.git
git branch -M main
git push -u origin main
```

Zamijenite `YOUR_USERNAME` sa vašim GitHub username-om.

## 📋 Što još treba napraviti

### Kratkoročno (TODO)
- [ ] **Supabase Auth** - Implementirati pravu autentifikaciju
- [ ] **Database** - Kreirati tablice za korisnike, progres, modul
- [ ] **Email OTP** - Integrirati pravi email servis
- [ ] **User Progress** - Spremiti napredak u bazi
- [ ] **Environment Variables** - Dodati .env.example

### Dugoročno (Future)
- [ ] **Stripe Integration** - Plaćanje članstva
- [ ] **Admin Panel** - Upravljanje sadržajem
- [ ] **Analytics** - Tracking napretka
- [ ] **Push Notifications** - Podsjećanja
- [ ] **Mobile App** - React Native verzija

## 🎯 Production Checklist

Prije deployment-a na produkciju:

- [ ] Dodati sve environment varijable
- [ ] Testirati sve rute i funkcionalnosti
- [ ] Optimizirati slike i performance
- [ ] Setup error tracking (Sentry)
- [ ] Setup analytics (Google Analytics)
- [ ] Backup strategija za bazu podataka

## 📞 Support

Za pitanja ili probleme, otvorite issue na GitHub repo ili kontaktirajte development tim.

---

**Napravljeno s ❤️ za Rečenice Strasti program**