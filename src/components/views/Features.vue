<template>
  <div>
    <h1 class="text-center">  </h1>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-body">
                <!-- Success/Error heads up input -->
                <div class="col-md-12">
                  <transition name="fade">
                    <div v-if="!success">
                       <alert :dismissible="true"
                            :type="classAdd"
                            :iconClasses="['fa', 'fa-'+icon]"
                            :title="response">
                      </alert>
                    </div>
                  </transition>
                </div>
                <div class="col-xs-12 col-md-6">
                  <h4></h4>
                  <form @submit.prevent="editFeatures" method="POST" enctype="multipart/form-data">
                    <div class="form-group col-xs-12 col-md-6">
                      <label class="control-label">Diamètre </label>
                      <input class="form-control require" name="diametre" placeholder="" type="text" :value="myData.fea_iDiametre">
                    </div>
                    <div class="form-group col-xs-12 col-md-6">
                      <label class="control-label">Distance su soleil </label>
                      <input class="form-control require" name="soleil" placeholder="" type="text" :value="myData.fea_iDistanceSoleil">
                    </div>
                    <div class="form-group col-xs-12 col-md-6">
                      <label class="control-label">Rotation </label>
                      <input class="form-control require" name="rotation" placeholder="" type="text" :value="myData.fea_sRotation">
                    </div>
                    <div class="form-group col-xs-12 col-md-6">
                      <label class="control-label">Température </label>
                      <input class="form-control require" name="temp" placeholder="" type="text" :value="myData.fea_iTemperatue">
                    </div>
                    <div class="form-group col-xs-12 col-md-6">
                      <label class="control-label">Phobos et Deimos </label>
                      <input class="form-control require" name="phobos" placeholder="" type="text" :value="myData.fea_iPhobos">
                    </div>
                    <div class="form-group col-xs-12 col-md-6">
                      <label class="control-label">Distance par rapprt à la Terre </label>
                      <input class="form-control require" name="distance" placeholder="" type="text" :value="myData.fea_iDistance">
                    </div>
                    <div class="form-group col-md-12">
                      <label class="control-label">Vidéos</label>
                      <input class="form-control" accept="video/mp4, video/ogg, video/webm" name="video" placeholder="" type="file">
                      <input type="hidden" name="id" :value="myData.fea_id">
                      <input type="hidden" name="video_m" :value="myData.fea_sVideo">
                    </div>
                    <div class="form-group col-xs-12 col-md-12">
                      <button type="submit" v-bind:class="'btn btn-primary btn-sm form-control'">MODIFIER</button>
                    </div>
                  </form>
                </div>
                <div class="col-xs-12 col-md-6 content-img">
                    <video style="width: 100%" controls :src="myData.fea_sVideo" v-if='myData.fea_sVideo !== null'></video>
                    <p v-if='myData.fea_sVideo === null'>Il n'y a pas de vidéo</p>
                </div>

            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
require('moment')
import api from '../../api'
import Alert from '../widgets/Alert'

export default {
  name: 'EditSubject',
  components: {
    Alert
  },
  props: {
    id: String
  },
  data(router) {
    return {
      response: '',
      count: 0,
      alertDanger: 'danger',
      alertSuccess: 'success',
      classAdd: '',
      icon: '',
      myData: {},
      success: true,
      img: ''
    }
  },
  methods: {
    getFeatures() {
      api
        .request('get', '/get/index.php?features')
        .then(response => {
          var data = response.data
          if (!data.error) {
            this.myData = data.return
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
    editFeatures() {
      this.resetResponse(event)
      var target = event.target
      this.control(target)
      if (this.count !== 0) {
        this.response = 'Remplissez tous les champs'
        this.classAdd = this.alertDanger
        this.success = false
        this.icon = 'warning'
      } else {
        this.resetResponse()
        var formData = new FormData(target)
        api
          .request('post_file', '/editFeatures/index.php', formData)
          .then(response => {
            var data = response.data
            this.success = false
            if (!data.error) {
              this.myData = data.return
              target.querySelector('input[type=file').value = ''
              this.classAdd = this.alertSuccess
              this.success = false
              this.icon = 'check'
              this.response = 'Information modifiée avec succès'
            } else {
              this.errorMessage(data.error)
              return
            }
          })
          .catch(error => {
            console.log(error)
            this.errorMessage('Serveur inactif')
          })
      }
    },
    control(list) {
      var elementForm = list.querySelectorAll('.require')
      elementForm.forEach(element => {
        if (element.value.trim() === '') {
          element.parentNode.classList.add('has-error')
          this.count++
        } else {
          element.parentNode.classList.remove('has-error')
          // this.myData[element.name] = element.value.trim()
        }
      })
    },
    resetResponse() {
      this.count = 0
      this.classAdd = ''
      this.success = true
      this.icon = ''
    },
    errorMessage(message) {
      this.response = message
      this.classAdd = this.alertDanger
      this.icon = 'warning'
    },
    successMessage(message) {
      this.response = message
      this.classAdd = this.alertSuccess
      this.icon = 'check'
    }
  },
  mounted() {
    this.getFeatures()
  }
}
</script>

<style>
.content-img {
    text-align: center;
}

.content-img img {
    width: 80%;
}

.form-group.id {
  opacity: 0;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s, transform 1s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateX(25px);
}
</style>
