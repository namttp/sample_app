<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use OpenApi\Annotations as OA;

/**
 * 【対応表】
 *  age_spots_score: シミ
 *  wrinkles_score: しわ
 *  texture_score: キメ
 *  dark_circles_v2_score: くま
 *  moisture_score: 水分量
 *  oiliness_score: ベタつき
 *  radiance_score: テカリ
 *  pore_score: 毛穴
 *  smoothness_score: なめらかさ
 *  clarity_score: 透明感
 *  resilient_score: ハリ
 *  nasolabial_score: ほうれい線
 */

/**
 * @OA\Schema(
 *     schema="Diagnosis",
 *     description="診断モデル",
 *     @OA\Property(type="integer", nullable=true, property="age", description=""),
 *     @OA\Property(type="integer", property="age_spots_score", description=""),
 *     @OA\Property(type="integer", property="clarity_score", description=""),
 *     @OA\Property(type="integer", property="dark_circles_v2_score", description=""),
 *     @OA\Property(type="integer", property="id", description="診断ID"),
 *     @OA\Property(type="boolean", property="is_completed_hari", description="hariのスコアリングを終えているかどうか"),
 *     @OA\Property(type="boolean", property="is_completed_history_view", description="履歴として閲覧しているかどうか"),
 *     @OA\Property(type="boolean", property="is_completed_kirei", description="kireiのスコアリングを終えているかどうか"),
 *     @OA\Property(type="integer", property="moisture_score", description=""),
 *     @OA\Property(type="integer", property="nasolabial_score", description=""),
 *     @OA\Property(type="integer", property="oiliness_score", description=""),
 *     @OA\Property(type="integer", property="pore_score", description=""),
 *     @OA\Property(type="integer", property="radiance_score", description=""),
 *     @OA\Property(type="integer", property="resilient_score", description=""),
 *     @OA\Property(type="integer", property="skin_age", description="肌年齢"),
 *     @OA\Property(type="integer", property="smoothness_score", description=""),
 *     @OA\Property(type="integer", property="texture_score", description=""),
 *     @OA\Property(type="integer", property="wrinkles_score", description=""),
 * )
 */
class Diagnosis extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'age',
        'skin_age',
        'age_spots_score',
        'wrinkles_score',
        'texture_score',
        'dark_circles_v2_score',
        'moisture_score',
        'oiliness_score',
        'radiance_score',
        'pore_score',
        'smoothness_score',
        'clarity_score',
        'resilient_score',
        'nasolabial_score',
        'is_completed_kirei',
        'is_completed_hari',
        'is_completed_process',
        'hari_raw',
        'kirei_raw',
        'module',
        'group_id',
    ];

    protected $hidden = [
        'user_id',
        'user',
        'is_completed_process',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'is_completed_kirei' => 'boolean',
        'is_completed_hari' => 'boolean',
        'is_completed_history_view' => 'boolean',
        'is_completed_process' => 'boolean',
    ];

    // 最大スコア
    public static $MAX_SCORE = 99;

    // ○の基準スコア
    public static $MIDDLE_SCORE = 90;

    // 画像キャッシュ時間
    public static $CACHE_SECONDS = 60 * 5;

    protected static function boot()
    {
        parent::boot();

        static::updated(function ($diagnosis) {
            // 測定完了処理
            if ($diagnosis->is_completed_kirei
                && $diagnosis->is_completed_hari
                && $diagnosis->is_completed_process === false) {
                // is_completed_processをtrueにする
                $diagnosis->is_completed_process = true;
                $diagnosis->save();
            }
        });
    }

    // ユーザーIDとstart_at、end_atから検索
    public function scopeSearch($query, User $user, $start_at, $end_at)
    {
        $query = $query->where('user_id', $user->id);

        return $query
            ->where('created_at', '>=', \MyApp::getBaseStartDatetime($start_at))
            ->where('created_at', '<', \MyApp::getBaseEndDatetime($end_at));
    }

    public function scopeCompleted($query)
    {
        return $query->where('is_completed_kirei', true)->where('is_completed_hari', true);
    }

    /**
     * ユーザー
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getDiagnosisParams()
    {
        // raw_imageと、filename、を返す
        $rawImageUrl = $this->raw_image;
        $filename = basename($rawImageUrl);
        $filename = preg_replace('/\?.*/', '', $filename);

        // 画像取得
        $image = file_get_contents($rawImageUrl);
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_buffer($finfo, $image);
        finfo_close($finfo);

        return [$image, $filename, $mimeType];
    }

    // 自分のデータかどうか
    public function isMine(User $user)
    {
        return $this->user_id === $user->id;
    }

}
