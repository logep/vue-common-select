
<h2 align="center">vue-common-select</h2>
Vue components library.

还在持续开发中……
```bash
npm login
npm publish


#第一种引入方式
#uiSelect  组件引用方式（建立在element-ui select组件基础上）

import PingUI from 'vue-common-select' // 名字随意
Vue.use(PingUI)
#第2种引入方式
import {uiSelect} from 'vue-common-select'

##基本属性支持 disabled  placeholder 等

```
```bash
 fetchSelData(param) {
 // 自己自定义的查询参数 customerName  返回一个promise
      if (param) param = {...param, customerName: param.name}
      return new Promise((resolve, reject) => {
            resolve(res.result)
      })
    },

```


#第一种基本用法 默认 展示的name属性 值是code

```bash
       <ui-select :fetchData="fetchSelData" widthSl="163" v-model="id">
                    </ui-select>
```

## 第二种基本用法 自定义 属性展示 自定义列表样式  值是id  展示item.name 里这个name自定义

```bash
       <ui-select :fetchData="fetchSelData" widthSl="163" :props="{value:'id'}" v-model="id">
        <template slot-scope="{ item }">
                             <div>{{ item.name }}</div>
                             </template>
                    </ui-select>
```

# 第三种基本用法 自定义 url 不需要写 fetchData方法

```bash
       <ui-select widthSl="163" :props="{value:'id',url:'/XXX?ccc'}" v-model="id">
        <template slot-scope="{ item }">
                             <div>{{ item.name }}</div>
                             </template>
                    </ui-select>
```

## 第四种基本用法 默认回写值 在编辑表格时需要可参考  弹出页面时syncBoolean设置true


```bash
syncData=[{value:'',label:''}] 就是下拉框options的值 才能回写成功
       <ui-select widthSl="163"
          :isEdit.sync="syncBoolean"
           :selId.sync="syncData"
       :props="{value:'id',url:'/XXX?ccc'}" v-model="id">
        <template slot-scope="{ item }">
                             <div>{{ item.name }}</div>
                             </template>
                    </ui-select>
```

# 部分截图
<img src="https://github.com/logep/vue-common-select/tree/master/examples/assets/home.png"/>

# 测试远程分支和本地分支不同命问题
