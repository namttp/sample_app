<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\AppBaseController;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;
use Validator;
use Illuminate\Support\Facades\Log;

class UserController extends AppBaseController
{
    /**
     * @OA\Get(
     *     path="/api/me",
     *     operationId="getMe",
     *     summary="ユーザー情報の取得",
     *     tags={"ユーザー情報"},
     *     @OA\Response(
     *         response="200",
     *         description="成功",
     *         @OA\JsonContent(
     *             allOf={
     *                 @OA\Schema(ref="#/components/schemas/Response"),
     *                 @OA\Schema(
     *                     @OA\Property(
     *                         property="data",
     *                         allOf={
     *                             @OA\Schema(ref="#/components/schemas/User")
     *                         }
     *                     )
     *                 )
     *             }
     *         )
     *     ),
     *     @OA\Response(response=404, description="バリデーションエラーまたはAjax通信以外のエラー", 
     *         @OA\JsonContent(
     *             allOf={
     *                 @OA\Schema(ref="#/components/schemas/ResponseError"),
     *             }
     *         )
     *     ),
     *     @OA\Response(response=500, description="サーバーエラー", 
     *         @OA\JsonContent(
     *             allOf={
     *                 @OA\Schema(ref="#/components/schemas/ServerError"),
     *             }
     *         )
     *     ),
     * )
     */
    public function me(Request $request)
    {
        $user = auth()->user(true);

        if( $user === null )
            return $this->sendResponse($user, '');

        // 今日のアクセスを記録
        if ($user instanceof \App\Models\User) {
            \App\Models\UserLogin::recordTodayAccess($user->id);
        }
        $user->makeVisible('uid');
        return $this->sendResponse($user, '');
    }
}
