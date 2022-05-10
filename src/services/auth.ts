import { IUser } from "../types/user";
import { get, post, RequestBody } from "./request";

export const fetchVerifyUser = (): Promise<IUser> => get('/api/v1/auth/verify')

export const fetchSignup = (body: RequestBody): Promise<IUser> => post('/api/v1/auth/signup', body)

export const fetchLogin = (body: RequestBody): Promise<IUser> => post('/api/v1/auth/login', body)

export const fetchLogout = (): Promise<{ logout: true }> => get('/api/v1/auth/logout')