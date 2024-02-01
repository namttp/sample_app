<?php

namespace App\Http\Controllers;

use InfyOm\Generator\Utils\ResponseUtil;

/**
 * @OA\Schema(
 *     schema="UnauthorizedError",
 *     description= "認可エラー",
 *     @OA\Property(property="message", type="string", description="メッセージ"),
 * )
 */

class AppBaseController extends Controller
{
    /**
     * @OA\Schema(
     *     schema="Paginator",
     *     description= "ページネーション",
     *    @OA\Property(property="current_page", type="integer", description="現在のページ"),
     *    @OA\Property(property="last_page", type="integer", description="最終ページ"),
     *    @OA\Property(property="per_page", type="integer", description="1ページあたりの件数"),
     *    @OA\Property(property="from", type="integer", description="ページネーションの開始位置"),
     *    @OA\Property(property="to", type="integer", description="ページネーションの終了位置"),
     *    @OA\Property(property="total", type="integer", description="全ページ数"),
     * )
     */
    public function sendResponse($result, $message)
    {
        return response()->json(ResponseUtil::makeResponse($message, $result));
    }

    /**
     * @OA\Schema(
     *     schema="ServerError",
     *     description= "サーバーエラー",
     *     @OA\Property(property="message", type="string", description="メッセージ"),
     * )
     */
    public function sendError($error, $code = 404)
    {
        return response()->json(ResponseUtil::makeError($error), $code);
    }

    /**
     * @OA\Schema(
     *     schema="ResponseError",
     *     description= "APIレスポンス",
     *     @OA\Property(property="success", type="boolean", example=false, description="成功フラグ"),
     *     @OA\Property(property="message", type="string", description="メッセージ"),
     * )
     */
    public function sendErrorWithData($error, $code = 404, $data = [])
    {
        if (empty($data)) {
            if (is_array($error)) {
                $data = ['errors' => $error];
            } else {
                $data = ['errors' => ['error' => [$error]]];
            }
        }

        return response()->json(ResponseUtil::makeError('Not Found', $data), $code);
    }

    /**
     * @OA\Schema(
     *     schema="Response",
     *     description= "APIレスポンス",
     *     @OA\Property(property="success", type="boolean", description="成功フラグ"),
     *     @OA\Property(property="message", type="string", description="メッセージ"),
     * )
     */
    public function sendSuccess($message)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
        ], 200);
    }

}
