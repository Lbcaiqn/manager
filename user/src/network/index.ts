import axios,{AxiosInstance,AxiosRequestConfig,AxiosResponse} from 'axios'
const baseURL = 'http://localhost:8000'
let instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 1000 * 60
})
instance.interceptors.request.use((config: AxiosRequestConfig) => {
    
    if(/.*\/token\/.*/.test(config.url as string)){
      let token: string = JSON.parse(localStorage.getItem('mainStore') as string) ? JSON.parse(localStorage.getItem('mainStore') as string)?.token : '';
      config.headers!.Authorization = token;
    }
  return config
})
instance.interceptors.response.use((res: AxiosResponse) => {
  return res
})

function logupReq(username: string, password: string): Promise<AxiosResponse>{
  return instance({
    url: '/logup',
    method: 'POST',
    data: {
        username,
        password
    }
   
  })
}

function loginReq(username: string, password: string): Promise<AxiosResponse>{
  return instance({
    url: '/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

function readRoleReq(): Promise<AxiosResponse>{
  return instance({
    url: '/token/readRole',
    method: 'GET',
    
  })
}
function createRoleReq(role:any): Promise<AxiosResponse>{
  return instance({
    url: '/token/createRole',
    method: 'POST',
    data: {
      role
    }
  })
}

function updateRoleReq(role:any, oldRoleName: string): Promise<AxiosResponse>{
    return instance({
      url: '/token/updateRole',
      method: 'PUT',
      data: {
        role,
        oldRoleName
      }
    })
}

function readUserReq(): Promise<AxiosResponse>{
    return instance({
      url: '/token/readUser',
      method: 'GET',
    })
}
function createUserReq(userData: any): Promise<AxiosResponse>{
    return instance({
      url: '/token/createUser',
      method: 'POST',
      data: {
        userData
      }
    })
}
function updateUserReq(userData: any, username: string): Promise<AxiosResponse>{
    return instance({
      url: '/token/updateUser',
      method: 'PUT',
      data: {
        userData,
        username
      }
    })
}

export {
  logupReq,
  loginReq,
  readRoleReq,
  createRoleReq,
  updateRoleReq,
  
  readUserReq,
  createUserReq,
  updateUserReq,
}
