# Kişisel Bilgisayar Mühendisi Web Sitesi — Claude Geliştirme Brief’i

> Amaç: Üzeyir Öğür için modern, şık, etkileyici, hızlı ve kolay güncellenebilir kişisel portfolyo web sitesi oluşturmak.  
> Site; bilgisayar mühendisi kimliğini, Full Stack .NET Developer becerilerini, projelerini, deneyimlerini, iletişim bilgilerini ve teknik üretkenliğini premium bir görsel dille sunmalı.

---

## 1. Genel Vizyon

Bu site sıradan bir CV sitesi gibi görünmemeli.  
2026 tasarım trendlerine uygun, premium, temiz, güçlü ve teknik bir kişisel marka sitesi olmalı.

Referans hissiyat:
- Modern mühendis profili
- Şık hero alanı
- Blog/proje/deneyim odaklı yapı
- Premium kartlar
- Etkili animasyonlar
- Karanlık/açık tema desteği
- Mobilde çok iyi çalışan tasarım
- Hızlı, okunabilir, profesyonel ve güven veren yapı

Site ilk bakışta şunu hissettirmeli:

> “Bu kişi yazılım geliştirmeyi bilen, gerçek projeler üretmiş, modern teknolojilere hâkim, profesyonel ve gelişime açık bir bilgisayar mühendisi.”

---

## 2. Tasarım Dili

### Genel Stil

- Premium dark-first tasarım.
- Açık tema da desteklenebilir.
- Arka planda çok hafif grid/noise/gradient efektleri olabilir.
- Glassmorphism kartlar kullanılabilir ama abartılmamalı.
- Neon gibi ucuz duracak aşırı renklerden kaçınılmalı.
- Renk paleti sade ama etkileyici olmalı.

### Önerilen Renk Paleti

Ana tema:
- Background: `#050816`, `#070A12`, `#0B1020`
- Primary: elektrik mavi / cyan / indigo geçişleri
- Accent: soft violet veya emerald detaylar
- Text: `#F8FAFC`, `#CBD5E1`, `#94A3B8`
- Card: transparan koyu lacivert / slate tonları
- Border: ince, düşük opaklıklı beyaz çizgiler

### Görsel Efektler

- Hero bölümünde hafif hareketli gradient glow
- Cursor takip eden çok hafif ışık efekti
- Kart hover animasyonları
- Skill badge hover efekti
- Proje kartlarında smooth scale/tilt
- Sayfa geçişlerinde yumuşak animasyon
- Scroll reveal animasyonları
- Çok abartılı olmayan Framer Motion efektleri

Tasarım profesyonel kalmalı. Oyun sitesi veya kripto sitesi gibi görünmemeli.

---

## 3. Teknik Stack Önerisi

Aşağıdaki stack kullanılabilir:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui veya özel component yapısı
- Lucide Icons
- next-themes
- MDX destekli blog altyapısı opsiyonel
- SEO metadata
- OpenGraph görselleri
- Responsive design
- Vercel deploy uyumu

Kod temiz, component bazlı ve kolay düzenlenebilir olmalı.

---

## 4. En Önemli Şart: Bilgiler Kolay Düzenlenebilir Olsun

Site hard-coded karmaşık olmamalı.  
Ben daha sonra isim, fotoğraf, hakkımda yazısı, yetenekler, projeler, deneyimler gibi alanları kolayca değiştirebilmeliyim.

Bu yüzden aşağıdaki gibi merkezi veri dosyaları oluştur:

```txt
/src/data/profile.ts
/src/data/skills.ts
/src/data/projects.ts
/src/data/experiences.ts
/src/data/socials.ts
/src/data/site.ts
```

Alternatif olarak tek dosya da olabilir:

```txt
/src/data/portfolio.ts
```

Önemli olan şu:

- İsim değiştirmek kolay olsun.
- Profil fotoğrafı değiştirmek kolay olsun.
- Hakkımda yazısı kolay değişsin.
- Skill eklemek/silmek kolay olsun.
- Proje eklemek/silmek kolay olsun.
- Deneyim eklemek/silmek kolay olsun.
- Sosyal medya linkleri kolay değişsin.
- Blog aktif/pasif edilebilsin.
- CV linki sonradan eklenebilsin.
- İletişim alanı kolay güncellensin.

---

## 5. Site Bölümleri

Site tek sayfa olabilir ama çok profesyonel durması için bölümler net ayrılmalı.  
İstenirse `/projects`, `/about`, `/blog`, `/contact` gibi ayrı sayfalar da yapılabilir.

Minimum bölümler:

1. Hero
2. Hakkımda
3. Yetkinlikler
4. Projeler
5. Deneyim
6. Eğitim
7. Blog / Yazılar opsiyonel
8. İletişim
9. Footer

---

## 6. Header / Navbar

Navbar sticky olabilir.

Menü elemanları:
- Ana Sayfa
- Hakkımda
- Yetkinlikler
- Projeler
- Deneyim
- İletişim

Ek özellikler:
- Dark/light theme toggle
- CV indir butonu
- GitHub ve LinkedIn ikonları
- Mobilde modern hamburger menü
- İstenirse `⌘K` command palette efekti

Navbar sade ama kaliteli görünmeli.

---

## 7. Hero Bölümü

Hero bölümü sitenin en güçlü alanı olmalı.

İçerik önerisi:

```txt
Merhaba, ben Üzeyir Öğür.
Bilgisayar Mühendisi & Full Stack .NET Developer
```

Alt açıklama:

```txt
ASP.NET Core MVC, Web API, Entity Framework Core ve SQL Server teknolojileriyle 
ölçeklenebilir, sürdürülebilir ve kullanıcı odaklı web uygulamaları geliştiriyorum.
```

Butonlar:
- Projelerimi Gör
- Benimle İletişime Geç
- CV İndir

Sağ tarafta:
- Profil fotoğrafı veya modern avatar alanı
- Kod kartı efekti
- Terminal animasyonu
- Mini teknoloji stack kartları
- “Currently building: ParamNet” gibi küçük canlı kart

Hero detayları:
- Büyük ama okunaklı typography
- Gradient text
- Yumuşak arka plan ışığı
- Profil görseli için premium çerçeve
- Mobilde içerik üst üste düzgün gelsin

---

## 8. Kısa Profil Kartları

Hero altında 3 veya 4 küçük stat kart olabilir:

```txt
Computer Engineer
Full Stack .NET Developer
.NET / SQL / Web API
Real-world Project Experience
```

Alternatif istatistikler:

```txt
3+ Aktif Proje
.NET Core Odaklı Geliştirme
Backend + Frontend Deneyimi
Kurumsal Sistem Tecrübesi
```

Bu alan güven vermeli.

---

## 9. Hakkımda Bölümü

Bu bölüm samimi ama profesyonel yazılmalı.

Başlık:
```txt
Hakkımda
```

İlk placeholder metin:

```txt
Ben Üzeyir Öğür, Bilgisayar Mühendisliği mezunu ve Full Stack .NET Developer olarak 
web tabanlı uygulamalar geliştiriyorum. Özellikle ASP.NET Core MVC, Web API, 
Entity Framework Core ve SQL Server teknolojileriyle kurumsal sistemler, yönetim panelleri, 
dashboard ekranları ve veri odaklı uygulamalar üzerine çalışıyorum.

Projelerimde temiz mimari, sürdürülebilir kod yapısı, kullanıcı deneyimi ve gerçek iş ihtiyaçlarına 
uygun çözümler üretmeye odaklanıyorum. Yazılım geliştirme sürecinde yalnızca çalışan ekranlar değil, 
bakımı kolay, genişletilebilir ve profesyonel sistemler üretmeyi önemsiyorum.
```

Bu alan dinamik olsun. Kullanıcı daha sonra değiştirebilmeli.

Hakkımda bölümünde ayrıca kısa bilgi kartları olabilir:

- Konum: İstanbul, Türkiye
- Rol: Computer Engineer / Full Stack .NET Developer
- Odak: Web Applications, APIs, Dashboards, Business Systems
- İlgi Alanları: AI destekli geliştirme, otomasyon, finans uygulamaları, kurumsal yazılım

---

## 10. Yetkinlikler Bölümü

Skill alanı kategori bazlı olmalı.

### Backend
- C#
- ASP.NET Core MVC
- ASP.NET Core Web API
- Entity Framework Core
- LINQ
- RESTful API
- N-Tier Architecture
- Repository Pattern
- Unit of Work
- DTO
- Validation

### Database
- SQL Server
- SQLite
- Entity Framework Migrations
- Relational Database Design

### Frontend
- HTML
- CSS
- JavaScript
- Bootstrap
- Tailwind CSS
- Responsive UI
- Dashboard UI

### Tools
- Git
- GitHub
- Visual Studio
- Swagger
- Postman
- Docker opsiyonel
- Vercel opsiyonel

### AI & Automation
- AI destekli yazılım geliştirme
- Claude Code
- ChatGPT
- n8n temel otomasyon deneyimi
- Prompt engineering temelleri

Tasarım:
- Skill kartları kategori kategori olsun.
- Her skill badge olarak gösterilsin.
- Hover’da hafif parlama/scale efekti olsun.
- İstenirse skill seviyesi gösterilebilir ama zorunlu değil.

Skill seviyesi göstermek istersek:
```ts
{
  name: "ASP.NET Core",
  level: "Intermediate",
  category: "Backend"
}
```

Ama seviye zorunlu olmasın.

---

## 11. Projeler Bölümü

Proje kartları çok önemli. Siteyi etkileyici gösterecek ana bölüm burası.

Her proje kartında:
- Proje adı
- Kısa açıklama
- Kullanılan teknolojiler
- Görsel/screenshot
- GitHub linki
- Demo linki
- Öne çıkan özellikler
- Durum etiketi: Aktif / Geliştiriliyor / Demo / Planlandı

İlk proje listesi:

### 1. ParamNet

```txt
Kişisel finans yönetimi için geliştirilen web ve mobil odaklı bir uygulama. 
Gelir-gider takibi, sabit giderler, kredi kartı borçları, taksitler, varlık/borç takibi 
ve TL/EUR/USD/altın/gümüş karşılıkları gibi finansal verileri tek panelde toplamayı hedefler.
```

Teknolojiler:
- ASP.NET Core
- Entity Framework Core
- SQL Server / SQLite
- Dashboard UI
- GitHub
- AI destekli geliştirme

Öne çıkanlar:
- Gelir/gider yönetimi
- Sabit gider takibi
- Çoklu varlık tipi
- Finans dashboard’u
- Bildirim altyapısı planı

Durum:
```txt
Geliştiriliyor
```

---

### 2. Anka Sports School Management

```txt
Spor okulu operasyonlarını dijitalleştirmek için geliştirilen yönetim sistemi. 
Veli, öğrenci, üyelik, aidat ve ödeme süreçlerini tek panel üzerinden yönetmeyi amaçlar.
```

Teknolojiler:
- ASP.NET Core MVC
- Web API
- Entity Framework Core
- SQL Server
- Bootstrap
- SweetAlert2

Öne çıkanlar:
- Öğrenci kayıt yönetimi
- Veli-öğrenci bağlantısı
- Üyelik oluşturma
- Aylık aidat üretimi
- Ödeme takibi
- Modal tabanlı kullanıcı arayüzü

Durum:
```txt
Geliştiriliyor / Demo
```

---

### 3. Gold Price Tracker

```txt
Farklı firmalardan altın ve gümüş fiyatlarını belirli aralıklarla toplayıp 
karşılaştırmalı olarak gösteren veri odaklı takip paneli.
```

Teknolojiler:
- ASP.NET Core
- SQLite / SQL Server
- Background Service
- Chart.js
- Dashboard UI
- API entegrasyonu

Öne çıkanlar:
- Firma bazlı fiyat takibi
- Ürün bazlı filtreleme
- Otomatik veri çekimi
- Grafik ve tablo görünümü
- En ucuz fiyat karşılaştırması

Durum:
```txt
Planlandı / Geliştiriliyor
```

---

### 4. Vehicle Inventory Management

```txt
Araç envanteri, bakım kayıtları, kilometre takibi ve görev/seyahat süreçlerini yönetmek için 
tasarlanan kurumsal araç takip sistemi.
```

Teknolojiler:
- ASP.NET Core MVC
- Entity Framework Core
- SQL Server
- Bootstrap
- Data Tables
- Modal UI

Öne çıkanlar:
- Araç kayıt yönetimi
- Bakım takip sistemi
- Seyahat/görev kayıtları
- Şoför ve refakatçi yönetimi
- Dashboard ve filtreleme

Durum:
```txt
Geliştiriliyor
```

---

### 5. PortföyX

```txt
Emlak ve araç ilanlarını farklı platformlardan toplayıp filtreleme, kayıt altına alma 
ve müşteri/lead yönetimi süreçlerini kolaylaştırmayı hedefleyen ilan takip ve CRM fikri.
```

Teknolojiler:
- React
- FastAPI veya ASP.NET Core alternatifi
- MongoDB / SQL alternatifleri
- CRM mantığı
- Automation

Öne çıkanlar:
- Çoklu platform ilan takibi
- Kayıtlı aramalar
- Lead yönetimi
- Mesaj şablonları
- Aktivite kayıtları

Durum:
```txt
Fikir / Planlandı
```

---

## 12. Proje Kartı Tasarımı

Proje kartları premium görünmeli.

Kart yapısı:
- Üstte proje görseli veya gradient mockup
- Sağ üstte durum badge’i
- Başlık
- Kısa açıklama
- Teknoloji badge’leri
- 2 buton:
  - Detay
  - GitHub / Demo

Hover:
- Kart hafif yukarı kalksın
- Border glow efekti olsun
- Görsel hafif zoom yapsın
- Teknoloji badge’leri düzenli görünsün

Projeler bölümü için filtre olabilir:
- Tümü
- .NET
- Dashboard
- API
- AI / Automation
- Business Apps

---

## 13. Deneyim Bölümü

Timeline tasarımı kullanılabilir.

İlk deneyim:

### GMR GENÇ METAL RAFİNERİ A.Ş.

```txt
Computer Engineer
Ocak 2026 - Devam Ediyor
İstanbul
```

Açıklama:

```txt
Şirket içi yazılım geliştirme, web tabanlı yönetim panelleri, API yapıları ve veritabanı odaklı 
kurumsal uygulamalar üzerine çalışıyorum. ASP.NET Core MVC, Web API, Entity Framework Core ve 
SQL Server teknolojileriyle iş süreçlerini dijitalleştirmeye yönelik çözümler geliştiriyorum.
```

Madde madde:
- .NET tabanlı kurumsal uygulama geliştirme
- MVC ve Web API yapıları oluşturma
- Entity Framework Core ile veri işlemleri
- SQL Server üzerinde tablo, ilişki ve sorgu yapıları
- Dashboard ve yönetim paneli ekranları
- Git/GitHub ile proje versiyon kontrolü
- Şirket içi teknik destek süreçlerine katkı

---

## 14. Eğitim Bölümü

```txt
Atatürk Üniversitesi
Bilgisayar Mühendisliği
Lisans
```

Ek bilgi:
```txt
GPA: 2.57
```

Bu alan dinamik olsun. İstenirse GPA gösterimi kapatılabilsin.

---

## 15. Blog / Yazılar Bölümü

Blog opsiyonel olsun.  
Şimdilik aktif edilebilir veya gizlenebilir.

Ama altyapı hazır olursa güzel olur.

Blog fikirleri:
- ASP.NET Core MVC ile CRUD yapısı
- Entity Framework Core migration mantığı
- Junior developer olarak öğrendiklerim
- Dashboard tasarımında dikkat edilmesi gerekenler
- AI araçlarıyla yazılım geliştirme deneyimi
- Kişisel finans uygulaması geliştirirken öğrendiklerim

Blog sistemi:
- MDX desteklenebilir.
- `/content/blog` altında yazılar tutulabilir.
- Blog aktif değilse navbar’da görünmesin.

---

## 16. İletişim Bölümü

İletişim alanı sade ve net olmalı.

İçerik:

```txt
Bir proje, iş birliği veya yazılım geliştirme süreci hakkında konuşmak istersen benimle iletişime geçebilirsin.
```

Butonlar:
- Mail Gönder
- LinkedIn
- GitHub
- CV İndir

Form opsiyonel:
- Ad Soyad
- E-posta
- Mesaj
- Gönder

Form yapılacaksa:
- Şimdilik mailto kullanılabilir.
- Sonra Formspree / Resend / server action eklenebilir.

---

## 17. Footer

Footer sade olsun.

İçerik:
```txt
© 2026 Üzeyir Öğür. Tüm hakları saklıdır.
Built with Next.js, TypeScript and Tailwind CSS.
```

Ek:
- GitHub
- LinkedIn
- Mail
- Yukarı çık butonu

---

## 18. SEO ve Performans

Site SEO uyumlu olmalı.

Metadata:
```txt
Title: Üzeyir Öğür | Computer Engineer & Full Stack .NET Developer
Description: ASP.NET Core MVC, Web API, Entity Framework Core ve SQL Server ile web uygulamaları geliştiren bilgisayar mühendisi.
Keywords: Üzeyir Öğür, Computer Engineer, Full Stack .NET Developer, ASP.NET Core, C#, Web API, SQL Server
```

OpenGraph:
- Başlık
- Açıklama
- Profil görseli veya özel OG görseli
- Türkçe ve İngilizce destek opsiyonel

Performans:
- Lighthouse skorları yüksek olmalı.
- Gereksiz animasyon ve paket şişkinliğinden kaçınılmalı.
- Image optimization kullanılmalı.
- Mobile-first düşünülmeli.
- Accessibility ihmal edilmemeli.

---

## 19. Dil Desteği

Başlangıçta Türkçe olabilir.  
Ama yapı ileride İngilizce’ye çevrilebilecek şekilde kurulmalı.

Opsiyonel:
- TR / EN dil toggle
- `/tr` ve `/en` routing
- Veri dosyalarında çok dilli alanlar

Şimdilik tek dil Türkçe yeterli. Ancak kod yapısı ileride çok dile uygun olursa iyi olur.

---

## 20. Dinamik İçerik Yapısı Örneği

Aşağıdaki gibi veri yapısı hazırlanabilir:

```ts
export const profile = {
  name: "Üzeyir Öğür",
  title: "Computer Engineer & Full Stack .NET Developer",
  location: "İstanbul, Türkiye",
  email: "MAIL_ADRESI_BURAYA",
  github: "https://github.com/uzeyirogur",
  linkedin: "https://linkedin.com/in/uzeyirogur",
  cvUrl: "/cv/uzeyir-ogur-cv.pdf",
  avatar: "/images/profile.jpg",
  shortBio:
    "ASP.NET Core MVC, Web API, Entity Framework Core ve SQL Server teknolojileriyle web uygulamaları geliştiriyorum.",
  about:
    "Ben Üzeyir Öğür, Bilgisayar Mühendisliği mezunu ve Full Stack .NET Developer olarak web tabanlı uygulamalar geliştiriyorum..."
};
```

Skill örneği:

```ts
export const skills = [
  {
    category: "Backend",
    items: ["C#", "ASP.NET Core MVC", "Web API", "Entity Framework Core", "RESTful API"]
  },
  {
    category: "Database",
    items: ["SQL Server", "SQLite", "EF Core Migrations"]
  },
  {
    category: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind CSS"]
  }
];
```

Project örneği:

```ts
export const projects = [
  {
    title: "ParamNet",
    slug: "paramnet",
    status: "Geliştiriliyor",
    description:
      "Gelir-gider, varlık, borç ve finansal takip süreçlerini tek panelde toplayan kişisel finans uygulaması.",
    image: "/images/projects/paramnet.png",
    technologies: ["ASP.NET Core", "EF Core", "SQL Server", "Dashboard"],
    features: [
      "Gelir-gider yönetimi",
      "Sabit gider takibi",
      "Finans dashboard’u",
      "Çoklu varlık tipi"
    ],
    githubUrl: "",
    demoUrl: ""
  }
];
```

Experience örneği:

```ts
export const experiences = [
  {
    company: "GMR GENÇ METAL RAFİNERİ A.Ş.",
    role: "Computer Engineer",
    location: "İstanbul",
    startDate: "Ocak 2026",
    endDate: "Devam Ediyor",
    description:
      "Şirket içi yazılım geliştirme, web tabanlı yönetim panelleri, API yapıları ve veritabanı odaklı kurumsal uygulamalar üzerine çalışıyorum.",
    highlights: [
      ".NET tabanlı kurumsal uygulama geliştirme",
      "ASP.NET Core MVC ve Web API yapıları",
      "Entity Framework Core ve SQL Server kullanımı",
      "Dashboard ve yönetim paneli ekranları"
    ]
  }
];
```

---

## 21. Claude Çalışma Talimatı

Claude, bu projeyi geliştirirken aşağıdaki şekilde ilerle:

1. Önce proje klasör yapısını oluştur.
2. Next.js + TypeScript + Tailwind CSS altyapısını kur.
3. Tasarım sistemini oluştur:
   - renkler
   - typography
   - spacing
   - container
   - button
   - card
   - badge
4. Dinamik data dosyalarını oluştur.
5. Header ve layout’u hazırla.
6. Hero bölümünü yap.
7. Hakkımda bölümünü yap.
8. Skills bölümünü yap.
9. Projects bölümünü yap.
10. Experience timeline bölümünü yap.
11. Education bölümünü yap.
12. Contact bölümünü yap.
13. Footer bölümünü yap.
14. Responsive kontrollerini yap.
15. Animasyonları ekle.
16. SEO metadata ekle.
17. Deploy için hazır hale getir.

---

## 22. Claude Bana Bilgi Sorması Gereken Yerler

Eksik bilgi varsa uydurma.  
Şu alanlar için bana soru sor veya placeholder bırak:

### Kimlik Bilgileri
- Tam ad nasıl yazılacak?
- Türkçe/İngilizce unvan ne olacak?
- Profil fotoğrafı olacak mı?
- Avatar mı gerçek fotoğraf mı kullanılacak?

### Hakkımda
- Daha samimi mi yazılsın, daha kurumsal mı?
- Kaç yıllık deneyim yazılacak?
- Hangi alanlara odaklanıyorum?
- Freelance iş alıyor muyum?

### Projeler
- Hangi projeler gösterilecek?
- Her projenin ekran görüntüsü var mı?
- GitHub linkleri eklenecek mi?
- Demo linkleri var mı?
- Projeler aktif mi, demo mu, planlandı mı?

### Deneyim
- Şirket adı tam nasıl yazılacak?
- Çalışma tarihleri doğru mu?
- Pozisyon Türkçe mi İngilizce mi yazılacak?
- İş detayları ne kadar açık yazılacak?

### İletişim
- E-posta yazılsın mı?
- Telefon yazılsın mı?
- LinkedIn/GitHub linkleri doğru mu?
- CV dosyası eklenecek mi?

### Görseller
- Profil fotoğrafı nereye konacak?
- Proje görselleri nereye konacak?
- Görsel yoksa modern mockup/placeholder üretilecek mi?

---

## 23. İçerik Düzenleme Kolaylığı

Claude, siteyi öyle yap ki ben sonradan sadece data dosyasına girip şunları değiştirebileyim:

```txt
name
title
bio
about
avatar
skills
projects
experiences
education
social links
contact info
cv link
```

Yeni proje eklemek için sadece `projects.ts` dosyasına yeni obje eklemem yeterli olsun.

Yeni skill eklemek için sadece `skills.ts` dosyasına yeni item eklemem yeterli olsun.

Yeni deneyim eklemek için sadece `experiences.ts` dosyasına yeni obje eklemem yeterli olsun.

---

## 24. İstenmeyen Şeyler

- Eski tarz CV sitesi gibi görünmesin.
- Düz beyaz, sıkıcı, kurumsal template gibi olmasın.
- Gereksiz ağır animasyon olmasın.
- Mobil tasarım bozulmasın.
- Yazılar küçük ve okunmaz olmasın.
- Kartlar birbirine yapışık olmasın.
- Çok fazla renk kullanılmasın.
- Kopya template hissi vermesin.
- Fotoğraf yoksa boş/çirkin alan kalmasın.
- Veriler component içine gömülmesin.

---

## 25. İlk Teslimde Beklenen Sonuç

İlk teslimde şu olmalı:

- Çalışan Next.js projesi
- Modern ve premium ana sayfa
- Dinamik data dosyaları
- Responsive tasarım
- Dark/light tema
- Hero, About, Skills, Projects, Experience, Education, Contact, Footer
- Örnek proje verileri
- Örnek deneyim verileri
- Kolay güncellenebilir yapı
- Deploy’a hazır kod

---

## 26. Sonraki Aşama Fikirleri

İleride eklenebilir:

- Blog sistemi
- Admin panel
- CMS bağlantısı
- GitHub repo activity alanı
- “Now / Currently Building” bölümü
- CV sayfası
- Sertifikalar bölümü
- İngilizce dil desteği
- Mini terminal component
- Command palette
- Contact form backend
- Analytics
- OpenGraph image generator

---

## 27. Tasarım Kalitesi İçin Ek Not

Bu site bir öğrenci ödevi gibi değil, profesyonel yazılımcı portfolyosu gibi görünmeli.  
İlk bakışta görsel kalite güçlü olmalı ama içerik hâlâ okunabilir kalmalı.

Özellikle şu alanlar çok iyi tasarlanmalı:

- Hero
- Proje kartları
- Skill bölümü
- Experience timeline
- Contact CTA

Claude, tasarımı yaparken “az ama kaliteli detay” prensibini uygula.

---

## 28. Başlangıç İçerik Özeti

Kullanılabilecek ilk bilgiler:

```txt
Ad Soyad: Üzeyir Öğür
Rol: Computer Engineer & Full Stack .NET Developer
Konum: İstanbul, Türkiye
Odak: ASP.NET Core MVC, Web API, Entity Framework Core, SQL Server, Dashboard UI, Business Applications
GitHub: https://github.com/uzeyirogur
LinkedIn: https://linkedin.com/in/uzeyirogur
Eğitim: Atatürk Üniversitesi, Bilgisayar Mühendisliği
Deneyim: GMR GENÇ METAL RAFİNERİ A.Ş. — Computer Engineer — Ocak 2026 / Devam Ediyor
Projeler: ParamNet, Anka Sports School Management, Gold Price Tracker, Vehicle Inventory Management, PortföyX
```

Eksik alanlar:
```txt
E-posta
Profil fotoğrafı
CV dosyası
Proje ekran görüntüleri
Demo linkleri
GitHub repo linkleri
Net hakkımda yazısı
```

Bu eksik alanlar için bana soru sorulmalı veya placeholder bırakılmalı.
