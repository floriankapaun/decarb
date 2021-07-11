# decarb Stage Setup Uberspace

This is a (nearly) step by step transcript on how I setup [stage.decarb.website](https://stage.decarb.wesbite).

## Establish SSH Connection from Server to Github to Pull Repository

1. Create SSH-Key `ssh-keygen -t ed25519 -a 100` > `/home/decarb/.ssh/github-floriankapaun`

2. Copy public Key `cat ~/.ssh/github-floriankapaun.pub`

3. Github > Settings > SSH > Add new Key > Name it however you like

4. Setup SSH Config on Uberspace to always use the generated SSH Key on Connections to GitHub edit `~/.ssh/config`

   ```shell
   Host github.com
           User git
           Hostname github.com
           PreferredAuthentications publickey
           IdentityFile /home/decarb/.ssh/github-floriankapaun
   ```

5. Change Read-Settings of that file: `chmod 600 ~/.ssh/config`
6. Check Connection to GitHub: `ssh -T git@github.com`

## Pull and Setup Repository

```shell
mkdir /var/www/virtual/decarb/_repository
cd /var/www/virtual/decarb/_repository
git clone ssh://git@github.com/floriankapaun/decarb.git
mkdir stage.decarb.website
mkdir stage.decarb.website/api
mkdir stage.decarb.website/client
```

## Install NVM

```shell
mkdir /home/decarb/lib # Doesn't exist initially but is required for the next step
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

# check installation
nvm -v

# install needed versions
nvm install 15.5.1
nvm install 16.3.0
```

## Setup Postgresql

**Watch out for special characters when setting postgres user password**

Use this Tutorial: https://lab.uberspace.de/guide_postgresql.html

Edit Authentication Config. Therefore `chmod 600 ~/opt/postgresql/data/pg_hba.conf` and the vim it.

Change Settings to:

```shell
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     scram-sha-256
# IPv4 local connections:
host    all             all             127.0.0.1/32            scram-sha-256
# IPv6 local connections:
host    all             all             ::1/128                 password # this is the only change
# Allow replication connections from localhost, by a user with the
# replication privilege.
local   replication     all                                     scram-sha-256
host    replication     all             127.0.0.1/32            scram-sha-256
host    replication     all             ::1/128                 scram-sha-256
```

Check if Database is available: `psql -l`

Log into created db with created user: `psql -h localhost -U decarb_user decarb_stage`

## Setup Adminer

Reference: https://lab.uberspace.de/guide_adminer.html

Check the current version of Adminer at [GitHub](https://github.com/vrana/adminer/releases) and go the the folder where you want Adminer to be installed.

```bash
[isabell@stardust ~]$ VERSION=4.7.8
[isabell@stardust ~]$ cd ~/html
[isabell@stardust html]$ wget -O adminer.php https://github.com/vrana/adminer/releases/download/v$VERSION/adminer-$VERSION.php
[isabell@stardust html]$ mkdir -p plugins
[isabell@stardust html]$ wget -O plugins/plugin.php https://raw.githubusercontent.com/vrana/adminer/master/plugins/plugin.php
[isabell@stardust html]$
```

Create an `index.php` file in the same directory:

```php
<?php

function adminer_object() {
  foreach (glob("plugins/*.php") as $filename) {
    include_once "./$filename";
  }

  $plugins = array(
    // ...
  );

  return new AdminerPlugin($plugins);
}

include "./adminer.php";
```

When not able to connect with postgres because of password authentication error, connect to the database via ssh: `psql -h localhost -U decarb_user decarb_stage` 

Define new password for user: `ALTER USER decarb_user WITH PASSWORD 'yourpassword'` and try again

## Create Deployment Script

`touch /var/www/virtual/decarb/deploy-stage.sh`

```shell
shopt -s extglob # enable extended globbing (to filter for node_modules and .env files)
shopt -s dotglob # enable considering dot files (to make sure .nuxt folder is found as well)

cd /var/www/virtual/decarb/_repository/decarb/

# Enforce most-recent repository version
git checkout stage
git fetch
git reset --hard origin/stage
git pull

# Switch to project "root" level
cd /var/www/virtual/decarb/

# Source NVM and switch to correct engine
. ~/.nvm/nvm.sh
nvm use 15.5.1

# Install dependencies and build client
yarn --cwd ./_repository/decarb/client install

# This might be needed
# npm --prefix client rebuild node-sass 
# Ref: https://github.com/sass/node-sass/issues/1579

yarn --cwd ./_repository/decarb/client build

# Delete old client files and copy new files into production directory
rm -r ./stage.decarb.website/client/!(.env|node_modules)
cp -R ./_repository/decarb/client/!(node_modules) ./stage.decarb.website/client/

# Install dependencies for nuxt server
yarn --cwd ./stage.decarb.website/client install

# Switch Node Version
nvm use 16.3.0

# Delete old api files and copy new files into production directory
rm -r ./stage.decarb.website/api/!(.env|node_modules)
cp -R ./_repository/decarb/api/!(node_modules) ./stage.decarb.website/api # don't copy node_modules!

# Install api dependencies after refreshing the files to
# prevent copying the node_modules folder
yarn --cwd ./stage.decarb.website/api install

# Apply pending database migrations
yarn --cwd ./stage.decarb.website/api prisma_deploy

# Restart Client Server
supervisorctl restart decarb_stage_client

# Restart API Server
supervisorctl restart decarb_stage_api
```

## Create .env files

```bash
vim stage.decarb.website/api/.env # Configure env variables
vim stage.decarb.website/client/.env # Configure env variables
```

## Setup Services for API and Client

`vim ~/etc/services.d/decarb_stage_client.ini`

```bash
[program:decarb_stage_client]
directory=/var/www/virtual/decarb/
command=sh run-stage-client.sh
autostart=yes
autorestart=yes
startretries = 2

# Stop child processes as well
stopasgroup=true

# prevent restarting if the service doesn't stay alive for at least 60 seconds
startsecs=60
```

`vim /var/www/virtual/decarb/run-stage-client.sh`

```bash
# Source NVM
. ~/.nvm/nvm.sh

# Switch to required engine
nvm use 15.3.0

cd /var/www/virtual/decarb/stage.decarb.website/client
yarn start
```

`vim ~/etc/services.d/decarb_stage_api.ini`

```bash
[program:decarb_stage_api]
directory=/var/www/virtual/decarb/
command=sh run-stage-api.sh
autostart=yes
autorestart=yes
startretries = 2

# Stop child processes as well
stopasgroup=true

# prevent restarting if the service doesn't stay alive for at least 60 seconds
startsecs=60
```

`vim /var/www/virtual/decarb/run-stage-api.sh`

```bash
[decarb@centaurus api]$ vim ~/etc/services.d/decarb_stage_api.ini 
[decarb@centaurus api]$ vim ../../run-stage-api.sh

# Source NVM
. ~/.nvm/nvm.sh

# Switch to required engine
nvm use 16.3.0

cd /var/www/virtual/decarb/stage.decarb.website/api
yarn prod
```

Load services

```bash
supervisorctl reread
supervisorctl update
supervisorctl status 
```

## Run first deploy

Run the staging deploy `sh deploy-stage.sh`

## Setup Backends to access client and api from outside

```
uberspace web backend set stage.decarb.website --http --port 3901
uberspace web backend set stage.decarb.website/api/v1 --http --port 4207
```

## Add Secret to GitHub Repository

1. Create SSH-Key on Server
2. Copy .pem value to GitHub as SECRET `cat ~/.ssh/decarb_deploy_key`
3. Delete private key from server `rm ~/.ssh/decarb_deploy_key`
4. Add public key to authorized keys: `cat ~/.ssh/decarb_deploy_key`.pub
5. `vim ~/.ssh/authorized_keys`

## Troubleshooting

### Argon2 require

> Error: /lib64/libc.so.6: version `GLIBC_2.25' not found (required by /var/www/virtual/decarb/stage.decarb.website/api/node_modules/argon2/lib/binding/napi-v3/argon2.node) 

Fix: `npm rebuild argon2 --build-from-source`

