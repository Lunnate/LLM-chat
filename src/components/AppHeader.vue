<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useDropdown } from '@/composables/useDropdown'
import { useUserData } from '@/composables/useUserData'

const router = useRouter()

const {
  isOpen: isDropdownOpen,
  toggle: toggleDropdown,
  close: closeDropdown,
  containerRef: avatarRef,
  contentRef: dropdownRef,
} = useDropdown()

const { user, isAuthenticated, logout } = useUserData()

function handleProfileClick() {
  closeDropdown()
  router.push('/profile')
}
function handleSettingClick() {
  closeDropdown()
  router.push('/settings')
}
function handleLogoutClick() {
  closeDropdown()
  logout()
}
</script>

<template>
  <div class="navigation">
    <nav class="navbar">
      <ul >
        <li>
          <router-link class="logo" to="/"><h1>Название</h1></router-link>
        </li>
      </ul>
      <ul class="menu">
        <template v-if="!isAuthenticated">
          <li>
            <router-link to="/sign-in" class="list-item">Вход</router-link>
          </li>
          <li>
            <router-link to="/sign-up" class="list-item">Регистрация</router-link>
          </li>
        </template>
        <li v-if="isAuthenticated" class="user-menu">
          <div class="avatar-container" @click="toggleDropdown" tabindex="0" ref="avatarRef">
            <img
              :src="user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || user?.email || 'User')}`"
              :alt="`Аватар пользователя ${user?.username || ''}`"
              class="avatar"
            />
            <span class="dropdown-array" :class="{ active: isDropdownOpen }"></span>
          </div>
          <div class="dropdown-menu" :class="{ show: isDropdownOpen }" ref="dropdownRef">
            <a href="/" @click.prevent="handleProfileClick" class="dropdown-item">Профиль</a>
            <a href="/" @click.prevent="handleSettingClick" class="dropdown-item">Настройки</a>
            <a href="/" @click.prevent="handleLogoutClick" class="dropdown-item logout">Выйти</a>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped></style>
