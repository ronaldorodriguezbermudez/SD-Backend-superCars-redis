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

    const keys = (await redis.keys('manufacturer_*')).filter(id => id !== 'manufacturer_N');
    const manufacturers = await redis.mget(keys);


    const parsedmanufacturers = manufacturers.map(manufacturer => JSON.parse(manufacturer));

    return { statusCode: 200, headers, body: JSON.stringify(parsedmanufacturers) };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
