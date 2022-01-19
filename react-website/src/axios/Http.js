import axios from "axios";

const request = (method, url, data, headers) => {
    return axios({
        method,
        url: url,
        data,
        headers
    }).then(result => result.data)
        .catch(result => {
            const { status } = result.response
            throw result.response
        })
}

export default request;
