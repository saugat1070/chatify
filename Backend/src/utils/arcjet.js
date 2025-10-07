import arcjet, { shield, detectBot, tokenBucket, slidingWindow } from "@arcjet/node";
import { envConfig } from "../config/envConfig.js";

const aj = arcjet({
  key: envConfig.arcjetKey,
  mode : "MONITOR",
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),

/*     tokenBucket({
      mode: "LIVE",
      refillRate: 5, //refill 5 tokens per interval
      interval: 10, //refill every 10 seconds
      capacity: 10, //bucket capacity of 10 tokens
    }), */

    slidingWindow({
        mode : "LIVE", //blocks requests.
        max : 5,
        interval : 60
    })
  ],
  allow : [
    {origin : "http://localhost:3000"},
    {ip:"127.0.0.1"}
  ]
});


export default aj;