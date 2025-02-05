import React, { useState } from 'react';
import Template1 from '../Template1';
import Product from '../../product-tool/Product';
import "./TemplateToolDetails.css";
import { set } from 'react-datepicker/dist/date_utils';
import Simulator from '../../../Simulator/Simulator';
import Row from '../../../Row';
import { v4 as uuid } from "uuid";
import Template2 from '../Template2';
import Template3 from '../Template3';
import Template4 from '../template4';

type Props = {
    products: Product[];
    formLog: Row[][],
    setFormLog: React.Dispatch<React.SetStateAction<Row[][]>>,
    setFormBackLog: React.Dispatch<React.SetStateAction<Row[][]>>,
    rows: Row[],
    setRows: React.Dispatch<React.SetStateAction<Row[]>>,
};

const TemplateToolDetails = (props: Props) => {
    const templates: any[] = [];
    const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
    const [selectingTemplateIndex, setSelectingTemplateIndex] = useState(-1);
    const [applyTemplate, setApplyTemplate] = useState(<></>);
    const product: Product = {
        id: 1,
        name: "プリン",
        price: 1000,
        thumbnail: "https://iconbu.com/wp-content/uploads/2020/11/%E3%81%B7%E3%82%8B%E3%81%B7%E3%82%8B%E3%83%97%E3%83%AA%E3%83%B3.jpg",
    };

    const onClickTemplate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, product: Product) => {
        // templates.push(<Template1 product={product} />);
        switch (selectingTemplateIndex) {
            case 0:
                setApplyTemplate(<Template1 product={product} />)
                break;
            case 1:
                setApplyTemplate(<Template2 product={product} />)
                break;
            case 2:
                setApplyTemplate(<Template3 product={product} />)
                break;
            case 3:
                setApplyTemplate(<Template4 product={product} />)
                break;
        }




        // setIsCreatingTemplate(false);
    };
    const onCreateTemplate = (i: number) => {
        setSelectingTemplateIndex(i);
        setIsCreatingTemplate(true);
    }
    const setTemplate = () => {
        const result = document.getElementById("applyTemplate")?.innerHTML as string
        props.setFormLog([...props.formLog, props.rows])
        props.setFormBackLog([])
        const newRows = [...props.rows];
        newRows.push([{ id: uuid(), element: result, rowIndex: newRows.length }]);
        props.setRows(newRows)
        setSelectingTemplateIndex(-1);
        setApplyTemplate(<></>)
        setIsCreatingTemplate(false)
    }
    return (
        <>
            {[
                <Template1 product={product} />,
                <Template2 product={product} />,
                <Template3 product={product} />,
                <Template4 product={product} />,
            ].map((e, i) => {
                return (
                    <div
                        className="productTemplate"
                        style={{ height: "15vh" }}
                        onClick={() => onCreateTemplate(i)}
                    >
                        {e}
                    </div>
                );
            })}
            {isCreatingTemplate && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "50vw",
                        height: "50vh",
                        backgroundColor: "black",
                        color: "white",
                    }}
                >
                    商品を選択
                    {props.products.map(product => {
                        return (
                            <div onClick={(e) => onClickTemplate(e, product)}>
                                {product.name}
                                {product.price}
                                <img src={product.thumbnail} style={{ width: "7vw" }} />
                            </div>
                        );
                    })}
                    <button onClick={() => { setIsCreatingTemplate(false); setSelectingTemplateIndex(-1); setApplyTemplate(<></>) }}>キャンセル</button>
                    <button onClick={setTemplate}>追加</button>
                    <div id="applyTemplate">
                        {applyTemplate}
                    </div>
                </div>
            )}
        </>
    );
};

export default TemplateToolDetails;
