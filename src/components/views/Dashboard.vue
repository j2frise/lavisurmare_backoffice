<template>
  <!-- Main content -->
  <section class="content">
    <!-- GitHub hint -->
    <div class="row">
      <div class="col-xs-12">
        <alert :dismissible="true"
               type="success"
               :iconClasses="['fa', 'fa-check']"
               title="Bienvenue dans l'interface d'administration de la Vie Sur Mars!">
          <span>Cliquez sur ce lien pour accéder à l'interface utilisateur ===></span>
          <a href="https://laviesurmars.netlify.app/" target="_blank">
            https://laviesurmars.netlify.app/
          </a>
        </alert>
      </div>

      <!-- Info boxes -->
      <div class="col-md-6 col-sm-6 col-xs-12">
        <info-box color-class="bg-aqua"
                  :icon-classes="['ion', 'ion-ios-gear-outline']"
                  text="Chapitres"
                  :number="chapitre"></info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-6 col-sm-6 col-xs-12">
        <info-box color-class="bg-red"
                  :icon-classes="['fa', 'fa-google-plus']"
                  text="articles"
                  :number="article"></info-box>
      </div>
      <!-- /.col -->
      
    </div>
    <!-- /.row -->

  </section>
  <!-- /.content -->
</template>

<script>
import Alert from '../widgets/Alert'
import InfoBox from '../widgets/InfoBox'
import ProcessInfoBox from '../widgets/ProcessInfoBox'
import api from '../../api'

export default {
  name: 'Dashboard',
  components: {
    Alert,
    InfoBox,
    ProcessInfoBox
  },
  data () {
    return {
      list: 'subject',
      list2: 'article',
      article: 0,
      chapitre: 0
    }
  },
  methods: {
    getSubjects() {
      api
        .request('get', '/list/index.php?q=' + this.list)
        .then(response => {
          var data = response.data
          if (!data.error) {
            this.chapitre = data.return.length
          } else {
            console.log(data.error)
            return
          }
        })
        .catch(error => {
          console.log(error)
          console.log('Serveur inactif')
        })
    },
    getArticles() {
      api
        .request('get', '/list/index.php?q=' + this.list2)
        .then(response => {
          var data = response.data
          if (!data.error) {
            this.article = data.return.length
          } else {
            console.log(data.error)
            return
          }
        })
        .catch(error => {
          console.log(error)
          console.log('Serveur inactif')
        })
    }
  },
  mounted () {
    this.getArticles()
    this.getSubjects()
  }
}
</script>
<style>
.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
.fullCanvas {
  width: 100%;
}
</style>
