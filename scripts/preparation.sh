# PATHを設定（$HOMEを利用）
export PATH=$HOME/.config/composer/vendor/bin:$HOME/bin:/usr/local/bin:/usr/local/sbin:$HOME/.local/bin:$HOME/bin:$PATH

set -euo pipefail

cd <DESTINATION>

# cleanup
#echo "Cleanup dev files"
#find . -type f -name ".git*" -exec rm {} \;
#find . -type d -name ".idea" -prune -exec rm -rf {} \;
#find . -type d -name ".git" -prune -exec rm -rf {} \;
#find . -type f -iname "README.md" -exec rm {} \;

# change permission
#chown -R kao:nginx <DESTINATION>
chmod -R 775 /var/www/app/storage
chmod -R 775 /var/www/app/bootstrap/cache
chmod -R 775 /var/www/app/public

# storageのディレクトリを念の為作成
mkdir -p /var/www/app/storage/framework/sessions
mkdir -p /var/www/app/storage/framework/views
mkdir -p /var/www/app/storage/framework/cache
mkdir -p /var/www/app/storage/framework/testing
mkdir -p /var/www/app/storage/framework/cache/data
mkdir -p /var/www/app/storage/logs

# composer
echo "Starting deployment"
composer install --prefer-dist --no-scripts -q -o

# run deploy
echo "Running deployment scripts"
ln -nfs /var/www/app/.env <DESTINATION>/.env
cat <DESTINATION>/.env
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan storage:link
php artisan migrate --force
