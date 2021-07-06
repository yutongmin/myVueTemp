<template>
  <div class="home">
    <!-- home页面 -->
    <Header />
    <!-- <app-header></app-header> -->
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Vue, Watch } from 'vue-property-decorator'
import {State, Action, namespace} from 'vuex-class'
import Header from '@/components/Headers.vue'

@Component({
  components: {
    Header
  }
})
export default class Home extends Vue {}
</script>
