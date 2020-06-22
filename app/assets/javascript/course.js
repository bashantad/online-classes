function toggleDrawer() {
    const drawer = document.getElementsByClassName('mdc-drawer--modal')
    const body = document.getElementsByClassName("backdrop");
    const isOpen = drawer[0].classList.contains('slide-in')

    if (isOpen) {
        drawer[0].classList.remove('slide-in')
        drawer[0].classList.add('slide-out')
        body[0].classList.remove('MuiBackdrop-root')
    } else {
        drawer[0].classList.remove('slide-out')
        drawer[0].classList.add('slide-in')
        drawer[0].classList.add('mdc-drawer--open')
        body[0].classList.add('MuiBackdrop-root')
    }
}

function hideDrawer() {
    const drawer = document.getElementsByClassName('mdc-drawer--modal')
    const body = document.getElementsByClassName("backdrop");

    drawer[0].classList.remove('slide-in')
    drawer[0].classList.add('slide-out')
    body[0].classList.remove('MuiBackdrop-root')
}
