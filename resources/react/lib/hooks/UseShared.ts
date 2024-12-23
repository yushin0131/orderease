import { useState } from "react";

// useStateを拡張したフック
// ・オブジェクトとして渡された全ての値をまとめて状態管理でき、一つの関数で全ての値に対して更新処理を行うことができる
// ・コンポーネント間の自由な値共有が実現できるため、バケツリレーを解消しながらも、useStateとほぼ変わりない使用方法ができる

type AbstractSharedType = { [key: string]: any }

class UseShared<SharedType extends AbstractSharedType>{
    private keepSharedStates:SharedType|null=null;
    private keepSetSharedStates:React.Dispatch<React.SetStateAction<SharedType>>|null=null;

    private static getSharedStatesManager = <SharedType extends AbstractSharedType>(argSharedStates: SharedType, argSetSharedStates: React.Dispatch<React.SetStateAction<SharedType>>) => {
        type UseSharedStatesManager = SharedType & {
            setShared: <T>(state: { [key: string]: T }, value: T) => void,
        }
        const sharedStatesManager: UseSharedStatesManager = {
            ...argSharedStates,
            setShared: (state, value) => {
                (argSharedStates as any)[Object.keys(state)[0]] = value;
                argSetSharedStates({ ...argSharedStates })
            },
        }
        return sharedStatesManager;
    }

    public init = (states: SharedType) => {
        const [sharedStates, setSharedStates] = useState(states);
        this.keepSharedStates = sharedStates;
        this.keepSetSharedStates = setSharedStates;
        return UseShared.getSharedStatesManager(sharedStates, setSharedStates);
    }

    public states = () => {
        return UseShared.getSharedStatesManager<SharedType>(this.keepSharedStates as SharedType, this.keepSetSharedStates as React.Dispatch<React.SetStateAction<SharedType>>)
    }
}

export {
    UseShared as __________DEPRECATED_USE_SHARED__________,
};