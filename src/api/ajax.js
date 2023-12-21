import axios from "axios";
let requests = axios.create({
    baseURL: '/API'
})
export default requests