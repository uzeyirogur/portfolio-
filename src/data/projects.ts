export type ProjectStatus = 'Geliştiriliyor' | 'Demo' | 'Planlandı' | 'Tamamlandı' | 'Fikir'

export type Project = {
  title: string
  slug: string
  status: ProjectStatus
  description: string
  longDescription?: string
  // Proje görseli için /public/images/projects/ klasörüne resim koyun
  image: string
  technologies: string[]
  features: string[]
  githubUrl: string
  demoUrl: string
  featured: boolean
  category: string[]
}

export const projects: Project[] = [
  {
    title: 'ParamNet',
    slug: 'paramnet',
    status: 'Geliştiriliyor',
    description:
      'Gelir-gider, varlık, borç ve finansal takip süreçlerini tek panelde toplayan kişisel finans yönetimi uygulaması.',
    longDescription:
      'Kişisel finans yönetimi için geliştirilen web uygulaması. Gelir-gider takibi, sabit giderler, kredi kartı borçları, taksitler, varlık/borç takibi ve TL/EUR/USD/altın/gümüş karşılıkları gibi finansal verileri tek panelde toplamayı hedefler.',
    image: '/images/projects/paramnet.png',
    technologies: ['ASP.NET Core', 'Entity Framework Core', 'SQL Server', 'SQLite', 'Dashboard UI', 'JavaScript'],
    features: [
      'Gelir / gider yönetimi',
      'Sabit gider takibi',
      'Çoklu varlık tipi (TL, EUR, USD, Altın)',
      'Finans dashboard ekranı',
      'Kredi kartı ve taksit takibi',
      'Bildirim altyapısı (planlanan)',
    ],
    githubUrl: '',
    demoUrl: '',
    featured: true,
    category: ['.NET', 'Dashboard', 'Business Apps'],
  },
  {
    title: 'AnkaVM Spor Akademi',
    slug: 'anka-sports',
    status: 'Geliştiriliyor',
    description:
      'Anadolu Efes Basketbol Okulları resmi ortağı AnkaVM için geliştirilen kurumsal web sitesi ve üye yönetim sistemi. E-ticaret, aidat takibi ve çok şubeli yapı.',
    longDescription:
      'İstanbul\'un 34 şubesinde basketbol, voleybol ve cimnastik eğitimi veren AnkaVM Spor Akademi için geliştirilen tam kapsamlı platform. Halka açık kurumsal site, e-ticaret altyapısı ve arka planda öğrenci/veli/aidat yönetim sistemi.',
    image: '/images/projects/anka-sports.png',
    technologies: ['ASP.NET Core MVC', 'Web API', 'Entity Framework Core', 'SQL Server', 'Bootstrap', 'SweetAlert2'],
    features: [
      'Kurumsal web sitesi ve e-ticaret',
      'Öğrenci kayıt ve veli yönetimi',
      'Üyelik ve aylık aidat takibi',
      'Ödeme süreçleri',
      'Çok şubeli yapı (34 şube)',
      'Favori & sepet altyapısı',
    ],
    githubUrl: '',
    demoUrl: 'https://ankavm.com',
    featured: true,
    category: ['.NET', 'Dashboard', 'Business Apps'],
  },
  {
    title: 'Gold Price Tracker',
    slug: 'gold-price-tracker',
    status: 'Tamamlandı',
    description:
      'Farklı firmalardan altın ve gümüş fiyatlarını otomatik toplayıp karşılaştırmalı olarak gösteren takip paneli. Aktif scraper, canlı fiyat grafiği ve en ucuz firma karşılaştırması.',
    image: '/images/projects/gold-tracker.png',
    technologies: ['ASP.NET Core', 'SQLite', 'SQL Server', 'Background Service', 'Chart.js', 'Dashboard UI'],
    features: [
      '8 aktif firma, 21 ürün takibi',
      'Otomatik scraper (5 dk aralıklı)',
      'Kategori / ürün / firma filtreleme',
      'Canlı fiyat grafiği (Çizgi / Bant)',
      'En ucuz fiyat vurgulaması',
      'Havale/EFT ve kredi kartı karşılaştırması',
    ],
    githubUrl: '',
    demoUrl: '',
    featured: false,
    category: ['.NET', 'Dashboard', 'API'],
  },
  {
    title: 'Vehicle Inventory',
    slug: 'vehicle-inventory',
    status: 'Geliştiriliyor',
    description:
      'Araç envanteri, bakım kayıtları, kilometre takibi ve görev/seyahat süreçlerini yöneten kurumsal araç takip sistemi.',
    image: '/images/projects/vehicle-inventory.png',
    technologies: ['ASP.NET Core MVC', 'Entity Framework Core', 'SQL Server', 'Bootstrap', 'Data Tables', 'Modal UI'],
    features: [
      'Araç kayıt ve envanter yönetimi',
      'Bakım takip sistemi',
      'Seyahat / görev kayıtları',
      'Şoför ve refakatçi yönetimi',
      'Dashboard ve gelişmiş filtreleme',
    ],
    githubUrl: '',
    demoUrl: '',
    featured: false,
    category: ['.NET', 'Dashboard', 'Business Apps'],
  },
  {
    title: 'Ticket System',
    slug: 'ticket-system',
    status: 'Tamamlandı',
    description:
      'Altın üretim sektörü için geliştirilmiş kurumsal destek talebi yönetim sistemi. N-Tier mimari, JWT kimlik doğrulama ve rol bazlı yetkilendirme.',
    longDescription:
      'ASP.NET Core 8 ile geliştirilen 5 katmanlı N-Tier mimarisine sahip kurumsal ticket sistemi. 7 farklı kullanıcı rolü, 8 aşamalı ticket yaşam döngüsü, SLA takibi, Gantt takvim, gerçek zamanlı bildirimler ve dosya ekleri içerir.',
    image: '/images/projects/ticket-system.png',
    technologies: ['ASP.NET Core 8', 'Entity Framework Core', 'SQLite', 'JWT', 'AutoMapper', 'Chart.js', 'Bootstrap 5'],
    features: [
      'Rol bazlı yetkilendirme (7 rol)',
      'Ticket yaşam döngüsü (8 durum)',
      'SLA takibi ve gecikme uyarıları',
      'Gantt takvim görünümü',
      'Gerçek zamanlı bildirimler',
      'Dosya ekleri ve yorum akışı',
    ],
    githubUrl: 'https://github.com/uzeyirogur/Ticket-System',
    demoUrl: '',
    featured: true,
    category: ['.NET', 'Dashboard', 'Business Apps'],
  },
  {
    title: 'PortföyX',
    slug: 'portfolyox',
    status: 'Fikir',
    description:
      'Emlak ve araç ilanlarını farklı platformlardan toplayıp filtreleme, kayıt ve müşteri yönetimi süreçlerini kolaylaştıran CRM uygulaması.',
    image: '/images/projects/portfolyox.png',
    technologies: ['React', 'ASP.NET Core veya FastAPI', 'MongoDB / SQL', 'CRM Mantığı', 'Otomasyon'],
    features: [
      'Çoklu platform ilan takibi',
      'Kayıtlı aramalar',
      'Lead yönetimi',
      'Mesaj şablonları',
      'Aktivite kayıtları',
    ],
    githubUrl: '',
    demoUrl: '',
    featured: false,
    category: ['API', 'Business Apps', 'AI / Automation'],
  },
]

export const projectCategories = ['Tümü', '.NET', 'Dashboard', 'API', 'AI / Automation', 'Business Apps']
