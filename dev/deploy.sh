#!/bin/bash

# ATTENTION: CALLED VIA package.json >> MAKE BUILD PATH RELATIVE TO PROJECT ROOT

# use a trailing slash to specify files *in* the given folder
BUILD_PATH=build/
DEPLOY_PATH=/home/firxworx/demo.firxworx.com/react-simple-invoice

# ssh connection information
USERNAME=firxworx
HOSTNAME=server29.hostwhitelabel.com
SSH_OPTS="-p24816"

# do it up
rsync -vzcrSLhp --force --delete --progress -e "ssh $SSH_OPTS" $BUILD_PATH $USERNAME@$HOSTNAME:$DEPLOY_PATH

#
# --dry-run -- add flag to perform a dry run and test the rsync process
#
# v - verbose
# z - compress data
# c - checksum, use checksum to find file differences
# r - recursive
# S - handle sparse files efficiently
# L - follow links to copy actual files
# h - show numbers in human-readable format
# p - keep local file permissions (note: not always desirable)
#
# --exclude - Exclude files from being uploaded, e.g. --exclude="deploy.sh"
# --exclude-from=rsync_exclude.txt - Exclude files listed in given file one-per line, .gitignore-esque
#
