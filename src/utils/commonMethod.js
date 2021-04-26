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
/**
 * 동영상을 드랍존에 넣을 경우
 * ****/
export const videoInsert = (files) => {

    let formData = new FormData;
    const config = {
        header: {
            'content-type': 'multipart/form-data'
        }
    }
    //파일 타입을 보낼때 설정해줌
    //멀티파트 이기 때문에 몇개가 들어올지 모름
    //그래서 하나만 들어오게 해뒀기 때문에 첫번째 것만 가져옴
    formData.append("file", files[0])

    return new Promise((resolve, reject) => {
        axios.post(`${CLOUD_API}/file/upload/video`, formData, config).then(response => {
            resolve(response)
        })
    })
}
/**
 * 동영상 res가 오면 썸네일 만듬
 * ***/
export const makeThumbnail = (varibale) => {
    return new Promise((resolve, reject) => {
        axios.post(`${CLOUD_API}/file/upload/video/thumbnail`, varibale) //매개변수를 통해 res를 받음
            .then(response => {
                resolve(response);
            })
    })
}
/**
 * 동영상 업로드
 * ***/
export const uploadVideo = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${CLOUD_API}/video/save`, body).then(response => {
            resolve(response);
        })
    })

}

//알림창?
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
