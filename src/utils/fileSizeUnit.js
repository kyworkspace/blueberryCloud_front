const b = 1;
const kb = b * 1024;
const mb = kb * 1024;
const gb = mb * 1024;
export const calcUnit = (size) => { //수치 사이즈를 단위별로 분류한거
    let unit = "byte"
    let calcSize = 0;
    if (size > gb) {
        unit = " GB ";
        calcSize = (size / gb).toFixed(2);
    } else if (size > mb) {
        unit = " MB ";
        calcSize = (size / mb).toFixed(2);
    } else if (size > kb) {
        unit = " KB ";
        calcSize = (size / kb).toFixed(2);
    } else {
        unit = " B "
        calcSize = (size).toFixed(2);
    }

    return calcSize + unit

}
export const decodeUnit = (size, unit) => { //단위 분류된거를 수치사이즈로 바꾼거
    let calcSize = 0;

    switch (unit.toUpperCase()) {
        case "KB":
            calcSize = kb * size;
            break;
        case "MB":
            calcSize = mb * size;
            break;
        case "GB":
            calcSize = gb * size;
            break;
    }
    return calcSize

}
export const judgeUnit = (size) => {
    let unit;
    if (size > gb) {
        unit = "GB";
    } else if (size > mb) {
        unit = "MB";
    } else if (size > kb) {
        unit = "KB";
    } else {
        unit = "B"
    }
    return unit
}