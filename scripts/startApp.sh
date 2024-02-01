#!/bin/bash
set -euo pipefail

cd <DESTINATION>

echo "Linking storage directory"
rm -rf <DESTINATION>/storage
ln -nfs /var/www/app/storage <DESTINATION>/storage

echo 'Linking current release'
ln -nfs <DESTINATION> /var/www/app/current
#chown kao:nginx /var/www/app/current
#chown kao:nginx /var/www/app/releases

# 古いリリースを日付のフォルダ名から判断して削除
echo "Removing old releases"
ls -dt /var/www/app/releases/* | tail -n +5 | xargs -d "\n" rm -rf;
