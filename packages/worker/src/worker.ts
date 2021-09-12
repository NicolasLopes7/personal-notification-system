require('dotenv').config();
import notifier from 'node-notifier';
import mqtt from 'mqtt';
import ApiService from './services/api.service';

const client = mqtt.connect('mqtt://broker.hivemq.com');

client.subscribe(`${process.env.MQTT_BASE_TOPIC}/${process.env.DEVICE_ID}`);

client.on('message', (topic, message) => {
  const body = JSON.parse(message.toString());

  notifier.notify({
    title: 'remind!',
    message: body.name,
    wait: true,
  });

  notifier.on('click', async () => {
    await ApiService.sendPostback(body.id, true);
  });

  notifier.on('close', async () => {
    await ApiService.sendPostback(body.id, true);
  });

  notifier.on('timeout', async () => {
    await ApiService.sendPostback(body.id, false);
  });
});
