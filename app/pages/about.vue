<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => {
  return queryCollection('about').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { global } = useAppConfig()

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
      :ui="{
        container: 'lg:flex sm:flex-row items-center',
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <UColorModeAvatar
        class="sm:rotate-4 size-36 rounded-lg ring ring-default ring-offset-3 ring-offset-(--ui-bg)"
        :light="global.picture?.light!"
        :dark="global.picture?.dark!"
        :alt="global.picture?.alt!"
        :width="288"
        :height="288"
      />
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <MDC
        :value="page.bio"
        unwrap="p"
      />
    </UPageSection>

    <UPageSection
      v-if="page.skills?.length"
      title="Tech Stack"
      :ui="{
        container: '!pt-0'
      }"
    >
      <div class="flex flex-col gap-6">
        <div
          v-for="group in page.skills"
          :key="group.category"
          class="flex flex-col gap-2"
        >
          <span class="text-sm font-medium text-muted">{{ group.category }}</span>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="item in group.items"
              :key="item"
              color="neutral"
              variant="subtle"
              size="md"
            >
              {{ item }}
            </UBadge>
          </div>
        </div>
      </div>
    </UPageSection>
  </UPage>
</template>
