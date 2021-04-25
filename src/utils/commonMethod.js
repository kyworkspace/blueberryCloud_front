import { notification } from "antd";
import axios from "axios";
import { CLOUD_API } from "../route/Apis";

/**
 * 사진을 드랍존에 떨어뜨릴 경우.
 * 루트 파일에 업로드함
 * 경로는 지정식
 * **/
export const pictureInsert = (body) => {
    // let body ={
    //     file : file,
    //     path : `605893111e9ec505b89fe02e/20210425`
    // }

    const formData = new FormData();
    const config = {
        header: { 'Content-type': 'multipart/form-data' }
    }
    formData.append("file", body.file)
    formData.append("path", body.path)

    // console.log(formData)

    return new Promise((resolve, reject) => {
        axios.post(`${CLOUD_API}/file/upload/pictures`, formData, config)
            // axios.post(`${CLOUD_API}/file/upload/pictures`, body)
            .then(response => {
                console.log(response)
                resolve(response);
            })
    })
}

export const openNotification = ({ title, desc, event, placement }) => {
    notification.open({
        message: title,
        description: desc,
        onClick: event,
        placement
    });
};

/**
 * @name 날짜변환
 * @param 날짜객체
 * @param 하이폰 Hyphen
 * ***/
export const dateToString = (dateTime, Hyphen) => {
    let date = new Date(dateTime)
    const year = date.getFullYear();
    const month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    const day = date.getDate() > 10 ? date.getDate() : "0" + (date.getDate());;

    if (Hyphen) { //하이폰 넣어줌
        return year + "-" + month + "-" + day;
    } else {
        return year + month + day;
    }
}
