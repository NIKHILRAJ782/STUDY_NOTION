import axios from "axios";

// export const axiosInstance = axios.create({});

// export const apiConnector = (method, url, bodyData, headers, params) => {
//     return axiosInstance({
//         method:`${method}`,
//         url:`${url}`,
//         data: bodyData ? bodyData : null,
//         headers: headers ? headers: null,
//         params: params ? params : null,
//     });
// }


export const apiConnector =async (method, url, bodyData, headers, params) => {
    try {
        const result = await axios({
            method : `${method}`,
            url : `${url}`,
            data:bodyData ? bodyData : null,
            headers:headers ? headers : null,
            params:params ? params : null,
        });
        console.log("the result in apiconnector : " , result);
        return result;
    } catch (error) {
     console.log("in api connector : " , error); 
    }
}