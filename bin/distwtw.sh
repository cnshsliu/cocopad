if [ ! -d ./dist ]; then
	echo "Not in project folder";
	exit;
fi
rm ./dist/*;
npm run-script build
ssh colobod@shatian -t rm -f /home/colobod/www/weteam.work/*.html
ssh colobod@shatian -t rm -f /home/colobod/www/weteam.work/*.svg
ssh colobod@shatian -t rm -f /home/colobod/www/weteam.work/*.png
ssh colobod@shatian -t rm -f /home/colobod/www/weteam.work/*.css
ssh colobod@shatian -t rm -f /home/colobod/www/weteam.work/*.js
ssh colobod@shatian -t rm -f /home/colobod/www/weteam.work/*.ico
scp ./dist/* colobod@shatian:/home/colobod/www/weteam.work/
