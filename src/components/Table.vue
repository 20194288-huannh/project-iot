<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
      </slot>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td
            v-for="column in columns"
            :key="column"
            v-if="hasValue(item, column)"
          >
            <VueToggle
              v-if="column == 'Is Active'"
              title=" "
              :toggled="itemValue(item, column) == 1"
              name="VueToggle"
              @toggle="changeToggle(item)"
            />
            <b-input-group v-else-if="column == 'Param'" class="input">
              <b-form-input
                v-model="item['param']"
                type="number"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  size="sm"
                  @click="callApi(item)"
                  text="Button"
                  variant="success"
                  >OK</b-button
                >
              </b-input-group-append>
            </b-input-group>
            <span v-else>{{ itemValue(item, column) }}</span>
          </td>
          <td style="width: 40px">
            <b-button
              @click="deleteItem(item.id)"
              variant="danger"
              class="mr-2"
            >
              <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
            </b-button>
            <b-button
              @click="edit(item.id)"
              v-if="hidden != 'edit'"
              variant="primary"
            >
              <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
            </b-button>
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ControlService from "../services/control.service";
import VueToggle from "vue-toggle-component/src/vue-toggle-component";
export default {
  name: "l-table",
  components: {
    VueToggle,
  },
  data() {
    return {
      param: null,
    };
  },
  props: {
    columns: Array,
    data: Array,
    tableName: String,
    hidden: {
      type: String,
      default: "",
    },
  },
  methods: {
    hasValue(item, column) {
      return (
        item[
          column
            .match(
              /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
            )
            .map((x) => x.toLowerCase())
            .join("_")
        ] !== "undefined"
      );
    },
    itemValue(item, column) {
      return item[
        column
          .match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
          )
          .map((x) => x.toLowerCase())
          .join("_")
      ];
    },
    async deleteItem(id) {
      const result = await this.$swal({
        title: "Are you sure?",
        html: "Once deleted, there is no going back",
        icon: "warning",
        showCancelButton: true,
        dangerMode: true,
      });
      if (result.value) {
        this.$emit("delete", id);
      }
    },
    edit(id) {
      this.$emit("edit", id);
    },
    changeToggle(item) {
      item["is_active"] = item["is_active"] ? 0 : 1;
      this.callApi(item);
    },
    callApi(item) {
      ControlService.controlDevice(item.id, item).then(
        (response) => {
          this.$toastr.s("Update Successfully");
        },
        (error) => {
          // show toast
        }
      );
    },
  },
};
</script>

<style>
.input {
  width: 100px;
}
</style>
