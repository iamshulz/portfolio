<script setup lang="ts">
import VueEasyLightbox from 'vue-easy-lightbox'

const route = useRoute()
const slug = route.params.slug as string

const { data: project } = await useAsyncData(`project-${slug}`, () => {
  return queryCollection('projects').where('slug', '=', slug).first()
})

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

useSeoMeta({
  title: project.value?.title,
  description: project.value?.description
})

const images = computed(() => {
  if (project.value?.gallery?.length) return project.value.gallery
  if (project.value?.image) return [project.value.image]
  return []
})

const lightboxVisible = ref(false)
const lightboxIndex = ref(0)

function openLightbox(index: number) {
  lightboxIndex.value = index
  lightboxVisible.value = true
}
</script>

<template>
  <UPage v-if="project">
    <UPageHero
      :title="project.title"
      :description="project.description"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <template #headline>
        <UButton
          to="/projects"
          color="neutral"
          variant="ghost"
          icon="i-lucide-arrow-left"
          label="Back to Projects"
          size="sm"
        />
      </template>
      <template #links>
        <div class="flex flex-wrap items-center gap-3">
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="tag in project.tags"
              :key="tag"
              color="neutral"
              variant="subtle"
            >
              {{ tag }}
            </UBadge>
          </div>
          <UButton
            v-if="project.url"
            :to="project.url"
            target="_blank"
            color="primary"
            label="Visit Live Site"
            icon="i-lucide-external-link"
            size="sm"
          />
        </div>
      </template>
    </UPageHero>

    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <div
        v-if="images.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <Motion
          v-for="(img, index) in images"
          :key="index"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.05 * index }"
          :in-view-options="{ once: true }"
        >
          <img
            :src="img"
            :alt="`${project.title} screenshot ${index + 1}`"
            class="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            @click="openLightbox(index)"
          >
        </Motion>
      </div>
      <div
        v-else
        class="flex flex-col items-center justify-center py-24 text-muted gap-3"
      >
        <UIcon name="i-lucide-image-off" class="size-12" />
        <p class="text-sm">No images available for this project.</p>
      </div>

      <VueEasyLightbox
        :visible="lightboxVisible"
        :imgs="images"
        :index="lightboxIndex"
        @hide="lightboxVisible = false"
      />
    </UPageSection>
  </UPage>
</template>
