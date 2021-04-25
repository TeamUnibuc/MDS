#!/bin/bash

# Script assumes that https://gitlab.com/adrian.budau/ia-sandbox is installed on the system.

if [ $EUID -ne "0" ];
then
   echo "This script must be run as root" 
   exit 1
fi

# Save current user
USER=$SUDO_USER

echo "Found user $USER as owner"

# Create required folders
# and add ourselves as owners.
sudo mkdir /sys/fs/cgroup/cpuacct/ia-sandbox
sudo mkdir /sys/fs/cgroup/cpuacct/ia-sandbox/default
sudo chown -R $USER:$USER /sys/fs/cgroup/cpuacct/ia-sandbox


sudo mkdir /sys/fs/cgroup/memory/ia-sandbox
sudo mkdir /sys/fs/cgroup/memory/ia-sandbox/default
sudo chown -R $USER:$USER /sys/fs/cgroup/memory/ia-sandbox

sudo mkdir /sys/fs/cgroup/pids/ia-sandbox
sudo chown -R $USER:$USER /sys/fs/cgroup/pids/ia-sandbox
