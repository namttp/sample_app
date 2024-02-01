# PATHを設定（$HOMEを利用）
export PATH=$HOME/.config/composer/vendor/bin:$HOME/bin:/usr/local/bin:/usr/local/sbin:$HOME/.local/bin:$HOME/bin:$PATH

set -euo pipefail

cd <DESTINATION>

chown -R dev-user01:dev-user01 <DESTINATION>
