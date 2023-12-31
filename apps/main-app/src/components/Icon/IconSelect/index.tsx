import * as allIcon from '@ant-design/icons-vue'
import {Row, Col, Radio, Divider, Input, Popover, Button} from 'ant-design-vue'
import {Icon} from "@/components/Icon";
import './index.less'

export const IconSelect = defineComponent({
  props: {
    placeholder: String,
    modelValue: {
      type: String,
      required: true
    },
  },
  emits: ['update:modelValue'],
  setup({placeholder, modelValue}, {emit}) {
    const visible = ref(false)
    const originValue = ref(modelValue)
    return () => {
      const inputRef = ref(null)
      return <div>
        <Popover open={visible.value} placement="bottomLeft" style={{width: '300px'}}
                 v-slots={{
                   content: () => <SelectContent modelValue={originValue.value}
                                                 onClose={() => {
                                                   visible.value = false
                                                 }}
                                                 onSelect={val => {
                                                   originValue.value = val
                                                   emit('update:modelValue', val)
                                                   visible.value = false
                                                 }}/>
                 }}>
          <Input ref={inputRef} v-slots={{
            addonBefore: () => ShowIcon(originValue.value)
          }} allowClear={true} onChange={e => {
            originValue.value = e.target.value || ''
          }} placeholder={placeholder} value={originValue.value} onFocus={() => {
            visible.value = true
          }}></Input>
        </Popover>
      </div>
    }
  }
})


const SelectContent = defineComponent({
  props: {
    modelValue: {
      required: true,
      type: String
    },
  },
  emits: ['select', 'close'],
  setup(props, {emit}) {
    const isFirstCapital = (str: string) => {
      return str.charAt(0) === str.charAt(0).toUpperCase();
    }

    const iconList = allIcon as { [p: string]: any }

    const icons = Object.keys(iconList).filter(x => {
      return isFirstCapital(x)
    })
    const outlined = icons.filter(x => x.includes('Outlined'))
    const filled = icons.filter(x => x.includes('Filled'))
    const two = icons.filter(x => x.includes('TwoTone'))

    const activeType = ref('outlined')

    return () => {
      const isActive = (item: string) => {
        return item === props.modelValue
      }
      return <div style={{width: '300px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Radio.Group value={activeType.value} onChange={e => {
            activeType.value = e.target.value
          }} size="small">
            <Radio.Button value="outlined">线框风格</Radio.Button>
            <Radio.Button value="filled">实底风格</Radio.Button>
            <Radio.Button value="two">双色风格</Radio.Button>
          </Radio.Group>
          <Button type={'link'} onClick={() => {
            emit('close')
          }}>关闭</Button>
        </div>
        <Divider></Divider>
        <div style={{height: '300px', width: '100%', padding: '2px', overflowY: 'scroll', overflowX: 'hidden'}}>
          <Row gutter={[2, 8]}>
            {activeType.value === 'outlined' ? outlined.map(x => {
              const SingleIcon = iconList[x]
              return <Col span={3}>
                <div class={{'icon-select-grid': true, 'icon-select-active': isActive(x)}}
                     onClick={() => {
                       emit('select', x)
                     }}>
                  <SingleIcon></SingleIcon>
                </div>
              </Col>
            }) : ''}
            {activeType.value === 'filled' ? filled.map(x => {
              const SingleIcon = iconList[x]
              return <Col span={3}>
                <div class={{'icon-select-grid': true, 'icon-select-active': isActive(x)}}
                     onClick={() => {
                       emit('select', x)
                     }}>
                  <SingleIcon></SingleIcon>
                </div>
              </Col>
            }) : ''}
            {activeType.value === 'two' ? two.map(x => {
              const SingleIcon = iconList[x]
              return <Col span={3}>
                <div class={{'icon-select-grid': true, 'icon-select-active': isActive(x)}}
                     onClick={() => {
                       emit('select', x)
                     }}>
                  <SingleIcon></SingleIcon>
                </div>
              </Col>
            }) : ''}
          </Row>
        </div>
      </div>
    }
  }
})

const ShowIcon = (type: string) => {
  return <>
    {type ? <Icon type={type}/> : <span style={{display: 'inline-block', width: '14px', height: '14px'}}></span>}
  </>
}
