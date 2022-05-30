<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <validation-observer
          ref="observer"
          v-slot="{ invalid }"
        >
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="first_name"
              rules="required|max:50"
            >
              <v-text-field
                v-model="first_name"
                :counter="50"
                :error-messages="errors"
                label="Nombre(s)"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="last_name"
              rules="required|max:50"
            >
              <v-text-field
                v-model="last_name"
                :counter="50"
                :error-messages="errors"
                label="Apellido(s)"
                required
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required|max:75|email"
            >
              <v-text-field
                v-model="email"
                :counter="75"
                :error-messages="errors"
                label="Correo electronico"
                required
              ></v-text-field>
            </validation-provider>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <validation-provider
                  name="birthday"
                  rules="required"
                >
                  <v-text-field
                    v-model="birthday"
                    label="Fecha de nacimiento"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </validation-provider>
              </template>
              <v-date-picker
                v-model="birthday"
                :active-picker.sync="activePicker"
                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                min="1900-01-01"
              ></v-date-picker>
            </v-menu>

            <v-btn
              class="mr-4"
              type="submit"
              :disabled="invalid"
            >
              Guardar Usuario
            </v-btn>
            <v-btn @click="clear">
              Limpiar
            </v-btn>
          </form>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {required, email, max} from "vee-validate/dist/rules"
import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from "vee-validate"
import {mapGetters} from "vuex"

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} No puede estar vacio',
})

extend('max', {
  ...max,
  message: '{_field_} No debe superar los {length} caracteres',
})

extend('email', {
  ...email,
  message: 'Debe ingresar un correo valido',
})

export default {
  name: "FormUser",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    first_name: "",
    last_name: "",
    email: "",
    birthday: "",
    activePicker: null,
    menu: false,
  }),
  computed: {
    ...mapGetters(['User/users'])
  },
  methods: {
    submit() {
      this.$refs.observer.validate().then(status => {
        if (status) {
          const formData = {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            birthday: this.birthday,
          }
          this.$store.dispatch('User/addUser', formData).then(() => {
            this.clear()
          })
        }
      })
    },
    clear() {
      this.first_name = ''
      this.last_name = ''
      this.email = ''
      this.birthday = ''
      this.$refs.observer.reset()
    },
    save(date) {
      this.$refs.menu.save(date)
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
    users(newVal) {
      console.log("users: ", newVal)
    }
  },
}
</script>
