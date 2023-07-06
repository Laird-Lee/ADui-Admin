import axios from "axios";

interface Request {
    [props: string]: (url: string, data: object, config?: object) => Promise<any[]>
}

export function useRequest(url: string, method: 'get' | 'post' | 'patch' | 'delete', data: object, config?: object) {
    const http = axios.create({
        baseURL: `http://localhost:8891/api`
    })

    http.interceptors.request.use(config => {
        if (config.method === 'get') {
            config.params = {
                ...config.params,
                _t: new Date().getTime()
            }
        }
        return config
    })

    http.interceptors.response.use(response => {
        return response.data
    }, error => {
        return Promise.resolve(error.response)
    })

    async function getRequest(url: string, data: object, config?: object) {
        const res = await http.get(url, {params: data, ...config})
        if (res.data.code !== 200) return [res.data, null]
        return [null, res.data.message]
    }

    async function postRequest(url: string, data: object, config?: object) {
        const res = await http.post(url, data, config)
        if (res.data.code !== 200) return [null, res.data.message]
        return [res.data, null]
    }

    async function patchRequest(url: string, data: object, config?: object) {
        const res = await http.patch(url, data, config)
        if (res.data.code !== 200) return [null, res.data.message]
        return [res.data, null]
    }

    async function deleteRequest(url: string, data: object, config?: object) {
        const res = await http.delete(url, data)
        if (res.data.code !== 200) return [null, res.data.message]
        return [res.data, null]
    }

    const request: Request = {
        get: getRequest,
        post: postRequest,
        patch: patchRequest,
        delete: deleteRequest,
    }

    return request[method](url, data, config)
}
