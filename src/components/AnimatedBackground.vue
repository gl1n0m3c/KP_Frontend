<template>
  <div class="animated-background">
    <div
      v-for="n in 6"
      :key="n"
      class="sphere"
      :style="{
        '--delay': `${n * 2}s`,
        '--size': `${Math.random() * 200 + 100}px`,
        '--left': `${Math.random() * 100}%`,
        '--top': `${Math.random() * 100}%`,
      }"
    ></div>
  </div>
</template>

<style>
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.sphere {
  position: absolute;
  width: var(--size);
  height: var(--size);
  left: var(--left);
  top: var(--top);
  background: radial-gradient(
    circle at 30% 30%,
    var(--color-secondary-light) 0%,
    var(--color-primary-light) 30%,
    transparent 70%
  );
  opacity: 0.1;
  border-radius: 50%;
  filter: blur(40px);
  animation: pulse var(--delay) ease-in-out infinite alternate,
    float 20s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0.15;
  }
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(10px, 10px);
  }
  50% {
    transform: translate(-5px, 15px);
  }
  75% {
    transform: translate(-15px, -5px);
  }
  100% {
    transform: translate(0, 0);
  }
}

/* Добавляем узор на фон */
.animated-background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2348BB78' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
  z-index: -1;
}

:global(.dark) .animated-background::before {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2368D391' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
