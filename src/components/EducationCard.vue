<template>
  <div class="project-card education-card">
    <div class="project-header">
      <h3>{{ education.title }}</h3>
      <div class="project-type">
        <i class="fas fa-graduation-cap"></i>
      </div>
    </div>

    <div class="education-meta">
      <p class="education-institution">{{ education.institution }}</p>
      <p v-if="education.location" class="education-location">
        <a :href="education.mapsUrl || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(education.location))" target="_blank" rel="noopener">
          <i class="fas fa-map-marker-alt"></i>
          <span>{{ education.location }}</span>
        </a>
      </p>
    </div>

    <p class="project-description">{{ education.description }}</p>

    <div class="tech-stack">
      <span
        v-for="skill in education.skills"
        :key="skill"
        class="tech-tag"
        :style="{ animationDelay: (education.skills.indexOf(skill) * 0.1) + 's' }"
      >
        {{ skill }}
      </span>
    </div>

    <div class="education-dates">
      <div class="date-item">
        <i class="fas fa-calendar-alt"></i>
        <span>Started: {{ formatDate(education.startDate) }}</span>
      </div>
      <div v-if="hasEndDate" class="date-item">
        <i class="fas fa-hourglass-end"></i>
        <span>Graduated: {{ formatDate(education.endDate) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EducationCard',
  props: {
    education: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasEndDate() {
      return Boolean(this.education.endDate)
    }
  },
  methods: {
    formatDate(value) {
      if (!value) {
        return 'N/A'
      }

      const date = new Date(value)
      if (Number.isNaN(date.getTime())) {
        return value
      }

      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/mixins.scss' as *;

.education-card {
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: $spacing-sm;

    h3 {
      flex: 1;
      margin: 0;
    }

    .project-type {
      margin-left: $spacing-md;

      i {
        font-size: $font-size-2xl;
        color: $accent-color;
        opacity: 0.75;
        transition: all $transition-normal;
      }
    }
  }

  .education-institution {
    font-weight: $font-weight-medium;
    color: $accent-color;
    margin-bottom: $spacing-xs;
  }

  .education-meta {
    display: block;
    margin-bottom: $spacing-sm;

    .education-location {
      margin-top: $spacing-xs;

      a {
        color: $secondary-text;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: $spacing-sm;

        &:hover {
          color: $accent-color;
          text-decoration: underline;
        }

        i {
          color: $accent-color;
        }
      }
    }
  }

  .project-description {
    margin-bottom: $spacing-lg;
  }

  .tech-stack {
    margin-bottom: $spacing-lg;
  }

  .education-dates {
    display: flex;
    gap: $spacing-lg;
    flex-wrap: wrap;

    .date-item {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      color: $secondary-text;
      font-size: $font-size-sm;

      i {
        color: $accent-color;
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
