import { User } from "../components/useShared";

type FirebaseAuthResult = {
    isSuccess: boolean,
    sessionId: string,
    email: string,
    message: string,
    user:User,
}
export  default FirebaseAuthResult;