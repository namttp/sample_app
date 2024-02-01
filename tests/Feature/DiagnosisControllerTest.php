<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class DiagnosisControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function setup(): void
    {
        parent::setUp();
        $this->report_keys = ['ageSpots', 'skinAge', 'wrinkles', 'texture', 'darkCirclesV2', 'moisture', 'oiliness', 'radiance', 'pore'];
        $this->user = \App\Models\User::factory()->create();
        $ids = [];
        $this->image = file_get_contents('tests/Feature/test.jpg');

        \App\Models\Diagnosis::factory(30)->create([
            'user_id' => $this->user->id,
            'is_completed_kirei' => true,
            'is_completed_hari' => true,
            'is_completed_process' => true,
            'created_at' => '2022-01-01 6:00:00',
            'age_spots_score' => 80,
            'wrinkles_score' => 80,
            'texture_score' => 80,
            'dark_circles_v2_score' => 80,
            'moisture_score' => 80,
            'oiliness_score' => 80,
            'radiance_score' =>  80,
            'pore_score' => 80,
            'smoothness_score' => 80,
            'clarity_score' => 80,
            'resilient_score' => 80,
            'nasolabial_score' =>  80,
        ]);
        \Storage::fake('files');
    }

    // /** @test */
    public function 画像情報なしでエラーが返される()
    {
        $user = \App\Models\User::factory()->create();
        $this->actingAs($user);
        $response = $this->postAjax(
            action('App\Http\Controllers\Api\DiagnosisController@store')
        );
        $response->assertStatus(403);
    }

    /** @test */
    public function 正常なデータの作成()
    {
        $this->actingAs($this->user);
        $response = $this->postAjax(
            action('App\Http\Controllers\Api\DiagnosisController@store'),
            [
                'report' => [
                    'ageSpots' => rand(0, 100),
                    'skinAge' => rand(0, 100),
                    'wrinkles' => rand(0, 100),
                    'texture' => rand(0, 100),
                    'darkCirclesV2' => rand(0, 100),
                    'moisture' => rand(0, 100),
                    'oiliness' => rand(0, 100),
                    'radiance' => rand(0, 100),
                    'pore' => rand(0, 100),
                ],
            ]
        );
        // 出力
        $response->assertStatus(200);
    }

    /** @test */
    public function id番号に紐づく診断データがあれば取得できる()
    {
        $this->actingAs($this->user);

        $response = $this->getAjax(
            action('App\Http\Controllers\Api\DiagnosisController@show', ['diagnosis' => 1])
        );

        $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                'id',
                'age',
                'age_spots_score',
            ],
            'success',
            'message',
        ]);
    }

    /** @test */
    public function id番号に紐づく診断データがなければ404エラー()
    {
        $this->actingAs($this->user);
        $response = $this->getAjax(
            action('App\Http\Controllers\Api\DiagnosisController@show', ['diagnosis' => 999])
        );
        $response->assertStatus(404);
    }

    /** @test */
    public function 画像がないとエラーが返される()
    {
        $diagnosis = \App\Models\Diagnosis::find(1);
        $this->actingAs($this->user);
        $response = $this->postAjax(
            action('App\Http\Controllers\Api\DiagnosisController@kirei', ['diagnosis' => $diagnosis->id]),
            ['raw' => null]
        );
        $response->assertStatus(404);
    }

    /** @test */
    public function 既にkireiを実施済みだとエラーが返される()
    {
        $diagnosis = \App\Models\Diagnosis::find(1);
        $this->actingAs($this->user);
        $response = $this->postAjax(
            action('App\Http\Controllers\Api\DiagnosisController@kirei', ['diagnosis' => $diagnosis->id]),
            ['raw' => new UploadedFile(
                'tests/Feature/test.jpg',
                'test.jpg',
                'image/jpeg',
                null,
                true
            )]
        );
        $response->assertStatus(403);
    }

    /** @test */
    public function 正常なデータであればkireiが実施できる()
    {
        $diagnosis = \App\Models\Diagnosis::find(1);
        $diagnosis->is_completed_kirei = 0;
        $diagnosis->save();

        $this->actingAs($this->user);
        $response = $this->postAjax(
            action('App\Http\Controllers\Api\DiagnosisController@kirei', ['diagnosis' => $diagnosis->id]),
            [
                'raw' => new UploadedFile(
                    'tests/Feature/test.jpg',
                    'test.jpg',
                    'image/jpeg',
                    null,
                    true
                ),
            ]
        );
        $response->assertStatus(200);
    }

}
