#!/bin/bash
if [ ! -d ./dist ]; then
	echo "Not in project folder";
	exit;
fi
echo -n "Make sure WS endpoint set to LZJ..."

./bin/predist.sh
echo  "Begin distribution to liuzijin.com"
./bin/distlzj.sh
echo  "Begin distribution to Shatian"
./bin/distshatian.sh
./bin/distAliyunHK.sh

echo "Done."
echo "Check cococonfig.js, is endpoint okay or not"
