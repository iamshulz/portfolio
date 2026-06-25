<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page?.sidelines?.title"
    :ui="{
      container: '!p-0 gap-4 sm:gap-4',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'mt-2'
    }"
  >
    <template #description>
      <div class="flex flex-col gap-2">
        <Motion
          v-for="(sideline, index) in page?.sidelines?.items"
          :key="index"
          :initial="{ opacity: 0, transform: 'translateY(20px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.4 + 0.2 * index }"
          :in-view-options="{ once: true }"
          class="text-muted flex flex-col text-left gap-x-2 gap-y-1"
        >
          <p class="text-sm shrink-0">
            {{ sideline.date }}
          </p>
          <ULink
            class="flex items-center flex-wrap gap-x-1 gap-y-0.5 min-w-0"
            :to="sideline.company.url"
            target="_blank"
          >
            <span class="text-sm">
              {{ sideline.position }}
            </span>
            <div
              class="inline-flex items-center gap-1 w-full sm:w-auto"
              :style="{ color: sideline.company.color }"
            >
              <span class="font-medium">{{ sideline.company.name }}</span>
              <UIcon :name="sideline.company.logo" />
            </div>
            <USeparator class="block shrink-0" />
          </ULink>
        </Motion>
      </div>
    </template>
  </UPageSection>
</template>

<style scoped>

</style>
