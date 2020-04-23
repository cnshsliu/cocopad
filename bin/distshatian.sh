if [ ! -d ./dist ]; then
	echo "Not in project folder";
	exit;
fi
rm ./dist/*;
npm run-script build
ssh colobod@shatian -t rm -f /home/colobod/www/colobod.com/*.html
ssh colobod@shatian -t rm -f /home/colobod/www/colobod.com/*.svg
ssh colobod@shatian -t rm -f /home/colobod/www/colobod.com/*.png
ssh colobod@shatian -t rm -f /home/colobod/www/colobod.com/*.css
ssh colobod@shatian -t rm -f /home/colobod/www/colobod.com/*.js
ssh colobod@shatian -t rm -f /home/colobod/www/colobod.com/*.ico
scp ./dist/* colobod@shatian:/home/colobod/www/colobod.com/
