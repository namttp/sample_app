<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoginLockout extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip_address',
        'user_agent',
        'uid',
        'ip_address',
        'until',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function isLock($uid, $ip)
    {
        return self::where('uid', $uid)
            ->where('ip_address', $ip)
            ->where('until', '>=', now())
            ->exists();
    }

    public static function getLock($uid, $ip)
    {
        return self::where('uid', $uid)
            ->where('ip_address', $ip)
            ->where('until', '>=', now())
            ->first();
    }
}
