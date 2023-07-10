import * as allIcon from '@ant-design/icons-vue'

interface PropsInterface {
    type: string

    [props: string]: any
}

const Icon = (props: PropsInterface) => {
    const iconList = allIcon as { [props: string]: any }
    const SingleIcon = iconList[props.type]
    return <>
        <SingleIcon></SingleIcon>
    </>
}

export {
    Icon
}
