import { createI18n } from 'vue-i18n'
import enCommon from '../locales/en/common.json'
import nlCommon from '../locales/nl/common.json'

export const DEFAULT_LOCALE = 'en'
export const SUPPORTED_LOCALES = ['en', 'nl']
const LOCALE_STORAGE_KEY = 'portfolio-locale'
const LOCALE_QUERY_KEY = 'lang'

const normalizeLocale = (candidate) => {
  if (!candidate || typeof candidate !== 'string') {
    return null
  }

  const locale = candidate.toLowerCase().split('-')[0]
  return SUPPORTED_LOCALES.includes(locale) ? locale : null
}

const getLocaleFromQuery = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const searchParams = new URLSearchParams(window.location.search)
  return normalizeLocale(searchParams.get(LOCALE_QUERY_KEY))
}

const getLocaleFromStorage = () => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return normalizeLocale(window.localStorage.getItem(LOCALE_STORAGE_KEY))
  } catch {
    return null
  }
}

const getBrowserLocale = () => {
  if (typeof navigator === 'undefined') {
    return null
  }

  const locales = Array.isArray(navigator.languages)
    ? navigator.languages
    : [navigator.language]

  for (const candidate of locales) {
    const locale = normalizeLocale(candidate)
    if (locale) {
      return locale
    }
  }

  return null
}

const resolveInitialLocale = () => {
  return getLocaleFromQuery() || getLocaleFromStorage() || getBrowserLocale() || DEFAULT_LOCALE
}

const updateDocumentLang = (locale) => {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = locale
}

const updateQueryLocale = (locale) => {
  if (typeof window === 'undefined') {
    return
  }

  const url = new URL(window.location.href)
  url.searchParams.set(LOCALE_QUERY_KEY, locale)
  window.history.replaceState({}, '', url)
}

const messages = {
  en: {
    common: enCommon
  },
  nl: {
    common: nlCommon
  }
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: resolveInitialLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages
})

export const setLocale = (nextLocale, options = {}) => {
  const { persist = true, updateQuery = true } = options
  const locale = normalizeLocale(nextLocale) || DEFAULT_LOCALE

  i18n.global.locale.value = locale
  updateDocumentLang(locale)

  if (persist && typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    } catch {
      // Ignore storage failures and continue with in-memory locale only.
    }
  }

  if (updateQuery) {
    updateQueryLocale(locale)
  }

  return locale
}

let localeSyncInitialized = false

export const initLocaleSync = () => {
  if (localeSyncInitialized) {
    return
  }

  localeSyncInitialized = true
  setLocale(i18n.global.locale.value)

  if (typeof window !== 'undefined') {
    window.addEventListener('popstate', () => {
      const queryLocale = getLocaleFromQuery()
      if (queryLocale) {
        setLocale(queryLocale, { updateQuery: false })
      }
    })
  }
}
