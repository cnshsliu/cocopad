ssh colobod@shatian -t rm -rf  /home/colobod/www/colobod.com/*
scp ./dist/* colobod@shatian:/home/colobod/www/colobod.com/
ssh colobod@weteam.work -t rm -rf /home/colobod/www/weteam.work/*
ssh colobod@weteam.work -t cp -r /home/colobod/www/colobod.com/* /home/colobod/www/weteam.work/
ssh colobod@meetintune.com -t rm -rf /home/colobod/www/meetintune.com/*
ssh colobod@meetintune.com -t cp -r /home/colobod/www/colobod.com/* /home/colobod/www/meetintune.com/
