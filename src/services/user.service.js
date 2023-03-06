import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8085/';

class UserService {
  getAllUser() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
  getUserById(id) {
    return axios.get(API_URL + `user/${id}`, { headers: authHeader() });
  }
  getAllHouseOfUser(user_id) {
    return axios.get(API_URL + `user/${user_id}/house`, { headers: authHeader() });
  }
  deleteUser(user_id) {
    return axios.delete(API_URL + `user/${user_id}/delete`, { headers: authHeader() });
  }
  updateUser(user_id, user) {
    return axios.post(API_URL + `user/${user_id}/update`, user, { headers: authHeader() });
  }
  createUser(user) {
    return axios.post(API_URL + `user`, user, { headers: authHeader() });
  }
}

export default new UserService();