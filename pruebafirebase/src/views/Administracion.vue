<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="4">
        <h1>Lista de Cursos</h1>
      </b-col>
      <b-col cols="4">
        <b-button
          variant="primary"
          size="sm"
          @click="changeStateModal(true)"
          class="m-2"
        >
          Agregar Curso
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-table striped hover :items="cursos" :fields="fields">
          <template #cell(Curso)="data">
            {{ data.item.nombreCurso }}
          </template>
          <template #cell(Cupos)="data">
            {{ data.item.cupos }}
          </template>
          <template #cell(Inscritos)="data">
            {{ data.item.inscritos }}
          </template>
          <template #cell(Duracion)="data">
            {{ data.item.duracion }}
          </template>
          <template #cell(Costo)="data">
            <span class="rounded-pill bg-success p-2">
              {{ `$${data.item.costo}` }}
            </span>
          </template>
          <template #cell(Terminado)="data">
            <span
              :class="
                data.item.terminado
                  ? 'rounded-pill bg-info p-2'
                  : 'rounded-pill bg-secondary p-2'
              "
            >
              {{ data.item.terminado ? "Si" : "No" }}
            </span>
          </template>
          <template #cell(Fecha)="data">
            <span class="rounded-pill bg-success p-2">
              {{ data.item.fechaInicio }}
            </span>
          </template>
          <template #cell(Acciones)="row">
            <b-button
              size="sm"
              @click="updateCourse(row.item.id)"
              class="mr-2"
            >
              🖊
            </b-button>
            <b-button
              size="sm"
              @click="deleteCursoByIdDoc(row.item.id)"
              class="mr-2"
            >
              ❌
            </b-button>
          </template>
        </b-table>
      </b-col>

      <b-col cols="12">
        <v-btn width="1000" color="purple" class="ma-2" outlined
          ><b-icon icon="person"></b-icon>Cantidad total de alumnos permitidos:
          <strong>{{ getAlumnosPermitidos }}</strong
          >Alumnos</v-btn
        >
      </b-col>

      <b-col cols="12">
        <v-btn width="1000" color="blue" class="ma-2" outlined
          ><b-icon icon="person-check-fill"></b-icon>Cantidad total de Alumnos
          inscritos: <strong>{{ getAlumnosInscritos }}</strong> Alumnos</v-btn
        >
      </b-col>

      <b-col cols="12">
        <v-btn width="1000" color="orange" class="ma-2" outlined
          ><b-icon icon="person-lines-fill"></b-icon>Cantidad total de cupos
          restantes:
          <strong>{{ getAlumnosCuposRestantes }}</strong> Alumnos</v-btn
        >
      </b-col>

      <b-col cols="12">
        <v-btn width="1000" color="red" class="ma-2" outlined
          ><b-icon icon="slash-circle"></b-icon>Cantidad total de cursos
          terminados: <strong>{{ getCursosTerminados }}</strong> Cursos</v-btn
        >
      </b-col>

      <b-col cols="12">
        <v-btn width="1000" color="brown" class="ma-2" outlined
          ><b-icon icon="bell-fill"></b-icon>Cantidad total de cursos activos:
          <strong>{{ getCursosActivos }}</strong> Cursos</v-btn
        >
      </b-col>

      <b-col cols="12">
        <v-btn width="1000" color="pink" class="ma-2" outlined
          ><b-icon icon="bell"></b-icon>Cantidad total de cursos:
          <strong>{{ getTotalCursos }}</strong> Cursos</v-btn
        >
      </b-col>
    </b-row>

    <b-modal title="Agregar Curso" v-model="isOpenModal">
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-none">Nombre:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="input-none" v-model="curso.nombreCurso"></b-form-input>
        </b-col>
        <b-col sm="3">
          <label for="input-none">Url de la Imagen:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="input-none" v-model="curso.urlBanner"></b-form-input>
        </b-col>
        <b-col sm="3">
          <label for="input-none">Cupos del Curso:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input
            id="input-none"
            v-model="curso.cupos"
            type="number"
          ></b-form-input>
        </b-col>
        <b-col sm="3">
          <label for="input-none">Inscritos del Curso:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input
            id="input-none"
            v-model="curso.inscritos"
            type="number"
          ></b-form-input>
        </b-col>
        <b-col sm="3">
          <label for="input-none">Duración del Curso:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="input-none" v-model="curso.duracion"></b-form-input>
        </b-col>
        <b-col sm="3">
          <label for="input-none">Costo del Curso:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input
            id="input-none"
            v-model="curso.costo"
            type="number"
          ></b-form-input>
        </b-col>
        <b-col sm="3">
          <label for="input-none">Codigo del Curso:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input
            id="input-none"
            v-model="curso.codigoCurso"
          ></b-form-input>
        </b-col>
        <b-col sm="3">
          <label for="input-none">Descripcion del Curso:</label>
        </b-col>
        <b-col sm="9">
          <b-form-textarea
            id="input-none"
            v-model="curso.descripcion"
          ></b-form-textarea>
        </b-col>
      </b-row>
      <template #modal-footer>
        <b-row>
          <b-col cols="4">
            <b-button
              variant="success"
              size="sm"
              class="float-right"
              @click="handleOkModal"
            >
              AGREGAR
            </b-button>
          </b-col>
          <b-col cols="4">
            <b-button
              variant="success"
              size="sm"
              class="float-right"
              @click="cleanFormModal"
            >
              LIMPIAR FORMULARIO
            </b-button>
          </b-col>
          <b-col cols="4">
            <b-button
              variant="success"
              size="sm"
              class="float-right"
              @click="cleanValidationFormModal"
            >
              LIMPIAR VALIDACION
            </b-button>
          </b-col>
        </b-row>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
const initialStateCurso = {
  nombreCurso: "",
  urlBanner: "",
  cupos: 0,
  inscritos: 0,
  duracion: "",
  costo: 0,
  codigoCurso: "",
  descripcion: "",
};
export default {
  name: "Administration",
  data() {
    return {
      curso: initialStateCurso,
      fields: [
        "Curso",
        "Cupos",
        "Inscritos",
        "Duracion",
        "Costo",
        "Terminado",
        "Fecha",
        "Acciones",
      ],
      isOpenModal: false,
    };
  },
  async mounted() {
    await this.getCourses();
  },
  methods: {
    ...mapActions(["getCourses", "addCourse", "updateCourse", "deleteCourse"]),
    async deleteCursoByIdDoc(idParam) {
      await this.deleteCourse(idParam);
    },
    async updateCourseByIdDoc(idParam) {
      await this.updateCourse(idParam);
    },
    changeStateModal(newStateModal) {
      this.isOpenModal = newStateModal;
    },
    cleanFormModal() {
      this.curso = initialStateCurso;
    },
    cleanValidationFormModal() {
      this.curso = initialStateCurso;
    },
    async handleOkModal() {
      const newDate = new Date(new Date().setMonth(new Date().getMonth() + 3));
      const newCourse = {
        ...this.curso,
        terminado: false,
        fechaInicio: newDate.toLocaleDateString(),
      };
      await this.addCourse(newCourse);
      this.isOpenModal = false;
    },
  },
  computed: {
    ...mapState(["cursos"]),
    ...mapGetters([
      "getAlumnosPermitidos",
      "getAlumnosInscritos",
      "getAlumnosCuposRestantes",
      "getCursosTerminados",
      "getCursosActivos",
      "getTotalCursos",
    ]),
  },
};
</script>

<style></style>
