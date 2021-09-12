import axios, { AxiosInstance } from 'axios';
class APIService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000',
    });
  }

  async sendPostback(alarmId: string, interacted: boolean) {
    try {
      await this.api.post(`/alarm/postback/${alarmId}`, { interacted });
    } catch (error) {
      return null;
    }
  }
}

export default new APIService();
