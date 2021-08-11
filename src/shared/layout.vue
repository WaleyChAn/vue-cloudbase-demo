<template>
  <div class="tbox-layout">
    <div class="tbox-flex column">
      <div class="tbox-aside">
        <tbox-header></tbox-header>
      </div>
      <div class="tbox-main">
        <div class="tbox-flex row">
          <div class="tbox-aside">
            <tbox-menu></tbox-menu>
          </div>
          <div class="tbox-main scroll">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TboxHeader from '@/shared/header'
import TboxMenu from '@/shared/menu'

export default {
  name: 'TboxLayout',
  components: {
    TboxHeader,
    TboxMenu
  },
  methods: {

  }
}
</script>
