import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'

export interface Lesson {
  slug: string
  title: string
  content: string
  module: string
}

export interface Module {
  slug: string
  title: string
  description: string
  lessons: Lesson[]
}

// Mock data for now - replace with actual file reading later
export const modules: Module[] = [
  {
    slug: 'modul-1',
    title: 'Uvod u Rečenice Strasti',
    description: 'Osnovni koncepti i snaga riječi',
    lessons: [
      {
        slug: 'lekcija-1',
        title: '1.1 Uvod u Rečenice Strasti',
        content: `# 1.1 Uvod u Rečenice Strasti

Dobrodošli u prvu lekciju programa Rečenice Strasti!

## Što ćete naučiti

U ovoj lekciji ćete upoznati se s osnovnim konceptima programa i kako rečenice mogu transformirati vaše iskustvo strasti.

## Ključne rečenice

- "Strast je putovanje, ne destinacija"
- "Svaka rečenica je most između dva svijeta"
- "Riječi su čarobni ključevi koji otključavaju nova iskustva"

## Praktični zadatak

Zamislite situaciju u kojoj se osjećate povezano s partnerom. Koja bi rečenica najbolje opisala to iskustvo?`,
        module: 'modul-1'
      },
      {
        slug: 'lekcija-2',
        title: '1.2 Snaga Riječi u Intimnosti',
        content: `# 1.2 Snaga Riječi u Intimnosti

Riječi imaju nevjerojatnu moć u stvaranju intimne atmosfere.

## Kako riječi utječu na mozak

Kada partner čuje određene riječi, njegov mozak aktivira različite regije povezane s:
- Sigurnošću
- Uzbudom
- Povezanošću
- Strasti

## Vježba slušanja

Poslušajte kako različite riječi utječu na vaše osjećaje:
- "Želim te" vs "Trebaš mi"
- "Volim te" vs "Potreban si mi"

## Domaći zadatak

Slušajte kako vaš partner koristi riječi u različitim situacijama. Što primjećujete?`,
        module: 'modul-1'
      }
    ]
  },
  {
    slug: 'modul-2',
    title: 'Komunikacija u Strasti',
    description: 'Kako otvoreno komunicirati o željama i granicama',
    lessons: [
      {
        slug: 'lekcija-1',
        title: '2.1 Osnovni Principi Komunikacije',
        content: `# 2.1 Osnovni Principi Komunikacije

Komunikacija je temelj svake zdrave veze, posebno kada je riječ o intimnosti.

## Zlatna pravila komunikacije

1. **Budi jasan i direktan** - izbjegavaj nejasnoće
2. **Slušaj aktivno** - pokaži da razumiješ
3. **Poštuj granice** - svoje i partnerove
4. **Budi strpljiv** - promjene trebaju vrijeme

## Vježba

Zamislite da trebate reći partneru nešto važno o svojim željama. Kako biste to napravili?`,
        module: 'modul-2'
      }
    ]
  },
  {
    slug: 'modul-3',
    title: 'Stvaranje Atmosfere',
    description: 'Kako kreirati pravu atmosferu za intimnost',
    lessons: [
      {
        slug: 'lekcija-1',
        title: '3.1 Kada koristiti koju rečenicu',
        content: `# 3.1 Kada koristiti koju rečenicu

Timing je sve kada je riječ o stvaranju atmosfere.

## Različite situacije zahtijevaju različite pristupe

- **Uvodna faza**: Meka, podsjećajuća rečenica
- **Graduiranje**: Sve intenzivnije i direktnije
- **Vrhunac**: Najintenzivnije i najiskrenije

## Vježba

Pogledajte kako različite rečenice funkcioniraju u različitim fazama večeri.`,
        module: 'modul-3'
      }
    ]
  },
  {
    slug: 'modul-4',
    title: 'Napredne Tehnike',
    description: 'Sofisticirane metode za duboke povezanosti',
    lessons: [
      {
        slug: 'lekcija-1',
        title: '4.1 Psihologija Strasti',
        content: `# 4.1 Psihologija Strasti

Razumijevanje psihologije iza strasti pomaže u kreiranju dubljih povezanosti.

## Ključni psihološki principi

- **Anticipation** - očekivanje može biti jače od samog iskustva
- **Novelty** - nova iskustva aktiviraju dopaminske centre
- **Connection** - osjećaj povezanosti pojačava sve ostalo

## Praktična primjena

Kako možete koristiti ove principe u svojoj vezi?`,
        module: 'modul-4'
      }
    ]
  }
]

export function getModule(slug: string): Module | undefined {
  return modules.find(m => m.slug === slug)
}

export function getLesson(moduleSlug: string, lessonSlug: string): Lesson | undefined {
  const module = getModule(moduleSlug)
  return module?.lessons.find(l => l.slug === lessonSlug)
}

export function getAllModules(): Module[] {
  return modules
}
