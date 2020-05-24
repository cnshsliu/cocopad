ssh colobod@shatian -t rm -rf  /home/colobod/www/colobod.com/*
scp ./dist/* colobod@shatian:/home/colobod/www/colobod.com/
ssh colobod@shatian -t rm -rf /home/colobod/www/weteam.work/*
ssh colobod@shatian -t cp -r /home/colobod/www/colobod.com/* /home/colobod/www/weteam.work/
ssh colobod@shatian -t rm -rf /home/colobod/www/meetintune.com/*
ssh colobod@shatian -t cp -r /home/colobod/www/colobod.com/* /home/colobod/www/meetintune.com/
