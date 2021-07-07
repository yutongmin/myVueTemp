<template>
  <div class="header">
    <div class="line"></div>
    <div class="user">
      <i class="el-icon-s-custom"></i>
      <span class="user_name">{{ userName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component ({
  components: {

  } 
})
export default class Header extends Vue {
  @Prop({default: ''}) userName!: string

  
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  background-color: #1565c0;
  position: relative;
  height: 94px;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  // overflow: hidden;

  .logo {
    height: 40px;
    margin-left: 40px;
  }

  .line {
    height: 94px;
    width: 738px;
    position: absolute;
    right: 0;
    z-index: 1;
    top: 0;
    // background-image: url('../../assets/header-line.png');
  }

  .user {
    flex: 1;
    text-align: right;
    z-index: 9;
    color: white;
    padding-right: 40px;
    position: absolute;
    right: 10px;

    > i {
      font-size: 28px;
    }

    .user_name {
      
      margin-left: 10px;
      font-size: 0.18rem;
      line-height: 1.94rem;
    }
  }
}
</style>
