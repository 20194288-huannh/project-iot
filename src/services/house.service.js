import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8085/';

class HouseService {
  getAllHouse() {
    return axios.get(API_URL + 'house', { headers: authHeader() });
  }
  getHouseById(id) {
    return axios.get(API_URL + `house/${id}`, { headers: authHeader() });
  }
  getAllHouseOfhouse(house_id) {
    return axios.get(API_URL + `house/${house_id}/house`, { headers: authHeader() });
  }
  deleteHouse(house_id) {
    return axios.delete(API_URL + `house/${house_id}/delete`, { headers: authHeader() });
  }
  updateHouse(house_id, house) {
    return axios.put(API_URL + `house/${house_id}/update`, house, { headers: authHeader() });
  }
  createHouse(house) {
    return axios.post(API_URL + `user/${house.user_id}/house`, house, { headers: authHeader() });
  }
}

export default new HouseService();