<?php

namespace App\Auth;

use App\Models\GuestUser;
use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Jaybizzle\CrawlerDetect\CrawlerDetect;

class MyGuard implements Guard
{
    use GuardHelpers;

    private Request $request;

    private EloquentUserProvider $userProvider;

    /**
     * MyGuard constructor.
     * @param Request $request
     * @param EloquentUserProvider $userProvider
     */
    public function __construct(Request $request, EloquentUserProvider $userProvider)
    {
        $this->request = $request;
        $this->userProvider = $userProvider;
    }

    public function user()
    {
        // @todo 改修
    }

    public function validate(array $credentials = []): bool
    {
        return false;
    }
}
