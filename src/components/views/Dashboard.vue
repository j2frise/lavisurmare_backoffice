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
      <div class="col-md-3 col-sm-6 col-xs-12">
        <info-box color-class="bg-aqua"
                  :icon-classes="['ion', 'ion-ios-gear-outline']"
                  text="Chapitres"
                  number="90%"></info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <info-box color-class="bg-red"
                  :icon-classes="['fa', 'fa-google-plus']"
                  text="articles"
                  number="41,410"></info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-6 col-sm-12 col-xs-12">
        <process-info-box color-class="bg-green"
                          :icon-classes="['ion', 'ion-ios-heart-outline']"
                          text="Visites"
                          number="92,050"
                          :progress="20"
                          description="Soit 35 visites pour aujourd'hui"></process-info-box>
      </div>

      <!-- fix for small devices only -->
      <div class="clearfix visible-sm-block"></div>
      
      <div class="col-md-6 col-sm-6 col-xs-12">
        <info-box color-class="bg-green"
                  :icon-classes="['ion', 'ion-ios-people-outline']"
                  text="utilisateurs actifs"
                  number="760"></info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-6 col-sm-6 col-xs-12">
        <info-box color-class="bg-yellow"
                  :icon-classes="['fa', 'fa-refresh']"
                  text="demandes d'accès"
                  number="2,000"></info-box>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

  </section>
  <!-- /.content -->
</template>

<script>
import Chart from 'chart.js'
import Alert from '../widgets/Alert'
import InfoBox from '../widgets/InfoBox'
import ProcessInfoBox from '../widgets/ProcessInfoBox'

export default {
  name: 'Dashboard',
  components: {
    Alert,
    InfoBox,
    ProcessInfoBox
  },
  data () {
    return {
      generateRandomNumbers (numbers, max, min) {
        var a = []
        for (var i = 0; i < numbers; i++) {
          a.push(Math.floor(Math.random() * (max - min + 1)) + max)
        }
        return a
      }
    }
  },
  computed: {
    coPilotNumbers () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    personalNumbers () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    isMobile () {
      return (window.innerWidth <= 800 && window.innerHeight <= 600)
    }
  },
  mounted () {
    this.$nextTick(() => {
      var ctx = document.getElementById('trafficBar').getContext('2d')
      var config = {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            label: 'CoPilot',
            fill: false,
            borderColor: '#284184',
            pointBackgroundColor: '#284184',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            data: this.coPilotNumbers
          }, {
            label: 'Personal Site',
            borderColor: '#4BC0C0',
            pointBackgroundColor: '#4BC0C0',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            data: this.personalNumbers
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: 'bottom',
            display: true
          },
          tooltips: {
            mode: 'label',
            xPadding: 10,
            yPadding: 10,
            bodySpacing: 10
          }
        }
      }

      new Chart(ctx, config) // eslint-disable-line no-new

      var pieChartCanvas = document.getElementById('languagePie').getContext('2d')
      var pieConfig = {
        type: 'pie',
        data: {
          labels: ['HTML', 'JavaScript', 'CSS'],
          datasets: [{
            data: [56.6, 37.7, 4.1],
            backgroundColor: ['#00a65a', '#f39c12', '#00c0ef'],
            hoverBackgroundColor: ['#00a65a', '#f39c12', '#00c0ef']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: 'bottom',
            display: true
          }
        }
      }

      new Chart(pieChartCanvas, pieConfig) // eslint-disable-line no-new
    })
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
