<script setup>
const phone = ref('')
const message = ref('')
const copied = ref(false)

const generatedUrl = computed(() => {
  const digits = phone.value.replace(/\D/g, '')
  if (!digits) return ''
  const encoded = encodeURIComponent(message.value)
  return `https://wa.me/${digits}${encoded ? `?text=${encoded}` : ''}`
})

async function copyUrl() {
  if (!generatedUrl.value) return
  await navigator.clipboard.writeText(generatedUrl.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-md p-8">
      <h1 class="text-2xl font-semibold text-gray-800 mb-1">Gerador de link WhatsApp</h1>
      <p class="text-sm text-gray-500 mb-6">Para usar como link no Instagram</p>

      <div class="flex flex-col gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Número com DDD e código do país</label>
          <input
            v-model="phone"
            type="tel"
            placeholder="5511999999999"
            class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p class="text-xs text-gray-400 mt-1">Só números. Ex: 55 + DDD + número</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mensagem pré-definida <span class="text-gray-400 font-normal">(opcional)</span></label>
          <textarea
            v-model="message"
            rows="3"
            placeholder="Olá! Vim pelo Instagram..."
            class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          />
        </div>

        <div v-if="generatedUrl" class="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p class="text-xs text-gray-500 mb-1 font-medium">Link gerado</p>
          <p class="text-sm text-gray-700 break-all">{{ generatedUrl }}</p>
        </div>

        <button
          :disabled="!generatedUrl"
          @click="copyUrl"
          class="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg py-2.5 text-sm transition-colors"
        >
          {{ copied ? 'Copiado!' : 'Copiar link' }}
        </button>
      </div>
    </div>
  </div>
</template>
