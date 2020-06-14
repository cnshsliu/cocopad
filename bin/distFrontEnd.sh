#!/bin/bash
if [ ! -d ./dist ]; then
	echo "Not in project folder";
	exit;
fi

./bin/predist.sh
cd ~/dev/cocopad/
echo  "Begin distribution to weteam.work"
./bin/distwtw.sh

echo "Done."
echo "Check cococonfig.js, is endpoint okay or not"
