import React, { useState } from 'react';
import './SlideMenu.css';
import { IconContext } from 'react-icons';
import { IoMdMenu } from 'react-icons/io';

type Props = {
    handleCodeChange: (code: string) => void
    inputedCode: string,
    bottomTooltip: (element: JSX.Element, description: string, onClick?: () => void) => JSX.Element,
}

const SlideMenu = ({ handleCodeChange, inputedCode,bottomTooltip }: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleMenu = () => {
        setIsVisible((prev) => !prev);
    };

    const templates = [
        {
            title: "Line",
            element: "<div>テキスト</div>",
        },
        {
            title: "Order Button",
            element: "<button>注文</button>",
        },
        {
            title: "Add Menu Button",
            element: "<button>追加</button>",
        },
    ]
    const applyTemplate = (element: string) => {
        const lines = inputedCode.split("\n");
        if (lines.pop()?.trim() != "") {
            element = "\n" + element
        }
        handleCodeChange(inputedCode + element)
    }

    return (
        <div className="tooltip">
            <IoMdMenu color="white" size="22px" onClick={toggleMenu} />
            <div className="bottomDescription">メニュー</div>
            <div className={`menu ${isVisible ? 'open' : ''}`}>
                <div style={{ fontSize: "28px" }}>Docs</div>
                <div style={{ marginLeft: "2vw", marginTop: "1vw" }}>
                    <div style={{ fontSize: "22px" }}>Template</div>
                    <ul style={{ margin: 0, padding: 0, marginLeft: "3vw" }}>
                        {templates.map((template, i) => (
                            <li key={i} onClick={() => applyTemplate(template.element)}>{template.title}</li>
                        ))}
                    </ul>

                </div>
            </div>
            {isVisible && (
                <div
                    style={{ zIndex: 99, position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)" }}
                    onClick={() => setIsVisible(false)}
                />
            )}
        </div>
    );
};

export default SlideMenu;
