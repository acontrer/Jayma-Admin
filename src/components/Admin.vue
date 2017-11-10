<template>
  <div class="hello">
    <h1>Usuarios</h1>
    <table  class="" >
        <th>Identificador</th>      
        <th>Nombre</th>
        <th>E-mail</th>
        <th>Username</th>
        <th>Tipo de usuario</th>
        <th>Acción</th>
      <tr v-for="item , key in posts">      

        <td :class=item.typeUser>{{ item.Id }}</td>      
        <td :class=item.typeUser>{{ item.First_name }} {{item.Last_name}}</td>
        <td :class=item.typeUser>{{ item.Mail }}</td>
        <td :class=item.typeUser>{{ item.Username }}</td>
        <td v-bind:class="'type '+item.typeUser">{{ item.Usuario_tipo.Tipo }}</td>
        <td v-bind:class="item.typeUser"><a v-bind:class="'btn  btn-block '+item.typeUserBtn"  v-on:click="changeState(item.Id,key)"><i v-bind:class="'fa  '+item.typeUserBtnIcon" aria-hidden="true"></i>{{ item.action }}</a></td>


     
     
      </tr>
    </table>
  
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios';
import auth from '../auth'
import config from '../../config/appconfig.js';
console.log(config.server)

export default {
  name: 'Admin',

  data: () => ({
    posts: [],
    errors: []
  }),

  methods: {
    changeState: function (ss,key) {
        var newTipoId;
        var newAction;
        var newTipo;
        if(this.posts[key]["Usuario_tipo"]["Id"]!=3){


          switch(this.posts[key]["Usuario_tipo"]["Id"]){
           
           // Si es Admin -> Remover De Admin
            case 1:
              newTipoId=2;
              newTipo="Usuario"
              newAction="Agregar como Administrador"
              
            break;

            // Si es Usuario -> Agregar Como Admin
            case 2:
                newTipoId=1;
                newTipo="Administrador"
                newAction="Remover de Administradores"            
            break;

            // Si es Invitado -> Habilitar Usuario
            case 4:
              newTipoId=2;
              newTipo="Usuario"
              newAction="Agregar Como Administrador"
              habilitarUsuario(this.posts[key]);
            break;
         }
        // }
        
          axios.put(config.server_api+"usuario/"+ss,
          { "Usuario_tipos_id": newTipoId},
          {
            headers:{'content-type': 'application/json'}})
            .then(response => {

                this.posts[key]["Usuario_tipo"]["Tipo"]=newTipo
                this.posts[key]["Usuario_tipo"]["Id"]=newTipoId
                this.posts[key]["action"]=newAction
                setButton(this.posts[key]);
              
            })
            .catch(e => {
              this.errors.push(e)
            })
          
      }
      }
    },

  created() {
    axios.get(config.server_api+'usuario/')
    .then(response => {
      var out=[]
      // JSON responses are automatically parsed.
    response.data.forEach(function(ob1){
      if(ob1.Mail=='')
        ob1.Mail="---";
      


        setButton(ob1);

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

function habilitarUsuario(ob){

   axios.post(config.email_service,
          { "email": ob.Mail},
          {headers:{'content-type': 'application/json'}})
          .then(response => {
            
          })
          .catch(e => {
            console.log(e)
            this.errors.push(e)
          })

}
function setButton(ob1){
  
        switch(ob1.Usuario_tipo.Id){
        
        case 1:
           ob1.action="Remover de Administradores";
           ob1.typeUser="userAdmin";
           ob1.typeUserBtn="btn-danger";
           ob1.typeUserBtnIcon="fa-minus-circle";
        break;
       
        case 2:
           ob1.action="Agregar como Administrador";
           ob1.typeUser="userNormal";
           ob1.typeUserBtn="btn-info";
           ob1.typeUserBtnIcon="fa-plus-circle";
        break;

        case 4:
           ob1.action="Habilitar Usuario";
           ob1.typeUser="userInProcess";
           ob1.typeUserBtn="btn-default";
           ob1.typeUserBtnIcon="fa-check-circle-o";
        break;
      }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

