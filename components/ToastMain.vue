<script setup lang="ts">

</script>
<template>
  <Teleport to="#toast-container">
    <TransitionGroup>
      <!-- loop over store -->
      <div id="toast-success"
        class="fixed left-1/2 bottom-0 -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert">
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <div class="i-mdi-check" />
          <span class="sr-only">Check icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">Item moved successfully.</div>
        <button type="button"
          class="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-9000 p-1.5 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800"
          data-dismiss-target="#toast-success" aria-label="Close">
          <div class="i-mdi-close" />
        </button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>