<template lang="html">
    <div>
        <h1>{{title}}</h1>
        <p>Welcome to the {{title}} demo. Click a link:</p>
     
        <div v-for='teaser in content'> 
         	<teaser :teaser="teaser"></teaser>
        <div>

    </div>
</template>
s
<script>
export default {
    data: function() {
        return {
        }
    }
}
</script>

<style lang="css">
</style>
