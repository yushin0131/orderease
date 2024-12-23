import React, { DragEvent, useEffect } from 'react'
import "./ImageFileDroppableArea.css"
import { uploadImage } from '../../../../../firebase/firebase';
type Props = {
    setIsDragging:React.Dispatch<React.SetStateAction<boolean>>,
    setImages: React.Dispatch<React.SetStateAction<string[]>>,
}

const ImageFileDroppableArea = ({setIsDragging,setImages}: Props) => {
    	// 再帰的にフォルダ内の画像ファイルを読み込む関数
	const readFilesRecursively = async (items: DataTransferItemList) => {
		const uploadImages: string[] = [];
		const traverseFileTree = async (item: any) => {
			return new Promise<void>((resolve) => {
				if (item.isFile) {
					// ファイルの場合、画像かどうかを確認して追加
					item.file(async(file: File) => {
						if (file.type.startsWith('image/')) {
							await uploadImage(file).then(uri=>{
								if(uri){
									uploadImages.push(uri);
								}
							})
							resolve();
						} else {
							resolve();
						}
					});
				} else if (item.isDirectory) {
					// ディレクトリの場合、中のファイルを再帰的に処理
					const dirReader = item.createReader();
					dirReader.readEntries(async (entries: any) => {
						for (const entry of entries) {
							await traverseFileTree(entry);
						}
						resolve();
					});
				}
			});
		};

		// ドラッグされたアイテム全てを処理
		const promises = Array.from(items).map((item) => {
			const entry = item.webkitGetAsEntry();
			if (entry) {
				return traverseFileTree(entry);
			}
			return Promise.resolve();
		});

		await Promise.all(promises);
		setImages((prevImages) => [...prevImages, ...uploadImages]);
	};

	// ドラッグ＆ドロップの処理
	const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);

		// フォルダ内も含めた画像ファイルを再帰的に読み込み
		await readFilesRecursively(e.dataTransfer.items);
	};

	// ドラッグオーバーを防止
	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};



	const handleDragLeave = (e: DragEvent) => {
		if (e.target == e.currentTarget) {
			setIsDragging(false);
		}
	}

	const mouseUp = (e: MouseEvent) => {
		e.preventDefault();
		setIsDragging(false);
	}

    useEffect(()=>{
        window.addEventListener("mouseup",mouseUp);
        return ()=>{
            window.removeEventListener("mouseup",mouseUp);
        }
    },[])

    return (
        <div
            className="imageFileDroppableArea"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div className="imageFileDroppableAreaContent">
                画像ファイルをドラッグ&ドロップして追加
            </div>
        </div>
    )
}

export default ImageFileDroppableArea