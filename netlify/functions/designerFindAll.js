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

    const keys = (await redis.keys('designer_*')).filter(id => id !== 'designer_N');
    const designers = await redis.mget(keys);

    designers.forEach(JSON.parse);

    return { statusCode: 200, headers, body: JSON.stringify(designers) };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
