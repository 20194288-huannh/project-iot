import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8085/';

class RoomService {
  getAllRoom(house_id) {
    return axios.get(API_URL + `house/${house_id}/rooms`, { headers: authHeader() });
  }
  getRoomById(id) {
    return axios.get(API_URL + `room/${id}`, { headers: authHeader() });
  }
  getAllHouseOfUser(house_id) {
    return axios.get(API_URL + `house/${house_id}/house`, { headers: authHeader() });
  }
  deleteRoom(house_id, room_id) {
    return axios.delete(API_URL + `house/${house_id}/room/${room_id}/delete`, { headers: authHeader() });
  }
  updateRoom(house_id, room_id, room) {
    return axios.post(API_URL + `house/${house_id}/room/${room_id}/update`, room, { headers: authHeader() });
  }
  createRoom(house_id, room) {
    return axios.post(API_URL + `house/${house_id}/room`, room, { headers: authHeader() });
  }
}

export default new RoomService();