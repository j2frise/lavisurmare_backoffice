<template>
  <div id="login">
    <img src="/static/img/logo.png" class="center-block logo" />

    <div class="text-center col-sm-12">
      <!-- login form -->
      <form @submit.prevent="checkCreds">
        <transition name="fade">
          <div v-if="!sucess" class="input-group alert alert-danger">{{ error }}</div>
        </transition>
        <div class="input-group" :class="controlUserName">
          <span class="input-group-addon">
            <i class="fa fa-envelope"></i>
          </span>
          <input
            class="form-control"
            name="username"
            placeholder="Identifiant"
            type="text"
            v-model.trim="username"
          />
        </div>

        <div class="input-group" :class="controlPassword">
          <span class="input-group-addon">
            <i class="fa fa-lock"></i>
          </span>
          <input
            class="form-control"
            name="password"
            placeholder="Mot de passe"
            type="password"
            v-model.trim="password"
          />
        </div>
        <button type="submit" v-bind:class="'btn btn-primary form-control' + loading">Se connecter</button>
      </form>

      <!-- errors -->
      <div v-if="response" class="text-red">
        <p class="vertical-5p lead">{{response}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import api from '../api'

export default {
  name: 'Login',
  data(router) {
    return {
      section: 'Login',
      loading: '',
      username: '',
      password: '',
      response: '',
      count: 0,
      controlPassword: true,
      controlUserName: true,
      sucess: true,
      error: '',
      hasError: 'has-error'
    }
  },
  methods: {
    checkCreds() {
      this.control()
      if (this.count !== 0) {
        this.error = '* Remplissez tous les champs'
      } else {
        this.error = ''
      }
      console.log(this.controlUserName, this.controlPassword, this.sucess)
     /* this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')
      api
        .request('post', '/login', { username, password })
        .then(response => {
          this.toggleLoading()
          var data = response.data
          if (data.error) {
            var errorName = data.error.name
            if (errorName) {
              this.response =
                errorName === 'InvalidCredentialsError'
                  ? 'Username/Password incorrect. Please try again.'
                  : errorName
            } else {
              this.response = data.error
            }

            return
          }

          if (data.user) {
            var token = 'Bearer ' + data.token

            this.$store.commit('SET_USER', data.user)
            this.$store.commit('SET_TOKEN', token)

            if (window.localStorage) {
              window.localStorage.setItem('user', JSON.stringify(data.user))
              window.localStorage.setItem('token', token)
            }

            this.$router.push(data.redirect ? data.redirect : '/')
          }
        })
        .catch(error => {
          this.$store.commit('TOGGLE_LOADING')
          console.log(error)

          this.response = 'Server appears to be offline'
          this.toggleLoading()
        }) */
    },
    control() {
      if (this.username && this.password) {
        this.count = 0
        this.sucess = true
        this.controlUserName = ''
        this.controlPassword = ''
      } else if (this.username && !this.password) {
        this.count++
        this.controlUserName = ''
        this.controlPassword = this.hasError
        this.sucess = false
      } else if (!this.username && this.password) {
        this.count++
        this.controlUserName = this.hasError
        this.controlPassword = ''
        this.sucess = false
      } else {
        this.count++
        this.controlUserName = this.hasError
        this.controlPassword = this.hasError
        this.sucess = false
      }
    },
    toggleLoading() {
      this.loading = this.loading === '' ? 'loading' : ''
    },
    resetResponse() {
      this.response = ''
    }
  }
}
</script>

<style>
#login {
  padding: 3em;
}

html,
body,
.container-table {
  height: 100%;
  background-color: #282b30 !important;
}
.container-table {
  display: table;
  color: white;
}
.vertical-center-row {
  display: table-cell;
  vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.vertical-5p {
  padding-top: 5%;
}
.logo {
  width: 15em;
  padding: 3em;
}

.input-group {
  padding-bottom: 2em;
  height: 4em;
  width: 100%;
}

.input-group span.input-group-addon {
  width: 2em;
  height: 4em;
}

@media (max-width: 1241px) {
  .input-group input,
  button.form-control {
    height: 4em;
  }
}
@media (min-width: 1242px) {
  form {
    padding-left: 20em;
    padding-right: 20em;
  }

  .input-group input,
  button.form-control {
    height: 5em;
  }
}

.input-group-addon i {
  height: 15px;
  width: 15px;
}

button.btn {
  text-transform: uppercase;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s, transform 1s;
}

.face-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateX(25px);
}
</style>
