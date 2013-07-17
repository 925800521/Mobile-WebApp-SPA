(function () {
    
    /* ---------------------------- Local variables --------------------------------- */
    var wordURL = /^#word\/([a-z]+)\/(\d{1,3})/;
    var ps = new PageSlider(document.body, 'page');
    
    /* --------------------------- Event Registration ------------------------------- */
    window.addEventListener('hashchange', route);
    
    
    /* ----------------------------- Local functions -------------------------------- */
    function showAlert(message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    }
    
    
    
    function route() {
        var hash = window.location.hash;
        if ( !hash ) {
            var hv = new HomeView();
            hv.render();
            ps.slide(hv);
            return;
        } 
        var match = hash.match(wordURL);
        if(match){
            var wv = new WordView(match[1], match[2]);
            wv.render();
            ps.slide(wv);
        }
    }
    
    route();
}());
    
