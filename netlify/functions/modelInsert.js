"use strict";

const redis = require('./redisDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    redis.on("connect", () => {
      console.log("Ahora estás conectado a Redis");
    });

    const data = JSON.parse(event.body);
    const result = await redis.set('model_' + data.id, event.body);
    console.log({ result });

    if (result) {
      await redis.incr('model_N');
    }

    return { statusCode: 200, headers, body: 'OK' };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
