<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoginAttempt extends Model
{
    use HasFactory;

    // ロック対象とする連続アクセス数
    const MAX_ATTEMPTS = 6;

    // ロック対象とする連続失敗数の期間（分）
    static $LOCKOUT_DURATION = 30;

    protected $fillable = [
        'user_id',
        'ip_address',
        'user_agent',
        'status',
        'uid',
        'ip_address',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // ロック対象かどうか判定。引数はuid。static
    public static function isLock($uid, $ip)
    {
        // 直近30分以内のMAX_ATTEMPTSのレコードを取得
        $recentAttempts = self::where('uid', $uid)
            ->where('ip_address', $ip)
            ->where('created_at', '>=', now()->subMinutes(self::$LOCKOUT_DURATION))
            ->orderBy('created_at', 'desc')
            ->take(self::MAX_ATTEMPTS)
            ->get();

        // 全てfalseかつ、MAX_ATTEMPTS以上の連続数ならロック
        if( $recentAttempts->count() === self::MAX_ATTEMPTS && $recentAttempts->where('status', false)->count() === self::MAX_ATTEMPTS )
        {
            return true;
        }
        return false;
    }

}
