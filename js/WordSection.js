var WordSection = function (type, wordInfo) {
    
    /* ---------------- Local variables ------------------- */
    var _type, _wordInfo;
    var _el;
    
    /* --------------------- Templates -------------------- */
    function definitionTemplate(wordInfo) {
        var html =
            "<h1>" + wordInfo.palabra + "</h1>" +
            "<h2>(" + wordInfo.lema + ")</h2>" +
            "<p class='info-title dtitle'>Definiciones</p>" +
            "<ol class='dlist'>";
        
        for (var i=0, len=wordInfo.definiciones.length; i<len; i++){
            html += "<li class='delement'>" + wordInfo.definiciones[i] + "</li>";
        }
        
        html += "</ol>";
        return html;
    }
    
    function synonymTemplate(wordInfo) {
        var html =
            "<h1>" + wordInfo.palabra + "</h1>" +
            "<h2>(" + wordInfo.lema + ")</h2>" +
            "<p class='info-title stitle'>Sinónimos</p>" +
            "<ul class='slist'>";
        
        for(var i=0, len=wordInfo.sinonimos.length; i<len; i++){
            html += 
                "<li class='selement'>" +
                    "<a class='dlink' href='#word/" + wordInfo.sinonimos[i] + "/1'></a>" +
                    "<a class='alink' href='#word/" + wordInfo.sinonimos[i] + "/3'></a>" +
                    wordInfo.sinonimos[i] +
                "</li>";
        }
        
        html += "</ul>";
        return html;
    }
    
    function antonymTemplate(wordInfo) {
        var html =
            "<h1>" + wordInfo.palabra + "</h1>" +
            "<h2>(" + wordInfo.lema + ")</h2>" +
            "<p class='info-title atitle'>Antónimos</p>" +
            "<ul class='slist'>";
        
        for(var i=0, len=wordInfo.antonimos.length; i<len; i++){
            html += 
                "<li class='selement'>" +
                    "<a class='dlink' href='#word/" + wordInfo.antonimos[i] + "/1'></a>" +
                    "<a class='slink' href='#word/" + wordInfo.antonimos[i] + "/2'></a>" +
                    wordInfo.antonimos[i] +
                "</li>";
        }
        
        html += "</ul>";
        return html;
    }
    
    function render() {
        var html;
        _el.className = 'word-info-section';
        
        switch(_type){
        case '1': html = definitionTemplate(_wordInfo); break;
        case '2': html = synonymTemplate(_wordInfo); break;
        case '3': html = antonymTemplate(_wordInfo); break;
        }
        
        _el.innerHTML = html;
    }
    
    /* ----------------- Public function ------------------ */
    this.init = function () {
        _el = document.createElement('div');
        
        this.el = _el;
        _type = type;
        _wordInfo = wordInfo;
    }
    
    this.destroy = function () {
        this.el.parentNode.removeChild(this.el);
    }
    
    this.render = render;
    
    this.init();
}