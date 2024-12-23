import { useState } from "react";

// 使用例

// モードを3つ用意
// const [MODE1, MODE2, MODE3] = useMode(3);

// 初期時のモードと、モードごとに対応するHTML要素を設定
// const [mode, setMode] = useRender(MODE1, {
//     [MODE1]: <div>MODE1です</div>,
//     [MODE2]: <div>MODE2です</div>,
//     [MODE3]: <div>MODE3です</div>,
// });

// 現在のモードに対応するHTML要素を取得
// <Render mode={ mode }/>

// モードを更新
// setMode(MODE2);


type Mode = {
    id: symbol,
    modeMap: { [key: symbol]: JSX.Element },
}

const useRender = (modeId: symbol, modeMap: { [key: symbol]: JSX.Element }): [Mode, React.Dispatch<React.SetStateAction<symbol>>] => {
    const [id, setId] = useState(modeId);
    const mode: Mode = { id, modeMap };
    return [mode, setId];
};

export { type Mode as __________DEPRECATED_MODE__________, useRender as __________DEPRECATED_USE_RENDER__________ };