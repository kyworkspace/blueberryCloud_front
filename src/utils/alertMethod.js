import SweetAlert from 'sweetalert2';

export const successMessage = (msg) => {
    SweetAlert.fire({ icon: "success", html: msg })
}
export const errorMessage = (msg) => {
    SweetAlert.fire({ icon: "error", html: msg })
}
export const infoMessage = (msg) => {
    SweetAlert.fire({ icon: "info", html: msg })
}
export const confirmMessage = (msg, okText, cancelText, cb) => {
    SweetAlert.fire({
        html: msg,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: okText,
        cancelButtonText: cancelText
    }).then((result) => {
        if (result.isConfirmed) {
            cb();
        }
    })
}