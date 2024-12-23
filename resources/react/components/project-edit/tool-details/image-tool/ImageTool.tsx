import React, { useState, DragEvent, useEffect, ChangeEvent } from 'react';
import "./ImageTool.css"
import ImageFileDroppableArea from './image-file-droppable-area/ImageFileDroppableArea';
import { IoMdAdd } from "react-icons/io";
import ImageDetails from './image-details/ImageDetails';
import Row from '../../Row';
import Image from './Image';
import { uploadImage } from '../../../../firebase/firebase';

type Props = {
	images: string[],
	setImages: React.Dispatch<React.SetStateAction<string[]>>,
	formLog: Row[][],
	setFormLog: React.Dispatch<React.SetStateAction<Row[][]>>,
	setFormBackLog: React.Dispatch<React.SetStateAction<Row[][]>>,
	rows: Row[],
	setRows: React.Dispatch<React.SetStateAction<Row[]>>,
}

const ImageTool = (props: Props) => {
	const [isDragging, setIsDragging] = useState(false);

	// ドラッグが開始されたときにオーバーレイを表示
	const handleDragEnter = () => {
		setIsDragging(true);
	};

	const readFilesOnInput = async (files: FileList) => {
		const uploadImages: string[] = []; // 画像ファイル名とURLの配列

		const promises = Array.from(files).map(async(file) => {
			return new Promise<void>( async(resolve) => {
				if (file.type.startsWith('image/')) {
					const url=await uploadImage(file)
					uploadImages.push(url?url:"");
					resolve();
				} else {
					resolve();
				}
			});
		});

		await Promise.all(promises);
		props.setImages((prevImages) => [...prevImages, ...uploadImages]); // 画像の名前とURLを状態に設定
	};

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			await readFilesOnInput(files)
		}
	}

	useEffect(() => {
		window.addEventListener("dragenter", handleDragEnter);
		return () => {
			window.removeEventListener("dragenter", handleDragEnter)
		}
	}, [])

	return (
		<div>
			<div style={{display:"flex",flexWrap:"wrap"}}>{props.images.map(image => <ImageDetails image={image} {...props} />)}
			{isDragging && <ImageFileDroppableArea setIsDragging={setIsDragging} {...props} />}

			<input
				type="file"
				accept="image/*" // 画像ファイルのみを選択
				multiple // 複数ファイル選択を許可
				onChange={handleFileChange}
				style={{ display: 'none' }} // 必要に応じてスタイルを調整
				id="imageFileUploadInput"
			/>
			<label htmlFor="imageFileUploadInput" className="imageFileInputLabel">
				<IoMdAdd size={"7vw"} className="imageFileUploadButton" />
			</label>
		</div>
		</div>
	);
};

export default ImageTool;