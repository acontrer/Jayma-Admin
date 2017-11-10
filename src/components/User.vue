<template>
  <div class="hello">
    <h1>Habilitar Usuarios</h1>
    <table class="table table-striped table-bordered" >
        <th>Identificador</th>      
        <th>Nombre</th>
        <th>E-mail</th>
        <th>Nickname</th>
        <th>Habilitar/Deshabilitar Usuario</th>
      <tr v-for="item , key in posts">      
        <td>{{ item.Id }}</td>      
        <td>{{ item.First_name }} {{item.Last_name}}</td>
        <td>{{ item.Mail }}</td>
        <td>{{ item.Username }}</td>
        <td><a v-on:click="incrementCounter(item.Id,key)">{{ item.Usuario_tipo.Tipo }}</a></td>
     
     
      </tr>
    </table>
  
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios';
import config from '../../config/appconfig.js';
export default {
  name: 'hello',

  data: () => ({
    posts: [],
    errors: []
  }),

  methods: {
    incrementCounter: function (ss,key) {

        console.log("click")
        var newTipoId;

        var newTipo;
        if(this.posts[key]["Usuario_tipo"]["Id"]<=4){
          if(this.posts[key]["Usuario_tipo"]["Id"]==4)
           { 
            newTipoId=2;
            newTipo="Usuario"
           }
          else{
            newTipoId=4;
            newTipo="Invitado"
          }

          axios.put(config.server_api+'/usuario/'+ss,
          { "Usuario_tipos_id": newTipoId},
          {headers:{'content-type': 'application/json'}})
          .then(response => {

              this.posts[key]["Usuario_tipo"]["Tipo"]=newTipo
              this.posts[key]["Usuario_tipo"]["Id"]=newTipoId
            
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
      }
    },
  created() {
    axios.get(config.server_api+'/usuario/')
    .then(response => {
     
     var out=[]
    
      response.data.forEach(function(ob1){

        if(ob1.Usuario_tipo.Tipo!="Bot")
          out.push(ob1)
      })
        
      this.posts = out

    })
    .catch(e => {
      this.errors.push(e)
    })


  }
}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
