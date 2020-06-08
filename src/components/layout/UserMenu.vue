<template>
  <li class="dropdown user user-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <!-- The user image in the navbar-->
      <img src="/static/img/user.png" class="user-image" alt="User Image">
      <!-- hidden-xs hides the username on small devices so only the image appears. -->
      <span class="hidden-xs">{{user.displayName}}</span>
    </a>
    <!-- Account Info and Menu -->
    <ul class="dropdown-menu">
      <li class="user-header" style="height:auto;min-height:85px;padding-bottom:15px;">
        <p>
          <span>{{user.displayName}}</span>
          <small>{{user.role}}</small>
          <small>{{user.email}}</small>
        </p>
      </li>
      <li class="user-footer">
        <a href="javascript:;" class="btn btn-default btn-flat btn-block" @click="logout">
          <i class="fa fa-sign-out"></i>
          <span>Déconnexion</span>
        </a>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'UserMenu',
  props: ['user'],
  methods: {
    logout: function () {
      this.$store.commit('SET_USER', null)
      this.$store.commit('SET_EMAIL', null)
      this.$store.commit('SET_TOKEN', null)

      if (window.localStorage) {
        window.localStorage.setItem('user', null)
        window.localStorage.setItem('email', null)
        window.localStorage.setItem('token', null)
      }

      this.$router.push('/')
    }
  }
}
</script>
