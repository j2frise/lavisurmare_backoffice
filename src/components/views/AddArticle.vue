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
                <div class="col-xs-12 col-md-10">
                  <h4>
                      <router-link tag="a" :to="'/in/article/'+sub">
                            <a>
                            <i class="fa fa-arrow-left"></i>
                            retour
                            </a>
                        </router-link> | 
                      Ajouter un article dans le chapitre "<span style="text-transform: uppercase" class="text-primary">{{ subject.sub_sTitre }}</span>"</h4>
                  <form @submit.prevent="addArticle" method="POST" enctype="multipart/form-data">
                    <div class="form-group col-xs-12 col-md-6">
                      <label class="control-label">Thème</label>
                      <select class="form-control require" name="theme" @change="choiceTheme">
                          <option value="">-------- Choisissez ----------</option>
                          <option v-for="(element, index) in theme" :key="index" :value="element.tya_id">{{ element.tya_sLib }}</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-md-6">
                      <label class="control-label">Titre</label>
                      <input class="form-control require" name="title" placeholder="" type="text">
                    </div>
                    <div class="form-group col-xs-12 col-md-6" v-if="img1">
                      <label class="control-label">Image principale</label>
                      <input class="form-control require img1" accept="image/*" name="img1" placeholder="" type="file">
                    </div>
                    <div class="form-group col-xs-12 col-md-6" v-if="img2">
                      <label class="control-label">Image sécondaire</label>
                      <input class="form-control require img2" accept="image/*" name="img2" placeholder="" type="file">
                    </div>
                    <div class="form-group col-xs-12 col-md-6" v-if="v1">
                      <label class="control-label">Vidéo principale</label>
                      <input class="form-control require v1" accept="video/mp4, video/ogg, video/webm" name="v1" placeholder="" type="file">
                    </div>
                    <div class="form-group col-xs-12 col-md-6" v-if="v2">
                      <label class="control-label">Vidéo optionnelle</label>
                      <input class="form-control v2" accept="video/mp4, video/ogg, video/webm" name="v2" placeholder="" type="file">
                    </div>
                    <div class="form-group col-xs-12 col-md-6" v-if="audio">
                      <label class="control-label">Audio Optionnel</label>
                      <input class="form-control audio" accept="audio/*" name="audio" placeholder="" type="file">
                    </div>
                    <div class="form-group col-xs-12 col-md-6" v-if="p1">
                      <label class="control-label">1er Paragraphe</label>
                      <textarea rows="4" class="form-control require" placeholder="" name="p1"></textarea>
                    </div>
                    <div class="form-group col-xs-12 col-md-6" v-if="p2">
                      <label class="control-label">2ème Paragraphe</label>
                      <textarea rows="4" class="form-control require" placeholder="" name="p2"></textarea>
                    </div>
                    <div class="form-group col-xs-12 col-md-6" v-if="p3">
                      <label class="control-label">3ème Paragraphe</label>
                      <textarea rows="4" class="form-control require" placeholder="" name="p3"></textarea>
                    </div>
                    <div class="form-group col-xs-12 col-md-6" v-if="p4">
                      <label class="control-label">4ème Paragraphe</label>
                      <textarea rows="4" class="form-control require" placeholder="" name="p4"></textarea>
                    </div>
                    <div class="form-group col-xs-12 col-md-12">
                      <button type="submit" v-bind:class="'btn btn-primary btn-sm form-control'">ENREGISTRER</button>
                    </div>
                  </form>
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
  name: 'AddArticle',
  components: {
    Alert
  },
  props: ['sub'],
  data(router) {
    return {
      response: '',
      count: 0,
      alertDanger: 'danger',
      alertSuccess: 'success',
      classAdd: '',
      icon: '',
      success: true,
      subject: {},
      theme: {},
      img1: false,
      img2: false,
      v1: false,
      v2: false,
      audio: false,
      p1: false,
      p2: false,
      p3: false,
      p4: false
    }
  },
  methods: {
    getSubject() {
      api
        .request('get', '/get/index.php?subject&id=' + this.sub)
        .then(response => {
          var data = response.data
          if (!data.error) {
            this.subject = data.return
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
    getTheme() {
      api
        .request('get', '/list/index.php?q=theme')
        .then(response => {
          var data = response.data
          if (!data.error) {
            this.theme = data.return
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
    addArticle() {
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
        formData.append('idSub', this.sub)
        api
          .request('post_file', '/addArticle/index.php', formData)
          .then(response => {
            var data = response.data
            this.success = false
            if (!data.error) {
              if (data.return === 'exist') {
                this.errorMessage('Un article existe déjà avec le même titre')
                target.querySelector('.require[name=title]').parentNode.classList.add('has-error')
              } else {
                this.successMessage('L\'article a été enregistré avec succès')
                target.querySelector('.require[name=title]').parentNode.classList.remove('has-error')
                target.reset()
              }
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
    },
    choiceTheme (e) {
      var opt = parseInt(e.target.value)
      this.p1 = opt >= 1 ? opt : false
      this.p2 = opt === 1 || opt === 18 || opt === 10 || opt === 23 ? opt : false
      this.p3 = opt === 1 ? opt : false
      this.p4 = opt === 1 ? opt : false
      this.img1 = opt === 1 || opt === 21 || opt === 16 || opt === 17 || opt === 13 || opt === 14 || opt === 11 || opt === 9 || opt === 6 || opt === 7 || opt === 4 || opt === 5 || opt === 3 ? opt : false
      this.img2 = opt === 1 || opt === 17 || opt === 7 ? opt : false
      this.v1 = opt === 13 || opt === 8 ? opt : false
      this.v2 = opt >= 1 ? opt : false
      this.audio = opt >= 1 ? opt : false
    }
  },
  mounted() {
    this.getSubject()
    this.getTheme()
  }
}
</script>

<style>
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
