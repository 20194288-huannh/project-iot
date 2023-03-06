<template>
  <div class="content">
    <div class="container-fluid">
      <b-tabs card>
        <b-tab title="House Detail" active>
          <h3>House Detail</h3>
          <div class="d-flex flex-column mb-3 font-size">
            <div><span class="font-weight-bold mr-3">Name: </span>{{house.name}}</div>
            <div><span class="font-weight-bold mr-3">Address: </span>{{house.address}}</div>
            <div><span class="font-weight-bold mr-3">Email: </span>{{house.email}}</div>
            <div><span class="font-weight-bold mr-3">UserName: </span>{{house.username}}</div>
          </div>
          <div class="row">
            <card
              class="strpied-tabled-with-hover w-100"
              body-classes="table-full-width table-responsive"
            >
              <template slot="header">
                <div class="d-flex justify-content-between mr-3">
                  <div>
                    <h4 class="card-title">Room</h4>
                    <p class="card-category">
                      Here is a subtitle for this table
                    </p>
                  </div>
                  <b-button @click="createRoom" variant="success">Create</b-button>
                </div>
              </template>

              <l-table
                class="table-hover table-striped"
                :columns="tableRooms"
                :data="rooms"
                @delete="deleteRoom"
                @edit="editRoom"
              >
              </l-table>
            </card>
          </div>
        </b-tab>
        <b-tab title="Room In House" @click="selected_room_id = rooms[0].id">
          <b-tabs card vertical>
            <b-tab
              v-for="room in rooms"
              :key="room.id"
              :title="room.name"
              @click="selected_room_id = room.id"
            >
              <card
                class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
              >
                <template slot="header">
                  <div class="d-flex justify-content-between mr-3">
                    <div>
                      <h4 class="card-title">Striped Table with Hover</h4>
                      <p class="card-category">
                        Here is a subtitle for this table
                      </p>
                    </div>
                    <b-button @click="createDevice" variant="success"
                      >Create</b-button
                    >
                  </div>
                </template>

                <l-table
                  class="table-hover table-striped"
                  :columns="tableDevices"
                  :data="devices"
                  @delete="deleteDevice"
                  @edit="editDevice"
                  hidden="edit"
                >
                </l-table>
              </card>
            </b-tab>
          </b-tabs>
        </b-tab>
      </b-tabs>
    </div>
    <b-modal
      id="modal-room"
      ref="modal"
      :title="selected_room_id ? 'UPDATE DEVICE' : 'CREATE DEVICE'"
      header-bg-variant="dark"
      header-text-variant="light"
      @hidden="resetModalRoom"
    >
      <form ref="form" @submit.stop.prevent="handleSubmitRoom">
        <b-form-group label="Name">
          <b-form-input v-model="room.name"></b-form-input>
        </b-form-group>
      </form>
      <template #modal-footer>
        <div class="w-100">
          <b-button variant="success" class="mr-2" @click="handleSubmitRoom">
            {{ selected_room_id ? "Update" : "Create" }}
          </b-button>
          <b-button variant="danger" @click="show = false"> Cancel </b-button>
        </div>
      </template>
    </b-modal>
    <b-modal
      id="modal-device"
      ref="modal"
      :title="selected_device_id ? 'UPDATE DEVICE' : 'CREATE DEVICE'"
      header-bg-variant="dark"
      header-text-variant="light"
      @hidden="resetModalDevice"
    >
      <form ref="form" @submit.stop.prevent="handleSubmitDevice">
        <b-form-group label="Type">
          <multiselect
            v-model="device.device_id"
            :options="lstDevice"
            placeholder="Select one"
            :custom-label="name"
            label="name"
            track-by="name"
          ></multiselect>
        </b-form-group>
        <b-form-group label="Code" label-for="name-input">
          <b-form-input v-model="device.code"></b-form-input>
        </b-form-group>
      </form>
      <template #modal-footer>
        <div class="w-100">
          <b-button variant="success" class="mr-2" @click="handleSubmitDevice">
            {{ selected_device_id ? "Update" : "Create" }}
          </b-button>
          <b-button variant="danger" @click="show = false"> Cancel </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";
const tableDevices = ["Id", "Name", "Code", "Is Active", "Param"];
const tableRooms = ["Id", "Name"];
import RoomService from "../services/room.service";
import DeviceService from "../services/device.service";
import HouseService from "../services/house.service";

export default {
  components: {
    LTable,
    Card,
    Multiselect
  },
  data() {
    return {
      is_create: true,
      user: {},
      rooms: [],
      room: {},
      house: {},
      selected_room_id: null,
      selected_device_id: null,
      devices: [],
      device: {},
      lstDevice: [],
      tableDevices,
      tableRooms,
    };
  },
  computed: {
    house_id() {
      return this.$route.params.id;
    },
  },
  methods: {
    fetchRooms() {
      RoomService.getAllRoom(this.house_id).then(
        (response) => {
          this.rooms = response.data;
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    fetchRoom() {
      RoomService.getRoomById(this.selected_room_id).then(
        (response) => {
          this.room = response.data;
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    fetchDevice() {
      DeviceService.getDiviceInRoom(this.selected_room_id, this.selected_device_id).then(
        (response) => {
          this.device = response.data;
          this.device.device_id = {
            name: this.device.name,
            id: this.device.id
          }
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    fetchHouse() {
      HouseService.getHouseById(this.$route.params.id).then(
        (response) => {
          this.house = response.data;
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    fetchListDevices() {
      DeviceService.getAllDevice().then(
        (response) => {
          this.lstDevice = response.data;
          this.lstDevice = this.lstDevice.map(function (item) {
            return {
              name: item.name,
              id: item.id
            }
          })
          console.log(this.lstDevice)
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    editRoom(id) {
      this.selected_room_id = id;
      this.fetchRoom();
      this.$bvModal.show("modal-room");
    },
    fetchDevices() {
      DeviceService.getAllDiviceInRoom(this.selected_room_id).then(
        (response) => {
          this.devices = response.data;
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    resetModalRoom() {
      this.room = {};
    },
    resetModalDevice() {
      this.device = {};
    },
    createRoom() {
      this.room = {};
      this.$bvModal.show("modal-room");
    },
    createDevice() {
      this.fetchListDevices()
      this.selected_device_id = null;
      this.$bvModal.show("modal-device");
    },
    editDevice(id) {
      this.fetchListDevices()
      this.selected_device_id = id;
      this.fetchDevice();
      this.$bvModal.show("modal-device");
    },
    deleteRoom(id) {
      this.selected_room_id = id
      RoomService.deleteRoom(this.house_id, this.selected_room_id).then(
        (response) => {
          this.fetchRooms();
          this.$toastr.s("Delete Room Successfully", "SUCCESS MESSAGE");
        },
        (error) => {
          // show toast
        }
      );
    },
    deleteDevice(id) {
      this.selected_device_id = id
      DeviceService.deleteDeviceInRoom(this.selected_room_id, this.selected_device_id).then(
        (response) => {
          this.fetchDevices();
          this.$toastr.s("Delete Device Successfully", "SUCCESS MESSAGE");
        },
        (error) => {
          // show toast
        }
      );
    },
    handleSubmitRoom() {
      if (this.selected_room_id) {
        RoomService.updateRoom(this.house_id, this.selected_room_id, this.room).then(
          (response) => {
            this.fetchRooms()
            this.$bvModal.hide("modal-room");
            this.$toastr.s("Update Room Successfully")
          },
          (error) => {
            // show toast
          }
        );
      } else {
        RoomService.createRoom(this.house_id, this.room).then(
          (response) => {
            this.fetchRooms()
            this.$bvModal.hide("modal-room");
            this.$toastr.s("Create Room Successfully")
          },
          (error) => {
            // show toast
          }
        );
      }
    },
    handleSubmitDevice() {
      if (this.selected_device_id) {
        DeviceService.updateDeviceInRoom(this.selected_room_id, this.selected_device_id,this.device).then(
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
        this.device.device_id = this.device.device_id.id
        DeviceService.createDeviceInRoom(this.selected_room_id, this.device)
      }
    },
    name ({ name }) {
      return name ? `${name}` : ''
    }
  },
  created() {
    this.fetchRooms();
    this.fetchHouse()
  },
  watch: {
    // whenever question changes, this function will run
    selected_room_id(newId, oldId) {
      this.fetchDevices();
    },
  },
};
</script>

<style>
.font-size{
  font-size: 18px;
}
</style>
<style scope src="vue-multiselect/dist/vue-multiselect.min.css"></style>
