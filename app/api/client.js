import { create } from 'apisauce';

const client = create({
    baseURL: 'http://192.168.1.4:7000/api'
})

export default client;