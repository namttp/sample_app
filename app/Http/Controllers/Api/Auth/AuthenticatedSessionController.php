<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

/**
 * @OA\Schema(
 *     schema="UnauthorizedLoginError",
 *     description= "認可エラー",
 *     @OA\Property(property="message", type="string", description="メッセージ", nullable=true),
 *     @OA\Property(property="uid", type="string", description="認証を試みたUID", nullable=true),
 *     @OA\Property(property="isLock", type="boolean", description="ロック中", nullable=true),
 *     @OA\Property(property="until", type="datetime", description="ロック期限", nullable=true),
 * )
 */

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('user.auth.login');
    }

    /**
     * @OA\Post(
     *     path="/api/login",
     *     operationId="postLogin",
     *     summary="ログイン",
     *     tags={"認証"},
     *     @OA\RequestBody(
     *        required=true,
     *       @OA\MediaType(
     *          mediaType="application/json",
     *         @OA\Schema(
     *            type="object",
     *          @OA\Property(property="uid", type="string", description="ユーザーID"),
     *         @OA\Property(property="password", type="string", description="パスワード"),
     *        )
     *      )
     *    ),
     *     @OA\Response(
     *         response="200",
     *         description="成功",
     *         @OA\JsonContent(
     *             allOf={
     *                 @OA\Schema(ref="#/components/schemas/Response"),
     *                 @OA\Schema(
     *                     @OA\Property(
     *                         property="message",
     *                         type="string",
     *                      )
     *                 )
     *             }
     *         )
     *     ),
     *     @OA\Response(response=422, description="認証エラー", 
     *         @OA\JsonContent(
     *             allOf={
     *                 @OA\Schema(ref="#/components/schemas/UnauthorizedLoginError"),
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
    public function store(LoginRequest $request)
    {
        try {
            $request->authenticate();
            $request->session()->regenerate();
            return response()->json([
                'message' => 'ログインしました。'
            ]);
        }catch(ValidationException $e){
            return response()->json($e->errors(), 422);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/logout",
     *     operationId="postLogout",
     *     summary="ログアウト",
     *     tags={"認証"},
     *     @OA\Response(
     *         response="200",
     *         description="成功",
     *         @OA\JsonContent(
     *             allOf={
     *                 @OA\Schema(ref="#/components/schemas/Response"),
     *                 @OA\Schema(
     *                     @OA\Property(
     *                         property="message",
     *                         type="string",
     *                      )
     *                 )
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
    public function destroy(Request $request)
    {
        Auth::guard('users')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'ログアウトしました'
        ]);
    }
}
