export const windowClickEvent = (event) => {
    var ignoreClick_On_Out_side_Element = document.getElementById('out_side_click');
    var ignoreClick_On_Main_Nav_Element = document.getElementById('sidebar-menu');

    var isClickOutSideElement = ignoreClick_On_Out_side_Element.contains(event.target);
    var isClickMainNavElement = ignoreClick_On_Main_Nav_Element.contains(event.target);
    if (window.innerWidth <= 991 && !isClickOutSideElement && !isClickMainNavElement) {
        //Do something click is outside specified element
        document.querySelector(".page-header").className = "page-header close_icon";
        document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon "
    }
}