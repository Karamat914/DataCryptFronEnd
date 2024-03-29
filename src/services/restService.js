// import axios from 'axios'
// import { HOST_API } from 'src/config';

// const Axios = axios.create({
//     baseURL: HOST_API,
//     // timeout: 1000,
//     // headers: {'X-Custom-Header': 'foobar'}
// });
import { setLoading } from '@/redux/slices/user'
import { store } from '@/redux/store'
import api from './api'
export const post = async (url, data, loading = true, auth = true) => {
    // const { headers } = await header(loading, auth)
    store.dispatch(setLoading(loading))
    return new Promise((resolve, reject) => {
        api.post(url, data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        }).finally(() => {
          store.dispatch(setLoading(false))
        })
    })
}
export const patch = async (url, data, loading = true, auth = true) => {
    store.dispatch(setLoading(loading)); // Dispatch loading action
    return new Promise((resolve, reject) => {
        api.patch(url, data) // Make a PATCH request using Axios
            .then(res => {
                resolve(res); // Resolve the promise with the response data
            })
            .catch(err => {
                reject(err); // Reject the promise with the error
            })
            .finally(() => {
                store.dispatch(setLoading(false)); // Dispatch loading action when request completes
            });
    });
}

export const deleteReq = async (url, data, loading = true, auth = true) => {
    return new Promise((resolve, reject) => {
        api.delete(url, {headers: data}).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        }).finally(()=> {
        //   store.dispatch(setLoading(false))
        })
    })
}

export const get = async (url, loading = true, auth = true) => {
    return new Promise((resolve, reject) => {
        api.get(url).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        }).finally(() => {
        //   store.dispatch(setLoading(false))
        })
    })
}