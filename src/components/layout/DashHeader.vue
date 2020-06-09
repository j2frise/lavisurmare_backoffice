<template>
  <header class="main-header">
    <span class="logo-mini">
      <a href="/in"><img src="/static/img/logo_mars_blanc.svg" alt="Logo" class="img-responsive center-block logo"></a>
    </span>
    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <user-menu :user="user"></user-menu>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import UserMenu from './UserMenu'

export default {
  name: 'DashHeader',
  components: {
    UserMenu
  },
  props: ['user'],
  computed: {
    ...mapState([
      'userInfo'
    ])
  }
}
</script>
