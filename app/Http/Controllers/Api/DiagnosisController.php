<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\AppBaseController;
use App\Models\Diagnosis;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use Validator;

class DiagnosisController extends AppBaseController
{
    /**
     * @OA\Post(
     *     path="/api/diagnoses",
     *     operationId="postDiagnosis",
     *     summary="診断の作成",
     *     tags={"診断情報"},
     *     @OA\Parameter(
     *        name="report", in="header", required=true, description="測定値レポート",
     *       @OA\Schema(
     *         type="array",
     *         @OA\Items(
     *           type="object",
     *           @OA\Property(property="ageSpots", type="integer", description="測定値"),
     *           @OA\Property(property="skinAge", type="integer", description="測定値"),
     *           @OA\Property(property="wrinkles", type="integer", description="測定値"),
     *           @OA\Property(property="texture", type="integer", description="測定値"),
     *           @OA\Property(property="darkCirclesV2", type="integer", description="測定値"),
     *           @OA\Property(property="moisture", type="integer", description="測定値"),
     *           @OA\Property(property="oiliness", type="integer", description="測定値"),
     *           @OA\Property(property="radiance", type="integer", description="測定値"),
     *           @OA\Property(property="pore", type="integer", description="測定値"),
     *         )
     *       )
     *     ),
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
     *                             @OA\Schema(ref="#/components/schemas/Diagnosis")
     *                         }
     *                      )
     *                 )
     *             }
     *         )
     *     ),
     *     @OA\Response(response=403, description="認可エラー", 
     *         @OA\JsonContent(
     *             allOf={
     *                 @OA\Schema(ref="#/components/schemas/UnauthorizedError"),
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
    public function store(Request $request)
    {
        $user = auth()->user();

        // 認可
        $this->authorize('create', Diagnosis::class);

        // バリデーション
        $validator = Validator::make(
            $request->all(),
            [
                'report' => [
                    'required',
                    'array',
                    function ($attribute, $value, $fail) {
                        $keys = ['ageSpots', 'skinAge', 'wrinkles', 'texture', 'darkCirclesV2', 'moisture', 'oiliness', 'radiance', 'pore'];
                        foreach ($keys as $key) {
                            if (! isset($value[$key]) || ! is_numeric($value[$key])) {
                                $fail('正しい測定の値が取得できませんでした。');
                            }
                        }
                    },
                ],
            ],
        );
        if ($validator->fails()) {
            \Log::error($validator->errors());
            return $this->sendErrorWithData($validator->errors(), 404);
        }

        // 診断を作成
        try {
            DB::beginTransaction();
            $diagnosis = $user->diagnoses()->create([
                'age_spots_score' => $request->report['ageSpots'],
                'skin_age' => $request->report['skinAge'],
                'wrinkles_score' => $request->report['wrinkles'],
                'texture_score' => $request->report['texture'],
                'dark_circles_v2_score' => $request->report['darkCirclesV2'],
                'moisture_score' => $request->report['moisture'],
                'oiliness_score' => $request->report['oiliness'],
                'radiance_score' => $request->report['radiance'],
                'pore_score' => $request->report['pore'],
                'module' => $request->module,
                'group_id' => $request->group_id,
            ]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();

            return $this->sendError('診断の作成に失敗しました。', 500);
        }

        return $this->sendResponse($diagnosis, '');
    }

    /**
     * @OA\Get(
     *     path="/api/diagnoses/{id}",
     *     operationId="getDiagnosisShow",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="診断ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *        name="mark_history_view",
     *        in="path",
     *        required=false,
     *        description="履歴閲覧フラグ",
     *         @OA\Schema(type="boolean")
     *     ),
     *     summary="診断データの取得",
     *     tags={"診断情報"},
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
     *                             @OA\Schema(ref="#/components/schemas/Diagnosis")
     *                         }
     *                      )
     *                 )
     *             }
     *         )
     *     ),
     *     @OA\Response(response=403, description="認可エラー", 
     *         @OA\JsonContent(
     *             allOf={
     *                 @OA\Schema(ref="#/components/schemas/UnauthorizedError"),
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
    public function show(Diagnosis $diagnosis)
    {
        // 認可
        $this->authorize('view', $diagnosis);
        if (empty($diagnosis)) {
            return $this->sendError('Present not found');
        }
        return $this->sendResponse($diagnosis, '');
    }

    // デバッグ用の関数のためコメント割愛
    public function debug($msg)
    {
        // 本番環境では404
        if (config('app.env') === 'production') {
            abort(404);

            return;
        }

        $url = 'https://hooks.slack.com/services/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';
        $message = [
          'channel' => '#社内_セガxd様開発',
          'text' => $msg,
        ];

        $ch = curl_init();

        $options = [
          CURLOPT_URL => $url,
          // 返り値を文字列で返す
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_SSL_VERIFYPEER => false,
          // POST
          CURLOPT_POST => true,
          CURLOPT_POSTFIELDS => http_build_query([
            'payload' => json_encode($message),
          ]),
        ];

        curl_setopt_array($ch, $options);
        curl_exec($ch);
        curl_close($ch);
    }

    /**
     * @OA\Post(
     *     path="/api/diagnoses/{id}/kirei",
     *     operationId="postDiagnosisKirei",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="診断ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="raw",
     *         in="header",
     *         required=true,
     *         description="画像Blob",
     *         @OA\Schema(type="string")
     *     ),
     *     summary="kireiのAIの実行",
     *     tags={"診断情報"},
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
     *                             @OA\Schema(ref="#/components/schemas/Diagnosis")
     *                         }
     *                      )
     *                 )
     *             }
     *         )
     *     ),
     *     @OA\Response(response=403, description="認可エラー", 
     *         @OA\JsonContent(
     *             allOf={
     *                 @OA\Schema(ref="#/components/schemas/UnauthorizedError"),
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
    public function kirei(Diagnosis $diagnosis, Request $request)
    {
        // 認可
        $this->authorize('view', $diagnosis);

        // バリデーション
        if (! $request->hasFile('raw')) {
            return $this->sendError('ファイルがありません。', 404);
        }else{
            $file = $request->file('raw');
        }

        // すでにkirei実施済みの場合はエラー
        if ($diagnosis->is_completed_kirei) {
            return $this->sendError('すでに実施済みです。', 403);
        }

        // API ENDPOINT
        $kireiApi = config('diagnosis.kirei');

        // 開発環境は適当なスコアを入れるスキップ
        if (config('app.env') === 'local' || config('app.env') === 'testing') {
            $diagnosis->update([
                // ランダムな値
                'smoothness_score' => rand(0, 100),
                'nasolabial_score' => rand(0, 100),
                'clarity_score' => rand(0, 100),
                'horeiseng' => rand(0, 100),
                'is_completed_kirei' => 1,
            ]);

            return $this->sendResponse($diagnosis, '');
        }

        // kireiAPI実行
        $response = $this->postApi($kireiApi, $file, $diagnosis);

        // 画像をS3にアップロード
        $ext = $file->clientExtension();
        $path = 'diagnosis/kirei/'.$diagnosis->id.'.'.$ext;
        Storage::disk('s3')->put($path, file_get_contents($file), 'private');

        // 200以外の場合はエラー
        if ($response->status() !== 200) {
            return $this->senderror('kirei api error');
        }

        // data
        $data = $response->json();

        // $diagnosisを再取得しておく
        $diagnosis = Diagnosis::find($diagnosis->id);

        // kireiのスコアを保存
        $minTomeikan = config('diagnosis.min_tomeikan');
        $maxTomeikan = config('diagnosis.max_tomeikan');

        $minNamerakasa = config('diagnosis.min_namerakasa');
        $maxNamerakasa = config('diagnosis.max_namerakasa');

        $minHoreiseng = config('diagnosis.min_horeiseng');
        $maxHoreiseng = config('diagnosis.max_horeiseng');

        $hadashitsukan = $data['result']['hadashitsukan'];

        $tomeikan =($hadashitsukan['tomeikan'] - $minTomeikan) / ($maxTomeikan - $minTomeikan) * 50 + 50;
        $namerakasa =($hadashitsukan['namerakasa'] - $minNamerakasa) / ($maxNamerakasa - $minNamerakasa) * 50 + 50;
        $horeiseng = 50 - ($data['result']['horeiseng']['horeiseng'] - $minHoreiseng) / ($maxHoreiseng - $minHoreiseng) * 50 + 50;    

        $diagnosis->update([
            'smoothness_score' => $namerakasa,
            'clarity_score' => $tomeikan,
            'nasolabial_score' => $horeiseng,
            'is_completed_kirei' => 1,
            'kirei_raw' => json_encode($data),
        ]);

        return $this->sendResponse($diagnosis, '');
    }

    /**
     * @OA\Post(
     *     path="/api/diagnoses/{id}/hari",
     *     operationId="postDiagnosisHari",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="診断ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="raw",
     *         in="header",
     *         required=true,
     *         description="画像Blob",
     *         @OA\Schema(type="string")
     *     ),
     *     summary="hariのAIの実行",
     *     tags={"診断情報"},
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
     *                             @OA\Schema(ref="#/components/schemas/Diagnosis")
     *                         }
     *                      )
     *                 )
     *             }
     *         )
     *     ),
     *     @OA\Response(response=403, description="認可エラー", 
     *         @OA\JsonContent(
     *             allOf={
     *                 @OA\Schema(ref="#/components/schemas/UnauthorizedError"),
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
    public function hari(Diagnosis $diagnosis, Request $request)
    {
        // 認可
        $this->authorize('view', $diagnosis);

        // バリデーション
        if (! $request->hasFile('raw')) {
            return $this->sendError('ファイルがありません。', 404);
        }else{
            $file = $request->file('raw');
        }

        // すでにkirei実施済みの場合はエラー
        if ($diagnosis->is_completed_hari) {
            return $this->sendError('すでに実施済みです。', 403);
        }

        // API ENDPOINT
        $hariApi = config('diagnosis.hari');

        // 開発環境は適当なスコアを入れるスキップ
        if (config('app.env') === 'local' || config('app.env') === 'testing') {
            $diagnosis->update([
                'resilient_score' => rand(0, 100),
                'is_completed_hari' => 1,
            ]);

            return $this->sendResponse($diagnosis, '');
        }

        \Log::debug('hari api start');

        // hari API実行
        $response = $this->postApi($hariApi, $file, $diagnosis);

        \Log::debug('hari api end');
        \Log::debug($response);

        // 画像をS3にアップロード
        $ext = $file->clientExtension();
        $path = 'diagnosis/hari/'.$diagnosis->id.'.'.$ext;
        Storage::disk('s3')->put($path, file_get_contents($file), 'private');

        // 200以外の場合はエラー
        if ($response->status() !== 200) {
            return $this->sendError('Hari API Error');
        }

        // data
        $data = $response->json();

        // $diagnosisを再取得しておく
        $diagnosis = Diagnosis::find($diagnosis->id);

        // resilient_scoreを計算
        $score = $data['result']['visual']['score'] ;
        $xBest = (float)config('diagnosis.hari_x_best');
        $xWorst =(float)config('diagnosis.hari_x_worst');

        $resilientScore = (49 / ($xBest - $xWorst)) * $score + (50 - ((49 / ($xBest - $xWorst)) * $xWorst));

        $diagnosis->update([
            'resilient_score' => $resilientScore,
            'is_completed_hari' => 1,
            'hari_raw' => json_encode($data),
        ]);

        return $this->sendResponse($diagnosis, '');
    }

    public function postApi($apiUrl, $image, Diagnosis $diagnosis)
    {
        $beaner = config('diagnosis.beaner');
        $user = $diagnosis->user;
        $uid = '';

        if ($user instanceof User) {
            $uid = $user->uid;
        }

        try {
            return $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$beaner,
            ])->attach(
                'file',
                // base64とfileの場合がある。出し分け
                file_get_contents($image->getRealPath()),
                'photo.jpg'
            )->post($apiUrl, [
                'uid' => $uid,
                'value1' => '',
                'value2' => $diagnosis->user_id,
                'value3' => $diagnosis->id,
                'service_name' => '肌レコモニター',
            ]);
        } catch (ConnectionException $exception) {
            return $this->sendError('API Connection Error', 500);
        }
    }
}
