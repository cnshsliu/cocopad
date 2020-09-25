#!/bin/bash
echo "Starting cocopad frontend webserver"
echo -e "\tCleanup cache..";
rm -rf .cache; rm -f dist/*; 
echo -e "\trun 'npm start'..";
npm start
