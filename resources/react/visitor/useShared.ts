import { UseShared } from "../lib/MegaMegaHooks";


type SharedType={
    setMode: React.Dispatch<React.SetStateAction<symbol>>,
    setFooterValue: any,
    ORDER: symbol,
    CART: symbol,
    CHECKOUT: symbol,
    ORDER_LOG: symbol,
    tabs: string[],

}

const useShared= new UseShared<SharedType>();
export {useShared};