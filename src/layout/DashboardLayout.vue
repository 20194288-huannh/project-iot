<template>
  <div class="wrapper">
    <side-bar>
      <sidebar-link to="/admin/user-list">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>User List</p>
      </sidebar-link>
      <sidebar-link to="/admin/device">
        <i class="nc-icon nc-circle-09"></i>
        <p>Device</p>
      </sidebar-link>
      <sidebar-link to="/admin/house">
        <i class="nc-icon nc-paper-2"></i>
        <p>House</p>
      </sidebar-link>
      <sidebar-link to="/admin/icons">
        <i class="nc-icon nc-atom"></i>
        <p>Icons</p>
      </sidebar-link>

      <template slot="bottom-links">
        <sidebar-link class="active"
                      to="/admin/upgrade">
          <i class="nc-icon nc-alien-33"></i>
          <p>Upgrade to PRO</p>
        </sidebar-link>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
