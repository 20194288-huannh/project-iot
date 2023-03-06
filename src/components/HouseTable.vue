<template>
<table class="table">
    <thead>
        <slot name="columns">
            <tr>
                <th v-for="column in columns" :key="column">{{column}}</th>
            </tr>
        </slot>
    </thead>
    <tbody>
        <tr v-for="(item, index) in data" :key="index">
            <slot :row="item">
                <td v-for="column in columns" :key="column" v-if="hasValue(item, column)">
                    <router-link v-if="column == 'Name'" :to="`/admin/house/${itemValue(item, 'ID')}`">{{itemValue(item, column)}}</router-link>
                    <span v-else>{{itemValue(item, column)}}</span>
                </td>
                <td>
                    <b-button @click="deleteItem(item.id)" variant="danger" class="mr-2">
                        <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                    </b-button>
                    <b-button @click="edit(item.id)" variant="primary">
                        <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
                    </b-button>
                </td>
            </slot>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    name: 'house-table',
    props: {
        columns: Array,
        data: Array,
    },
    methods: {
        hasValue(item, column) {
            return item[column.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                .map(x => x.toLowerCase())
                .join('_')] !== 'undefined'
        },
        itemValue(item, column) {
            return item[column.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                .map(x => x.toLowerCase())
                .join('_')]
        },
        async deleteItem(id) {
            const result = await this.$swal({
                title: 'Are you sure?',
                html: 'Once deleted, there is no going back',
                icon: 'warning',
                showCancelButton: true,
                dangerMode: true
            })
            if (result.value) {
                this.$emit('delete', id)
            }
        },
        edit(id) {
            this.$emit('edit', id)
        }
    }
}
</script>

<style>
</style>
