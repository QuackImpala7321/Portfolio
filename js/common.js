document.addEventListener('DOMContentLoaded', function() {
    header = document.querySelector('.navbar')
    window.onscroll = fixHeaderPosition
})

function fixHeaderPosition(e) {
    console.log(window.scrollX)
}