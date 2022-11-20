upstream backend  {
  server localhost:25000;
  server localhost:26000 down;
}


map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }

server {
    server_name          tiamone.com;

    access_log           /var/www/tiamone.com/logs/access.log;
    error_log            /var/www/tiamone.com/logs/error.log;

    root /var/www/tiamone.com/public/;
    # index index.html;

    location /api {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;

        #rewrite ^/api/?(.*) /$1 break;

        proxy_pass http://backend;
        proxy_redirect off;
    }

    location /ws {
        proxy_set_header X-NginX-Proxy true;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_pass http://backend;
    }

    location /socket.io {
        proxy_set_header X-NginX-Proxy true;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_pass http://backend;
    }

    location /temporal {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://localhost:8080/;
        proxy_redirect off;
    }



    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/tiamone.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/tiamone.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}


server {
    if ($host = tiamone.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    server_name          tiamone.com;
    listen 80;
    return 404; # managed by Certbot


}