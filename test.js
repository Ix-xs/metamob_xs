const { metamob_xs } = require("./main");

const client = new metamob_xs({ apiKey:"5523c5-3f0c18-cbf1d5-7e6113-f6d6d1" });

client.PUT.resetUserMonsters("popop", "99f82a-1163d8-74bfb3-6857bd-044d2b").then(console.log)