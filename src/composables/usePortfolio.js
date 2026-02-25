import { ref, onMounted, onUnmounted } from 'vue'
import projectsData from '../data/projects.json'
import certificationsData from '../data/certifications.json'

export function usePortfolio() {
  // Data properties
  const csharpProjects = ref(projectsData.csharp)
  const unityProjects = ref(projectsData.unity)
  const certifications = ref(certificationsData)
  const isScrolled = ref(false)
  const activeSection = ref('about')
  const useTypewriter = ref(true)
  const displayedName = ref('')
  const displayedSubtitle = ref('')
  const fullName = 'Rick van Nieuwland'
  const fullSubtitle = 'C# & Unity Developer'
  const nameTypingComplete = ref(false)
  const subtitleTypingComplete = ref(false)
  const currentYear = new Date().getFullYear()
  let handleScrollFunction = null

  // Methods
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
    const sections = ['about', 'projects', 'skills', 'contact']
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
      typeText(fullName, displayedName, 50, () => {
        nameTypingComplete.value = true
        // Add class to nameElement ref in the component
        
        // Start typing subtitle after name is complete
        setTimeout(() => {
          typeText(fullSubtitle, displayedSubtitle, 40, () => {
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

  // Lifecycle hooks
  onMounted(() => {
    setupScrollEffects()
    if (useTypewriter.value) {
      startTypewriterAnimation()
    } else {
      displayedName.value = fullName
      displayedSubtitle.value = fullSubtitle
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
    isScrolled,
    activeSection,
    useTypewriter,
    displayedName,
    displayedSubtitle,
    nameTypingComplete,
    subtitleTypingComplete,
    currentYear,
    scrollTo
  }
}
