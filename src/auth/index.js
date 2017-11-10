// src/auth/index.js

// import {router} from '../index'
import config from '../../config/appconfig.js';
// URL and endpoint constants
const API_URL = config.server_api;
const LOGIN_URL = API_URL + 'login'
const USER_URL = API_URL + 'usuarios/mail/'
const PERMISOS_URL= API_URL+'auth/permisos'
import axios from 'axios'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false,
    isAdmin: false
  },

  login(context, creds, redirect) {

      axios.post(LOGIN_URL,creds,{headers:{'content-type': 'application/json'}})
          .then((data) => {
            console.log(creds)
            localStorage.setItem('access_token', data.data.token)
            localStorage.setItem('id_token', data.data.id_token)
            localStorage.setItem('user_logged', creds.username)
            
            var token=this.getAuthHeader();

            axios.get(PERMISOS_URL,{headers:token})
                .then((data2) => {

                     axios.get(USER_URL+creds.username,{headers:token})
                      .then((user_data) => {

                        console.log("data USer:", user_data.data)
                        this.user.data=user_data.data;
                        localStorage.setItem('user_data',JSON.stringify(user_data.data))
                        this.user.authenticated = true
                        console.log("--..--..--..--..--")
                        console.log(user_data.data.Usuario_tipos_id)
                        if(user_data.data.Usuario_tipos_id==1)
                         this.user.isAdmin=true;
                        else
                          this.user.isAdmin=false;

                        context.$router.push('/account')
                        
                      })
                      .catch(e => {
                        context.error=e.response.data.message
                    })

                      // this.user.authenticated = true

                      // context.$router.push('/admin')
                  
                })
                .catch(e => {
                  context.error=e.response.data.message
                })
            
          })
          .catch(e => {
            context.error=e.response.data.message
          })
  },


  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    this.user.authenticated = false
    this.user.isAdmin=false
  },

  checkAuth() {

    var jwt = localStorage.getItem('id_token')
    var user_logged=localStorage.getItem('user_logged')
    var access_token=localStorage.getItem('access_token')
    if(jwt) {
        this.user.data=JSON.parse(localStorage.getItem('user_data'));
        console.log(this.user.data)
        this.user.authenticated = true

        if(this.user.data.Usuario_tipos_id==1)
          this.user.isAdmin=true;
        else
          this.user.isAdmin=false;


    }
    else {
      this.user.authenticated = false      
      this.user.isAdmin=false;
    }
    return this.user.authenticated;
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}