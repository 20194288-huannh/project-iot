<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <div class="d-flex justify-content-between mr-3">
                <div>
                  <h4 class="card-title">Striped Table with Hover</h4>
                  <p class="card-category">Here is a subtitle for this table</p>
                </div>
                <b-button @click="create" variant="success">Create</b-button>
              </div>
            </template>
            <l-table
              class="table-hover table-striped"
              :columns="table1.columns"
              :data="devices"
              @delete="deleteItem"
              @edit="edit"
            >
            </l-table>
          </card>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-device"
      ref="modal"
      :title="selected_device_id ? 'UPDATE DEVICE' : 'CREATE DEVICE'"
      header-bg-variant="dark"
      header-text-variant="light"
      @show="resetModal"
      @hidden="resetModal"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Name" label-for="name-input">
          <b-form-input id="name-input" v-model="device.name"></b-form-input>
        </b-form-group>
      </form>
      <template #modal-footer>
        <div class="w-100">
          <b-button variant="success" class="mr-2" @click="handleSubmit">
            {{ selected_device_id ? "Update" : "Create" }}
          </b-button>
          <b-button variant="danger" @click="show = false"> Cancel </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";
import DeviceService from "../services/device.service";
const tableColumns = ["Id", "Name"];
export default {
  components: {
    LTable,
    Card,
  },
  data() {
    return {
      selected_device_id: null,
      devices: [],
      device: {},
      table1: {
        columns: [...tableColumns],
      },
    };
  },
  methods: {
    fetchDevices() {
      DeviceService.getAllDevice().then(
        (response) => {
          this.devices = response.data;
          console.log(this.devices);
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    fetchDevice(id) {
      DeviceService.getDeviceById(id).then(
        (response) => {
          this.device = response.data;
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    edit(id) {
      this.selected_device_id = id
      this.fetchDevice(this.selected_device_id);
      this.$bvModal.show("modal-device");
    },
    resetModal() {
      this.device = {};
    },
    create() {
      this.selected_device_id = null
      this.$bvModal.show("modal-device");
    },
    deleteItem(id) {
      this.selected_device_id = id
      DeviceService.deleteDevice(this.selected_device_id).then(
        (response) => {
          this.fetchDevices();
          this.$toastr.s("Delete Device Successfully", "SUCCESS MESSAGE");
        },
        (error) => {
          // show toast
        }
      );
    },
    handleSubmit() {
      if (this.selected_device_id) {
        DeviceService.updateDevice(this.selected_device_id, this.device).then(
          (response) => {
            this.fetchDevices()
            this.$bvModal.hide("modal-device");
            this.$toastr.s("Update Device Successfully")
          },
          (error) => {
            // show toast
          }
        );
      } else {
        DeviceService.createDevice(this.device).then(
          (response) => {
            this.fetchDevices()
            this.$bvModal.hide("modal-device");
            this.$toastr.s("Create Device Successfully")
          },
          (error) => {
            // show toast
          }
        );
      }
    },
  },
  created() {
    this.fetchDevices();
  },
};
</script>
<style></style>
