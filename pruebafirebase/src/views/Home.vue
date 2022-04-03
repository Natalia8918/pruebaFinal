<template>
  <b-container id="home" class="bv-example-row mb-10">
    <h1 style="margin: 20px 0">Lista de Cursos</h1>
    <b-row>
      <b-col v-for="(curso, index) in cursos" :key="index">
        <b-card no-body :img-src="curso.urlBanner" img-alt="Image" img-top>
          <template #header>
            <h4 class="mb-0">{{ curso.nombreCurso }}</h4>
            <h5 class="mb-3 mt-10">Información</h5>
            <v-timeline dense>
              <v-timeline-item
                >Costo: <b>{{ curso.costo }}</b
                ><br />
                Duracion: <b>{{ curso.duracion }}</b></v-timeline-item
              >
              <v-timeline-item
                >Cupos:<b>{{ curso.cupos }}</b
                ><br />Completado:
                {{ curso.terminado ? "Si" : "No" }}</v-timeline-item
              >
              <v-timeline-item
                >Fecha de Registro:<br />{{
                  curso.fechaInicio
                }}</v-timeline-item
              >
              <v-timeline-item
                >Descripción:<br />{{ curso.descripcion }}
              </v-timeline-item>
            </v-timeline>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  async mounted() {
    await this.getCourses();
  },
  methods: {
    ...mapActions(["getCourses"]),
  },
  computed: {
    ...mapState(["cursos"]),
  },
};
</script>

<style></style>
