import { UseShared } from "../lib/MegaMegaHooks"
import AuthStatus from "./auth-status/AuthStatus"


type Project = {
    id:number,
    wrap_user_id:number,
    title:string,
    thumbnail:string,
    is_published:boolean,
    html_code:string,
    created_at:string,
    updated_at:string,
}


type CustomTool = {
    id:number,
    wrap_user_id:number,
    custom_tool_id:string,
    title:string,
    thumbnail:string,
    is_published:boolean,
    html_code:string,
    created_at:string,
    updated_at:string,
}

type User = {
    name:string,
    icon:string,
    customTools:CustomTool[],
    projects:Project[],
}

type SharedType = {
    user: User | null,
    pageSelectHeight: number,
    PROJECT: symbol,
    setMenu: React.Dispatch<React.SetStateAction<symbol>>,
    isProjectEditing: boolean,
    isExtensionToolEditing: boolean,
    isPublishedProjectStating: boolean,
    authStatus: AuthStatus,
    editingProject:Project|null,
}

const useShared = new UseShared<SharedType>();
export { SharedType, useShared, User,Project,CustomTool }