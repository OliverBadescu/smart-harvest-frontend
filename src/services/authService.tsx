

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  body?: T;
  message?: string;
}

function api(path: string, method: HttpMethod = 'GET', body: any = null): Promise<Response> {
  const url = `http://www.localhost:8080/user/${path}`;
  const token = localStorage.getItem('token'); 

  const headers: HeadersInit = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options);
}


export async function request<T>(path: string, method: HttpMethod = 'GET', body: any = null): Promise<ApiResponse<T>> {
  try {
    const response = await api(path, method, body);
    let data: any;
    try {
      data = await response.json();
    } catch (e) {
      data = null;
    }

    if (response.status === 200 || response.status === 202 || response.status === 201) {
      return {
        success: true,
        status: response.status,
        body: data as T,
      };
    }

    const errorMessage = (data && data.message) || response.statusText || 'Request failed';
    const error: any = new Error(errorMessage);
    error.status = response.status;
    throw error;
  } catch (error: any) {
    return {
      success: false,
      status: error.status || 500,
      message: error.message || 'Something went wrong',
    };
  }
}



export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  address:string;
  phone:string;
  country:string;
}


export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  address:string;
  phone:string;
  country:string;
  jwtToken:string;
}



export function login(loginRequest: LoginRequest) {

  return request<User>('login', 'POST', loginRequest);
}

export function register(registerRequest: RegisterRequest) {
  return request<User>('register', 'POST', registerRequest);
}

export function getByToken(token:string){
  return request<User>(`getUserByToken/${token}`, 'GET');
}

export function getById(userId: string) {
  return request<User>(`getUserById/${userId}`, 'GET');
}

