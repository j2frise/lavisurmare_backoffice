<template>
  <ul class="sidebar-menu">
    <li class="header">résumé</li>
    <router-link tag="li" class="pageLink" to="/in">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">Tableaud de bord</span>
      </a>
    </router-link>
    <li class="header">Mon espace</li>
    <router-link tag="li" class="pageLink" to="/in/setting">
      <a>
        <i class="fa fa-cog"></i>
        <span class="page">Réglages</span>
      </a>
    </router-link>
    <li class="header">Administrer</li>
    <router-link tag="li" class="pageLink" to="/tasks">
      <a>
        <i class="fa fa-folder-o"></i>
        <span class="page">Gestion de contenu</span>
      </a>
    </router-link>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-cog"></i>
        <span class="treeview-title">Configuration</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="#">
            <i class="fa fa-file-word-o"></i> Item 1
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-picture-o"></i> Item 2
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-pdf-o"></i> Item 3
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'SidebarMenu'
}
</script>
<style>
/* override default */
.sidebar-menu > li > a {
  padding: 12px 15px 12px 15px;
}

.sidebar-menu .header {
  text-transform: uppercase;
}

.sidebar-menu li.active > a > .fa-angle-left,
.sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
  animation-name: rotate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

.treeview-title {
  z-index: 1;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-90deg);
  }
}
</style>
