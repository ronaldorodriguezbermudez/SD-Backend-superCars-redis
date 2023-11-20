"use strict";

const redis = require('./redisDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const id = event.path.split("/").reverse()[0];

    redis.on("connect", () => {
      console.log("Ahora estás conectado a Redis");
    });

    const result = await redis.set('manufacturer_' + id, event.body);
    console.log({ result }); // Si es exitoso, muestra 'OK'

    return { statusCode: 200, headers, body: 'OK' };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
