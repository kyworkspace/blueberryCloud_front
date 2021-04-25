export const calcUnit = (size) => {
    let unit = "byte"
    let calcSize = 0;
    const b = 1;
    const kb = b * 1024;
    const mb = kb * 1024;
    const gb = mb * 1024;

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