<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="4" md="4" sm="12" xl="4">
        <v-card elevation="2">
          <form-user/>
        </v-card>
      </v-col>
      <v-col cols="12" lg="8" md="8" sm="12" xl="8">
        <v-card elevation="2">
          <list-user/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import ListUser from '@/components/ListUser'
import FormUser from '@/components/FormUser'

export default {
  name: 'UserView',

  components: {
    ListUser,
    FormUser
  },
}
</script>
