export type Education = {
  institution: string
  degree: string
  field: string
  startYear: string
  endYear: string
  gpa?: number
  showGpa: boolean
  description?: string
  highlights?: string[]
}

export const education: Education[] = [
  {
    institution: 'Atatürk Üniversitesi',
    degree: 'Lisans',
    field: 'Bilgisayar Mühendisliği',
    startYear: '2020',
    endYear: '2025',
    gpa: 2.57,
    showGpa: true,
    description: 'Bilgisayar mühendisliği temel prensipleri, veri yapıları, algoritmalar, yazılım mühendisliği ve sistem tasarımı alanlarında eğitim aldım.',
    highlights: [
      'Yazılım Mühendisliği',
      'Veri Tabanı Sistemleri',
      'Nesne Yönelimli Programlama',
      'Algoritma Tasarımı',
      'Web Programlama',
    ],
  },
]
