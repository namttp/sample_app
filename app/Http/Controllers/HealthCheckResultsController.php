<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class HealthCheckResultsController extends Controller
{
    public function __invoke()
    {
        $status = 500;

        try {
            DB::connection(config('database.default'))->getPdo();

            $status = 200;
        } catch (\Exception $exception) {
            logger()->error($exception->getMessage());
        }

        return response()
            ->json([], $status);
    }
}
