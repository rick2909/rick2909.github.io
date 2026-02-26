import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { i18n, setLocale, SUPPORTED_LOCALES } from '../i18n'
import projectsEn from '../data/en/projects.json'
import projectsNl from '../data/nl/projects.json'
import certificationsEn from '../data/en/certifications.json'
import certificationsNl from '../data/nl/certifications.json'
import educationEn from '../data/en/education.json'
import educationNl from '../data/nl/education.json'

export function usePortfolio() {
  const projectsByLocale = {
    en: projectsEn,
    nl: projectsNl
  }

  const certificationsByLocale = {
    en: certificationsEn,
    nl: certificationsNl
  }

  const educationByLocale = {
    en: educationEn,
    nl: educationNl
  }

  const skillCategoriesByLocale = {
    en: [
      {
        icon: 'fas fa-code',
        title: 'C# & .NET',
        items: [
          'C# Programming',
          '.NET Framework',
          '.NET Core',
          '.NET MVC',
          'Entity Framework',
          'LINQ',
          'Azure Functions',
          'Clean Architecture'
        ]
      },
      {
        icon: 'fas fa-gamepad',
        title: 'Unity Development',
        items: [
          'Unity Engine',
          'C# Scripting',
          '2D/3D Game Development',
          'Physics & Animation',
          'UI/UX Design',
          'Performance Optimization',
          'Virtual Reality'
        ]
      },
      {
        icon: 'fas fa-tools',
        title: 'Tools & Technologies',
        items: [
          'Visual Studio (Code)',
          'JetBrains Rider',
          'Git & GitHub & GitLab & Azure DevOps',
          'SQL Server',
          'REST APIs',
          'Azure',
          'Azure Service Bus',
          'Docker',
          'GitHub Copilot & Windsurf'
        ]
      }
    ],
    nl: [
      {
        icon: 'fas fa-code',
        title: 'C# & .NET',
        items: [
          'C# Programmeren',
          '.NET Framework',
          '.NET Core',
          '.NET MVC',
          'Entity Framework',
          'LINQ',
          'Azure Functions',
          'Clean Architecture'
        ]
      },
      {
        icon: 'fas fa-gamepad',
        title: 'Unity Ontwikkeling',
        items: [
          'Unity Engine',
          'C# Scripting',
          '2D/3D Game Ontwikkeling',
          'Fysica & Animatie',
          'UI/UX Ontwerp',
          'Prestatie-optimalisatie',
          'Virtual Reality'
        ]
      },
      {
        icon: 'fas fa-tools',
        title: 'Tools & Technologieën',
        items: [
          'Visual Studio (Code)',
          'JetBrains Rider',
          'Git & GitHub & GitLab & Azure DevOps',
          'SQL Server',
          'REST APIs',
          'Azure',
          'Azure Service Bus',
          'Docker',
          'GitHub Copilot & Windsurf'
        ]
      }
    ]
  }

  const locale = computed(() => i18n.global.locale.value)
  const availableLocales = SUPPORTED_LOCALES.map((code) => ({
    code,
    labelKey: code === 'nl' ? 'common.language.dutch' : 'common.language.english'
  }))

  // Data properties
  const csharpProjects = ref([])
  const unityProjects = ref([])
  const certifications = ref([])
  const educationItems = ref([])
  const isScrolled = ref(false)
  const activeSection = ref('about')
  const useTypewriter = ref(true)
  const displayedName = ref('')
  const displayedSubtitle = ref('')
  const fullName = computed(() => i18n.global.t('common.header.fullName'))
  const fullSubtitle = computed(() => i18n.global.t('common.header.subtitle'))
  const nameTypingComplete = ref(false)
  const subtitleTypingComplete = ref(false)
  const currentYear = new Date().getFullYear()
  let handleScrollFunction = null

  const navItems = [
    { id: 'about', icon: 'fas fa-user', labelKey: 'common.nav.about' },
    { id: 'education', icon: 'fas fa-graduation-cap', labelKey: 'common.nav.education' },
    { id: 'projects', icon: 'fas fa-code', labelKey: 'common.nav.projects' },
    { id: 'skills', icon: 'fas fa-cogs', labelKey: 'common.nav.skills' },
    { id: 'contact', icon: 'fas fa-envelope', labelKey: 'common.nav.contact' }
  ]

  const skillCategories = computed(() => skillCategoriesByLocale[locale.value] ?? skillCategoriesByLocale.en)

  const updateLocalizedContent = (selectedLocale) => {
    const localeProjects = projectsByLocale[selectedLocale] ?? projectsByLocale.en
    const localeEducation = educationByLocale[selectedLocale] ?? educationByLocale.en
    const localeCertifications = certificationsByLocale[selectedLocale] ?? certificationsByLocale.en

    csharpProjects.value = localeProjects.csharp ?? projectsByLocale.en.csharp
    unityProjects.value = localeProjects.unity ?? projectsByLocale.en.unity
    certifications.value = localeCertifications
    educationItems.value = localeEducation
  }

  const updateDocumentTitle = () => {
    document.title = i18n.global.t('common.meta.title')
  }

  // Methods
  const changeLocale = (selectedLocale) => {
    setLocale(selectedLocale)
  }

  const scrollTo = (elementId) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const setupScrollEffects = () => {
    handleScrollFunction = () => {
      const scrollY = window.scrollY
      isScrolled.value = scrollY > 100
      updateActiveSection()
    }
    window.addEventListener('scroll', handleScrollFunction)
  }

  const updateActiveSection = () => {
    const sections = ['about', 'education', 'projects', 'skills', 'contact']
    const scrollPosition = window.scrollY + 200

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const offsetTop = element.offsetTop
        const offsetBottom = offsetTop + element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          activeSection.value = section
          break
        }
      }
    }
  }

  const setupIntersectionObserver = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a small delay for better visual effect
            setTimeout(() => {
              entry.target.classList.add('animated')
              // Clear inline styles to let CSS take over
              entry.target.style.opacity = ''
              entry.target.style.transform = ''
            }, 100)
            // Stop observing once animated to prevent re-triggering
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    // Observe all elements with animate-on-scroll class
    // Immediately find and reset all animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll')
    animatedElements.forEach((el) => {
      // Force remove animated class and ensure hidden state
      el.classList.remove('animated')
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      observer.observe(el)
    })
  }

  const startTypewriterAnimation = () => {
    // Start typing the name after a short delay
    setTimeout(() => {
      typeText(fullName.value, displayedName, 50, () => {
        nameTypingComplete.value = true
        // Add class to nameElement ref in the component
        
        // Start typing subtitle after name is complete
        setTimeout(() => {
          typeText(fullSubtitle.value, displayedSubtitle, 40, () => {
            subtitleTypingComplete.value = true
            // Add class to subtitleElement ref in the component
          })
        }, 200)
      })
    }, 250)
  }

  const typeText = (text, targetRef, speed, callback) => {
    let index = 0
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        targetRef.value = text.substring(0, index + 1)
        index++
      } else {
        clearInterval(typeInterval)
        if (callback) callback()
      }
    }, speed)
  }

  updateLocalizedContent(locale.value)
  updateDocumentTitle()

  watch(locale, (selectedLocale) => {
    updateLocalizedContent(selectedLocale)
    updateDocumentTitle()

    displayedName.value = fullName.value
    displayedSubtitle.value = fullSubtitle.value
    nameTypingComplete.value = true
    subtitleTypingComplete.value = true
  })

  // Lifecycle hooks
  onMounted(() => {
    setupScrollEffects()
    if (useTypewriter.value) {
      startTypewriterAnimation()
    } else {
      displayedName.value = fullName.value
      displayedSubtitle.value = fullSubtitle.value
      nameTypingComplete.value = true
      subtitleTypingComplete.value = true
    }
    
    // Setup intersection observer after a delay to ensure DOM is ready
    setTimeout(() => {
      setupIntersectionObserver()
    }, 1000)
  })

  onUnmounted(() => {
    if (handleScrollFunction) {
      window.removeEventListener('scroll', handleScrollFunction)
    }
  })

  return {
    csharpProjects,
    unityProjects,
    certifications,
    educationItems,
    isScrolled,
    activeSection,
    useTypewriter,
    displayedName,
    displayedSubtitle,
    nameTypingComplete,
    subtitleTypingComplete,
    currentYear,
    locale,
    availableLocales,
    navItems,
    skillCategories,
    changeLocale,
    scrollTo
  }
}
