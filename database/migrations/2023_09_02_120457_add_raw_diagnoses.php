<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('diagnoses', function (Blueprint $table) {
            $table->text('hari_raw')->nullable()->comment('hariのレスポンス')->after('group_id');
            $table->text('kirei_raw')->nullable()->comment('kireiのレスポンス')->after('group_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('diagnoses', function (Blueprint $table) {
            $table->dropColumn('hari_raw');
            $table->dropColumn('kirei_raw');
        });
    }
};
