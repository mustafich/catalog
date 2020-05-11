import React from "react"
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import "./index.css"

const MyUploader = ({getImg}) => {
    // specify upload params and url for your files
    const getUploadParams = ({meta}) => {
        return {url: 'https://httpbin.org/post'}
    }

    const getImgUrl = ({meta, file}, status,allFiles) => {
        if(status==="done") {
            if(meta.height>200&&meta.height<4000) {
                let imageFile = file;
                let fileReader = new FileReader();
                fileReader.onload = function(fileLoadedEvent) {
                    let srcData = fileLoadedEvent.target.result;
                    getImg(srcData)

                }
                fileReader.readAsDataURL(imageFile);
            }

        }


    }
    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={getImgUrl}
            accept="image/*"
            multiple={false}
            inputContent="Перетащите файлы или нажмите, чтобы просмотреть"
            inputWithFilesContent=""
        />
    )
}

export default MyUploader