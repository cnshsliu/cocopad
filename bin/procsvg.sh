for f in ~/dev/cocopad/assets/*.svg; do
echo $f
cat $f|sed 's/width="[0-9]*px" height="[0-9]*px"/preserveAspectRatio="none"/' > /tmp/1
mv /tmp/1 $f
done
