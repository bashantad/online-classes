function toggleDrawer() {
    const drawer = document.getElementsByClassName('mdc-drawer--modal')
    const isOpen = drawer[0].classList.contains('slide-in')

    if (isOpen) {
        drawer[0].classList.remove('slide-in')
        drawer[0].classList.add('slide-out')
    } else {
        drawer[0].classList.remove('slide-out')
        drawer[0].classList.add('slide-in')
        drawer[0].classList.add('mdc-drawer--open')
    }
}
