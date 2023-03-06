import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8085/';

class DeviceService {
  getAllDevice() {
    return axios.get(API_URL + 'device', { headers: authHeader() });
  }
  getDeviceById(id) {
    return axios.get(API_URL + `device/${id}`, { headers: authHeader() });
  }
  deleteDevice(device_id) {
    return axios.delete(API_URL + `device/${device_id}/delete`, { headers: authHeader() });
  }
  updateDevice(device_id, device) {
    return axios.post(API_URL + `device/${device_id}/update`, device, { headers: authHeader() });
  }
  createDevice(device) {
    return axios.post(API_URL + `device`, device, { headers: authHeader() });
  }
  getAllDiviceInRoom(room_id) {
    return axios.get(API_URL + `room/${room_id}/devices`, { headers: authHeader() });
  }
  getDiviceInRoom(room_id, device_id) {
    return axios.get(API_URL + `room/${room_id}/device/${device_id}`, { headers: authHeader() });
  }
  deleteDeviceInRoom(room_id, device_id) {
    return axios.delete(API_URL + `room/${room_id}/device/${device_id}/delete`, { headers: authHeader() });
  }
  updateDeviceInRoom(room_id, device_id) {
    return axios.put(API_URL + `room/${room_id}/device/${device_id}/update`, { headers: authHeader() });
  }
  createDeviceInRoom(room_id, device) {
    return axios.post(API_URL + `room/${room_id}/device`, device,{ headers: authHeader() });
  }
}

export default new DeviceService();