<template>
  <div id="notFound">
    <img src="/static/img/logo_mars_blanc.svg" class="center-block logo">

    <div class="text-center col-sm-12">
      <h1>404</h1>
      <h4>Cette page n'existe pas.</h4>
      <router-link to="/" class="vertical-5p lead"><i class="fa fa-home"></i> Retour à l'accueil.</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NotFound'
}
</script>

<style>
#notFound {
  padding: 10em;
  color: white;
}
</style>
