import React, { useState, useRef, useEffect } from 'react'
import './Export.css';
import { AiFillAndroid } from "react-icons/ai";
import QRCode from 'qrcode';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
type Props = {
  setIsExporting: React.Dispatch<React.SetStateAction<boolean>>,
  formRef: React.RefObject<HTMLDivElement>,
  projectId: number,
}

const Export = (props: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const publicRef = useRef<HTMLSpanElement | null>(null);
  const [isQrGenerateHidden, setIsQrGenerateHidden] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 数字のみを許可し、999以下の値に制限
    const numericValue = Number(value.replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xFEE0)));
    if (!isNaN(numericValue) && numericValue <= 999 && !value.includes(".")) {
      setInputValue(`${numericValue}`);
    } else if (numericValue >= 1000) {
      setInputValue("999"); // 999を超えた場合は999で固定
    }
  }

  const htmlGenerateClickEventHandler = () => {
    // htmlContentにstyle,jsなどを付け足したうえでダウンロードさせたい
    const htmlContent = props.formRef.current?.innerHTML as string;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "order_ease_export.html";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // メモリを解放
    URL.revokeObjectURL(url);
  }

  // urlを詳しく設定する必要あり
  const qrCodeGenerateClickEventHandler = async () => {
    // returnだけじゃなくて、座席数を入力してねみたいなメッセージを表示したい
    if (inputValue == "0" || inputValue == "") return;

    const urls = [...Array(Number(inputValue))].map((e, i) => {
      return `${location.href}visitor?projectId=${props.projectId}&seatId=${i + 1}`;
    })
    const zip = new JSZip();

    // 各URLに対してQRコードを生成
    const qrPromises = urls.map(async (url, index) => {
      const qrCodeDataUrl = await QRCode.toDataURL(url);
      zip.file(`qr_code_${index + 1}.png`, qrCodeDataUrl.split(',')[1], { base64: true }); // QRコードをPNGファイルとして追加
    });

    // QRコード生成がすべて完了するのを待つ
    await Promise.all(qrPromises);

    // ZIPファイルを生成
    const content = await zip.generateAsync({ type: 'blob' });

    // ZIPファイルをダウンロード
    saveAs(content, 'order_ease_qr_codes.zip');
  }

  useEffect(() => {
    if (publicRef.current) {
      const position = publicRef.current.offsetLeft;
      setPosition(position);
      setIsQrGenerateHidden(false);
    }
  }, []);

  window.onresize = () => {
    if (publicRef.current) {
      const position = publicRef.current.offsetLeft;
      setPosition(position);
    }
  }

  const outRangeClickEventHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('ex-black-filter')) {
      props.setIsExporting(false);
    }
  };

  return (
    <div className="option" style={{ position: "absolute", top: "0px", width: "100%" }} onClick={outRangeClickEventHandler}>
      <div className="ex-black-filter" />
      <div className="ex-content">

        {position ? <><div className="ex-menu">
          <span style={{ position: "absolute", left: position }}>
            <span>ファイルエクスポート：</span>
            <span className="ex-button" onClick={htmlGenerateClickEventHandler}>生成</span>
          </span>
        </div></> : <></>}

        <div className="ex-menu" style={{ visibility: isQrGenerateHidden ? "hidden" : "visible" }}>
          <span ref={publicRef} style={{ position: "relative" }}>
            <span>QRコード生成：</span>
            <span>座席数</span>
            <input type="text" className="ex-input-underline" value={inputValue} onChange={handleInputChange} placeholder="0" />
            <span className="ex-button" onClick={qrCodeGenerateClickEventHandler}>生成</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Export