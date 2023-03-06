import axios from "axios";

const API_URL = 'http://127.0.0.1:8085//';

export const http = axios.create({
  baseURL: API_URL,
})