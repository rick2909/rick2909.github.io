<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <h1 :class="{ typewriter: useTypewriter }" ref="nameElement">{{ displayedName }}</h1>
          <p class="subtitle" :class="{ typewriter: useTypewriter }" ref="subtitleElement">{{ displayedSubtitle }}</p>
          <p class="description" :class="{ 'fade-in': useTypewriter }">
            {{ $t('common.header.description') }}
          </p>
          <div class="cta-buttons" :class="{ 'fade-in': useTypewriter }">
            <a href="#projects" @click="scrollTo('projects')" class="btn btn-primary">
              <i class="fas fa-code"></i>
              {{ $t('common.header.viewWork') }}
            </a>
            <a href="#contact" @click="scrollTo('contact')" class="btn btn-secondary">
              <i class="fas fa-envelope"></i>
              {{ $t('common.header.getInTouch') }}
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
        <div class="nav-content">
          <ul>
            <li v-for="item in navItems" :key="item.id">
              <a :href="`#${item.id}`" @click="scrollTo(item.id)" :class="{ active: activeSection === item.id }">
                <i :class="item.icon"></i>
                <span class="nav-text">{{ $t(item.labelKey) }}</span>
              </a>
            </li>
          </ul>

          <div class="language-switch" :aria-label="$t('common.language.label')">
            <button
              v-for="lang in availableLocales"
              :key="lang.code"
              type="button"
              class="language-option"
              :class="{ active: locale === lang.code }"
              @click="changeLocale(lang.code)"
            >
              {{ $t(lang.labelKey) }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- About Section -->
    <section id="about" class="section about">
      <div class="container">
        <h2>{{ $t('common.about.title') }}</h2>
        <div class="about-content">
          <p>{{ $t('common.about.paragraph1') }}</p>
          <p>{{ $t('common.about.paragraph2') }}</p>
          <p>{{ $t('common.about.paragraph3') }}</p>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section id="education" class="section projects-section">
      <div class="container">
        <h2>{{ $t('common.education.title') }}</h2>
        <div class="projects-grid">
          <EducationCard
            v-for="education in educationItems"
            :key="education.title"
            :education="education"
            :locale="locale"
            class="animate-on-scroll"
          />
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section projects-section">
      <div class="container">
        <h2>{{ $t('common.projects.title') }}</h2>

        <!-- C# Projects -->
        <h3 class="section-title">{{ $t('common.projects.csharpTitle') }}</h3>
        <div class="projects-grid">
          <ProjectCard
            v-for="project in csharpProjects"
            :key="project.title"
            :project="project"
            class="animate-on-scroll"
          />
        </div>

        <!-- Unity Projects -->
        <h3 class="section-title">{{ $t('common.projects.unityTitle') }}</h3>
        <div class="projects-grid">
          <ProjectCard
            v-for="project in unityProjects"
            :key="project.title"
            :project="project"
            class="animate-on-scroll"
          />
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section">
      <div class="container">
        <h2>{{ $t('common.skills.title') }}</h2>
        <div class="skills-grid">
          <div class="skill-category" v-for="category in skillCategories" :key="category.title">
            <h3><i :class="category.icon"></i> {{ category.title }}</h3>
            <ul>
              <li v-for="item in category.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

        <!-- Certifications -->
        <h3 class="section-title">{{ $t('common.certifications.title') }}</h3>
        <div class="projects-grid">
          <CertificationCard
            v-for="certification in certifications"
            :key="certification.title"
            :certification="certification"
            :locale="locale"
            class="animate-on-scroll"
          />
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <footer id="contact" class="footer">
      <div class="container">
        <h2 style="margin-bottom: 2rem;">{{ $t('common.contact.title') }}</h2>
          <div class="social-links">
            <a href="https://github.com/rick2909" target="_blank" title="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/rick-van-nieuwland/" target="_blank" title="LinkedIn">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="mailto:rick29998@gmail.com" title="Email">
              <i class="fas fa-envelope"></i>
            </a>
          </div>
        <p>{{ $t('common.contact.copyright', { year: currentYear, name: 'Rick van Nieuwland' }) }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import ProjectCard from './components/ProjectCard.vue'
import CertificationCard from './components/CertificationCard.vue'
import EducationCard from './components/EducationCard.vue'
import { usePortfolio } from './composables/usePortfolio.js'

export default {
  name: 'App',
  components: {
    ProjectCard,
    CertificationCard,
    EducationCard
  },
  setup() {
    const portfolio = usePortfolio()

    return {
      ...portfolio
    }
  }
}
</script>
