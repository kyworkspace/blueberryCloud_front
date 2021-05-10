import SweetAlert from 'sweetalert2';

export const successMessage = (msg) => {
    SweetAlert.fire({ icon: "success", text: msg })
}
export const errorMessage = (msg) => {
    SweetAlert.fire({ icon: "error", text: msg })
}
export const infoMessage = (msg) => {
    SweetAlert.fire({ icon: "info", text: msg })
}
