## 🚀 Quick Start

```shell
npm install
npm run develop
```

docker build -t user/logger .

docker run -d -p 8080:9000 -e LOGGER_PATH=/logs -v /home/ubuntu/logs:/logs user/logger