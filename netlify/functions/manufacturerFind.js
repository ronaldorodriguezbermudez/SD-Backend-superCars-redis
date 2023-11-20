"use strict";

const redis = require('./redisDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const id = parseInt(event.path.split("/").reverse()[0]);

    redis.on("connect", () => {
      console.log("Ahora estás conectado a Redis");
    });

    const manufacturer = await redis.get('manufacturer_' + id);
    let manufacturers = [];
    
    if (manufacturer) {
      manufacturers.push(manufacturer);
      manufacturers = manufacturers.map(JSON.parse);
    }

    return { statusCode: 200, headers, body: JSON.stringify(manufacturers) };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
