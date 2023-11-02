# 使用官方的 Node.js 镜像作为基础镜像
FROM node:14

RUN npm config set registry https://registry.npm.taobao.org/

# 在镜像中创建目标目录
RUN mkdir -p /usr/src/texas-holdem-server

# 设置工作目录
WORKDIR /usr/src/texas-holdem-server

# 复制项目文件到工作目录
COPY . .

RUN npm install nodemon -g

# 安装项目依赖
RUN npm install

# 暴露端口，如果需要
EXPOSE 8081

# 启动应用
CMD [ "npm", "start" ]
