<template>
  <div class="project-card">
    <div class="project-header">
      <h3>{{ project.title }}</h3>
      <div class="project-type">
        <i :class="getProjectIcon(project.technologies)"></i>
      </div>
    </div>

    <p class="project-description">{{ project.description }}</p>

    <div class="tech-stack">
      <span
        v-for="tech in project.technologies"
        :key="tech"
        class="tech-tag"
        :style="{ animationDelay: (project.technologies.indexOf(tech) * 0.1) + 's' }"
      >
        {{ tech }}
      </span>
    </div>

    <div class="project-links">
      <a
        v-if="project.github"
        :href="project.github"
        target="_blank"
        class="btn btn-primary"
        @mouseenter="playHoverSound"
      >
        <i class="fab fa-github"></i>
        <span>{{ $t('common.projectCard.viewCode') }}</span>
      </a>
      <a
        v-if="project.demo"
        :href="project.demo"
        target="_blank"
        class="btn btn-ghost"
        @mouseenter="playHoverSound"
      >
        <i class="fas fa-external-link-alt"></i>
        <span>{{ $t('common.projectCard.liveDemo') }}</span>
      </a>
      <a
        v-if="project.download"
        :href="project.download"
        target="_blank"
        class="btn btn-ghost"
        @mouseenter="playHoverSound"
      >
        <i class="fas fa-download"></i>
        <span>{{ $t('common.projectCard.download') }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  methods: {
    getProjectIcon(technologies) {
      if (technologies.includes('Unity')) {
        return 'fas fa-gamepad'
      } else if (technologies.includes('C#') || technologies.includes('.NET')) {
        return 'fas fa-code'
      } else if (technologies.includes('Mobile')) {
        return 'fas fa-mobile-alt'
      }
      return 'fas fa-laptop-code'
    },

    playHoverSound() {
      // Optional: Add subtle hover sound effect
      // This could be implemented with Web Audio API if desired
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/mixins.scss' as *;

.project-card {
  position: relative;
  overflow: hidden;

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: $spacing-md;

    h3 {
      flex: 1;
      margin: 0;
    }

    .project-type {
      margin-left: $spacing-md;

      i {
        font-size: $font-size-xl;
        color: $accent-color;
        opacity: 0.7;
        transition: all $transition-normal;
      }
    }
  }

  .project-description {
    margin-bottom: $spacing-lg;
  }

  .tech-stack {
    margin-bottom: $spacing-lg;

    .tech-tag {
      @include scale-in(0.3s);

      &:hover {
        transform: translateY(-2px) scale(1.05);
      }
    }
  }

  .project-links {
    display: flex;
    gap: $spacing-md;
    flex-wrap: wrap;

    .btn {
      flex: 1;
      min-width: 120px;
      justify-content: center;

      span {
        transition: transform $transition-fast;
      }

      &:hover {
        span {
          transform: translateX(2px);
        }
      }
    }
  }

  &:hover {
    .project-type i {
      opacity: 1;
      transform: scale(1.1);
    }
  }
}
</style>
