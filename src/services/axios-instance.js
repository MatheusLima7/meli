const axios = require("axios");
const http = require("http");
const https = require("https");

module.exports = axios.create({
    //10 sec timeout
    timeout: 10000,

    //keepAlive pools and reuses TCP connections, so it's faster
    httpAgent: new http.Agent({ keepAlive: typeof window === "undefined" }),
    httpsAgent: new https.Agent({ keepAlive: typeof window === "undefined" }),

    //follow up to 10 HTTP 3xx redirects
    maxRedirects: 10,

    //cap the maximum content length we'll accept to 50MBs, just in case
    maxContentLength: 50 * 1000 * 1000,
});
