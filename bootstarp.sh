#!/bin/bash
#update system
sydo apt update

sudo apt install docker.io ufw
sudo apt install docker-compose

sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443

#disable root ssh
sudo sed -i 's/PermitRootLogin yes/ PermitRootLogin no/' /etc/ssh/sshd_config


sudo systemctl restart sshd
sudo usermod -aG docker ubuntu

echo "server hardened and Docker ready"

