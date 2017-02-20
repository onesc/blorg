<template lang="html">
  <div class="teaser">
      {{teaser.title}}
        	{{teaser.datePublished}}
			{{teaser.content}}  </div>
</template>

<script>
export default {
    props: ['teaser']
}
</script>

<style lang="css">
</style>
