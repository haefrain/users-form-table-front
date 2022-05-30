<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ListUser msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ListUser from '@/components/ListUser.vue'

export default {
  name: 'UserView',
  components: {
    ListUser
  }
}
</script>
