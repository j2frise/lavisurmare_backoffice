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
                  <h4>Information de profil</h4>
                  <form @submit.prevent="addSubject" method="POST" enctype="multipart/form-data">
                    <div class="form-group">
                      <label class="control-label">Titre</label>
                      <input class="form-control require" name="title" placeholder="" type="text">
                    </div>
                    <div class="form-group">
                      <label class="control-label">Miniature</label>
                      <input class="form-control require" name="image" placeholder="" type="file">
                    </div>
                    <div class="form-group">
                      <label class="control-label">Description</label>
                      <textarea rows="4" class="form-control require" placeholder="" name="desc"></textarea>
                    </div>
                    <div class="form-group">
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
  name: 'AddSubject',
  components: {
    Alert
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
      success: true
    }
  },
  methods: {
    addSubject() {
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
        var formData = new FormData()
        formData.append('image', target.querySelector('.require[type=file]').files[0])
        formData.append('title', target.querySelector('.require[name=title]').value)
        formData.append('desc', target.querySelector('.require[name=desc]').value)
        api
          .request('post_file', '/addSubject/index.php', formData)
          .then(response => {
            var data = response.data
            this.success = false
            if (!data.error) {
              if (data.return === 'success') {
                this.successMessage('Le chapitre a été enregistré avec succès')
                target.querySelector('.require[type=file]').parentNode.classList.remove('has-error')
                target.querySelector('.require[name=title]').parentNode.classList.remove('has-error')
                target.reset()
              } else if (data.return === 'exist') {
                this.errorMessage('Un chapitre existe déjà avec le même titre')
                target.querySelector('.require[type=file]').parentNode.classList.remove('has-error')
                target.querySelector('.require[name=title]').parentNode.classList.add('has-error')
              } else if (data.return === 'size_1M') {
                this.errorMessage('La taille de l\'image ne doit pas dépasser 1M')
                target.querySelector('.require[type=file]').parentNode.classList.add('has-error')
                target.querySelector('.require[name=title]').parentNode.classList.remove('has-error')
              } else {
                this.errorMessage('Les formats de l\'image autorisés sont .svg, .jpg, .jpeg, .png')
                target.querySelector('.require[type=file]').parentNode.classList.add('has-error')
                target.querySelector('.require[name=title]').parentNode.classList.remove('has-error')
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
