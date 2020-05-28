<template>
    <b-container class='container'>
        <b-input-group class="mt-3 mb-3" size="sm">
            <b-form-input v-model="keyword" placeholder="Поиск по имени" type="text"></b-form-input>
            <b-input-group-text slot="append">
                <b-button class="p-0" :disabled="!keyword" variant="link" size="sm" @click="keyword = ''"><i class="fa fa-remove"></i></b-button>
            </b-input-group-text>
        </b-input-group>

        <b-pagination
            v-model='currentPage'
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="list"
            align='fill'
            ></b-pagination>

        <b-table
            id='list'
            :fields='fields'
            :items='items'
            :busy='isBusy'
            :per-page='perPage'
            :currentPage='currentPage'
            sort-icon-left
            striped
            bordered
            hover>
            <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Загрузка...</strong>
                </div>
            </template>
            <template v-slot:cell(Salary)="data">
                <p style='textAlign: right'>{{data.value}}</p>
            </template>
        </b-table>

        <b-pagination
            v-model='currentPage'
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="list"
            align='fill'
            ></b-pagination>
    </b-container>
    
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    name: 'List',
    data: function() {
        return {
            keyword: '',
            currentPage: 1,
            perPage: 20,
            isBusy: false,
            fields: [
               {
                   key: 'Name',
                   sortable: true
               },
               {
                   key: 'Position',
                   sortable: true
               },
               {
                   key: 'Office',
                   sortable: true
               },
               {
                   key: 'Age',
                   sortable: true
               },
               {
                   key: 'startDate',
                   sortable: true
               },
               {
                   key: 'Salary',
                   sortable: true,
               },
               {
                   key: 'Currency',
                   sortable: true
               }

           ]
        }
    },
    methods: {
        ...mapGetters({
            getListData: 'getListData'
        }),
        ...mapActions({
            populateList: 'populateList'
        }),
        toggleBusy() {
            this.isBusy = !this.isBusy;
        }
    },
    computed: {
        listData: function(){
            return this.getListData();
        },
        rows() {
            return this.listData.length;
        },
        items () {
            let searchResults = this.keyword
                ? this.listData.filter(item => item.Name.startsWith(this.keyword))
                : this.listData;
            if (searchResults.length === 0) {
                return [{
                    Name: 'Нет данных для отображения'
                }]
            }
            return searchResults;
        }
    },
    mounted: function() {
        this.toggleBusy();
        this.populateList();
        this.toggleBusy();
    }
}
</script>

<style scoped>
.container {
    margin-top: 100px;
}
</style>