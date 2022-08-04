module.exports = ({ env }) => ({
     "session": {
        "enabled": true,
        "client": "cookie",
        "key": "strapi.sid",
        "prefix": "strapi:sess:",
        "secretKeys": ["mySecretKey1", "mySecretKey2"],
        "httpOnly": true,
        "maxAge": 86400000,
        "overwrite": true,
        "signed": false,
        "rolling": false
      },
      "logger": {
        "level": "debug",
        "exposeInContext": true,
        "requests": true
      },
      "parser": {
        "enabled": true,
        "multipart": true
      }
})