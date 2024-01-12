***deploying newest version***
open terminal 

**connect to the server**
ssh cragmentor

**nav to /shared/cragmentor**
cd /shared/CragMentor
**pull most recent version from github**
git pull

**go back to shared folder**
cd /shared

sudo ./build-restart.sh





---useful cmds---

**clone git repo**
git clone git@github.com:Mlew512/CragMentor.git

**go to backend**
cd shared/CragMentor/backend

pip install -r requirements.txt

**run gu unicorn**
gunicorn crag_proj.wsgi --bind 0.0.0.0:8000 --daemon

**go to front end**
cd to frontend

**install dependencies**
npm install

**run build restart**
source /shared/build-restart.sh 

**info for matt**
matt sudo
.<$8V!#]eyX0]QcP

        



