<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('diagnoses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable()->comment('ユーザーID');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            // $table->unsignedBigInteger('guest_user_id')->nullable()->comment('ゲストユーザーID');
            // $table->foreign('guest_user_id')->references('id')->on('guest_users')->onDelete('cascade');
            // $table->unsignedBigInteger('intensive_care_id')->nullable()->comment('集中ケアID');
            // $table->foreign('intensive_care_id')->references('id')->on('intensive_cares')->onDelete('cascade');
            $table->integer('age')->nullable()->comment('年齢');
            $table->integer('skin_age')->nullable()->comment('肌年齢');
            // 属性
            $table->integer('age_spots_score')->nullable()->comment('シミ');
            $table->integer('wrinkles_score')->nullable()->comment('しわ');
            $table->integer('texture_score')->nullable()->comment('キメ');
            $table->integer('dark_circles_v2_score')->nullable()->comment('くま');
            $table->integer('moisture_score')->nullable()->comment('水分量');
            $table->integer('oiliness_score')->nullable()->comment('油分');
            $table->integer('radiance_score')->nullable()->comment('ツヤ');
            $table->integer('pore_score')->nullable()->comment('毛穴');
            $table->integer('smoothness_score')->nullable()->comment('滑らかさ');
            $table->integer('clarity_score')->nullable()->comment('透明感');
            $table->integer('resilient_score')->nullable()->comment('ハリ');
            $table->integer('nasolabial_score')->nullable()->comment('ほうれい線');
            // 測定完了
            $table->boolean('is_completed_kirei')->default(false)->comment('kirei測定完了フラグ');
            $table->boolean('is_completed_hari')->default(false)->comment('hari測定完了フラグ');
            $table->boolean('is_completed_process')->default(false)->comment('測定完了処理フラグ');
            // フラグ
            $table->boolean('is_completed_history_view')->default(false)->comment('履歴からの閲覧');
            // 論理削除
            $table->softDeletes();
            $table->timestamps();
        });
        DB::statement("ALTER TABLE users COMMENT '測定テーブル'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('diagnoses');
    }
};
