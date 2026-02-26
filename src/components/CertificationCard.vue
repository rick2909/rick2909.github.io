<template>
  <div class="project-card certification-card">
    <div class="project-header">
      <h3>{{ certification.title }}</h3>
      <div class="project-type">
        <img
          v-if="certification.iconUrl"
          :src="certification.iconUrl"
          :alt="`${certification.title} badge`"
          class="certification-icon"
        >
        <i v-else class="fas fa-certificate"></i>
      </div>
    </div>

    <p class="certification-issuer">{{ certification.issuer }}</p>
    <p class="project-description">{{ certification.description }}</p>

    <div class="tech-stack">
      <span
        v-for="skill in certification.skills"
        :key="skill"
        class="tech-tag"
        :style="{ animationDelay: (certification.skills.indexOf(skill) * 0.1) + 's' }"
      >
        {{ skill }}
      </span>
    </div>

    <div class="certification-dates">
      <div class="date-item">
        <i class="fas fa-calendar-check"></i>
        <span>{{ $t('common.certificationCard.received') }}: {{ formatDate(certification.receivedDate) }}</span>
      </div>
      <div v-if="hasEndDate" class="date-item">
        <i class="fas fa-hourglass-end"></i>
        <span>{{ $t('common.certificationCard.expires') }}: {{ formatDate(certification.endDate) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CertificationCard',
  props: {
    certification: {
      type: Object,
      required: true
    },
    locale: {
      type: String,
      default: 'en'
    }
  },
  computed: {
    hasEndDate() {
      return Boolean(this.certification.endDate)
    }
  },
  methods: {
    formatDate(value) {
      if (!value) {
        return this.$t('common.shared.na')
      }

      const date = new Date(value)
      if (Number.isNaN(date.getTime())) {
        return value
      }

      return date.toLocaleDateString(this.locale, {
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

.certification-card {
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: $spacing-sm;
    position: relative;

    h3 {
      flex: 1;
      margin: 0;
      padding-right: 5em;
    }

    .project-type {
      position: absolute;
      top: 0;
      right: 0;

      .certification-icon {
        width: 4em;
        height: 4em;
        object-fit: contain;
        opacity: 0.9;
        transition: all $transition-normal;
      }

      i {
        font-size: 4em;
        color: $accent-color;
        opacity: 0.75;
        transition: all $transition-normal;
      }
    }
  }

  .certification-issuer {
    font-weight: $font-weight-medium;
    color: $accent-color;
    margin-bottom: $spacing-md;
  }

  .project-description {
    margin-bottom: $spacing-lg;
  }

  .tech-stack {
    margin-bottom: $spacing-lg;
  }

  .certification-dates {
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
    .project-type i,
    .project-type .certification-icon {
      opacity: 1;
      transform: scale(1.1);
    }
  }
}
</style>
