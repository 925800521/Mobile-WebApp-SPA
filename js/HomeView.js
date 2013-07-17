var HomeView = function () {
    
    /* ------------------- Local variables ----------------- */
    var el
    var wordInfo = {word: 'palabra', lema: 'lema', definiciones: ['lorem ipsum lorem ipsum lorem ipsum', 'lorem ipsum'],
                    sinonimos: ['palabrilla', 'palabreja', 'palabrota'], antonimos: ['dibujo']};
    
    /* ------------------ Template -------------------- */
    function template(wordInfo) {
        var html =
            // header
            "<header>" +
            "<div class='search-button hbutton right'></div>" +
            "</header>" +
            // search bar
            "<div class='search-bar transition'>" +
            "<input class='search-input' type='text' />" +
            "<div class='search-option dsearch'>D</div>" +
            "<div class='search-option ssearch'>S</div>" +
            "<div class='search-option asearch'>A</div>" +
            "</div>" +
            // word day content
            "<div class='word-day-content'>" +
                "<p class='word-day'>" + wordInfo.word + "</p>" +
            "</div>" +
            "<a class='home-link dlink' href='#word/" + wordInfo.word + "/1'>DEFINICION</a>" +
            "<a class='home-link slink' href='#word/" + wordInfo.word + "/2'>SINONIMOS</a>" +
            "<a class='home-link alink' href='#word/" + wordInfo.word + "/3'>ANTONIMOS</a>";
        
        return html;
    }
    
    /* -------------- listener functions and register events----------------------- */
    function openSearchBar(){
        $('.search-bar').addClass('visible');
        $('.search-input')[0].focus();
    }
    
    function closeSearchBar(){
        $('.search-bar').removeClass('visible');
        $('.search-input').val('');
        //$('.search-input').blur();
    }
    
    function searchDefinition() { searchWord('1'); }
    function searchSynonyms() { searchWord('2'); }
    function searchAntonym() { searchWord('3'); }
    
    function searchWord(type) {
        var word = $('.search-input').val();
        if(word){
            var url = "#word/" + word + "/" + type;
            window.location.hash = url;
        }
    }
    
    function registerEvents(){
        $(el).onpress('.search-button', openSearchBar, false);
        $(el).onpress('.word-day-content', closeSearchBar, false);
        $(el).onpress('.dsearch', searchDefinition, false);
        $(el).onpress('.ssearch', searchSynonyms, false);
        $(el).onpress('.asearch', searchAntonym, false);
    }
    
    function unregisterEvents(){
        $(el).offpress('.search-button', openSearchBar, false);
        $(el).offpress('.word-day-content', closeSearchBar, false);
        $(el).offpress('.dsearch', searchDefinition, false);
        $(el).offpress('.ssearch', searchSynonyms, false);
        $(el).offpress('.asearch', searchAntonym, false);
    }
    
    function render() {
        el.innerHTML = template(wordInfo);
        el.className = 'page';
    }
    
    /* ----------------- Public functions ------------------ */
    this.init = function () {
        el = document.createElement('div');
        this.el = el;
        registerEvents();
    };
    
    this.destroy = function () {
        unregisterEvents();
        this.el.parentNode.removeChild(this.el);
    };
    
    this.render = render;
    
    this.init();
};