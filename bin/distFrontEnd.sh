#!/bin/bash
if [ ! -d ./dist ]; then
	echo "Not in project folder";
	exit;
fi
rm ./dist/* 1>/dev/null 2>/dev/null;
echo -n "Make sure WS endpoint set to LZJ..."
COCOCFG=./src/cococonfig.js
LINENUMBER1=`awk '/endpoint: {/{ print NR; exit }' $COCOCFG`
LINENUMBER2=`awk '/endpoint_lzj: {/{ print NR; exit }' $COCOCFG`
ENDPOINT_LZJ=`awk "NR==$LINENUMBER2" $COCOCFG`
echo $ENDPOINT_LZJ|sed 's/_lzj:/:/' > /tmp/2
ENDPOINT=$(head -n 1 /tmp/2)
ENDPOINT="\t\t$ENDPOINT";
awk -v pat="$ENDPOINT" -v ln="$LINENUMBER1" 'NR==ln {$0=pat} 1' $COCOCFG > /tmp/cococonfig.new
ENDPOINT_BEFORE=`awk "NR==$LINENUMBER1" $COCOCFG`
ENDPOINT_NEW=`awk "NR==$LINENUMBER1" /tmp/cococonfig.new`
if [[ $ENDPOINT_NEW =~ .*liuzijin.com.* ]]; then
    echo "SUCCESS"
    mv /tmp/cococonfig.new $COCOCFG
fi


echo  "Begin build"
npm run-script build
echo  "Begin distribution to liuzijin.com"
./bin/distlzj.sh
echo  "Begin distribution to colobod.com"
./bin/distshatian.sh
echo  "Begin distribution to weteam.work"
./bin/distwtw.sh

echo "Done."
echo "Check cococonfig.js, is endpoint okay or not"
