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
                  <h4 class="card-title">House</h4>
                  <p class="card-category">Here is a subtitle for this table</p>
                </div>
                <b-button @click="create" variant="success">Create</b-button>
              </div>
            </template>

            <house-table
              class="table-hover table-striped"
              :columns="table1.columns"
              :data="houses"
              @delete="deleteItem"
              @edit="edit"
            >
            </house-table>
          </card>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-house"
      ref="modal"
      :title="!selected_house_id ? 'CREATE HOUSE' : 'UPDATE HOUSE'"
      header-bg-variant="dark"
      header-text-variant="light"
      @show="resetModal"
      @hidden="resetModal"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Name" label-for="name-input">
          <b-form-input id="name-input" v-model="house.name"></b-form-input>
        </b-form-group>
        <b-form-group label="Address" label-for="phone-number-input">
          <b-form-input id="name-input" v-model="house.address"></b-form-input>
        </b-form-group>

        <b-form-group label="User" label-for="user-input">
          <multiselect
            v-model="selected_user"
            :options="users"
            :custom-label="nameWithEmail"
            placeholder="Select one"
            label="name"
            track-by="name"
          ></multiselect>
        </b-form-group>
      </form>
      <template #modal-footer>
        <div class="w-100">
          <b-button variant="success" class="mr-2" @click="handleSubmit">
            {{ !selected_house_id ? "Create" : "Update" }}
          </b-button>
          <b-button variant="danger" @click="show = false"> Cancel </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import HouseService from "../services/house.service";
import UserService from "../services/user.service";
import HouseTable from "src/components/HouseTable.vue";
import Card from "src/components/Cards/Card.vue";
const tableColumns = ["Id", "Name", "Address", "Email", "Phone Number"];
export default {
  components: {
    HouseTable,
    Card,
    Multiselect,
  },
  data() {
    return {
      table1: {
        columns: [...tableColumns],
      },
      selected_house_id: null,
      house: {},
      houses: [],
      users: [],
      selected_user: {},
    };
  },
  methods: {
    create() {
      this.selected_house_id = null;
      this.fetchUsers();
      this.$bvModal.show("modal-house");
    },
    edit(id) {
      this.selected_house_id = id;
      this.fetchHouse();
      this.fetchUsers();
      this.$bvModal.show("modal-house");
    },
    deleteItem(id) {
      this.selected_house_id = id
      HouseService.deleteHouse(this.selected_house_id).then(
        (response) => {
          this.fetchHouses();
          this.$toastr.s("Delete House Successfully", "SUCCESS MESSAGE");
        },
        (error) => {
          // show toast
        }
      );
    },
    resetModal() {
      this.house = {};
      this.selected_user = {}
    },
    fetchHouses() {
      HouseService.getAllHouse().then(
        (response) => {
          this.houses = response.data;
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
      HouseService.getHouseById(this.selected_house_id).then(
        (response) => {
          this.house = response.data;
          this.selected_user = {
              name: this.house.username,
              email: this.house.email,
              id: this.house.user_id
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
    handleSubmit() {
      if (this.selected_house_id) {
        this.house.user_id = this.selected_user.id
        HouseService.updateHouse(this.selected_house_id, this.house).then(
          (response) => {
            this.fetchHouses();
            this.$bvModal.hide("modal-house");
            this.$toastr.s("Update House Successfully");
          },
          (error) => {
            // show toast
          }
        );
      } else {
        this.house.user_id = this.selected_user.id
        HouseService.createHouse(this.house).then(
          (response) => {
            this.fetchHouses();
            this.$bvModal.hide("modal-house");
            this.$toastr.s("Create House Successfully");
          },
          (error) => {
            // show toast
          }
        );
      }
    },
    fetchUsers() {
      UserService.getAllUser().then(
        (response) => {
          this.users = response.data;
          this.users = this.users.map(function (item) {
            return {
              name: item.name,
              email: item.email,
              id: item.id
            };
          });
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    nameWithEmail ({ name, email }) {
      return email ? `${name} — [${email}]` : ''
    }
  },
  created() {
    this.fetchHouses();
  },
};
</script>
<style></style>
<style scope src="vue-multiselect/dist/vue-multiselect.min.css"></style>
