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
                  <form @submit.prevent="editSubject" method="POST" enctype="multipart/form-data">
                    <div class="form-group">
                      <label class="control-label">Titre</label>
                      <input class="form-control require" name="title" placeholder="" type="text" :value="myData.sub_sTitre">
                    </div>
                    <div class="form-group">
                      <label class="control-label">Miniature</label>
                      <input class="form-control" name="image" placeholder="" type="file">
                      <input type="hidden" name="id" :value="myData.sub_id">
                    </div>
                    <div class="form-group">
                      <label class="control-label">Description</label>
                      <textarea rows="6" class="form-control require" placeholder="" name="desc" :value="myData.sub_sDescriptif"></textarea>
                    </div>
                    <div class="form-group">
                      <button type="submit" v-bind:class="'btn btn-primary btn-sm form-control'">ENREGISTRER</button>
                    </div>
                  </form>
                </div>
                <div class="col-xs-12 col-md-6 content-img">
                    <img :src="img" alt="myData.sub_sTitre">
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
    getSubjects() {
      api
        .request('get', '/get/index.php?subject&id=' + this.id)
        .then(response => {
          var data = response.data
          if (!data.error) {
            this.myData = data.return
            this.img = this.myData.sub_sImage
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
    editSubject() {
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
        formData.append('image', target.querySelector('input[type=file]').files[0])
        formData.append('title', target.querySelector('.require[name=title]').value)
        formData.append('desc', target.querySelector('.require[name=desc]').value)
        formData.append('id', target.querySelector('input[name=id]').value)
        api
          .request('post_file', '/editSubject/index.php', formData)
          .then(response => {
            var data = response.data
            this.success = false
            if (!data.error) {
              if (data.return === 'Les formats de l\'image autorisés sont .svg, .jpg, .jpeg, .png') {
                this.errorMessage(data.return)
                target.querySelector('input[type=file]').parentNode.classList.add('has-error')
                target.querySelector('.require[name=title]').parentNode.classList.remove('has-error')
              } else if (data.return === 'exist') {
                this.errorMessage('Un chapitre existe déjà avec le même titre')
                target.querySelector('input[type=file]').parentNode.classList.remove('has-error')
                target.querySelector('.require[name=title]').parentNode.classList.add('has-error')
              } else if (data.return === 'size_1M') {
                this.errorMessage('La taille de l\'image ne doit pas dépasser 1M')
                target.querySelector('input[type=file]').parentNode.classList.add('has-error')
                target.querySelector('.require[name=title]').parentNode.classList.remove('has-error')
              } else {
                this.successMessage('Le chapitre a été modifié avec succès')
                target.querySelector('input[type=file]').parentNode.classList.remove('has-error')
                target.querySelector('.require[name=title]').parentNode.classList.remove('has-error')
                target.querySelector('input[type=file]').value = ''
                if (data.return !== 'success') {
                  this.img = data.return
                }
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
  },
  mounted() {
    this.getSubjects()
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
