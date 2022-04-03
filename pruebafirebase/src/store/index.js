import Vue from "vue";
import Vuex from "vuex";
//autentificación
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  getFirestore,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userLogin: null,
    userMsjError: null,
    cursos: [],
  },
  mutations: {
    SET_COURSES(state, payload) {
      state.cursos = payload;
    },
    SET_USER_LOGIN(state, payload) {
      state.userLogin = payload;
    },
  },
  actions: {
    setCourses({ commit }, coursesParams) {
      commit("SET_COURSES", coursesParams);
    },
    async Login_User(context, usuario) {
      const { email, password } = usuario;
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      alert("Ingreso con exito!");
    },
    async registrandoUsuario(context, usuario) {
      const { email, password } = usuario;
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuario registrado con exito!");
    },
    getUserLogin({ commit }) {
      getAuth().onAuthStateChanged((user) => {
        if (user) {
          commit("SET_USER_LOGIN", user.email);
        }
      });
    },
    async logoutUser({ commit }) {
      await getAuth()
        .signOut()
        .then(() => {
          commit('SET_USER_LOGIN', null);
        });
    },
    async getCourses({ commit }) {
      const db = getFirestore();
      const queryRequest = query(collection(db, "curso"));
      onSnapshot(queryRequest, (querySnapshot) => {
        const cursos = [];
        querySnapshot.forEach((doc) => {
          const curso = {
            id: doc.id,
            ...doc.data(),
          };
          cursos.push(curso);
        });
        commit("SET_COURSES", cursos);
      });
    },
    async addCourse(context, cursoObject) {
      console.log(cursoObject);
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "curso"), cursoObject);
      console.log("Document written with ID: ", docRef.id);
    },
    async updateCourse(context, { id, userData }) {
      const userRefDoc = doc(db, "cursos", id);
      await updateDoc(userRefDoc, userData);
    },
    async deleteCourse({ commit }, idDocCourse) {
      const db = getFirestore();
      await deleteDoc(doc(db, "curso", idDocCourse));
    },
  },
  getters: {
    getAlumnosPermitidos({ cursos }) {
      const countAlumnosPermitidos = cursos.reduce(
        (previusValue, currentValue) =>
          previusValue + parseInt(currentValue.cupos),
        0
      );
      return countAlumnosPermitidos;
    },
    getAlumnosInscritos({ cursos }) {
      const countAlumnosInscritos = cursos.reduce(
        (previusValue, currentValue) =>
          previusValue + parseInt(currentValue.inscritos),
        0
      );
      return countAlumnosInscritos;
    },
    getAlumnosCuposRestantes({ cursos }, getters) {
      return getters.getAlumnosPermitidos - getters.getAlumnosInscritos;
    },
    getCursosTerminados({ cursos }) {
      const countCoursesFinished = cursos?.filter(
        (curso) => curso?.terminado
      )?.length;
      return countCoursesFinished;
    },
    getCursosActivos({ cursos }) {
      const countCoursesActive = cursos?.filter(
        (curso) => !curso?.terminado
      )?.length;
      return countCoursesActive;
    },
    getTotalCursos({ cursos }) {
      const countCourses = cursos?.length;
      return countCourses;
    },
  },
  modules: {},
});
