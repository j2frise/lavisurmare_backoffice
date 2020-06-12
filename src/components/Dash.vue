<template>
  <div :class="['wrapper', classes]">

    <!-- Horizontal bar at top. Contains messages, notifications, tasks and user menu -->
    <dash-header :user="user"></dash-header>
    
    <!-- Left side column. contains the logo and sidebar -->
    <sidebar :user="user" />
  
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          {{$route.name.toUpperCase() }}
          <small>{{ $route.meta.description }}</small>
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="javascript:;">
              <i class="fa fa-home"></i>Accueil</a>
          </li>
          <li class="active">{{$route.name.toUpperCase()}}</li>
        </ol>
      </section>

      <router-view :user="user"></router-view>
    </div>
    <!-- /.content-wrapper -->
  
    <!-- Horizontal bar at bottom. Contains copy right -->
    <dash-footer></dash-footer>
  </div>
</template>

<script>
// import faker from 'faker'
// import $ from 'jquery'
// Require needed datatables modules
require('datatables.net')
require('datatables.net-bs')
import config from '../config'
import DashFooter from './layout/DashFooter'
import DashHeader from './layout/DashHeader'
import Sidebar from './layout/Sidebar'
import 'hideseek'

export default {
  name: 'Dash',
  components: {
    DashFooter,
    DashHeader,
    Sidebar
  },
  data: function () {
    return {
      // section: 'Dash',
      classes: {
        fixed_layout: config.fixedLayout,
        hide_logo: config.hideLogoOnMobile
      }
    }
  },
  computed: {
    user () {
      return {
        displayName: this.$store.state.user,
        email: this.$store.state.email,
        id: this.$store.state.token,
        roles: 'Administrateur principal'
      }
    }
  },
  methods: {
    connected: function() {
      if (this.$store.state.user === null || this.$store.state.user === undefined) {
        this.$router.push('/')
      } else {
        return true
      }
    }
  },
  beforeMount() {
    this.connected()
  }
}
</script>

<style>
/* Using the bootstrap style, but overriding the font to not draw in
   the Glyphicons Halflings font as an additional requirement for sorting icons.

   An alternative to the solution active below is to use the jquery style
   which uses images, but the color on the images does not match adminlte.

@import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
*/

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: '\f0dc';
}

table.dataTable thead .sorting_asc:after {
  content: '\f0dd';
}

table.dataTable thead .sorting_desc:after {
  content: '\f0de';
}

.wrapper.fixed_layout .main-header {
  position: fixed;
  width: 100%;
}
.wrapper.fixed_layout .content-wrapper {
  padding-top: 50px;
}
.wrapper.fixed_layout .main-sidebar {
  position: fixed;
  height: 100vh;
}

@media (max-width: 767px) {
  .wrapper.hide_logo .main-header .logo {
    display: none;
  }
}

.logo-mini,
.logo-lg {
  text-align: left;
}
.logo-mini img,
.logo-lg img {
  padding: 0.4em !important;
}

.logo-lg img {
  display: -webkit-inline-box;
  width: 25%;
}

.user-panel {
  height: 4em;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}
</style>
