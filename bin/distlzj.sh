if [ ! -d ./dist ]; then
	echo "Not in project folder";
	exit;
fi
rm ./dist/*;
npm run-script build
ssh ubuntu@liuzijin.com -t rm -f /home/ubuntu/www/liuzijin.com/*.svg
ssh ubuntu@liuzijin.com -t rm -f /home/ubuntu/www/liuzijin.com/*.png
ssh ubuntu@liuzijin.com -t rm -f /home/ubuntu/www/liuzijin.com/*.css
ssh ubuntu@liuzijin.com -t rm -f /home/ubuntu/www/liuzijin.com/*.js
scp ./dist/* ubuntu@liuzijin.com:/home/ubuntu/www/liuzijin.com/
