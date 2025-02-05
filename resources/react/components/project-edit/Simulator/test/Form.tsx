import React, { useState } from 'react'
import { v4 as uuid } from "uuid";
import "./Form.css"
import { DragDropContext, Draggable, DragUpdate, Droppable, DroppableProps, DroppableProvided, DroppableStateSnapshot, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from './StrictModeDroppable';
import Row from '../../Row';
import { disableBodyScroll } from 'body-scroll-lock';
import { blue } from '@mui/material/colors';

type Props = {
    formRef: React.RefObject<HTMLDivElement>,
    rows: Row[],
    setRows: React.Dispatch<React.SetStateAction<Row[]>>,
    formLog: Row[][],
    setFormLog: React.Dispatch<React.SetStateAction<Row[][]>>,
    formBackLog: Row[][],
    setFormBackLog: React.Dispatch<React.SetStateAction<Row[][]>>,
    direction: "horizontal" | "vertical",
    setDirection: React.Dispatch<React.SetStateAction<"horizontal" | "vertical">>,
    color:string,
}

const Form = ({ formRef, rows, setRows, formLog, setFormLog, formBackLog, setFormBackLog, direction, setDirection, color }: Props) => {
    const onDragEnd = (result: DropResult) => {
        if (!result.destination || result.source.droppableId == "outerForm") return;

        if (direction == "horizontal") {
            const { source, destination } = result;
            if (result.destination.index == -1) {
                const sourceIndex = Number(result.source.droppableId);
                const sourceElements = [...rows[sourceIndex]];
                const [removed] = sourceElements.splice(source.index, 1)
                const newRows = [...rows];
                if (sourceElements.length == 0) {
                    newRows.splice(sourceIndex, 1)
                } else {
                    newRows[sourceIndex] = sourceElements;
                }
                newRows.push([removed]);
                const filteredNewRows = newRows.filter((row) => row.length > 0)
                setFormLog([...formLog, rows])
                setFormBackLog([])
                setRows(filteredNewRows);
                return;
            }
            const sourceIndex = Number(result.source.droppableId);
            const destinationIndex = Number(result.destination.droppableId);

            if (sourceIndex == destinationIndex) {
                const sourceElements = [...rows[sourceIndex]];
                const [removed] = sourceElements.splice(source.index, 1)
                sourceElements.splice(destination.index as number, 0, removed);
                const newRows = [...rows];
                newRows[sourceIndex] = sourceElements;

                // 更新前のフォームの内容をログに追加
                setFormLog([...formLog, rows])
                // 戻ったログをクリア
                setFormBackLog([])
                // 最新のフォームに更新
                setRows(newRows)
            } else {
                const sourceElements = [...rows[sourceIndex]];
                const destinationElements = [...rows[destinationIndex]];
                const [removed] = sourceElements.splice(source.index, 1);
                destinationElements.splice(destination.index, 0, removed);
                const newRows = [...rows];
                newRows[sourceIndex] = sourceElements;
                newRows[destinationIndex] = destinationElements;
                const filterdNewRows = newRows.filter(row => row.length > 0);
                setFormLog([...formLog, rows])
                setFormBackLog([])
                setRows(filterdNewRows);
            }
        } else {
            if (result.destination.index == -1) {
                const newRows = [...rows];
                const { source, destination } = result;
                const [removed] = newRows.splice(source.index, 1);
                newRows.push([...removed])
                setFormLog([...formLog, rows]);
                setFormBackLog([]);
                setRows(newRows);
            } else {
                const newRows = [...rows];
                const { source, destination } = result;
                const [removed] = newRows.splice(source.index, 1);
                newRows.splice(destination.index, 0, removed);
                setFormLog([...formLog, rows]);
                setFormBackLog([]);
                setRows(newRows)
            }
        }
    }

    const horizontalPaint = () => {
        return rows.map((row, rowIndex) => (
            <StrictModeDroppable key={rowIndex} droppableId={`${rowIndex}`} direction={direction}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ display: "flex" }}
                    >
                        {row.map((element, i) => (
                            <Draggable key={element.id} draggableId={element.id} index={i}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            opacity: snapshot.isDragging ? "0.5" : "1",
                                        }}
                                        dangerouslySetInnerHTML={{ __html: element.element }} >
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </StrictModeDroppable>
        ))

    }

    const onDragStart=()=>{
        disableBodyScroll(document.body);
    }

    const verticalPaint = () => {
        return (
            <StrictModeDroppable key={0} droppableId="verticalDroppableId" direction={direction}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {rows.map((row, index) => (
                            <Draggable key={index} draggableId={`${index}`} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <div style={{ display: "flex" }}>
                                            {row.map((element, i) => (
                                                <div dangerouslySetInnerHTML={{ __html: element.element }} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}

            </StrictModeDroppable>
        )
    }

    return (
        <div className="form" style={{backgroundColor:color}}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="outerForm">
                    <div ref={formRef} className="innerForm">
                        {direction == "horizontal" ? horizontalPaint() : verticalPaint()}
                    </div>

                    <StrictModeDroppable key={uuid()} droppableId={"outerForm"} direction='vertical'>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{ display: "flex" }}
                            >
                                <Draggable key={uuid()} draggableId={"outerForm"} index={-1}>
                                    {(provided, snapshot) => (
                                        <div
                                            className="formNewLine"
                                            ref={provided.innerRef}                                            {...provided.dragHandleProps}
                                            style={{
                                                height: "100vh",
                                                width: "100vw",
                                            }}
                                        >

                                        </div>
                                    )}
                                </Draggable>
                            </div>
                        )}
                    </StrictModeDroppable>
                </div>
            </DragDropContext>
        </div>
    )
}

export default Form