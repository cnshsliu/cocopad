ssh ubuntu@aliyunhk -t rm -rf  /home/ubuntu/www/colobod.com/*
scp ./dist/* ubuntu@aliyunhk:/home/ubuntu/www/colobod.com/
ssh ubuntu@aliyunhk -t rm -rf /home/ubuntu/www/weteam.work/*
ssh ubuntu@aliyunhk -t cp -r /home/ubuntu/www/colobod.com/* /home/ubuntu/www/weteam.work/
ssh ubuntu@aliyunhk -t rm -rf /home/ubuntu/www/meetintune.com/*
ssh ubuntu@aliyunhk -t cp -r /home/ubuntu/www/colobod.com/* /home/ubuntu/www/meetintune.com/
