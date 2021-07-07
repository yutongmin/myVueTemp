<template>
  <div class="common_flex">
    <!-- home页面 -->
    <!-- <Header /> -->
    <app-header userName="yutongmin"/>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Vue, Watch } from 'vue-property-decorator'
import {State, Action, namespace} from 'vuex-class'

@Component({
  components: {
  }
})
export default class Home extends Vue {}
</script>
