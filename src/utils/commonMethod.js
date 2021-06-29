import { notification } from "antd";
import axios from "axios";
import { CLOUD_API, PROFILE_API, SNS_API, USER_API, FRIEND_API, LIKE_API, COMMENT_API, DASHBOARD_API, NOTICE_API } from "../route/Apis";
import url from '../route/DevUrl';
import { errorMessage } from "./alertMethod";
const FileDownloadlib = require('js-file-download');

//아이디 중복 확인
export const userEmailDuplicateCheck = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${USER_API}/dupCheck`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data.available)
                } else {
                    throw { success: false }
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
//인증 메일 보내기
export const sendAuthCheckMail = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${USER_API}/sendAuthCheckMail`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data.number)
                } else {
                    throw { success: false }
                }

            })
            .catch(err => {
                reject(err)
            })
    })

}





/**
 * 사진을 드랍존에 떨어뜨릴 경우.
 * 루트 파일에 업로드함
 * 경로는 지정식
 * **/
export const pictureInsert = (file) => {
    const formData = new FormData();
    const config = {
        header: { 'Content-type': 'multipart/form-data' }
    }
    formData.append("file", file)
    return new Promise((resolve, reject) => {
        axios.post(`${CLOUD_API}/file/upload/pictures`, formData, config)
            .then(response => {
                if (response.data.success) {
                    resolve(response)
                } else {
                    reject(response)
                }
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
            if (response.data.success) {
                resolve(response)
            } else {
                reject(response)
            }
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
                if (response.data.success) {
                    resolve(response)
                } else {
                    reject(response)
                }
            })
    })
}
/**
 * 동영상 업로드
 * ***/
export const uploadVideo = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${CLOUD_API}/video/save`, body).then(response => {
            if (response.data.success) {
                resolve(response)
            } else {
                reject(response)
            }
        })
    })

}
/**
 * 파일 업로드
 * **/

export const FileUpload = (files) => {
    let formData = new FormData;
    const config = {
        header: {
            'content-type': 'multipart/form-data'
        }
    }
    formData.append("file", files[0])
    return new Promise((resolve, reject) => {
        axios.post(`${CLOUD_API}/file/upload/document`, formData, config).then(response => {
            if (response.data.success) {
                resolve(response)
            } else {
                reject(response)
            }
        })
    })
}
export const FileSave = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${CLOUD_API}/document/save`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response)
                } else {
                    reject(response)
                }
            })
    })
}
/**
 * 파일 다운로드
 * **/
export const FileDownload = (file) => {
    axios({
        url: `${url}/${file.logicPath}`,
        method: 'GET',
        responseType: 'blob',
    }).then((response) => {
        FileDownloadlib(response.data, file.originalname);
    });
}
/**
 * 파일 정보 수정
 * **/
export const FileUpdate = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${CLOUD_API}/file/update`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response)
                } else {
                    reject(response)
                }
            })
    })
}
/**
 * 비디오 파일 컨버팅
 * **/
export const videoConvert = (body) => {
    axios.post(`${CLOUD_API}/file/video/convert`, body)
}
/*******************************시간 및 날짜***************************************/
//시간 포맷
const timeConvert = (number) => {
    if (number === "" || number === "0") {
        number = "00";
    } else if (number < 10) {
        number = "0" + number;
    }
    return number;
}

/**
 * @name 날짜변환
 * @param 날짜객체
 * @param 하이폰 Hyphen
 * ***/
export const dateToString = (dateTime, Hyphen) => {
    let date = new Date(dateTime)
    const year = timeConvert(date.getFullYear());
    const month = timeConvert(date.getMonth() + 1)
    const day = timeConvert(date.getDate());

    if (Hyphen) { //하이폰 넣어줌
        return year + "-" + month + "-" + day;
    } else {
        return year + month + day;
    }
}
/**
 * @name 날짜시간변환
 * @param 날짜객체
 * @param 표현 범위 ['yy','mm','dd','hh','mi','ss']
 * ***/
export const dateTimeToString = (arg, limit) => {
    let date = new Date(arg);
    date.setHours(date.getHours());
    let year = date.getFullYear();
    let month = timeConvert(date.getMonth() + 1);
    let day = timeConvert(date.getDate());
    let hour = timeConvert(date.getHours())
    let min = timeConvert(date.getMinutes())
    let sec = timeConvert(date.getSeconds())

    switch (limit) {
        case 'yy':
            return year;
        case 'mm':
            return year + "-" + month;
        case 'dd':
            return year + "-" + month + "-" + day;
        case 'hh':
            return year + "-" + month + "-" + day + " " + hour
        case 'mi':
            return year + "-" + month + "-" + day + " " + hour + ":" + min
        case 'ss':
            return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
        default:
            return year + "-" + month + "-" + day;
    }
}

/*******************************개인정보 관리******************************/
// 프로필 사진 업로드 
export const profileInsert = (files) => {
    let formData = new FormData;
    const config = {
        header: {
            'content-type': 'multipart/form-data'
        }
    }
    formData.append("file", files[0])
    return new Promise((resolve, reject) => {
        axios.post(`${PROFILE_API}/image/upload`, formData, config).then(response => {
            if (response.data.success) {
                resolve(response)
            } else {
                reject(response)
            }
        })
    })
}

// 프로필 사진 변경
export const changeProfileImage = (file, flag) => {
    let body = {
        file, flag
    };
    return new Promise((resolve, reject) => {
        axios.post(`${PROFILE_API}/image/save`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response)
                } else {
                    reject(response)
                }
            })
    })
}
//프로필 정보 변경
export const profileUpdate = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${PROFILE_API}/info/update`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response);
                } else {
                    reject(response);
                }

            })
    })
}
//사람 상세 정보 가져옴
export const getUserInfo = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${PROFILE_API}/info/user`, body)
            .then(res => {
                if (res.data.success) {
                    resolve(res.data.userInfo)
                } else {
                    reject(res)
                }
            })
    })
}
//타임 라인 목록 가져옴
export const getTimeLineList = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${SNS_API}/timeline/list`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response)
                } else {
                    reject(response)
                }
            })
    })
}
// 사람 목록 가져옴
export const getUserList = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${USER_API}/list`, body)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}
// 친구 신청
export const setFriendAdd = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${FRIEND_API}/add`, body)
            .then(response => {
                resolve(response)
            })
            .catch(err => {
                reject(err);
            })
    })
}
// 친구 삭제
export const setFriendDelete = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${FRIEND_API}/delete`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data.success)
                } else {
                    reject({ success: false })
                }
            })
            .catch(err => {
                reject(err);
            })
    })
}
//친구 요청 목록
export const getFriendReceiveList = () => {
    return new Promise((resolve, reject) => {
        axios.post(`${FRIEND_API}/receive/list`)
            .then(response => {
                resolve(response)
            })
            .catch(err => {
                reject(err);
            })
    })
}
/**
 * @async
 * @function getFriendsList
 * @param level
 * **/
export const getFriendsList = (level) => {
    let body = {
        level
    }
    return new Promise((resolve, reject) => {
        axios.post(`${FRIEND_API}/list`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data.list)
                } else {
                    throw { success: false }
                }
            })
            .catch(err => {
                reject(err);
            })
    })
}
//친구요청 수락 | 거절
export const friendHadler = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${FRIEND_API}/handler`, body)
            .then(response => {
                resolve(response)
            })
            .catch(err => {
                reject(err);
            })
    })

}
/*************** 좋아요 , 싫어요 *********************/

export const getLikes = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${LIKE_API}/getLikes`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data.list);
                } else {
                    reject({ success: false })
                }
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const getDisLike = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${LIKE_API}/getDislikes`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data.list);

                } else {
                    reject({ success: false })
                }
            })
            .catch(err => {
                reject(err);
            })
    })
}
export const upLike = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${LIKE_API}/upLike`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data);
                } else {
                    reject({ success: false })
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
export const unLike = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${LIKE_API}/unLike`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data);
                } else {
                    reject({ success: false })
                }
            })
            .catch(err => {
                reject({ success: false })
            })
    })
}

export const upDisLike = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${LIKE_API}/upDisLike`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data);
                } else {
                    reject({ success: false })
                }
            })
            .catch(err => {
                reject({ success: false })
            })
    })
}
export const unDislike = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${LIKE_API}/unDislike`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data);
                } else {
                    reject({ success: false })
                }
            })
            .catch(err => {
                reject({ success: false })
            })
    })
}

/************** 댓글 ******************/
export const getCommentList = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${COMMENT_API}/list`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data.list);
                } else {
                    reject({ success: false })
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
export const commentPost = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${COMMENT_API}/post`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data.success);
                } else {
                    reject({ success: false })
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
export const commentDelete = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${COMMENT_API}/delete`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data);
                } else {
                    reject({ success: false })
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
export const commentUpdate = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${COMMENT_API}/update`, body)
            .then(response => {
                if (response.data.success) {
                    resolve()
                } else {
                    reject()
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
/*****************대쉬 보드********************/
export const getInUseSize = () => {
    return new Promise((resolve, reject) => {
        axios.post(`${DASHBOARD_API}/inUseSize`)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data.totalSize);
                } else {
                    throw response.data;
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
//메인 화면 최근 좋아요 가져옴
export const getMainLikeList = () => {
    return new Promise((resolve, reject) => {
        axios.post(`${LIKE_API}/main/list`)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data.list);
                } else {
                    reject({ success: false })
                }
            })
            .catch(err => {
                reject({ success: false })
            })
    })
}
// 최근 댓글 가져오기
export const getMainCommentList = () => {
    return new Promise((resolve, reject) => {
        axios.post(`${COMMENT_API}/main/list`)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data.list);
                } else {
                    reject({ success: false })
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
/***************** 공지사항 *********************/
//공지사항 목록
export const getNoticeList = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${NOTICE_API}/list`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data.list)
                } else {
                    reject({ success: false })
                }
            })
            .catch({ success: false })
    })
}
//공지사항 등록
export const uploadNotice = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${NOTICE_API}/upload`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data.success)
                } else {
                    reject({ success: false })
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
//공지사항 삭제
export const deleteNotice = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${NOTICE_API}/delete`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data.success);
                } else {
                    reject({ success: false })
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
//공지사항 수정
export const updateNotice = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${NOTICE_API}/update`, body)
            .then(response => {
                if (response.data.success) {
                    resolve(response.data.success);
                } else {
                    reject({ success: false });
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
