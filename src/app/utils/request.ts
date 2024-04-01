import axios from 'axios'

export interface RequestObj {
  baseUrl?: string
  endpoint: string
  data?: any
  method?: string
  contentType?: string
  headers?: {}
}

function serialize(data: any) {
  return Object.keys(data)
    .map((keyName) => `${encodeURIComponent(keyName)}=${data[keyName] ? encodeURIComponent(data[keyName]) : ''}`)
    .join('&')
}

export const toResultObject = (promise: any) => {
  return promise.then((result: any) => ({ success: true, result })).catch((error: Error) => ({ success: false, error }))
}

export async function request({
  baseUrl = '',
  endpoint = '',
  data = null,
  method = 'GET',
  contentType = 'application/json',
  headers = {},
  ...config
}: RequestObj) {
  let url = `${baseUrl}/${endpoint}`
  url = method === 'GET' && data !== null ? `${url}?${serialize(data)}` : url
  // console.log(url)

  const options = {
    url,
    method,
    data:
      data === null || method === 'GET' ? undefined : contentType === 'application/json' ? JSON.stringify(data) : data,
    headers: {
      // Accept: 'application/json',
      'Content-Type': contentType,
      ...headers,
    },
    ...config,
  }

  return axios.request(options)
}