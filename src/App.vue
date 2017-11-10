  <template><div>
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="container-fluid">
        <ul class="nav navbar-nav ">
        <li><a v-link="'secretquote'"  @click="account()" v-if="user.authenticated">Mis Datos</a></li>
          <li><a v-link="'login'" @click="login()"  v-if="!user.authenticated">Login</a></li>
          <li><a v-link="'secretquote'"  @click="emergencias()" v-if="user.authenticated">Emergencias</a></li>





          <li><a v-link="'login'" v-if="user.authenticated" @click="logout()">Salir</a></li>
        </ul>
      </div>
      </div>    
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
    </div>
  </template>

  <script>
  import auth from './auth'
  export default {
    data() {
      return {
        user: auth.user
      }
    },
    methods: {

      login() {
        this.$router.push('/login')
      },

      logout() {
        auth.logout()
        this.$router.push('/login')
      },

      emergencias() {
       this.$router.push('/emergencias')
      },

      account() {
       this.$router.push('/account')
      }
    }
  }
  </script>