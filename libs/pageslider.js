var PageSlider = function (container, baseClass) {
    
    var _container, _baseClass, _currentPage, _history, _transition;
    
    _transition = (function () {
        var transition;
        
        if ('ontransitionend' in window) transition = 'transitionend';
            else if ('onwebkittransitionend' in window) transition = 'webkitTransitionEnd';
            else if (navigator.appName === 'Opera') transition = 'oTransitionEnd';
        
        return transition;
    }());
    
    this.slide = function (page) {
        
        var hash = window.location.hash;
        var l = _history.length;
        
        if (l === 0){
            _history.push(hash);
            this.slideFrom(page);
            return;
        }
        
        if(hash === _history[l-2]){
            _history.pop();
            this.slideFrom(page, 'left');
        }else{
            _history.push(hash);
            this.slideFrom(page, 'right');
        }
    }
    
    this.slideFrom = function (page, from) {
        _container.appendChild(page.el);
        
        var removable = _currentPage;
        if (!_currentPage || !from || !_transition){
            page.el.className = _baseClass + ' central-page';
            _currentPage = page;
            return;
        }
        
        page.el.className = _baseClass + (from === 'right' ? ' right-page' : ' left-page');
        
        var listener = removable.el.addEventListener(_transition, function(e){    
            removable.el.removeEventListener(_transition, listener, false);
            removable.destroy();
        }, false);
        
        // force reflow/repaint
        _container.offsetWidth;
       
        page.el.className = _baseClass + ' transition central-page';
        _currentPage.el.className = _baseClass + ' transition ' + (from === 'right' ? 'left-page' : 'right-page');
        _currentPage = page;
    }
    
    // page transition without animation
    /*this.slideFrom = function (page, from) {
        
        if (!_currentPage || !from || !_transition){
            page.el.className = _baseClass + ' central-page';
            _currentPage = page;
            _container.appendChild(page.el);
            return;
        }
        
        page.el.className = _baseClass + ' central-page';
        _container.appendChild(page.el);
       
        _currentPage.destroy();
        _currentPage = page;
    }*/
    
    /* ----------------- Init function ------------------ */
    this.init = function (container, baseClass) {
        _container = container;
        _baseClass = baseClass;
        _currentPage = null;
        _history = [];
    }
    
    this.init(container, baseClass);
    
}