<?php

namespace App\Policies;

use App\Models\Diagnosis;
use App\Models\GuestUser;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DiagnosisPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User | GuestUser $user)
    {
        return $user instanceof User || $user instanceof GuestUser;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Diagnosis  $diagnosis
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User | GuestUser $user, Diagnosis $diagnosis)
    {
        if ($user instanceof \App\Models\User) {
            return $user->id === $diagnosis->user_id;
        } else {
            return $user->id === $diagnosis->guest_user_id;
        }
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User | GuestUser $user)
    {
        return true;
    }

    /**
     * Determine whether the user can download the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Diagnosis  $diagnosis
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function download(User | GuestUser $user, Diagnosis $diagnosis)
    {
        if ($user instanceof \App\Models\User) {
            return $user->id === $diagnosis->user_id;
        } else {
            return $user->id === $diagnosis->guest_user_id;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Diagnosis  $diagnosis
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User | GuestUser $user, Diagnosis $diagnosis)
    {
        if ($user instanceof \App\Models\User) {
            return $user->id === $diagnosis->user_id;
        } else {
            return $user->id === $diagnosis->guest_user_id;
        }
    }
}
