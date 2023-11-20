"use strict";
const { Redis } = require('ioredis');
const client = new Redis({
    port: 18181, // Redis port
    host: "redis-18181.c44.us-east-1-2.ec2.cloud.redislabs.com", // Redis host
    username: "default", // needs Redis >= 6
    password: "QmtiJzIOimHlSVw0ZwOb6K8NagC14GJj",
    db: 0, // Defaults to 0
  });
module.exports = client;

// String connection:
// redis-cli -u redis://default:QmtiJzIOimHlSVw0ZwOb6K8NagC14GJj@redis-18181.c44.us-east-1-2.ec2.cloud.redislabs.com:18181