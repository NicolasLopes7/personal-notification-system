import Client from 'node-telegram-bot-api';

class TelegramService {
  private client: Client;

  private telegramToken = process.env.TELEGRAM_TOKEN || '';
  private groupId = process.env.TELEGRAM_GROUP_ID || '';

  constructor() {
    this.client = new Client(this.telegramToken);
  }

  public async sendMessage(content: string) {
    return await this.client.sendMessage(this.groupId, content);
  }
}

export default new TelegramService();
