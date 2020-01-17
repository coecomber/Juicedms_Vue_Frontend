import axios from 'axios'

const eurekaServer = axios.create({
    baseURL: 'http://217.101.44.31:8761/instance/',
    withCredentials: false
});

export default {
    getInstance(instanceName) {
        return eurekaServer.get("getByName/" + instanceName);
    }
}