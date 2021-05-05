
import docsIcon from '../assets/images/thumbnails/docx.png'
import htmlIcon from '../assets/images/thumbnails/html.png'
import pdfIcon from '../assets/images/thumbnails/pdf.png'
import pptIcon from '../assets/images/thumbnails/ppt.png'
import rtfIcon from '../assets/images/thumbnails/rtf.png'
import txtIcon from '../assets/images/thumbnails/txt.png'
import zipIcon from '../assets/images/thumbnails/zip.png'
import excelIcon from '../assets/images/thumbnails/excel.png'
import musicIcon from '../assets/images/thumbnails/music.png'
import emptyIcon from '../assets/images/thumbnails/empty.png'
import folderImage from '../assets/images/dashboard/folder.png'
import url from '../route/DevUrl';
/**
 * mimetype 넣으면 이미지 반환?
 * **/
export const mimeTypeFinder = (file) => {
    const { mimetype, originalpath, thumbnailpath } = file

    let type = mimetype.split('/')[0];
    let ret = {};
    switch (type) {
        case 'video':
            ret.type = type[1];
            ret.image = `url(${url}/${thumbnailpath})`;
            break;
        case 'image':
            ret.type = type[1];
            ret.image = `url(${url}/${originalpath})`;
            break;
        case 'audio':
            ret.type = type[1];
            ret.image = `url(${musicIcon})`;
            break;
        case 'Folder':
            ret.type = "Folder";
            ret.image = `url(${folderImage})`;
            break;
        default:
            ret = appFileFilder(mimetype);
            break;
    }
    return ret;
}

const appFileFilder = (mimetype) => {
    let ret = {};
    switch (mimetype) {
        case 'application/msword':
            ret.type = 'doc';
            ret.image = `url(${docsIcon})`;
            break;
        case 'application/vnd.ms-word.document.macroEnabled.12':
            ret.type = 'docm';
            ret.image = `url(${docsIcon})`;
            break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            ret.type = 'docx';
            ret.image = `url(${docsIcon})`;
            break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.template':
            ret.type = 'dotx';
            ret.image = `url(${docsIcon})`;
            break;
        case 'application/vnd.ms-word.template.macroEnabled.12':
            ret.type = 'dotm';
            ret.image = `url(${docsIcon})`;
            break;
        case 'text/html':
            ret.type = 'html';
            ret.image = `url(${htmlIcon})`;
            break;
        case 'application/pdf':
            ret.type = 'pdf';
            ret.image = `url(${pdfIcon})`;
            break;
        case 'application/vnd.ms-powerpoint.template.macroEnabled.12':
            ret.type = 'potm';
            ret.image = `url(${pdfIcon})`;
            break;
        case 'application/vnd.openxmlformats-officedocument.presentationml.template':
            ret.type = 'potx';
            ret.image = `url(${pdfIcon})`;
            break;
        case 'application/vnd.ms-powerpoint.addin.macroEnabled.12':
            ret.type = 'ppam';
            ret.image = `url(${pdfIcon})`;
            break;
        case 'application/vnd.openxmlformats-officedocument.presentationml.slideshow':
            ret.type = 'pps';
            ret.image = `url(${pptIcon})`;
            break;
        case 'application/vnd.openxmlformats-officedocument.presentationml.slideshow':
            ret.type = 'ppsx';
            ret.image = `url(${pptIcon})`;
            break;
        case 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12':
            ret.type = 'ppsm';
            ret.image = `url(${pptIcon})`;
            break;
        case 'application/vnd.ms-powerpoint':
            ret.type = 'ppt';
            ret.image = `url(${pptIcon})`;
            break;
        case 'application/vnd.ms-powerpoint.presentation.macroEnabled.12':
            ret.type = 'pptm';
            ret.image = `url(${pptIcon})`;
            break;
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            ret.type = 'pptx';
            ret.image = `url(${pptIcon})`;
            break;
        case 'application/rtf':
            ret.type = 'rtf';
            ret.image = `url(${rtfIcon})`;
            break;
        case 'text/rtf':
            ret.type = 'rtf2';
            ret.image = `url(${rtfIcon})`;
            break;
        case 'text/plain':
            ret.type = 'txt';
            ret.image = `url(${txtIcon})`;
            break;
        case 'application/vnd.ms-excel':
            ret.type = 'xls';
            ret.image = `url(${excelIcon})`;
            break;
        case 'application/vnd.ms-excel':
            ret.type = 'xml';
            ret.image = `url(${excelIcon})`;
            break;
        case 'application/vnd.mozilla.xul+xml':
            ret.type = 'xul';
            ret.image = `url(${excelIcon})`;
            break;
        case 'application/zip':
            ret.type = 'zip';
            ret.image = `url(${zipIcon})`;
            break;
        case 'application/x-7z-compressed':
            ret.type = '7z';
            ret.image = `url(${zipIcon})`;
            break;
        case 'application/x-zip-compressed':
            ret.type = 'zip';
            ret.image = `url(${zipIcon})`;
            break;
        default:
            ret.type = mimetype;
            ret.image = `url(${emptyIcon})`;
            break;
    }
    return ret;
}