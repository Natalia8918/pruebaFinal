<template>
  <div>
    <h1 class="mt-10">Registro de Usuario</h1>
    <b-container class="bv-example-row">
      <div>
        <input v-model="usuario.email" class="m-2" id="formu" placeholder="E-mail" />
        <input v-model="usuario.password" class="m-2" id="formu" placeholder="Password" type="password"/>
        <p class="text-danger" v-if="error">{{ error }}</p>
        <b-button @click="registrar" class="m-3" variant="success">Registrar</b-button>
        <b-button @click="limpiar" class="m-3" variant="danger">Limpiar Formulario</b-button>
        <b-button class="m-3" variant="warning" @click="error">Limpiar Validación</b-button>

      </div>
    </b-container>
  </div>
</template>

<script>
import { mapActions} from "vuex";
//estado local email,usuario, contraseña
export default {
  methods: {
    ...mapActions(["registrandoUsuario"]),
    async registrar() {
      try {
      const { usuario } = this;
      //registro exitoso
      await this.registrandoUsuario(usuario);
      this.usuario.email="";
      this.usuario.password="";
      this.error="";
      }
      //error de registro
      catch (error) {
        this.error = error.code;
      }
    },
    limpiar(){
      this.usuario.email= "";
      this.usuario.password= "";
    }
  },
    data() {
    return {
      usuario: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
}

</script>

<style>
#formu {
  width: 100%;
  padding: 10px;
}
</style>