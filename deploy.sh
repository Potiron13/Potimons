#!/bin/bash
cd Back
npm install
MYSQL_SERVER=mysql-potiron.alwaysdata.net MYSQL_USER=potiron_admin MYSQL_PASSWORD=canard MYSQL_DATABASE=potiron_db npm start