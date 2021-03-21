import axios from "axios";
import { CLOUD_API } from "../route/Apis";

/**
 * 사진을 드랍존에 떨어뜨릴 경우.
 * 루트 파일에 업로드함
 * 경로는 uploads/pictures
 * **/
export const pictureInsert = (file) => {
    const formData = new FormData();
    const config = {
        header: { 'content-type': 'multipart/form-data' }
    }
    formData.append("file", file)
    return new Promise((resolve, reject) => {
        axios.post(`${CLOUD_API}/file/upload/pictures`, formData, config)
            .then(response => {
                resolve(response);
            })
    })
}