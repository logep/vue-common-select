<template>
    <div>
        <ui-select widthSl="163" :props="{value:'value',label:'label'}" v-model="code"
                          :fetchData="fetchSelData" >
            <template slot-scope="{ item }">
                <div>{{ item.label }}</div>
            </template>
        </ui-select>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                code:'',
                show: false
            }
        },
        methods:{
            fetchSelData() {
                return new Promise((resolve, reject) => {
                            resolve([
                    {
                        value: 1,
                            label: '第一个数据'
                    },{
                        value: 2,
                            label: '第2个数据'
                    },{
                        value: 3,
                            label: '第③个数据'
                    }]
                            )
                })
            },
        },
    }
</script>

