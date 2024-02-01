type PendingAction<ThunkArg> = {
  type: string
  meta: {
    requestId: string
    arg: ThunkArg
  }
}

type FulfilledAction<ThunkArg, T> = {
  type: string
  payload: T
  meta: {
    requestId: string
    arg: ThunkArg
  }
}

type RejectedAction<ThunkArg> = {
  type: string
  error:
    | {
        name?: string
        message?: string
        code?: string
        stack?: string
      }
    | any
  meta: {
    requestId: string
    arg: ThunkArg
    aborted: boolean
  }
}
