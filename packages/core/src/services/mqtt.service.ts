import mqtt, { MqttClient } from 'mqtt';

class MQTTService {
  private client: MqttClient;

  constructor() {
    this.client = mqtt.connect('mqtt://broker.hivemq.com');
  }

  public sendMessageToTopic(topic: string | number, message: string) {
    if (this.client.connected) {
      return this.client.publish(
        `${process.env.MQTT_BASE_TOPIC}/${topic}`,
        message
      );
    }

    this.sendMessageToTopic(topic, message);
  }
}

export default MQTTService;
