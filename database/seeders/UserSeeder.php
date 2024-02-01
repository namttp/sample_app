<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            // id,password
            ["SA001","E9712790"],
            ["SA002","Y1753659"],
            ["SA003","D4772139"],
            ["SA004","H0703793"],
            ["SA005","Y7081147"]
        ];

        foreach( $data as $value ) {
            User::create([
                'uid' => $value[0],
                'password' => Hash::make($value[1]),
            ]);
        }
    }
}
