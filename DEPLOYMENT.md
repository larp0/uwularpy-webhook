# uwularpy - Deployment Guide

This guide will help you deploy the uwularpy GitHub App webhook handler to a server that can use the domain uwu.larp.dev.

## Prerequisites

Before deployment, make sure you have:

1. Registered the GitHub App with the name "uwularpy"
2. Configured the app permissions and webhook URL (https://uwu.larp.dev/webhook)
3. Generated a private key for authentication
4. Access to a server where you can host the webhook handler
5. Domain uwu.larp.dev pointing to your server

## Deployment Options

### Option 1: Docker Deployment (Recommended)

1. Clone the repository to your server:
   ```
   git clone https://github.com/larp0/uwularpy.git
   cd uwularpy
   ```

2. Create a `.env` file with your GitHub App credentials:
   ```
   APP_ID=1214491
   PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
   Your private key content here
   -----END RSA PRIVATE KEY-----"
   WEBHOOK_SECRET=uwularp_webhook_secret
   PORT=3000
   ```

3. Deploy using Docker Compose:
   ```
   docker-compose up -d
   ```

4. Configure Nginx as a reverse proxy:
   ```
   sudo cp nginx.conf /etc/nginx/sites-available/uwularpy
   sudo ln -s /etc/nginx/sites-available/uwularpy /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. Set up SSL with Let's Encrypt:
   ```
   sudo certbot --nginx -d uwu.larp.dev
   ```

### Option 2: Manual Deployment

1. Clone the repository to your server:
   ```
   git clone https://github.com/larp0/uwularpy.git
   cd uwularpy
   ```

2. Install Node.js and npm if not already installed:
   ```
   curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file with your GitHub App credentials:
   ```
   APP_ID=1214491
   PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
   Your private key content here
   -----END RSA PRIVATE KEY-----"
   WEBHOOK_SECRET=uwularp_webhook_secret
   PORT=3000
   ```

5. Set up PM2 for process management:
   ```
   sudo npm install -g pm2
   pm2 start app.js --name uwularpy
   pm2 save
   pm2 startup
   ```

6. Configure Nginx as a reverse proxy:
   ```
   sudo cp nginx.conf /etc/nginx/sites-available/uwularpy
   sudo ln -s /etc/nginx/sites-available/uwularpy /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

7. Set up SSL with Let's Encrypt:
   ```
   sudo certbot --nginx -d uwu.larp.dev
   ```

### Option 3: Deployment to a Cloud Provider

#### Heroku

1. Create a new Heroku app:
   ```
   heroku create uwularpy
   ```

2. Set environment variables:
   ```
   heroku config:set APP_ID=1214491
   heroku config:set PRIVATE_KEY="$(cat private-key.pem)"
   heroku config:set WEBHOOK_SECRET=uwularp_webhook_secret
   ```

3. Deploy to Heroku:
   ```
   git push heroku main
   ```

4. Set up a custom domain:
   ```
   heroku domains:add uwu.larp.dev
   ```

5. Configure your DNS provider to point uwu.larp.dev to the Heroku app.

#### Digital Ocean App Platform

1. Create a new app on Digital Ocean App Platform
2. Connect your GitHub repository
3. Set environment variables:
   - APP_ID=1214491
   - PRIVATE_KEY=(contents of private key file)
   - WEBHOOK_SECRET=uwularp_webhook_secret
4. Deploy the app
5. Configure your domain uwu.larp.dev to point to the Digital Ocean app

## Verifying Deployment

After deployment, verify that your webhook handler is working:

1. Visit https://uwu.larp.dev/ - you should see "uwularpy webhook server is running!"
2. Visit https://uwu.larp.dev/health - you should see "OK"

## Updating the GitHub App

If you need to update the webhook URL in your GitHub App settings:

1. Go to https://github.com/settings/apps/uwularpy
2. Update the webhook URL to https://uwu.larp.dev/webhook
3. Save changes

## Troubleshooting

If you encounter issues with the deployment:

1. Check the server logs:
   ```
   docker-compose logs  # For Docker deployment
   pm2 logs uwularpy    # For manual deployment
   heroku logs --tail   # For Heroku deployment
   ```

2. Verify that the webhook URL is accessible:
   ```
   curl -I https://uwu.larp.dev/webhook
   ```

3. Check that the environment variables are correctly set
4. Ensure that the private key is properly formatted with line breaks
