import React, { useState } from 'react'
import './PublishedProjectState.css'
import DatePicker, { registerLocale } from 'react-datepicker';
import { is, ja } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css'; // スタイルのインポート
import Linegraph from './linegraph/Linegraph';
import { MdClose } from "react-icons/md";
import { useShared } from '../../../useShared';
import StoreOrderLog from '../orders/StoreOrderLog';
import CheckoutFin from '../orders/CheckOutFin';
registerLocale('ja', ja);

type Props = {}

const PublishedProjectState = (props: Props) => {
    const [isToggled, setIsToggled] = useState(false);
    const [dropdown, setDropdown] = useState<string>('');
    const [dateRange1, setDateRange1] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
    const [dateRange2, setDateRange2] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
    const { setShared, isPublishedProjectStating } = useShared.states();
    const today = new Date();

    const handleToggleChange = () => {
        setIsToggled(!isToggled);
    }

    return (
        <div className='published-container'>
            <div style={{ display: "flex" }}>
                <div className='published-project-name'>プロジェクト名</div>
                <span className="published-project-state-close" onClick={() => setShared({ isPublishedProjectStating }, false)}>
                    <div className="tooltip">
                        <MdClose size={"28px"} />
                        <div className="leftDescription">閉じる</div>
                    </div>
                </span>
            </div>

            <StoreOrderLog/>
            <hr />
            <CheckoutFin/>
        </div>


    )
}

export default PublishedProjectState