import axios, { AxiosRequestConfig } from "axios"
import ParamModel, { ParamType } from "../models/paramsModel"
import { useSelector } from "react-redux";
import SessionState from "../models/sessionModel";

const apiRoute = "http://localhost:3000/schedule/v1/";

export const Request = async (endpoint: string, method: string, needAuth: boolean | true, params: ParamModel[] | null = null): Promise<any> => {
  const lockScreen = document.getElementsByClassName('lockScreen')[0]
  lockScreen.classList.add('enabled')

  let config: AxiosRequestConfig = {};
  let queryParams = '';

  if (params) {
    config.headers = GetHeaderParams(params!);
    queryParams =  GetQueryParams(params!);

    if(params.some(x => x.type === ParamType.BodyParam)){
      config.data = params.find(x => x.type === ParamType.BodyParam)?.value
    }
  }

  

  if (needAuth) {
    if(!sessionStorage.getItem('session')){
      throw Error('session not exists')
    }
    
    config.headers!["Authorization"] = `Bearer ${sessionStorage.getItem('session')}`
  }
  const url = `${apiRoute}${endpoint}${queryParams}`

  config.url = url;
  config.method = method
  
  const result = await axios(config)
  lockScreen.classList.remove('enabled')
  return result;
}

const GetQueryParams = (params: ParamModel[]): string => {
  let result: string = '';
  params.forEach((x) => {
    if (x.type === ParamType.QueryParam) {
      if (result === '') {
        result += `?${x.key}=${x.value}`
      } else {
        result += `&${x.key}=${x.value}`
      }
    }
  })
  return result;
}


const GetHeaderParams = (params: ParamModel[]) => {
  const result: AxiosRequestConfig["headers"] = {};
  params.forEach(x => {
    if (x.type === ParamType.HeaderParam) {
      result[x.key!] = x.value;
    }
  })
  return result;
}