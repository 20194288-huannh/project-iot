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
              :data="users"
              @delete="deleteItem"
              @edit="edit"
            >
            </l-table>
          </card>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-user"
      ref="modal"
      :title="selected_user_id ? 'UPDATE USER' : 'CREATE USER'"
      header-bg-variant="dark"
      header-text-variant="light"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Name">
          <b-form-input v-model="user.name"></b-form-input>
        </b-form-group>
        <b-form-group label="Phone Number" label-for="phone-number-input">
          <b-form-input
            id="name-input"
            v-model="user.phone_number"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Email" label-for="email-input">
          <b-form-input v-model="user.email"></b-form-input>
        </b-form-group>
        <b-form-group label="Password" label-for="password-input" v-if="!selected_user_id">
          <b-form-input type="password" v-model="user.password"></b-form-input>
        </b-form-group>
      </form>
      <template #modal-footer>
        <div class="w-100">
          <b-button variant="success" class="mr-2" @click="handleSubmit">
            {{ selected_user_id ? "Update" : "Create" }}
          </b-button>
          <b-button variant="danger" @click="cancel"> Cancel </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";
const tableColumns = ["Id", "Name", "Phone Number", "Email"];
const API_URL = "http://127.0.0.1:8085//";
export default {
  components: {
    LTable,
    Card,
  },
  data() {
    return {
      users: [],
      table1: {
        columns: [...tableColumns],
      },
      selected_user_id: null,
      user: {},
    };
  },
  methods: {
    create() {
      this.selected_user_id = null;
      this.$bvModal.show("modal-user");
    },
    edit(id) {
      this.selected_user_id = id;
      this.fetchUser(id);
      this.$bvModal.show("modal-user");
    },
    deleteItem(id) {
      this.selected_user_id = id
      UserService.deleteUser(this.selected_user_id).then(
        (response) => {
          this.fetchUsers();
          this.$toastr.s("Delete User Successfully", "SUCCESS MESSAGE");
        },
        (error) => {
          // show toast
        }
      );
    },
    resetModal() {
      this.user = {};
    },
    handleSubmit() {
      // Hide the modal manually
      if (this.selected_user_id) {
        UserService.updateUser(this.selected_user_id, this.user).then(
          (response) => {
            this.fetchUsers();
            this.$bvModal.hide("modal-user");
            this.$toastr.s("Update House Successfully");
          },
          (error) => {
            // show toast
          }
        );
      } else {
        UserService.createUser(this.user).then(
          (response) => {
            this.fetchUsers();
            this.$bvModal.hide("modal-user");
            this.$toastr.s("Create House Successfully");
          },
          (error) => {
            // show toast
          }
        );
      }
    },
    handleOk() {},
    fetchUsers() {
      UserService.getAllUser().then(
        (response) => {
          this.users = response.data;
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    fetchUser(id) {
      UserService.getUserById(id).then(
        (response) => {
          this.user = response.data;
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    cancel() {
      this.$bvModal.hide("modal-user");
    }
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style></style>
