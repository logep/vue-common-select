<template>
    <el-select ref="site"
               filterable remote clearable
               :remote-method="remoteMethod"
               :value="value"
               size="mini"
               @keyup.native.delete="keyboardDetel"
               @input="onChange($event)"
               @focus="focus" :style="{width:widthSl+'px'}"
               :disabled="disabled"
               :placeholder="placeholder">
        <el-option v-for="(item, index) in options"
                   :key="index" :label="item[label]" :value="item[code]">
            <slot :item="item" v-if="$scopedSlots.default"></slot>
            <template  v-else>{{item.name}}</template>
        </el-option>
    </el-select>
</template>

<script>
    import {Select,Option,OptionGroup} from 'element-ui';
    import axios from 'axios'
     const isEmpty = function(val) {
        // null or undefined
        if (val == null) return true;

        if (typeof val === 'boolean') return false;

        if (typeof val === 'number') return !val;

        if (val instanceof Error) return val.message === '';

        switch (Object.prototype.toString.call(val)) {
            // String or Array
            case '[object String]':
            case '[object Array]':
                return !val.length;

            // Map or Set or File
            case '[object File]':
            case '[object Map]':
            case '[object Set]': {
                return !val.size;
            }
            // Plain Object
            case '[object Object]': {
                return !Object.keys(val).length;
            }
        }

        return false;
    };
      const get = (url, params) => {

         return new Promise((resolve, reject) => {
             axios
                 .get(url, {
                     params: params
                 })
                 .then(
                     response => {
                         resolve(response.data)
                     },
                     err => {
                         reject(err)
                     }
                 )
                 .catch(error => {
                     reject(error)
                 })
         })
     }
    const DefaultProps = {
        value: 'code',
        label: 'name',
        queryStr:'',
        url:'',
    };
    export default {
        name:'uiSelect',
        props: {

            isFetch: {
                type: Boolean,
                default: false
            },
            isEdit: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '请输入内容'
            },
            fetchData: Function,
            widthSl: {
                type: [Number, String],
                default: 172
            },
            selId: {
                type: [Object,Array, String],
                default: ""
            },
            value: {
                default: ''
            },
            props: Object,
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            config() {
                return Object.assign({ ...DefaultProps }, this.props || {});
            },
            code() {
                return this.config.value;
            },
            label() {
                return this.config.label;
            },
            queryString() {
                return this.config.queryStr || this.config.label;
            },
        },
        created() {

        },
        activated() {

        },

        methods: {
            focus() {
                this.options = []
                this.getUsers()
            },
            blur() {
                this.$refs.site.visible = false
            },
            // 获取接口数据
            getUsers(params) {

                if(this.config.url){
                    let qryStr=this.queryString;
                    let extendsStr={}
                    if(params && params.name)extendsStr[qryStr]=params.name;
                    if (params) params = {...params, ...extendsStr}
                    get(this.config.url, params, false, false).then(
                        res => {
                            if (isEmpty(res)) {
                                this.options = []
                                return
                            }
                            this.options = res.result
                        },
                        reason => {
                            this.options = []
                        }
                    )
                }else{
                    this.fetchData(params).then(
                        res => {
                            if (isEmpty(res)) {
                                this.options = []
                                return
                            }
                            this.options = res
                        },
                        reason => {
                            this.options = []
                        }
                    )
                }

            },
            // 远程搜索方法
            remoteMethod(value) {
                const param = { name: value }
                this.getUsers(param)
            },
            onChange(val) {
                if (!val) {
                    this.$emit('update:selId', '')
                    this.$emit('input', '', null)
                } else {
                    let obj = null
                    this.options.map(item => {
                        if (item.code === val) obj = item
                    })
                    this.$emit('update:selId', obj)
                    this.$emit('input', val, obj)
                }
            },
            keyboardDetel() {
                this.$emit('update:selId', '')
                this.$emit('input', '')
            }
        },
        data() {
            return {
                options: []
            }
        },
        watch: {
            value: {
                handler(value, oldValue) {
                    if (this.isEdit && this.selId) {
                        this.options=this.selId
                        this.$emit('update:isEdit', false)
                    }
                    if (this.isFetch) {
                        const param = { id: value }
                        this.getUsers(param)
                        this.$emit('update:isFetch', false)
                    }
                },
                immediate: true
            }
        }
    }
</script>
