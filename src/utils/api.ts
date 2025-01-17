import axios, { AxiosError } from 'axios';
import { ApiError } from 'src/models/Api';
import { handleGetAccessToken } from './auth';

const BASE_URL = 'http://localhost:8000/api/v1';

// prettier-ignore
export const useApi = async <TypeDataResponse>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: object,
  withAuth: boolean = true
): Promise<{
  data?: TypeDataResponse,
  detail: string
}> => {
  // lógica de authentication
  const access_token = handleGetAccessToken();
  let headers = {};
  
  if(withAuth && access_token) {
    
    headers['Authorization'] = `Bearer ${access_token}`;
  }
  try {
    const request = await axios(`${BASE_URL}/${endpoint}`, {
      method: method,
      data: method != 'GET' && data,
      params: method == 'GET' && data,
      headers: headers
    });
  
    return {
      data: request.data,
      detail: ''
    };
  }catch(e) {
    const error = e as AxiosError<ApiError>;

    return {
      data: null,
      detail: error.response.data.detail || error.message
    }
  }
  
};
