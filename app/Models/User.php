<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Redis;
use Laravel\Sanctum\HasApiTokens;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="User",
 *     description="ユーザーモデル",
 *     @OA\Property(type="integer", property="id", description="ユーザーID"),
 *     @OA\Property(type="integer", nullable=true, property="age", description="年齢"),
 *     @OA\Property(type="date", nullable=true, property="birthday", description="誕生日"),
 *     @OA\Property(property="current_diagnosis", nullable=true, ref="#/components/schemas/Diagnosis"),
 *     @OA\Property(type="integer", property="diagnosis_count", description="診断を行った回数"),
 *     @OA\Property(type="string", property="uid", description="UID"),
 *     @OA\Property(type="string", property="name", description="名前"),
 *     @OA\Property(type="integer", property="confirmed_score", description="確認済みスコア(ポップアップ時に使用)", nullable=true),
 * )
 */
class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    protected static function boot()
    {
        parent::boot();
    }

    protected $fillable = [
        'uid',
        'password',
        'birthday',
    ];


    protected $appends = [
        'diagnosis_count',
        'current_diagnosis',
        'name',
        'age',
    ];

    // 本番の場合はuidを追加する
    protected $hidden = [
        'id',
        'uid',
        'password',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
    ];

    public function getAuthIdentifier()
    {
        return $this->id;
    }

    public function getAuthIdentifierName()
    {
        return 'id';
    }

    /**
     * ログイン履歴一覧
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function userLogins(): HasMany
    {
        return $this->hasMany(UserLogin::class)->orderBy('id', 'desc');
    }

    /**
     * ユーザーの診断一覧
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function diagnoses(): HasMany
    {
        return $this->hasMany(Diagnosis::class)->orderBy('id', 'desc');
    }

    /**
     * ユーザーのログイン試行
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function loginAttempts(): HasMany
    {
        return $this->hasMany(LoginAttempt::class);
    }

    /**
     * ユーザーのロックアウト
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function loginLockouts(): HasMany
    {
        return $this->hasMany(LoginLockout::class);
    }

    public function getNameAttribute()
    {
        if (array_key_exists('name', $this->attributes)) {
            return $this->attributes['name'];
        }

        return '';
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
    }

    public function getAgeAttribute()
    {
      return (string) Carbon::parse($this->birthday)->age;
    }

    // 直近の肌診断情報
    public function getCurrentDiagnosisAttribute()
    {
        return $this->diagnoses()->first() ?? null;
    }

    /**
     * 診断件数
     */
    public function getDiagnosisCountAttribute()
    {
        return $this->diagnoses()->count();
    }

}
