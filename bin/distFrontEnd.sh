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
ssh ubuntu@liuzijin.com -t rm -f /home/ubuntu/www/liuzijin.com/*.svg
ssh ubuntu@liuzijin.com -t rm -f /home/ubuntu/www/liuzijin.com/*.png
ssh ubuntu@liuzijin.com -t rm -f /home/ubuntu/www/liuzijin.com/*.css
ssh ubuntu@liuzijin.com -t rm -f /home/ubuntu/www/liuzijin.com/*.js
scp ./dist/* ubuntu@liuzijin.com:/home/ubuntu/www/liuzijin.com/

echo  "Begin distribution to colobod.com"
ssh colobod@shatian -t rm -f /home/colobod/www/colobod.com/*.html
ssh colobod@shatian -t rm -f /home/colobod/www/colobod.com/*.svg
ssh colobod@shatian -t rm -f /home/colobod/www/colobod.com/*.png
ssh colobod@shatian -t rm -f /home/colobod/www/colobod.com/*.css
ssh colobod@shatian -t rm -f /home/colobod/www/colobod.com/*.js
ssh colobod@shatian -t rm -f /home/colobod/www/colobod.com/*.ico
scp ./dist/* colobod@shatian:/home/colobod/www/colobod.com/

echo  "Begin distribution to weteam.work"
ssh colobod@shatian -t rm -f /home/colobod/www/weteam.work/*.html
ssh colobod@shatian -t rm -f /home/colobod/www/weteam.work/*.svg
ssh colobod@shatian -t rm -f /home/colobod/www/weteam.work/*.png
ssh colobod@shatian -t rm -f /home/colobod/www/weteam.work/*.css
ssh colobod@shatian -t rm -f /home/colobod/www/weteam.work/*.js
ssh colobod@shatian -t rm -f /home/colobod/www/weteam.work/*.ico
scp ./dist/* colobod@shatian:/home/colobod/www/weteam.work/

echo "Done."
echo "Check cococonfig.js, is endpoint okay or not"
