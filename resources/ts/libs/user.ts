import type User from '@/types/user'
export function isGuest(me: User | null) {
  return me === null || me.is_guest
}
