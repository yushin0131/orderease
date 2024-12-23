import { User } from "../components/useShared";

type SessionAuthResult = {
    isSessionValid: boolean,
    user:User,
}

export default SessionAuthResult;