<template>
  <div id="app" class="dark">
    <animated-background />
    <div class="min-h-screen bg-background backdrop-blur-sm">
      <!-- Navigation -->
      <nav v-if="isAuthenticated" class="bg-surface-80 backdrop-blur shadow-sm border-b border-primary-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0 flex items-center">
                <Activity class="h-8 w-8 text-primary" />
                <span class="ml-2 text-xl font-semibold text-text">
                  {{ $t('app.title') }} 
                </span>
              </div>
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  class="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200"
                  :class="isActiveRoute(item.href) 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-text-light hover:text-primary'"
                >
                  <component :is="item.icon" class="h-4 w-4 mr-2" />
                  {{ $t(item.name) }}
                </router-link>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <!-- Language Toggle -->
              <select
                v-model="currentLocale"
                @change="changeLanguage"
                class="text-sm border-primary-20 rounded-md bg-surface text-text"
              >
                <option value="en">EN</option>
                <option value="ru">RU</option>
              </select>
              
              <!-- User Menu -->
              <div class="relative">
                <button
                  @click="showUserMenu = !showUserMenu"
                  class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <User class="h-8 w-8 p-1 bg-primary-10 text-primary rounded-full" />
                </button>
                
                <div
                  v-if="showUserMenu"
                  v-click-outside="() => showUserMenu = false"
                  class="absolute right-0 mt-2 w-48 bg-surface-80 rounded-md shadow-lg py-1 z-50 border border-primary-20"
                >
                  <a href="#" class="block px-4 py-2 text-sm text-text-light hover:bg-primary-10 hover:text-primary">
                    {{ $t('user.profile') }}
                  </a>
                  <button
                    @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-text-light hover:bg-primary-10 hover:text-primary"
                  >
                    {{ $t('user.logout') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="flex-1">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { Activity, User, Home, Monitor, AlertTriangle, Settings } from 'lucide-vue-next'
import AnimatedBackground from '@/components/AnimatedBackground.vue'

// Composables
const store = useStore()
const { t, locale } = useI18n()
const router = useRouter()
const route = useRoute()

// Reactive state
const showUserMenu = ref(false)
const currentLocale = ref(locale.value)

// Computed properties
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

// Navigation items
const navigation = [
  { name: 'nav.dashboard', href: '/dashboard', icon: Home },
  { name: 'nav.devices', href: '/devices', icon: Monitor },
  { name: 'nav.alerts', href: '/alerts', icon: AlertTriangle },
  { name: 'nav.settings', href: '/settings', icon: Settings }
]

// Methods
const isActiveRoute = (href: string): boolean => {
  return route.path.startsWith(href)
}

const changeLanguage = (): void => {
  locale.value = currentLocale.value
  store.dispatch('ui/setLocale', currentLocale.value)
}

const logout = async (): Promise<void> => {
  await store.dispatch('auth/logout')
  router.push('/login')
  showUserMenu.value = false
}

// Click outside directive
const vClickOutside = {
  beforeMount(el: HTMLElement & { clickOutsideEvent?: (event: Event) => void }, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: HTMLElement & { clickOutsideEvent?: (event: Event) => void }) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
