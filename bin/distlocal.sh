rm -rf  ~/www/weteam.local/*
cd ~/dev/cocopad/
rm -rf ~/dev/cocopad/dist/*
npm run-script build
cp -v ~/dev/cocopad/dist/* ~/www/weteam.local/
