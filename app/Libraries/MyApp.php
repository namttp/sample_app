<?php

namespace App\Libraries;

use Carbon\Carbon;
use Illuminate\Support\Facades\Facade;

class MyApp extends Facade
{
    public static $STANDARD_HOUR = 4;

    public static function getToday()
    {
        return self::getBaseDateTime();
    }

    public static function getYesterday()
    {
        $date = self::getToday();
        $date->subDay();

        return $date;
    }

    // 今日
    public static function getBaseDatetime($datetime = null)
    {
        $datetime = new Carbon($datetime ?? Carbon::now());
        $datetime->setTimezone('Asia/Tokyo');
        // 4時前であれば前日
        if ($datetime->hour < self::$STANDARD_HOUR) {
            $datetime->subDay();
        }
        $datetime->setTime(self::$STANDARD_HOUR, 0, 0);

        return $datetime;
    }

    // 基準は午前4時
    public static function getBaseStartDatetime($datetime)
    {
        $datetime = new Carbon($datetime);
        $datetime->setTimezone('Asia/Tokyo');
        // 4時前であれば前日
        if ($datetime->hour < self::$STANDARD_HOUR) {
            $datetime->subDay();
        }
        $datetime->setTime(self::$STANDARD_HOUR, 0, 0);

        return $datetime;
    }

    // 基準は翌日午前3時59分
    public static function getBaseEndDatetime($datetime)
    {
        $datetime = new Carbon($datetime);
        $datetime->setTimezone('Asia/Tokyo');
        // 4時以降であれば翌日
        if ($datetime->hour >= self::$STANDARD_HOUR) {
            $datetime->addDay();
        }
        $datetime->setTime(3, 59, 59);

        return $datetime;
    }
}
