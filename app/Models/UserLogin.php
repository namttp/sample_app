<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="UserLogin",
 *     description="ユーザーログインモデル",
 *     @OA\Property(type="integer", property="id", description="ユーザーログインID"),
 *     @OA\Property(type="integer", property="user_id", description="ユーザーID"),
 *     @OA\Property(type="datetime", property="login_at", description="ログイン日時"),
 *     @OA\Property(type="boolean", property="is_new_session", description="新規のログインかどうか"),
 *     @OA\Property(type="integer", property="total_login_days", description="累計ログイン日数"),
 *     @OA\Property(type="integer", property="continue_login_days", description="連続ログイン日数"),
 *     @OA\Property(type="string", format="date-time", property="created_at", description="作成日時"),
 *     @OA\Property(type="string", format="date-time", property="updated_at", description="更新日時"),
 * )
 */
class UserLogin extends Model
{
    use HasFactory;

    protected static function boot()
    {
        parent::boot();
    }

    /**
     * ユーザー情報を取得
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function isTodayAccessed($user_id)
    {
        $today = \MyApp::getToday();
        $tommorow = $today->copy()->addDay();
        $today_accessed = self::where(['user_id' => $user_id])
            ->whereBetween('login_at', [$today, $tommorow])
            ->exists();

        return $today_accessed;
    }

    public static function recordTodayAccess($user_id, $is_new_session = false)
    {
        // 今日まだアクセスが無い場合は記録
        if (self::isTodayAccessed($user_id) === false) {
            // 初期値
            $continue_login_days = 1;
            $total_login_days = 1;

            // 同日判定のため直近のログインを取得
            $latest_login = self::getLatestLogin($user_id);
            if ($latest_login) {
                // 昨日の基準日
                $yesterday = \MyApp::getYesterday();
                // ログイン日の基準日
                $target = \MyApp::getBaseDatetime($latest_login->login_at);
                // 日付が同じ場合
                if ($target->eq($yesterday)) {
                    $continue_login_days = $latest_login->continue_login_days + 1;
                }
                $total_login_days = $latest_login->total_login_days + 1;
            }
            $user_login = new self();
            $user_login->user_id = $user_id;
            $user_login->login_at = now();
            $user_login->is_new_session = $is_new_session;
            $user_login->continue_login_days = $continue_login_days;
            $user_login->total_login_days = $total_login_days;
            $user_login->save();
        }
    }

    public static function getLatestLogin($user_id)
    {
        $latest_login = self::where(['user_id' => $user_id])
            ->orderBy('login_at', 'desc')
            ->first();

        return $latest_login;
    }
}
