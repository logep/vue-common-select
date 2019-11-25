import './styles/base.less'
import './styles/icons.css'
import List from './components/list'
import ExpandTransition from './components/expandTransition'
import Select from './components/select'
import SelectCommon from './components/select'
// 这个拿来使用可以直接引入  {Select} from '' UiSelect和SelectCommon 两个都可以使用
import UiSelect from './components/select/select'
export const install = (Vue, option = {}) => {
    Vue.use(Select)
    Vue.use(List)
    Vue.component(ExpandTransition.name, ExpandTransition) // 可以通过{expandTransition} from '' 引入
    Vue.component(Select.name, Select) //
}
export default {
    install,
}
export {
    UiSelect, //可以通过{expandTransition} from '' 引入  不能放入 default里
    SelectCommon
}
