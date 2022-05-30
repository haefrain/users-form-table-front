<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-data-table :headers="headers"
                      :items="users">
          <template v-slot:[`item.avatar`]="{item}">
            <img v-if="item.avatar != ''" :src="item.avatar"/>
          </template>
          <template v-slot:[`item.fullName`]="{item}">{{ item.first_name }} {{ item.last_name }}</template>
          <template v-slot:[`item.age`]="{item}"><span v-if="item.birthday">{{ age(item.birthday) }} años</span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as moment from "moment/moment";
import {mapGetters} from "vuex";

export default {
  name: 'ListUser',
  data() {
    return {
      headers: [
        {
          text: 'Avatar',
          value: 'avatar'
        },
        {
          text: 'Id',
          value: 'id'
        },
        {
          text: 'Nombre',
          value: 'fullName'
        },
        {
          text: 'Edad',
          value: 'age'
        },
        {
          text: 'Email',
          value: 'email'
        }
      ]
    }
  },
  computed: {
    users() {
      return this.$store.getters["User/users"]
    }
  },
  methods: {
    age(birthDay) {
      return moment().diff(birthDay, 'years');
    }
  },
  mounted() {
    this.$store.dispatch('User/getUsers').then(users => {
      console.log(users)
      this.listUsers = users
    })
  }
}
</script>
