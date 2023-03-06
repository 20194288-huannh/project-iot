import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8085/';

class ControlService {
  controlDevice(device_id, device) {
    return axios.put(API_URL + `device/${device_id}/control`, device, { headers: authHeader() });
  }
}

export default new ControlService();