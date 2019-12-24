###### cec_qcs_ui

###### 介绍

质量追溯系统 WEBUI
基于 iview-admin

###### 软件架构

nodejs+vue+iview+echart

###### 安装教程

cd ~

npm install
npm run dev

修改 vue.config.js
npm run build

###### 使用说明

sed -i "s/deb.debian.org/mirrors.aliyun.com/g" /etc/apt/sources.list
sed -i "s/security.debian.org/mirrors.aliyun.com/g" /etc/apt/sources.list
apt-get update
apt-get install -y vim tmux nginx git

cp dooya.conf /etc/nginx/conf.d/dooya.conf
/etc/init.d/nginx start

###### 参与贡献

从邀请链接进入
加入仓储
