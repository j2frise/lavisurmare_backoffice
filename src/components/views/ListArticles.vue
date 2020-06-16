<template>
  <section class="content">

    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">chapitre: <span style="text-transform: uppercase" class="text-primary">{{ subject.sub_sTitre }}</span></h3>
              <router-link tag="a" :to="$route.path+'/add/'+sub">
                <a class="pull-right btn btn-primary">
                  <i class="fa fa-plus"></i>
                  <span class="page">Ajouter un article</span>
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
                  <table ref="table" aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" style="width: 167px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Titre</th>
                        <th aria-label="Browser: activate to sort column ascending" style="width: 207px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Image principal</th>
                        <th aria-label="Platform(s): activate to sort column ascending" style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Thème d'affichage</th>
                        <th aria-label="CSS grade: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(element, index) in myData" :key="index" class="even" role="row">
                        <td class="sorting_1">{{ element.art_sTitre }}</td>
                        <td><img class="mini" :src="element.art_sImage_1" alt=""></td>
                        <td class="text-center">{{ element.tya_sLib }}</td>
                        <td>
                            <router-link tag="a" :to="$route.path+'/edit/'+element.art_id" :article="element">
                              <a class="btn btn-primary">
                                <i class="fa fa-eye"></i>
                              </a>
                            </router-link>
                            <a href="#" @click="actionRow(element.art_id)" class="btn btn-danger">
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
  name: 'ListArticles',
  props: ['sub'],
  data(router) {
    return {
      list: 'article',
      dt: '',
      subject: {},
      myData: []
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
    getArticles() {
      api
        .request('get', '/list/index.php?q=' + this.list + '&j=' + this.sub)
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
    actionRow(id, status) {
      api
        .request('get', '/statut/index.php?article=' + id + '&sub=' + this.sub)
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
    }
  },
  mounted() {
    this.dt = $(this.$refs.table).DataTable()
    this.getSubject()
    this.getArticles()
  },
  watch: {
    myData(val) {
      this.dt.destroy()
      this.$nextTick(() => {
        this.dt = $(this.$refs.table).DataTable()
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
