<template>
<div class="container">

    <div class="row">
        <div class=" col-md-12">
            
            <div class="alert alert-danger" v-if="error">
                <p>{{ error }}</p>
              </div>
            <div class="alert alert-success" v-if="success">
                <p>{{ success }}</p>
            </div>

            <div class="well well-sm">
                <div class="row">
                    <div class=" col-md-4">
                        <img src="../assets/avatar.png" alt="" class="img-rounded img-responsive" />
                    </div>
                    <div class="col-sm-6 col-md-8">
                        
                        <h3>{{user.data.First_name}} {{user.data.Last_name}}</h3>
                        
                        <cite title="San Francisco, USA">{{user.data.Usuario_tipo.Tipo}} </cite>
                        <p>
                            <i class="glyphicon glyphicon-envelope"></i>{{user.data.Mail}}
                            <br />
                           </p>
                        <!-- Split button -->
                        <div class="btn-group">
                           
                            <button v-on:click="changeState()" type="button" class="btn btn-primary">
                                Cambiar Contraseña</button>
                  
       
                        </div>

                        <div  v-show="isShow" id="formpass">
                                



                              <div class="form-group">
                                <label for="usr" >Contraseña Actual:</label>
                                <input type="password" class="form-control" ref="pass" v-on:keyup="userinput">
                              </div>
                             
                              <div class="form-group">
                              <label for="usr">Nueva Contraseña:</label>
                               <input type="password" class="form-control" ref="newpass" v-on:keyup="userinput" >
                              </div>
                             
                              <div class="form-group">
                                <label for="usr">Re-Ingrese Nueva Contraseña:</label>
                              <input type="password" class="form-control" ref="renewpass" v-on:keyup="userinput">
                              </div>

                                <div class="btn-group">
                                               <button v-on:click="savePass()" type="button" class="btn btn-primary" :disabled="validated ? disabled : ''">
                                                            Guardar Cambios</button>

                                  </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      

</div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios';
import auth from '../auth'
import config from '../../config/appconfig.js';
console.log(config.server)

export default {
  name: 'Account',
  

  data(){

      return {
        // userinput: '',
        isShow:false,
        user: auth.user,
        error:undefined,
        success:undefined,
        validated:false
      }  
    },
    watch: {
    
  },

  methods: {
    userinput: function() {

      if(this.$refs.renewpass.value.length>0&&this.$refs.newpass.value.length>0&&this.$refs.pass.value.length>0)
        this.validated=true;
      else
        this.validated=false;
     },
    changeState: function () {
   
      this.isShow=true;
   
      },
    savePass: function () {
      
       
        
        //Si el passwor antiguo esta no vacio
        if(this.$refs.pass.value){
          console.log(this.user.data)

          //Si los password nuevos coinciden
          if(this.$refs.newpass.value==this.$refs.renewpass.value){

              // Si coincide con password antiguop
              if(this.user.data.Password==this.$refs.pass.value){
     
                var token=auth.getAuthHeader();
                  axios.put(config.server_api+"usuario/"+this.user.data.Id,{"Password":this.$refs.renewpass.value},{headers:token})
                      .then((response) => {
                        this.success="Password was changed"
                        
                      })
                      .catch(e => {
                        this.error=e.response.data.message
                    })
              }
              else{
                  this.error="Bad password"
              }
          }
          else{
            this.error="Your password and confirmation password do not match"
          }
        }else{
          this.error="Ingrese Password"
        }
        
   
      }
    },

  created() {
  
  }
}




</script>
<style>


.glyphicon {  margin-bottom: 10px;margin-right: 10px;}

small {
display: block;
line-height: 1.428571429;
color: #999;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

