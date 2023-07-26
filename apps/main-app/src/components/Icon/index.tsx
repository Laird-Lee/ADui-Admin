import * as allIcon from '@ant-design/icons-vue'

interface PropsInterface {
    type: string

    [p: string]: any
}

export const Icon = (props: PropsInterface) => {
    const iconList = allIcon as { [p: string]: any }
    const SingleIcon = iconList[props.type]
    return <>
        <SingleIcon></SingleIcon>
    </>
}
