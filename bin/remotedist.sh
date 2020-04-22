npm run-script build
ssh ubuntu@liuzijin.com -t rm -f /home/ubuntu/www/colobod.com/*
scp dist/* ubuntu@liuzijin.com:/home/ubuntu/www/colobod.com/
