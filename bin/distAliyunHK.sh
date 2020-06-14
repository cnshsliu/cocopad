ssh ubuntu@aliyunhk -t rm -rf /home/ubuntu/www/weteam.work/*
ssh ubuntu@aliyunhk -t rm -rf /home/ubuntu/www/meetintune.com/*
scp -r ~/dev/cocopad/dist/* ubuntu@aliyunhk:/home/ubuntu/www/weteam.work/
scp -r ~/dev/cocopad/dist/* ubuntu@aliyunhk:/home/ubuntu/www/meetintune.com/
