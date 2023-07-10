import {defineStore} from "pinia";
import {useRequest} from "@adui/request";


interface DictSate {
    dictMap: any
}

export const useDictStore = defineStore('dict', {
    state: (): DictSate => {
        return {
            dictMap: {}
        }
    },
    getters: {
        dict(state) {
            return (dictCode: string) => {
                return state.dictMap[dictCode]
            }
        }
    },
    actions: {
        loadDict(dictCode: string) {
            return new Promise(async resolve => {
                const [res, err] = await useRequest(`/dict/get-by-code/${dictCode}`, 'get', {})
                if (res) {
                    this.dictMap[dictCode] = res
                    resolve(res)
                }
                if (err) {
                    resolve([])
                }
            })

        },
        async getDict(dictCode: string) {
            if (this.dictMap[dictCode]) {
                return this.dictMap[dictCode]
            } else {
                const dict = await this.loadDict(dictCode)
                return dict
            }
        }
    }
})
