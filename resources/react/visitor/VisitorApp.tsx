
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Order from './Order';
import Simulator from './Simulator'; // Simulatorをインポート

type Props = {}

const VisitorApp = (props: Props) => {
  const [htmlCode, setHtmlCode] = useState("");
  
  useEffect(() => {
    axios.post<{ htmlCode: string }>("/api/newprojectget", { projectId: 2 }).then(res => {
      setHtmlCode(res.data.htmlCode);
    });
  }, []);

  return (
    <div className="visitor-app">
      {/* スマホ画面に合わせて表示する */}
      <div className="mobile-layout">
        <Simulator formRef={null} rows={[]} setRows={() => {}} formLog={[]} setFormLog={() => {}} formBackLog={[]} setFormBackLog={() => {}} direction="horizontal" setDirection={() => {}} />
      </div>
      {/* <Order formHtml={htmlCode} /> もし別のフォームを表示する場合 */}
    </div>
  );
}

export default VisitorApp;


