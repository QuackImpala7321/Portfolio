document.addEventListener('DOMContentLoaded', function() {
    const navBar = document.querySelector('.navbar');
    navBar.addEventListener('click', function(e) {
        console.log(navBar)
        const button = e.target.closest('a');
        if (!button)
            return

        console.log(button)
    })
});