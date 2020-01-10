import mqtt from "mqtt";

const MQTT_SERVICE = "ws://192.168.200.99:1884/mqtt";
const MQTT_USERNAME = "admin";
const MQTT_PASSWORD = "public";

const options = {
  connectTimeout: 40000,
  // clientId: 'mqtitId-Home',
  clientId:
    "mqttjs_" +
    Math.random()
      .toString(16)
      .substr(2, 8),
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
  clean: false,
  retain: true,
  properties: {
    receiveMaximum: 1
  }
};

export { mqtt, MQTT_SERVICE, options };
