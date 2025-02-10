
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Order from './Order';
import Simulator from '../components/project-edit/Simulator/Simulator'; // Simulatorをインポート

type Props = {}

const VisitorApp = (props: Props) => {
  const [htmlCode, setHtmlCode] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [name,setName]=useState("");
  const params = new URLSearchParams(window.location.search);

  // クエリパラメータから特定の値を取得
  const projectId = params.get('projectId') as string; // 'key'は取得したいクエリ名
  const seatId = params.get('seatId') as string; // 'key'は取得したいクエリ名

  console.log(projectId)


  useEffect(() => {
    axios.post<{ htmlCode: string, backgroundColor: string }>("/api/newprojectget", { projectId: projectId }).then(res => {
      setHtmlCode(res.data.htmlCode);
      setBackgroundColor(res.data.backgroundColor);
    });
  }, []);


  return (
    <div className="visitor-app">
      {/* スマホ画面に合わせて表示する */}
      <div className="mobile-layout">
        {/* <Simulator formRef={null} rows={[]} setRows={() => {}} formLog={[]} setFormLog={() => {}} formBackLog={[]} setFormBackLog={() => {}} direction="horizontal" setDirection={() => {}} /> */}
      </div>
      <Order formHtml={htmlCode} backgroundColor={backgroundColor} projectId={projectId} seatId={seatId} />
    </div>
  );
}

export default VisitorApp;


