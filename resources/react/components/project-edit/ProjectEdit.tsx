import React, { useEffect, useRef, useState } from 'react'
import Top from './top/Top'
import Option from './option/Option'
import ToolBar from './tool-bar/ToolBar'
import ToolDetails from './tool-details/ToolDetails'
import "./ProjectEdit.css"
import { Render, useMode, useRender, uuid } from '../../lib/MegaMegaHooks'
import ImageTool from './tool-details/image-tool/ImageTool'
import TextTool from './tool-details/text-tool/TextTool'
import Simulator from './Simulator/Simulator'
import { Project, useShared } from '../useShared'
import Export from './export/Export'
import Row from './Row'
import SimulatorSetting from './simulator-setting/SimulatorSetting'
import Image from './tool-details/image-tool/Image'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { ELEMENT_SPLIT_MARKER, ROW_SPLIT_MARKER } from './splitMarkers'
import axios from 'axios'
import sessionAuth from '../../session-auth/sessionAuth'
import Property from './property/Property'
import TreeView from './tree-view/TreeView'
import ProductTool from './tool-details/product-tool/ProductTool'
import Product from './tool-details/product-tool/Product'
import TemplateTool from './tool-details/template-tool/TemplateTool'
type Props = {}

const ProjectEdit = (props: Props) => {
  const formRef = useRef<HTMLDivElement>(null);

  const [isExporting, setIsExporting] = useState(false);
  const [isOptioning, setIsOptioning] = useState(false);
  const [formLog, setFormLog] = useState<Row[][]>([]);

  const [formBackLog, setFormBackLog] = useState<Row[][]>([]);


  const { setShared, setMenu, user, PROJECT, isProjectEditing, editingProject: abstractEditingProject } = useShared.states();
  const editingProject = abstractEditingProject as Project;

  const [products,setProducts]=useState<Product[]>([]);

  const [rows, setRows] = useState<Row[]>(
    editingProject.html_code.split(ROW_SPLIT_MARKER).map(rowStr => (
      rowStr.split(ELEMENT_SPLIT_MARKER).map((elementStr, i) => (
        { id: uuid(), element: elementStr, rowIndex: i }
      )) as Row).filter(element => element.element != "")
    )
  )



  const titleRef = useRef<HTMLInputElement>(null);

  const saveRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const forwardRef = useRef<HTMLDivElement>(null);

  const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");



  const [title, setTitle] = useState(editingProject.title);

  const [images, setImages] = useState<string[]>([]);
  const [IMAGE_TOOL, TEXT_TOOL,PRODUCT_TOOL,TEMPLATE_TOOL] = useMode(4);
  const [toolMode, setToolMode] = useRender(IMAGE_TOOL, {
    [IMAGE_TOOL]: <ImageTool images={images} setImages={setImages} formLog={formLog} setFormLog={setFormLog} setFormBackLog={setFormBackLog} rows={rows} setRows={setRows} />,
    [TEXT_TOOL]: <TextTool formLog={formLog} setFormLog={setFormLog} setFormBackLog={setFormBackLog} rows={rows} setRows={setRows} />,
    [PRODUCT_TOOL]:<ProductTool products={products} setProducts={setProducts}/>,
    [TEMPLATE_TOOL]:<TemplateTool products={products}formLog={formLog} setFormLog={setFormLog} setFormBackLog={setFormBackLog} rows={rows} setRows={setRows} />,
  });



  useEffect(() => {

    console.log(rows)

  }, [])




  // 戻るボタンを押した際の処理
  const backEventHandler = () => {
    if (formLog.length == 0) return;
    const newRows = formLog.pop() as {
      id: string;
      element: string;
      rowIndex: number;
    }[][];
    setFormBackLog([...formBackLog, rows])
    setRows(newRows);
  }

  // 進むボタンを押した際の処理
  const forwardEventHandler = () => {
    if (formBackLog.length == 0) return;
    const newRows = formBackLog.pop() as {
      id: string;
      element: string;
      rowIndex: number;
    }[][];;
    setFormLog([...formLog, rows]);
    setRows(newRows)
  }

  // 保存時にrowsをhtmlコードに変換する必要がある
  const saveEventHandler = () => {

    // 修正点
    // data urlだとデータサイズが大きくなりすぎてしまい、データベースに保存できなかったり、リクエストの時に送信できないサイズになってしまうかもしれないため、
    // 画像のdata urlと対応した画像IDをフロントエンドに渡し、フロントはdata urlを画像IDに変換してhtmlCodeとして送信するようにする
    // htmlCodeを受け取ったバックエンドはそのまま保存
    // htmlCodeを渡すときは、その利用者が登録した画像のdata urlと対応する画像IDを渡す


    let htmlCode = "";

    rows.map(row => (
      row.map(element => (
        element.element
      )).filter(element => element.length > 0)
    )).filter(row => row.length > 0).forEach(row => {
      row.forEach(element => htmlCode += `${element}${ELEMENT_SPLIT_MARKER}`)
      htmlCode += ROW_SPLIT_MARKER;
    });

    const { emailOrOriginUserId, sessionId, authType } = sessionAuth();
    const projectId = editingProject.id;
    const thumbnail = editingProject.thumbnail;
    const title = titleRef.current ? titleRef.current.value : "";
    const isPublished = editingProject.is_published;
    const deployHtmlCode="#####tabNameStart#####すべて#####tabNameFinish#####"+formRef.current!.innerHTML;

    axios.post("/api/newprojectupdate", {
      emailOrOriginUserId, sessionId, authType, projectId: `${projectId}`, thumbnail, title, isPublished: `${isPublished}`, htmlCode,deployHtmlCode,
    }).then(res => {
      user?.projects.filter(project => project.id == editingProject.id).forEach(project => {
        // 変更したものはすべてここで適用
        project.title = title;
        project.html_code = htmlCode;
      })
      // 保存完了を表す表示を行う
    })
  }

  // エクスポートボタンを押した際の処理
  const exportEventHandler = () => {
    setIsExporting(true);
  }

  // 設定ボタンを押した際の処理
  const optionEventHandler = () => {
    setIsOptioning(true);
  }

  // 閉じるボタンを押した際の処理
  const closeEventHandler = () => {
    sessionStorage.setItem("is-prev-menu-project-edit", "true");
    setMenu(PROJECT);
    setShared({ isProjectEditing }, false);
    setShared({ editingProject }, null);
  }


  const keyDownEventHandler = (event: KeyboardEvent) => {
    // 一つ一つ関数化するのもあり

    // Ctrl + S のチェック
    if (event.ctrlKey && event.key == "s") {
      event.preventDefault();
      // 保存を行う処理(apiリクエストなど)を行う
      saveRef.current?.click();
    } else if (event.ctrlKey && event.key == "z") {
      // フォームのタイトルがフォーカスされていたら何もしない
      if (document.activeElement == titleRef.current) return;
      event.preventDefault();
      // 戻るボタンをクリックする
      backRef.current?.click();
    } else if (event.ctrlKey && event.key == "y") {
      // フォームのタイトルがフォーカスされていたら何もしない
      if (document.activeElement == titleRef.current) return;
      event.preventDefault();
      // 進むボタンをクリックする
      forwardRef.current?.click();
    } else if (event.ctrlKey && event.key == "c") {
      // 以下の関数を呼び出さずに処理するほうがよさそう？
      // event.preventDefault();
      // 要素や文字列のコピーの処理を行う
    } else if (event.ctrlKey && event.key == "x") {
      // 以下の関数を呼び出さずに処理するほうがよさそう？
      // event.preventDefault();
      // 要素や文字列の切り取りの処理を行う
    } else if (event.ctrlKey && event.key == "v") {
      // 以下の関数を呼び出さずに処理するほうがよさそう？
      // event.preventDefault();
      // 要素や文字列の貼り付けの処理を行う
    }
  };

  useEffect(() => {
    // キー入力をフック
    window.addEventListener('keydown', keyDownEventHandler);
    // クリーンアップ関数でイベントリスナーを解除
    return () => {
      window.removeEventListener('keydown', keyDownEventHandler);
    };
  }, [])

  return (
    <div className="projectEdit">
      <Top title={title} formLog={formLog} formBackLog={formBackLog} saveRef={saveRef} formRef={formRef} titleRef={titleRef} backRef={backRef} forwardRef={forwardRef} setIsOptioning={setIsOptioning} saveEventHandler={saveEventHandler} backEventHandler={backEventHandler} forwardEventHandler={forwardEventHandler} optionEventHandler={optionEventHandler} exportEventHandler={exportEventHandler} closeEventHandler={closeEventHandler} />
      <ToolBar toolMode={toolMode} setToolMode={setToolMode} modes={{ IMAGE_TOOL, TEXT_TOOL,PRODUCT_TOOL ,TEMPLATE_TOOL}} />
      <div className="projectEditMain" style={{ display: "grid", gridTemplateColumns: "6fr 10fr 2fr 3fr 3fr" }}>
        <ToolDetails toolMode={toolMode} />
        <Simulator formRef={formRef} rows={rows} setRows={setRows} formLog={formLog} setFormLog={setFormLog} formBackLog={formBackLog} setFormBackLog={setFormBackLog} direction={direction} setDirection={setDirection} />
        <SimulatorSetting direction={direction} setDirection={setDirection} />
        {/* <Property formRef={formRef} rows={rows}/>
        <TreeView formRef={formRef} rows={rows}/> */}
      </div>
      {isOptioning ? <Option project={editingProject} setIsOptioning={setIsOptioning} /> : <></>}
      {isExporting ? <Export formRef={formRef} setIsExporting={setIsExporting} /> : <></>}
    </div>
  )
}

export default ProjectEdit