#!/bin/sh
echo -n "eval('"
/usr/bin/java -jar ../lib/yuicompressor-2.4.2.jar shmup.js |\
sed -r 's/keys/k/g' |\
sed -r 's/function /~/g' 
echo -n "'.replace(/~/g,\"function \")";
echo ');'

