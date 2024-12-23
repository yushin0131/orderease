import { CustomTool, User } from "../components/useShared"

type AuthResult={
    authType:string,
    emailOrOriginUserId:string,
    isSuccess:boolean,
    sessionId:string,
    user:User,
}

export {AuthResult};