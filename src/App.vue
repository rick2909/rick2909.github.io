<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <h1 :class="{ typewriter: useTypewriter }" ref="nameElement">{{ displayedName }}</h1>
          <p class="subtitle" :class="{ typewriter: useTypewriter }" ref="subtitleElement">{{ displayedSubtitle }}</p>
          <p class="description" :class="{ 'fade-in': useTypewriter }">
            Crafting robust applications and immersive gaming experiences with passion for clean code and innovative solutions.
          </p>
          <div class="cta-buttons" :class="{ 'fade-in': useTypewriter }">
            <a href="#projects" @click="scrollTo('projects')" class="btn btn-primary">
              <i class="fas fa-code"></i>
              View My Work
            </a>
            <a href="#contact" @click="scrollTo('contact')" class="btn btn-secondary">
              <i class="fas fa-envelope"></i>
              Get In Touch
            </a>
          </div>
        </div>
      </div>
      <div class="scroll-indicator" @click="scrollTo('about')">
        <i class="fas fa-chevron-down"></i>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="nav" :class="{ scrolled: isScrolled }">
      <div class="container">
        <ul>
          <li><a href="#about" @click="scrollTo('about')" :class="{ active: activeSection === 'about' }">
            <i class="fas fa-user"></i>
            <span class="nav-text">About</span>
          </a></li>
          <li><a href="#projects" @click="scrollTo('projects')" :class="{ active: activeSection === 'projects' }">
            <i class="fas fa-code"></i>
            <span class="nav-text">Projects</span>
          </a></li>
          <li><a href="#skills" @click="scrollTo('skills')" :class="{ active: activeSection === 'skills' }">
            <i class="fas fa-cogs"></i>
            <span class="nav-text">Skills</span>
          </a></li>
          <li><a href="#contact" @click="scrollTo('contact')" :class="{ active: activeSection === 'contact' }">
            <i class="fas fa-envelope"></i>
            <span class="nav-text">Contact</span>
          </a></li>
        </ul>
      </div>
    </nav>

    <!-- About Section -->
    <section id="about" class="section about">
      <div class="container">
        <h2>About Me</h2>
        <div class="about-content">
          <p>
            I'm an enthusiastic C# developer with a keen eye for detail and a passion for building smart, scalable solutions. 
            Programming feels like solving a well-crafted puzzle to me. 
            I dive into problems, discover patterns, and build something elegant and functional step by step.
          </p>
          <p>
            With my analytical mindset, creative approach, and team spirit, I bring value to every development team. 
            I build robust web applications with .NET and create engaging experiences in Unity, always focusing on 
            clean, readable code and clear documentation.
          </p>
          <p>
            Beyond coding, I'm a lifelong learner who stays current through courses and conferences. When I'm not developing, 
            you'll find me gaming, watching movies in the cinema, or exploring new technologies. I'm also passionate about aviation and skiing, 
            bringing that same curiosity and energy to every project I work on.
          </p>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section projects-section">
      <div class="container">
        <h2>My Projects</h2>

        <!-- C# Projects -->
        <h3 class="section-title">C# & .NET Projects</h3>
        <div class="projects-grid">
          <ProjectCard
            v-for="project in csharpProjects"
            :key="project.id"
            :project="project"
            class="animate-on-scroll"
          />
        </div>

        <!-- Unity Projects -->
        <h3 class="section-title">Unity Projects</h3>
        <div class="projects-grid">
          <ProjectCard
            v-for="project in unityProjects"
            :key="project.id"
            :project="project"
            class="animate-on-scroll"
          />
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section">
      <div class="container">
        <h2>Skills & Technologies</h2>
        <div class="skills-grid">
          <div class="skill-category">
            <h3><i class="fas fa-code"></i> C# & .NET</h3>
            <ul>
              <li>C# Programming</li>
              <li>.NET Framework</li>
              <li>.NET Core</li>
              <li>.NET MVC</li>
              <li>Entity Framework</li>
              <li>LINQ</li>
            </ul>
          </div>
          <div class="skill-category">
            <h3><i class="fas fa-gamepad"></i> Unity Development</h3>
            <ul>
              <li>Unity Engine</li>
              <li>C# Scripting</li>
              <li>2D/3D Game Development</li>
              <li>Physics & Animation</li>
              <li>UI/UX Design</li>
              <li>Performance Optimization</li>
            </ul>
          </div>
          <div class="skill-category">
            <h3><i class="fas fa-tools"></i> Tools & Technologies</h3>
            <ul>
              <li>Visual Studio</li>
              <li>Git & GitHub</li>
              <li>SQL Server</li>
              <li>REST APIs</li>
              <li>Azure</li>
              <li>Docker</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <footer id="contact" class="footer">
      <div class="container">
        <h2 style="margin-bottom: 2rem;">Get In Touch</h2>
        <div class="social-links">
          <a href="https://github.com/rick2909" target="_blank" title="GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/rick2909" target="_blank" title="LinkedIn">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="mailto:your.email@example.com" title="Email">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
        <p>&copy; 2024 Rick2909. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import ProjectCard from './components/ProjectCard.vue'
import projectsData from './data/projects.json'

export default {
  name: 'App',
  components: {
    ProjectCard
  },
  data() {
    return {
      csharpProjects: projectsData.csharp,
      unityProjects: projectsData.unity,
      isScrolled: false,
      activeSection: 'about',
      useTypewriter: true,
      displayedName: '',
      displayedSubtitle: '',
      fullName: 'Rick van Nieuwland',
      fullSubtitle: 'C# & Unity Developer',
      nameTypingComplete: false,
      subtitleTypingComplete: false
    }
  },
  mounted() {
    this.setupScrollEffects()
    this.setupIntersectionObserver()
    if (this.useTypewriter) {
      this.startTypewriterAnimation()
    } else {
      this.displayedName = this.fullName
      this.displayedSubtitle = this.fullSubtitle
    }
  },
  methods: {
    scrollTo(elementId) {
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },

    setupScrollEffects() {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 100
        this.updateActiveSection()
      })
    },

    updateActiveSection() {
      const sections = ['about', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            this.activeSection = section
            break
          }
        }
      }
    },

    setupIntersectionObserver() {
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
    },

    startTypewriterAnimation() {
      // Start typing the name after a short delay
      setTimeout(() => {
        this.typeText(this.fullName, 'displayedName', 50, () => {
          this.nameTypingComplete = true
          if (this.$refs.nameElement) {
            this.$refs.nameElement.classList.add('typing-complete')
          }

          // Start typing subtitle after name is complete
          setTimeout(() => {
            this.typeText(this.fullSubtitle, 'displayedSubtitle', 40, () => {
              this.subtitleTypingComplete = true
              if (this.$refs.subtitleElement) {
                this.$refs.subtitleElement.classList.add('typing-complete')
              }
            })
          }, 200)
        })
      }, 250)
    },

    typeText(text, targetProperty, speed, callback) {
      let index = 0
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          this[targetProperty] = text.substring(0, index + 1)
          index++
        } else {
          clearInterval(typeInterval)
          if (callback) callback()
        }
      }, speed)
    }
  },

  mounted() {
    this.startTypewriterAnimation()
    // Setup intersection observer after a delay to ensure DOM is ready
    setTimeout(() => {
      this.setupIntersectionObserver()
    }, 1000)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.setupScrollEffects)
  }
}
</script>
