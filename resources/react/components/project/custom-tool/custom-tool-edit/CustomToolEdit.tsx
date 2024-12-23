import React, { useRef, useState } from 'react'
import ReactCodeMirror, { EditorView, ReactCodeMirrorRef } from "@uiw/react-codemirror";
import './CustomToolEdit.css';
// @ts-ignore
import { html } from "@codemirror/lang-html";
import { basicSetup } from "codemirror";
import { xcodeDark } from "@uiw/codemirror-theme-xcode";

import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoMdMenu } from "react-icons/io";
import { BiMemoryCard } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

// 本番環境の場合、これは外す
// @ts-ignore
import DOMPurify from 'dompurify';
import { autocompletion, CompletionContext } from '@codemirror/autocomplete';
import SlideMenu from './SlideMenu';
import { IconContext } from 'react-icons';
import { IoSaveSharp } from 'react-icons/io5';
import { TbFileExport } from 'react-icons/tb';
import { MdClose } from 'react-icons/md';
import { useShared } from '../../../useShared';
type Props = {}

type FuncProps = {
    code: string,
    props: any,
}


// カスタム補完関数を定義
function customCompletions(context: CompletionContext) {
    const word = context.matchBefore(/\w*/);
    if (!word || (word.from === word.to && !context.explicit)) return null;

    // 補完候補リスト
    const options = [
        { label: 'html', type: 'tag', apply: '<html></html>' },
        { label: 'head', type: 'tag', apply: '<head></head>' },
        { label: 'title', type: 'tag', apply: '<title></title>' },
        { label: 'meta', type: 'tag', apply: '<meta>' },
        { label: 'link', type: 'tag', apply: '<link>' },
        { label: 'style', type: 'tag', apply: '<style></style>' },
        { label: 'body', type: 'tag', apply: '<body></body>' },
        { label: 'header', type: 'tag', apply: '<header></header>' },
        { label: 'footer', type: 'tag', apply: '<footer></footer>' },
        { label: 'nav', type: 'tag', apply: '<nav></nav>' },
        { label: 'section', type: 'tag', apply: '<section></section>' },
        { label: 'article', type: 'tag', apply: '<article></article>' },
        { label: 'aside', type: 'tag', apply: '<aside></aside>' },
        { label: 'h1', type: 'tag', apply: '<h1></h1>' },
        { label: 'h2', type: 'tag', apply: '<h2></h2>' },
        { label: 'h3', type: 'tag', apply: '<h3></h3>' },
        { label: 'h4', type: 'tag', apply: '<h4></h4>' },
        { label: 'h5', type: 'tag', apply: '<h5></h5>' },
        { label: 'h6', type: 'tag', apply: '<h6></h6>' },
        { label: 'p', type: 'tag', apply: '<p></p>' },
        { label: 'a', type: 'tag', apply: '<a></a>' },
        { label: 'img', type: 'tag', apply: '<img>' },
        { label: 'ul', type: 'tag', apply: '<ul></ul>' },
        { label: 'ol', type: 'tag', apply: '<ol></ol>' },
        { label: 'li', type: 'tag', apply: '<li></li>' },
        { label: 'table', type: 'tag', apply: '<table></table>' },
        { label: 'tr', type: 'tag', apply: '<tr></tr>' },
        { label: 'td', type: 'tag', apply: '<td></td>' },
        { label: 'th', type: 'tag', apply: '<th></th>' },
        { label: 'form', type: 'tag', apply: '<form></form>' },
        { label: 'input', type: 'tag', apply: '<input>' },
        { label: 'button', type: 'tag', apply: '<button></button>' },
        { label: 'label', type: 'tag', apply: '<label></label>' },
        { label: 'div', type: 'tag', apply: '<div></div>' },
        { label: 'span', type: 'tag', apply: '<span></span>' },
        { label: 'script', type: 'tag', apply: '<script></script>' },
        { label: 'br', type: 'tag', apply: '<br>' },
        { label: 'hr', type: 'tag', apply: '<hr>' },
        { label: 'strong', type: 'tag', apply: '<strong></strong>' },
        { label: 'em', type: 'tag', apply: '<em></em>' },
        { label: 'iframe', type: 'tag', apply: '<iframe></iframe>' },
        { label: 'canvas', type: 'tag', apply: '<canvas></canvas>' },
        { label: 'svg', type: 'tag', apply: '<svg></svg>' },
        { label: 'video', type: 'tag', apply: '<video></video>' },
        { label: 'audio', type: 'tag', apply: '<audio></audio>' },
        { label: 'source', type: 'tag', apply: '<source>' },
        { label: 'track', type: 'tag', apply: '<track>' },
        { label: 'map', type: 'tag', apply: '<map></map>' },
        { label: 'area', type: 'tag', apply: '<area>' },
        { label: 'base', type: 'tag', apply: '<base>' },
        { label: 'bdi', type: 'tag', apply: '<bdi></bdi>' },
        { label: 'bdo', type: 'tag', apply: '<bdo></bdo>' },
        { label: 'cite', type: 'tag', apply: '<cite></cite>' },
        { label: 'code', type: 'tag', apply: '<code></code>' },
        { label: 'data', type: 'tag', apply: '<data></data>' },
        { label: 'datalist', type: 'tag', apply: '<datalist></datalist>' },
        { label: 'details', type: 'tag', apply: '<details></details>' },
        { label: 'dialog', type: 'tag', apply: '<dialog></dialog>' },
        { label: 'figcaption', type: 'tag', apply: '<figcaption></figcaption>' },
        { label: 'figure', type: 'tag', apply: '<figure></figure>' },
        { label: 'mark', type: 'tag', apply: '<mark></mark>' },
        { label: 'meter', type: 'tag', apply: '<meter></meter>' },
        { label: 'noscript', type: 'tag', apply: '<noscript></noscript>' },
        { label: 'progress', type: 'tag', apply: '<progress></progress>' },
        { label: 'q', type: 'tag', apply: '<q></q>' },
        { label: 'rp', type: 'tag', apply: '<rp></rp>' },
        { label: 'rt', type: 'tag', apply: '<rt></rt>' },
        { label: 'ruby', type: 'tag', apply: '<ruby></ruby>' },
        { label: 'time', type: 'tag', apply: '<time></time>' },
        { label: 'track', type: 'tag', apply: '<track>' },
        { label: 'wbr', type: 'tag', apply: '<wbr>' },
        { label: 'canvas', type: 'tag', apply: '<canvas></canvas>' },
        { label: 'picture', type: 'tag', apply: '<picture></picture>' },
        { label: 'source', type: 'tag', apply: '<source>' },
        { label: 'track', type: 'tag', apply: '<track>' },
        { label: 'menu', type: 'tag', apply: '<menu></menu>' },
        { label: 'menuitem', type: 'tag', apply: '<menuitem></menuitem>' },
        { label: 'template', type: 'tag', apply: '<template></template>' },
    ];

    return {
        from: word.from,
        options,
    };
}

const CustomToolEdit = (props: Props) => {
    const {setShared,isExtensionToolEditing}=useShared.states();

    const getArgs = (functionName: string, funcProps: FuncProps, callBack: (args: any[]) => any) => {
        const pattern = new RegExp(`\\{${functionName}\\(([^)]+)\\)\\}`)
        while (true) {
            const match = funcProps.code.match(pattern);
            if (match && match[1]) {
                const args = match[1].trim().split(",");
                args.forEach((arg, i) => {
                    if (funcProps.props[arg]) {
                        args[i] = funcProps.props[arg];
                    }
                })
                funcProps.code = funcProps.code.replace(match[0], callBack(args));
            } else {
                break;
            }
        }
        return funcProps.code;
    }

    const incTax = (funcProps: FuncProps) => (
        getArgs("incTax", funcProps, (args) => {
            return Math.floor(args[0] * args[1]);
        })
    )

    const add = (funcProps: FuncProps) => (
        getArgs("add", funcProps, args => {
            return args.map(arg => Number(arg)).reduce((prev, arg) => prev + arg, 0)
        })
    )

    const substract = (funcProps: FuncProps) => (
        getArgs("substract", funcProps, args => {
            return args.map(arg => Number(arg)).reduce((prev, arg) => prev - arg)
        })
    )

    const multiply = (funcProps: FuncProps) => (
        getArgs("multiply", funcProps, args => {
            return args.map(arg => Number(arg)).reduce((prev, arg) => prev * arg)
        })
    )

    const divide = (funcProps: FuncProps) => (
        getArgs("divide", funcProps, args => {
            return args.map(arg => Number(arg)).reduce((prev, arg) => prev / arg)
        })
    )

    const mod = (funcProps: FuncProps) => (
        getArgs("mod", funcProps, args => {
            return args.map(arg => Number(arg)).reduce((prev, arg) => prev % arg)
        })
    )

    const addSymbol = (funcProps: FuncProps) => (
        getArgs("\\+", funcProps, args => {
            return args.map(arg => Number(arg)).reduce((prev, arg) => prev + arg, 0)
        })
    )

    const substractSymbol = (funcProps: FuncProps) => (

        getArgs("\\-", funcProps, args => {
            return args.map(arg => Number(arg)).reduce((prev, arg) => prev - arg)
        })
    )

    const multiplySymbol = (funcProps: FuncProps) => (
        getArgs("\\*", funcProps, args => {
            return args.map(arg => Number(arg)).reduce((prev, arg) => prev * arg)
        })
    )

    const divideSymbol = (funcProps: FuncProps) => (
        getArgs("\\/", funcProps, args => {
            return args.map(arg => Number(arg)).reduce((prev, arg) => prev / arg)
        })
    )

    const modSymbol = (funcProps: FuncProps) => (
        getArgs("\\%", funcProps, args => {
            return args.map(arg => Number(arg)).reduce((prev, arg) => prev % arg)
        })
    )

    const functions = [
        incTax,
        add,
        substract,
        multiply,
        divide,
        mod,
        addSymbol,
        substractSymbol,
        multiplySymbol,
        divideSymbol,
        modSymbol,
    ]

    const convertHTML = (code: string, props: any) => {
        const codePropsMatch = code.match(/@props\(([^)]*)\)/)
        const codeProps = codePropsMatch?.[1].split(",").map(keyValue => keyValue.trim()).filter(keyValue => keyValue.length > 0 && keyValue.includes(":"))
        const codePropsMap: any = {}
        codeProps?.map(keyValue => keyValue.split(":")).forEach(prop => codePropsMap[prop[0]] = prop[1])
        let result = code.replace(/@props\(([^)]*)\)/, "")

        const convertProps: any = {}
        Object.keys(codePropsMap).map(key => {
            return { key, value: props[key] ? props[key] : codePropsMap[key] }
        }).forEach(prop => {
            const regex = new RegExp(`\\{\\s*${prop.key}\\s*\\}`, "g")
            result = result.replace(regex, prop.value);
            convertProps[prop.key] = prop.value
        })

        functions.forEach(func => {
            result = func({ code: result, props: convertProps });
        });
        result = result.replace(/\s*\n\s*/g, "");
        const sanitizedResult = DOMPurify.sanitize(result, { USE_PROFILES: { html: true } });
        return sanitizedResult;
    }

    const [inputedCode, setInputedCode] = useState("@props(\n\n)\n\n")

    // ロード時にコードをconvertHTMLして、setする
    const [generatedCode, setGeneratedCode] = useState("")

    const handleCodeChange = (code: string) => {
        setInputedCode(code);
        const result = convertHTML(code, {
            // menuId:2,
            // name: "chatgpt",
            // price: 100,
            // margin: "50px",
        })
        setGeneratedCode(`<div id="custom-tool">${result}</div>`)
    }


    const bottomTooltip = (element: JSX.Element, description: string, onClick?: () => void) => {
        return (<div className="tooltip" onClick={onClick}>
            {element}
            <div className="bottomDescription">{description}</div>
        </div>)
    }
    return (
        <div>
            <div className='tool-container' style={{ backgroundColor: "#333" }}>
                <SlideMenu bottomTooltip={bottomTooltip} inputedCode={inputedCode} handleCodeChange={handleCodeChange} />
                {bottomTooltip(<IoSaveSharp color="white" size={"22px"} />, "保存")}
                {bottomTooltip(<IoMdArrowRoundBack color="white" size={"22px"} />, "戻る")}
                {bottomTooltip(<IoMdArrowRoundForward color="white" size={"22px"} />, "進む")}
                {bottomTooltip(<TbFileExport color="white" size={"22px"} />, "エクスポート")}
                {bottomTooltip(<FaGear color="white" size={"22px"} />, "設定")}
                <input placeholder="タイトル" className="project-edit-title" />
                <span className="project-close" onClick={()=>setShared({isExtensionToolEditing},false)}>
                    <div className="tooltip">
                        <MdClose color="white" size={"28px"} />
                        <div className="leftDescription">閉じる</div>
                    </div>
                </span>
            </div>
            <div className='code-preview-container'>
                <div className='extension-tool-preview'>
                    <div className='extension-tool-header'>プレビュー</div>
                    <div className='extension-tool-preview-content' dangerouslySetInnerHTML={{ __html: generatedCode }} />
                </div>
                <div className='extension-tool-editor' style={{ overflowY: "auto" }}>
                    <div className='extension-tool-header'>HTMLコード</div>
                    <ReactCodeMirror
                        className='reactCodeMirror'
                        onChange={handleCodeChange}
                        value={inputedCode}
                        theme={xcodeDark}
                        extensions={[basicSetup, html(), EditorView.lineWrapping, autocompletion({ override: [customCompletions] })]}
                        style={{ overflowY: "scroll" }} />
                </div>
            </div>
        </div>
    );
};

export default CustomToolEdit;