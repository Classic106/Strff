module.exports = ({ env }) => ({
    "csrf": {
        "enabled": false,
        "key": "_csrf",
        "secret": "_csrfSecret"
      },
      "csp": {
        "enabled": false,
        "policy": {
          "default-src": "'self'"
        }
      },
      "p3p": {
        "enabled": false,
        "value": ""
      },
      "hsts": {
        "enabled": false,
        "maxAge": 31536000,
        "includeSubDomains": true
      },
      "xframe": {
        "enabled": false,
        "value": "SAMEORIGIN"
      },
      "xss": {
        "enabled": false,
        "mode": "block"
      },
      "cors": {
        "enabled": true,
        "origin": "*",
        "expose": [
          "WWW-Authenticate",
          "Server-Authorization"
        ],
        "maxAge": 31536000,
        "credentials": true,
        "methods": [
          "GET",
          "POST",
          "PUT",
          "PATCH",
          "DELETE",
          "OPTIONS",
          "HEAD"
        ],
        "headers": [
          "Content-Type",
          "Authorization",
          "X-Frame-Options",
          "Origin"
        ]
      },
      "ip": {
        "enabled": false,
        "whiteList": [],
        "blackList": []
    }
})