**NGINX**

ln -s /etc/nginx/sites-available/tiamone.com /etc/nginx/sites-enabled/tiamone.com


**PM2**

pm2 start npm --name "tiamone-backend" -- run "prod:start"