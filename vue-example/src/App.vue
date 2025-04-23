<template>
    <div class="container">
      <h1>{{ message }}</h1>
      <button @click="sendMessage">Click Me</button>
      <p>Response: {{ response }}</p>
    </div>
  </template>
  
  <script setup>
  import { nuiProxy } from '@/api/NuiProxy'
  import { ref } from 'vue'
  
  const message = ref('Hello FiveM with Vite!')
  const response = ref('')
  
  // 監聽遊戲發送的NUI消息
  window.addEventListener('message', (event) => {
    if (event.data.type === 'response') {
      response.value = event.data.data
    }
  })
  
  // 發送消息到遊戲
  const sendMessage = () => {
    nuiProxy.emit(`${GetParentResourceName()}/callback`, { data: 'Hello from Vue!' })
  }
  </script>
  
  <style scoped>
  .container {
    color: white;
    text-align: center;
    padding: 20px;
    background: rgba(0, 0, 0, 0.7);
  }
  button {
    padding: 10px;
    font-size: 16px;
  }
  </style>