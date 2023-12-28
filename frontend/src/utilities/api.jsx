import axios from 'axios'

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/"
})

export const endpoints = {
    "auth_login":"user/login/",
    "get_pyramid":"user/login/",
    
}
export const postAPI = async (url, encodedParams = null, data=null) => {
    try {
        let urlString = url
        if(encodedParams != null){
            urlString += `?${encodedParams}`
        }
        let json = ""
        if(data != null){
            json = data
        }

        const response = await api.post(urlString, json);
        if (response.status == 201 || response.status == 200){
            return {status:true, data:response.data}
        }else{
            throw new Error("Something went wrong");
        }
    }
    catch (error){
        console.log(error)
        return {status:false, error:error}
        
    }
}
export const deleteAPI = async (url, encodedParams = null, data=null) => {
    try {
        let urlString = url
        if(encodedParams != null){
            urlString += `?${encodedParams}`
        }
        let json = ""
        if(data != null){
            json = data
        }

        const response = await api.delete(urlString, json);
        console.log(response)
        if (response.status == 201 || response.status == 200 || response.status == 204){
            return {status:true, data:response.data}
        }else{
            throw new Error("Something went wrong");
        }
    }
    catch (error){
        console.log(error)
        return {status:false, error:error}
        
    }
}


export const getAPI = async (url, encodedParams = null) => {
    try {
        let urlString = url
        if(encodedParams != null){
            urlString += `?${encodedParams}`
        }
        const response = await api.get(urlString);
        console.log(response)
        if (response.status == 200){
            return {status:true, data:response.data}
        }else{
            throw new Error("Something went wrong");
        }
    }
    catch (error){
        console.log(error)
        return {status:false, error:error}
        
    }
}