ssh ubuntu@liuzijin.com -t rm -rf  /home/ubuntu/www/liuzijin.com/*
scp ./dist/* ubuntu@liuzijin.com:/home/ubuntu/www/liuzijin.com/
ssh ubuntu@liuzijin.com -t mkdir /home/ubuntu/www/liuzijin.com/jslib
scp -r ~/dev/jslib/* ubuntu@liuzijin.com:/home/ubuntu/www/liuzijin.com/jslib/
