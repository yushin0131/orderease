const sessionAuth=()=>{
    const sessionId=localStorage.getItem("sessionId");
    const emailOrOriginUserId=localStorage.getItem("emailOrOriginUserId");
    const authType=localStorage.getItem("authType");
    return {sessionId,emailOrOriginUserId,authType};
}

export default sessionAuth;