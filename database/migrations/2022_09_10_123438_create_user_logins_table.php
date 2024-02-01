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
        Schema::create('user_logins', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable()->comment('ユーザーID');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            // $table->unsignedBigInteger('guest_user_id')->nullable()->comment('ゲストユーザーID');
            // $table->foreign('guest_user_id')->references('id')->on('guest_users')->onDelete('cascade');
            $table->timestamp('login_at')->comment('ログイン日時');
            $table->boolean('is_new_session')->default(0)->comment('新規のログインかどうか');
            $table->integer('total_login_days')->comment('累計ログイン日数');
            $table->integer('continue_login_days')->comment('連続ログイン日数');
            $table->timestamps();
        });
        DB::statement("ALTER TABLE users COMMENT 'ユーザーログイン履歴テーブル'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_logins');
    }
};
