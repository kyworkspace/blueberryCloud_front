
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
import folderImage from '../assets/images/thumbnails/folder.png'
import url from '../route/DevUrl';
/**
 * mimetype 넣으면 이미지 반환?
 * **/
const standardBackground = {
    height: '200px'
    , backgroundSize: '100%'
    , backgroundPosition: 'center'
    , backgroundRepeat: 'no-repeat'
}
export const mimeTypeFinder = (file) => {
    const { mimetype, logicPath, thumbnailpath } = file

    let type = mimetype.split('/')[0];
    let ret = {};
    switch (type) {
        // case 'video':
        //     ret.type = type[1];
        //     ret.image = `url(${url}/${logicPath})`;
        //     break;
        case 'image':
            ret.type = type[1];
            ret.image = {
                ...standardBackground
                , backgroundImage: `url(${url}/${logicPath})`
            };
            break;
        case 'audio':
            ret.type = type[1];
            ret.image = {
                ...standardBackground
                , backgroundImage: `url(${musicIcon})`
            };
            break;
        case 'Folder':
            ret.type = "Folder";
            ret.image = {
                ...standardBackground,
                backgroundSize: '50%',
                backgroundImage: `url(${folderImage})`
            };
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
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${docsIcon})`
            };
            break;
        case 'application/vnd.ms-word.document.macroEnabled.12':
            ret.type = 'docm';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${docsIcon})`
            };
            break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            ret.type = 'docx';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${docsIcon})`
            };
            break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.template':
            ret.type = 'dotx';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${docsIcon})`
            };
            break;
        case 'application/vnd.ms-word.template.macroEnabled.12':
            ret.type = 'dotm';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${docsIcon})`
            };
            break;
        case 'text/html':
            ret.type = 'html';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${htmlIcon})`
            };
            break;
        case 'application/pdf':
            ret.type = 'pdf';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${pdfIcon})`
            };
            break;
        case 'application/vnd.ms-powerpoint.template.macroEnabled.12':
            ret.type = 'potm';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${pdfIcon})`
            };;
            break;
        case 'application/vnd.openxmlformats-officedocument.presentationml.template':
            ret.type = 'potx';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${pdfIcon})`
            };;
            break;
        case 'application/vnd.ms-powerpoint.addin.macroEnabled.12':
            ret.type = 'ppam';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${pdfIcon})`
            };;
            break;
        case 'application/vnd.openxmlformats-officedocument.presentationml.slideshow':
            ret.type = 'ppsx';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${pptIcon})`
            };
            break;
        case 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12':
            ret.type = 'ppsm';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${pptIcon})`
            };
            break;
        case 'application/vnd.ms-powerpoint':
            ret.type = 'ppt';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${pptIcon})`
            };;
            break;
        case 'application/vnd.ms-powerpoint.presentation.macroEnabled.12':
            ret.type = 'pptm';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${pptIcon})`
            };;
            break;
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            ret.type = 'pptx';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${pptIcon})`
            };;
            break;
        case 'application/rtf':
            ret.type = 'rtf';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${rtfIcon})`
            };
            break;
        case 'text/rtf':
            ret.type = 'rtf2';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${rtfIcon})`
            };
            break;
        case 'text/plain':
            ret.type = 'txt';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${txtIcon})`
            };
            break;
        case 'application/vnd.ms-excel':
            ret.type = 'xls';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${excelIcon})`
            };
            break;
        case 'application/vnd.ms-excel':
            ret.type = 'xml';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${excelIcon})`
            };
            break;
        case 'application/vnd.mozilla.xul+xml':
            ret.type = 'xul';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${excelIcon})`
            };
            break;
        case 'application/zip':
            ret.type = 'zip';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${zipIcon})`
            };
            break;
        case 'application/x-7z-compressed':
            ret.type = '7z';
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${zipIcon})`
            };
            break;
        case 'application/x-zip-compressed':
            ret.type = 'zip';
            ret.image = {
                ...standardBackground,
                backgroundSize: '60%',
                backgroundImage: `url(${zipIcon})`
            };
            break;
        default:
            ret.type = mimetype;
            ret.image = {
                ...standardBackground,
                backgroundImage: `url(${emptyIcon})`
            };
            break;
    }
    return ret;
}