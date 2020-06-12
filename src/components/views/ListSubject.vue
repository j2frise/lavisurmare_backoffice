<template>
  <section class="content">

    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">Liste des chapitres</h3>
              <router-link tag="a" :to="$route.path+'/add'">
                <a class="pull-right btn btn-primary">
                  <i class="fa fa-plus"></i>
                  <span class="page">Ajouter un chapitre</span>
                </a>
              </router-link>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length">

                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" style="width: 167px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Titre</th>
                        <th aria-label="Browser: activate to sort column ascending" style="width: 207px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Miniature</th>
                        <th aria-label="Platform(s): activate to sort column ascending" style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Nombre d'articles</th>
                        <th aria-label="Engine version: activate to sort column ascending" style="width: 142px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Statut</th>
                        <th aria-label="CSS grade: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(element, index) in myData" :key="index" class="even" role="row">
                        <td class="sorting_1">{{ element.sub_sTitre }}</td>
                        <td><img class="mini" :src="element.sub_sImage" alt=""></td>
                        <td>{{ getArticles(element.sub_id) }} {{ nbArticle }}</td>
                        <td><span class="label" v-bind:class="parseInt(element.sub_iSta) !== 0 ? 'label-success':'label-danger'">{{ parseInt(element.sub_iSta) !== 0 ? 'actif':'désactivé' }}</span></td>
                        <td>
                            <a href="#" @click="deleteRow(element.sub_id)" class="btn btn-danger">
                              <i class="fa fa-trash"></i>
                            </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery'
import api from '../../api'

export default {
  name: 'ListSubject',
  data(router) {
    return {
      list: 'subject',
      list2: 'article',
      dt: '',
      myData: [],
      nbArticle: 0
    }
  },
  methods: {
    getSubjects() {
      api
        .request('get', '/list/index.php?q=' + this.list)
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
    getArticles(sub) {
      api
        .request('get', '/list/index.php?q=' + this.list2 + '&j=' + sub)
        .then(response => {
          var data = response.data
          if (!data.error) {
            this.nbArticle = (data.return).length
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
    deleteRow(id) {
      api
        .request('get', '/delete/index.php?subject=' + id)
        .then(response => {
          var data = response.data
          if (!data.error) {
            this.getSubjects()
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
  mounted() {
    this.getSubjects()
    this.dt = $('#example1').DataTable()
  },
  watch: {
    myData(val) {
      this.dt.destroy()
      this.$nextTick(() => {
        $('#example1').DataTable()
      })
    }
  }
}
</script>

<style>
  .mini{
    width: 70px;
    height: 40px;
  }
</style>
