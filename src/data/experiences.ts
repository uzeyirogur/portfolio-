export type Experience = {
  company: string
  companyShort?: string
  role: string
  location: string
  startDate: string
  endDate: string
  isCurrent: boolean
  description: string
  highlights: string[]
  technologies: string[]
}

export const experiences: Experience[] = [
  {
    company: 'GMR GENÇ METAL RAFİNERİ A.Ş.',
    companyShort: 'GMR Genç Metal',
    role: 'Computer Engineer',
    location: 'İstanbul, Türkiye',
    startDate: 'Ocak 2026',
    endDate: 'Devam Ediyor',
    isCurrent: true,
    description:
      'Şirket içi yazılım geliştirme, web tabanlı yönetim panelleri, API yapıları ve veritabanı odaklı kurumsal uygulamalar üzerine çalışıyorum.',
    highlights: [
      '.NET tabanlı kurumsal uygulama geliştirme',
      'ASP.NET Core MVC ve Web API yapıları oluşturma',
      'Entity Framework Core ile veri işlemleri',
      'SQL Server üzerinde tablo, ilişki ve sorgu yapıları',
      'Dashboard ve yönetim paneli ekranları geliştirme',
      'Git/GitHub ile proje versiyon kontrolü',
      'Şirket içi teknik destek süreçlerine katkı',
    ],
    technologies: ['ASP.NET Core', 'C#', 'SQL Server', 'Entity Framework Core', 'MVC', 'Web API', 'Git'],
  },
  {
    company: 'Web Beyaz',
    companyShort: 'Web Beyaz',
    role: 'Stajyer Mühendis',
    location: 'Samsun, Türkiye',
    startDate: 'Ağustos 2025',
    endDate: 'Ocak 2026',
    isCurrent: false,
    description:
      'Şirket içi yazılım geliştirme, web tabanlı yönetim panelleri, API yapıları ve veritabanı odaklı kurumsal uygulamalar üzerine çalışıyorum.',
    highlights: [
      '.NET tabanlı kurumsal uygulama geliştirme',
      'ASP.NET Core MVC ve Web API yapıları oluşturma',
      'Entity Framework Core ile veri işlemleri',
      'SQL Server üzerinde tablo, ilişki ve sorgu yapıları',
      'Dashboard ve yönetim paneli ekranları geliştirme',
      'Git/GitHub ile proje versiyon kontrolü',
      'Şirket içi teknik destek süreçlerine katkı',
    ],
    technologies: ['ASP.NET Core', 'C#', 'SQL Server', 'Entity Framework Core', 'MVC', 'Web API', 'Git'],
  },
]
