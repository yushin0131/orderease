import React, { useState } from 'react'
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { BiExport } from "react-icons/bi";
import { TbFileExport } from "react-icons/tb";
import "./Top.css"
import { IconType } from 'react-icons';
import { GoGear } from "react-icons/go";
import { FaGear } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useShared } from '../../useShared';
import { Mode } from '../../../lib/MegaMegaHooks';
import Row from '../Row';
type Props = {
    title: string,
    formLog: Row[][],
    formBackLog: Row[][],
    formRef: React.RefObject<HTMLDivElement>,
    titleRef: React.RefObject<HTMLInputElement>,
    saveRef: React.RefObject<HTMLDivElement>,
    backRef: React.RefObject<HTMLDivElement>,
    forwardRef: React.RefObject<HTMLDivElement>,
    setIsOptioning: React.Dispatch<React.SetStateAction<boolean>>,
    saveEventHandler: () => void,
    backEventHandler: () => void,
    forwardEventHandler: () => void,
    optionEventHandler: () => void,
    exportEventHandler: () => void,
    closeEventHandler: () => void,
}


const Top = (props: Props) => {
    const refMap: { [key: string]: React.RefObject<HTMLDivElement> } = {
        "戻る": props.backRef,
        "進む": props.forwardRef,
        "保存": props.saveRef,
    }
    const bottomTooltip = (element: JSX.Element, description: string, onClick?: () => void) => {
        return (<div ref={refMap[description]} className="tooltip" onClick={onClick}>
            {element}
            <div className="bottomDescription">{description}</div>
        </div>)
    }

    return (<>
        <div className="top">
            <span>
                {bottomTooltip(<IoSaveSharp className="hoverBackground" size={"22px"} />, "保存", props.saveEventHandler)}
                {bottomTooltip(<IoMdArrowRoundBack size={"22px"} style={{ color: props.formLog.length == 0 ? "gray" : "black" }} />, "戻る", props.backEventHandler)}
                {bottomTooltip(<IoMdArrowRoundForward size={"22px"} style={{ color: props.formBackLog.length == 0 ? "gray" : "black" }} />, "進む", props.forwardEventHandler)}
                {bottomTooltip(<TbFileExport size={"22px"} />, "エクスポート", props.exportEventHandler)}
                {bottomTooltip(<FaGear size={"22px"} />, "設定", props.optionEventHandler)}
                <input ref={props.titleRef} className="project-edit-title" defaultValue={props.title} />
            </span>

            <span className="project-close" onClick={props.closeEventHandler}>
                <div className="tooltip">
                    <MdClose size={"28px"} />
                    <div className="leftDescription">閉じる</div>
                </div>
            </span>
        </div>
        <hr className="top-hr" />
    </>
    )
}

export default Top