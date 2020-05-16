if [ ! -d ./dist ]; then
	echo "Not in project folder";
	exit;
fi
rm ./dist/*;
npm run-script build
