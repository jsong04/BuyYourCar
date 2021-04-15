import { create } from 'apisauce';

const client = create({
    baseURL: 'http://172.22.112.53:7000/api'
})

export default client;