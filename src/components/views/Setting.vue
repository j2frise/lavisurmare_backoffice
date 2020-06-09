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
                            :type="classProfil"
                            :iconClasses="['fa', 'fa-'+icon]"
                            :title="response">
                      </alert>
                    </div>
                  </transition>
                </div>
                <div class="col-xs-12 col-md-6">
                  <h4>Information de profil</h4>
                  <form @submit.prevent="changeProfil">
                    <div class="form-group" :class="controlPseudo">
                      <label class="control-label" for="inputSuccess">Pseudo</label>
                      <input class="form-control" id="inputSuccess" placeholder="" type="text" v-model.trim="pseudo">
                    </div>
                    <div class="form-group" :class="controlEmail">
                      <label class="control-label">Mail</label>
                      <input class="form-control" placeholder="" type="text" v-model.trim="email">
                    </div>
                    <div class="form-group id">
                      <label class="control-label">ID</label>
                      <input class="form-control"  placeholder="" type="text" v-model="id">
                    </div>
                    <div class="form-group">
                      <button type="submit" v-bind:class="'btn btn-primary btn-sm form-control'">Sauvegarder</button>
                    </div>
                  </form>
                </div>

                 <div class="col-xs-12 col-md-6">
                  <h4>Information de compte</h4>
                  <form @submit.prevent="changePasse">
                    <div class="form-group" :class="controlApass">
                      <label class="control-label">Mot de passe</label>
                      <input class="form-control" v-model.trim="apass" type="password">
                    </div>
                    <div class="form-group" :class="controlNpass">
                      <label class="control-label">Nouveau mot de passe</label>
                      <input class="form-control"  v-model.trim="npass" type="password">
                    </div>
                    <div class="form-group" :class="controlCpass">
                      <label class="control-label">Confirmez le mot de passe</label>
                      <input class="form-control"  v-model.trim="cpass" type="password">
                    </div>
                    <div class="form-group">
                      <button type="submit" v-bind:class="'btn btn-primary btn-sm form-control'">Sauvegarder</button>
                    </div>
                  </form>
                </div>
                <!-- /input-group -->
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
  name: 'Settings',
  components: {
    Alert
  },
  props: ['user'],
  computed: {
    datetime () {
      return new Date()
    }
  },
  data(router) {
    return {
      pseudo: this.$store.state.user,
      email: this.$store.state.email,
      apass: '',
      npass: '',
      cpass: '',
      id: this.$store.state.token,
      response: '',
      countProfil: 0,
      countPass: 0,
      controlPseudo: '',
      controlEmail: '',
      controlApass: '',
      controlNpass: '',
      controlCpass: '',
      hasError: 'has-error',
      alertDanger: 'danger',
      alertSuccess: 'success',
      classProfil: '',
      icon: '',
      success: true
    }
  },
  methods: {
    clearInput(vueModel) {
      vueModel = ''
    },
    changePasse() {
      this.resetResponse()
      this.controlPass()
      if (this.countPass !== 0) {
        this.response = 'Remplissez tous les champs'
        this.classProfil = this.alertDanger
        this.success = false
        this.icon = 'warning'
      } else {
        if (this.npass !== this.cpass) {
          this.controlNpass = this.hasError
          this.controlCpass = this.hasError
          this.response = 'mots de pass non identiques'
          this.classProfil = this.alertDanger
          this.success = false
          this.icon = 'warning'
          this.countPass = 0
        } else {
          this.resetResponse()
          const {apass, npass, cpass, id} = this
          api
          .request('post', '/pass/index.php', {apass, npass, cpass, id})
          .then(response => {
            var data = response.data
            this.success = false
            if (!data.error) {
              var dataReturn = data.return
              if (dataReturn === 'notFound') {
                this.classProfil = this.alertDanger
                this.controlApass = this.hasError
                this.response = 'Mot de passe incorrect'
                this.icon = 'warning'
              } else {
                this.response = 'le mot de pass a été modifié avec succès'
                this.classProfil = this.alertSuccess
                this.icon = 'check'
                this.apass = ''
                this.npass = ''
                this.cpass = ''
              }
            } else {
              this.response = data.error
              this.classProfil = this.alertDanger
              this.icon = 'warning'
              return
            }
          })
          .catch(error => {
            console.log(error)
            this.response = 'Serveur inactif'
          })
        }
      }
    },
    changeProfil() {
      this.resetResponse()
      this.controlProfil()
      if (this.countProfil !== 0) {
        this.response = 'Remplissez tous les champs'
        this.classProfil = this.alertDanger
        this.success = false
        this.icon = 'warning'
      } else {
        this.resetResponse()
        const {pseudo, email, id} = this
        api
          .request('post', '/profil/index.php', {pseudo, email, id})
          .then(response => {
            var data = response.data
            this.success = false
            if (!data.error) {
              var dataReturn = data.return
              if (dataReturn === 'pseudo') {
                this.classProfil = this.alertDanger
                this.controlPseudo = this.hasError
                this.controlEmail = ''
                this.response = 'Ce pseudo est déjà utilisé'
                this.icon = 'warning'
              } else if (dataReturn === 'email') {
                this.classProfil = this.alertDanger
                this.controlPseudo = ''
                this.controlEmail = this.hasError
                this.response = 'Cet adresse mail est déjà utilisé'
                this.icon = 'warning'
              } else if (dataReturn === 'format') {
                this.classProfil = this.alertDanger
                this.controlPseudo = ''
                this.controlEmail = this.hasError
                this.response = 'Le format du mail est incorrect'
                this.icon = 'warning'
              } else if (dataReturn === 'all') {
                this.classProfil = this.alertDanger
                this.controlPseudo = this.hasError
                this.controlEmail = this.hasError
                this.response = 'L\'adresse mail et le pseudo sont déjà utilisés'
                this.icon = 'warning'
              } else {
                this.response = 'Vos modifications ont été sauvegardé avec succès'
                this.classProfil = this.alertSuccess
                this.icon = 'check'
                var token = dataReturn.adm_id

                this.$store.commit('SET_USER', dataReturn.adm_sPseudo)
                this.$store.commit('SET_EMAIL', dataReturn.adm_sEmail)
                this.$store.commit('SET_TOKEN', token)

                if (window.localStorage) {
                  window.localStorage.setItem('user', JSON.stringify(dataReturn.adm_sPseudo))
                  window.localStorage.setItem('email', JSON.stringify(dataReturn.adm_sEmail))
                  window.localStorage.setItem('token', token)
                }
              }
            } else {
              this.response = data.error
              this.classProfil = this.alertDanger
              this.icon = 'warning'
              return
            }
          })
          .catch(error => {
            console.log(error)
            this.response = 'Serveur inactif'
          })
      }
    },
    controlProfil() {
      if (this.pseudo && !this.email) {
        this.countProfil++
        this.controlPseudo = ''
        this.controlEmail = this.hasError
      } else if (!this.pseudo && this.email) {
        this.countProfil++
        this.controlPseudo = this.hasError
        this.controlEmail = ''
      } else {
        this.countProfil++
        this.controlPseudo = this.hasError
        this.controlEmail = this.hasError
      }
    },
    controlPass() {
      if (this.apass === '') {
        this.controlApass = this.hasError
        this.countPass++
      } else {
        this.controlApass = ''
      }

      if (this.npass === '') {
        this.controlNpass = this.hasError
        this.countPass++
      } else {
        this.controlNpass = ''
      }

      if (this.cpass === '') {
        this.controlCpass = this.hasError
        this.countPass++
      } else {
        this.controlCpass = ''
      }
    },
    resetResponse() {
      this.countProfil = 0
      this.countPass = 0
      this.classProfil = ''
      this.controlPseudo = ''
      this.controlEmail = ''
      this.controlApass = ''
      this.controlNpass = ''
      this.controlCpass = ''
      this.success = true
      this.icon = ''
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
