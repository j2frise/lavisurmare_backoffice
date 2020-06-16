<template>
    <div>
        <router-view :sub="id"></router-view>
    </div>
</template>

<script>

export default {
  name: 'Content',
  props: {
    id: String
  }
}
</script>

<style>

</style>
