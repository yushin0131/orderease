import React, { useState } from 'react'
import './PublishedProjectState.css'
import DatePicker, { registerLocale } from 'react-datepicker';
import { is, ja } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css'; // スタイルのインポート
import Linegraph from './linegraph/Linegraph';
import { MdClose } from "react-icons/md";
import { useShared } from '../../../useShared';
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

            <div className='published-area'>
                <div className='published-toggle-container'>
                    <div className='toggle-label'>公開</div>
                    <div className='published-toggle-button'>
                        <input
                            id='published-toggle'
                            className='published-toggle-input'
                            type='checkbox'
                            checked={isToggled}
                            onChange={handleToggleChange} />
                        <label htmlFor='published-toggle' className='published-toggle-label' />
                    </div>
                </div>
            </div>
            <hr className='divider-line' />
            <div className='statistical-data'>
                <div style={{ fontSize: '25px', margin: '__________10px' }}>統計データ</div>
                <div className='sales-amount-data'>
                    <div className='sales-amount-area'>
                        <span className='date-button' onClick={e => (e.currentTarget)}>日</span>
                        <span className='week-button' onClick={e => (e.currentTarget)}>週</span>
                        <span className='month-button' onClick={e => (e.currentTarget)}>月</span>
                        <DatePicker
                            className='sales-datepicker'
                            locale='ja'
                            selected={dateRange1[0]}
                            onChange={(update: [Date | null, Date | null]) => setDateRange1([update[0] || undefined, update[1] || undefined])}
                            startDate={dateRange1[0]}
                            endDate={dateRange1[1]}
                            selectsRange
                            isClearable
                            placeholderText='期間を選択'
                            dateFormatCalendar='yyyy年 MM月'
                            dateFormat='yyyy/MM/dd'
                            minDate={new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())} // 1年前の日付を計算
                            maxDate={today} // 今日の日付を最大日付に設定
                        />
                    </div>
                    <Linegraph
                        labels={["9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"]}
                        data={[20000, 15000, 80000, 40000, 4000, 800, 20000, 80000, 120, 5000, 40000, 30000, 5000]}
                        title='売上金額'
                        subtitle='12日'
                        lineColor='yellow'
                    />
                </div>
                <div className='sales-quantity-data'>
                    <div className='sales-quantity-aria'>
                        <select value={dropdown} onChange={(e) => setDropdown(e.target.value)}>
                            <option value='option1'>a</option>
                            <option value='option2'>b</option>
                            <option value='option3'>c</option>
                        </select>
                        <DatePicker
                            className='sales-datepicker'
                            locale='ja'
                            selected={dateRange2[0]}
                            onChange={(update: [Date | null, Date | null]) => setDateRange2([update[0] || undefined, update[1] || undefined])}
                            startDate={dateRange2[0]}
                            endDate={dateRange2[1]}
                            selectsRange
                            isClearable
                            placeholderText='期間を選択'
                            dateFormatCalendar='yyyy年 MM月'
                            dateFormat='yyyy/MM/dd'
                            minDate={new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())} // 1年前の日付を計算
                            maxDate={today} // 今日の日付を最大日付に設定
                        />
                    </div>
                    <Linegraph
                        labels={['ごはん', 'おこめ', 'ライス', 'ラーメン', 'アイスクリーム', 'アイス']}
                        data={[20, 35, 74, 85, 13, 46]}
                        title="売上個数"
                        subtitle='12日'
                        lineColor='blue'
                    />
                </div>
            </div>
        </div>


    )
}

export default PublishedProjectState