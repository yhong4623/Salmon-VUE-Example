<template>
    <div class="container">
      <h1>{{ message }}</h1>
      <button @click="sendMessage">Click Me</button>
      <p>Response: {{ response }}</p>
    </div>
  </template>
  
  <script setup>
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
    fetch(`https://${GetParentResourceName()}/callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: 'Hello from Vue!' }),
    })
      .then((res) => res.json())
      .then((data) => {
        response.value = data.message
      })
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