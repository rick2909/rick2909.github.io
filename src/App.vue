<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <h1>Rick van Nieuwland</h1>
          <p class="subtitle">C# & Unity Developer</p>
          <p class="description">
            Crafting robust applications and immersive gaming experiences with passion for clean code and innovative solutions.
          </p>
          <div class="cta-buttons">
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
        <div class="scroll-indicator" @click="scrollTo('about')">
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="nav" :class="{ scrolled: isScrolled }">
      <div class="container">
        <ul>
          <li><a href="#about" @click="scrollTo('about')" :class="{ active: activeSection === 'about' }">About</a></li>
          <li><a href="#projects" @click="scrollTo('projects')" :class="{ active: activeSection === 'projects' }">Projects</a></li>
          <li><a href="#skills" @click="scrollTo('skills')" :class="{ active: activeSection === 'skills' }">Skills</a></li>
          <li><a href="#contact" @click="scrollTo('contact')" :class="{ active: activeSection === 'contact' }">Contact</a></li>
        </ul>
      </div>
    </nav>

    <!-- About Section -->
    <section id="about" class="section about">
      <div class="container">
        <h2>About Me</h2>
        <div class="about-content">
          <p>
            I'm a passionate C# developer with expertise in .NET frameworks and Unity game development. 
            I love creating robust applications and immersive gaming experiences that solve real-world problems.
          </p>
          <p>
            With a strong foundation in object-oriented programming and software architecture, 
            I continuously explore new technologies and best practices to deliver high-quality solutions.
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
              <li>ASP.NET MVC</li>
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
      activeSection: 'about'
    }
  },
  mounted() {
    this.setupScrollEffects()
    this.setupIntersectionObserver()
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
              entry.target.classList.add('animated')
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      )
      
      // Observe all elements with animate-on-scroll class
      this.$nextTick(() => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll')
        animatedElements.forEach((el) => observer.observe(el))
      })
    }
  },
  
  beforeUnmount() {
    window.removeEventListener('scroll', this.setupScrollEffects)
  }
}
</script>
