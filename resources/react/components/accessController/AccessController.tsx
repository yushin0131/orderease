import React, { useEffect } from 'react'
import "./AccessController.css"
import { useShared } from '../useShared'
import Project from '../project/Project'
import Auth from '../auth/Auth'
import AuthStatus from '../auth-status/AuthStatus'
import OriginAuth from '../auth-test/OriginAuth'
import OriginAuthHandler from '../auth-test/OriginAuthHandler'
type Props = {}

const AccessController = (props: Props) => {
    const { authStatus } = useShared.states();
    switch(authStatus){
        case AuthStatus.LOGGED_IN:
            return <Project/>
        case AuthStatus.LOGGED_OUT:
            return <OriginAuthHandler/>
        case AuthStatus.PENDING:
            return <></>
    }
}

export default AccessController