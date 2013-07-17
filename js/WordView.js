var WordView = function (word, type) {
    
    /* ------------------- Local variables --------------- */
    var _word, _type;
    var _section;
    var _ws;
    var el;
    var wordInfo = {palabra: 'palabra', lema: 'lema', definiciones: ['lorem ipsum lorem ipsum lorem ipsum', 'lorem ipsum'],
                    sinonimos: ['palabrilla', 'palabreja', 'palabrota', 'palabreja', 'palabrota', 'palabreja', 'palabrota', 'palabreja', 'palabrota', 'palabreja', 'palabrota', 'palabreja', 'palabrota', 'palabreja', 'palabrota', 'palabreja', 'palabrota'], antonimos: ['dibujo']};
    var ps;
    
    
    /* ------------------- Templates --------------------- */
    function headerTemplate(type) {
        var html =
            // header
            "<header>" +
            "<div class='back-button hbutton left'></div>" +
            "<div class='search-button hbutton right'></div>" +
            "</header>" +
            // search bar
            "<div class='search-bar transition'>" +
            "<input class='search-input' type='text' />" +
            "<div class='search-option dsearch'>D</div>" +
            "<div class='search-option ssearch'>S</div>" +
            "<div class='search-option asearch'>A</div>" +
            "</div>" +
            // navegation bar
            "<div id='section-nav' class='section-nav'>";
        
        switch (type) {
        case '1':
            html +=
                "<div id='nav-definicion' class='nav-element nav-element-active'></div>" +
                "<div id='nav-sinonimos' class='nav-element nav-element-inactive'></div>" +
                "<div id='nav-antonimos' class='nav-element nav-element-inactive'></div>" +
                "</div>";
            break;
        case '2':
            html +=
                "<div id='nav-definicion' class='nav-element nav-element-inactive'></div>" +
                "<div id='nav-sinonimos' class='nav-element nav-element-active'></div>" +
                "<div id='nav-antonimos' class='nav-element nav-element-inactive'></div>" +
                "</div>";
            break;
        case '3':
            html +=
                "<div id='nav-definicion' class='nav-element nav-element-inactive'></div>" +
                "<div id='nav-sinonimos' class='nav-element nav-element-inactive'></div>" +
                "<div id='nav-antonimos' class='nav-element nav-element-active'></div>" +
                "</div>";
            break;
        }
        return html;
    }
    
    function createSection(type){
        var from;
        if(type === '2') from = (_type === '1') ? 'right' : 'left';
        else from = (type === '1') ? 'left' : 'right';
        
        _type = type;
        _ws = new WordSection(_type, wordInfo);
        _ws.render();
        ps.slideFrom(_ws, from);
    }
    
    function render() {
        var html = headerTemplate(_type);
        el.innerHTML = html;
        el.className = 'page';
        // First word section
        _ws = new WordSection(_type, wordInfo);
        _ws.render();
        ps.slideFrom(_ws);
    }
    
    /* -------------- listener functions and register events----------------------- */
    var _back = function(){ window.history.back();}
    var _changeToDefinition = function(){changeToSection('1');}
    var _changeToSynonyms = function(){changeToSection('2');}
    var _changeToAntonym = function(){changeToSection('3');}
    
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
    
    function registerEvents() {  
        $(el).onpress('.back-button', _back, false);
        $(el).onpress('#nav-definicion', _changeToDefinition, false);
        $(el).onpress('#nav-sinonimos', _changeToSynonyms, false);
        $(el).onpress('#nav-antonimos',_changeToAntonym, false);
        
        $(el).onpress('.search-button', openSearchBar, false);
        $(el).onpress('.word-info-section', closeSearchBar, false);
        $(el).onpress('.dsearch', searchDefinition, false);
        $(el).onpress('.ssearch', searchSynonyms, false);
        $(el).onpress('.asearch', searchAntonym, false);
    }
    
    function unregisterEvents() {  
        $(el).offpress('.back-button', _back, false);
        $(el).offpress('#nav-definicion', _changeToDefinition, false);
        $(el).offpress('#nav-sinonimos', _changeToSynonyms, false);
        $(el).offpress('#nav-antonimos',_changeToAntonym, false);
        
        $(el).onpress('.search-button', openSearchBar, false);
        $(el).onpress('.word-info-section', closeSearchBar, false);
        $(el).onpress('.dsearch', searchDefinition, false);
        $(el).onpress('.ssearch', searchSynonyms, false);
        $(el).onpress('.asearch', searchAntonym, false);
    }

    
    
    
    function changeToSection(type){
        var d = document.getElementById('nav-definicion');
        var s = document.getElementById('nav-sinonimos');
        var a = document.getElementById('nav-antonimos');
			
        if(type != _type){
            switch(type){
            case '1': 
                d.className = "nav-element nav-element-active";
                s.className = "nav-element nav-element-inactive";
                a.className = "nav-element nav-element-inactive";
                
                createSection('1');
                break;
            case '2':
                d.className = "nav-element nav-element-inactive";
                s.className = "nav-element nav-element-active";
                a.className = "nav-element nav-element-inactive";
                
                createSection('2');
                break;
            case '3':
                d.className = "nav-element nav-element-inactive";
                s.className = "nav-element nav-element-inactive";
                a.className = "nav-element nav-element-active";
                
                createSection('3');
                break;
             }
        }
    }
    
    
    /* ----------------- Public function ------------------ */
    this.init = function() {
        el = document.createElement('div');
        
        this.el = el;
        _word = word;
        _type = type;
           
        registerEvents();
        ps = new PageSlider(el, 'word-info-section');
    }
    
    this.destroy = function(){
        unregisterEvents();
        this.el.parentNode.removeChild(this.el);
    }
    
    this.render = render;
    
    this.init();
}