function displayElementOnParent(elementNodeName, elementId, elementClass, elementInnerHTML, parent) {
    var element = document.createElement(elementNodeName);
    element.id = elementId;
    element.className = elementClass;
    element.innerHTML = elementInnerHTML;
    parent.append(element);

    return $('#'+element.id);
}

function prependElementOnParent(elementNodeName, elementId, elementClass, elementInnerHTML, parent) {
    var element = document.createElement(elementNodeName);
    element.id = elementId;
    element.className = elementClass;
    element.innerHTML = elementInnerHTML;
    parent.prepend(element);

    return $('#'+element.id);
}

function displayButtons(id, label, btnClass, functionOnClick, parent){
    var elementButton = document.createElement("button");
    var btnLabel = document.createTextNode(label);
    elementButton.id = id;
    elementButton.className = 'vcenter text-center bigBtn ' + btnClass;
    elementButton.onclick = functionOnClick;
    elementButton.appendChild(btnLabel);
    parent.append(elementButton);

    return $('#'+elementButton.id);
}

function displayProgressBar(id, currentValue, valueMax, className, parent) {
    var hpPourcentage = Math.round((currentValue/valueMax)*100);
    var container = document.createElement('div');
    var colorClass;
    if (hpPourcentage == 100) {
        colorClass = 'progress-bar-success';
    }else if ( 66 < hpPourcentage < 100) {
        colorClass = 'progress-bar-info'
    }else if (33 < hpPourcentage < 66) {
        colorClass = 'progress-bar-warning'
    }else if (hpPourcentage < 33) {
        colorClass = 'progress-bar-danger'
    }
    container.className = 'progress ' + className + ' clearPadding vcenter';
    parent.append(container);
    var progressBar = document.createElement('div');
    progressBar.id = id;
    progressBar.className = 'progress-bar ' + colorClass + ' clearMargin';
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-valuenow', hpPourcentage);
    progressBar.setAttribute('aria-valuemin', 0);
    progressBar.setAttribute('aria-valuemax', 100);
    progressBar.setAttribute('style', 'width:' + hpPourcentage + '%');
    progressBar.innerHTML = currentValue + '/' + valueMax;
    container.append(progressBar);

    return progressBar;
}

function updateProgressBar(progressBar, currentValue, valueMax) {
    var hpPourcentage = Math.round((currentValue/valueMax)*100);
    var colorClass;
    if (hpPourcentage == 100) {
        colorClass = 'progress-bar-success';
    }else if ( 66 < hpPourcentage < 100) {
        colorClass = 'progress-bar-info'
    }else if (33 < hpPourcentage < 66) {
        colorClass = 'progress-bar-warning'
    }else if (hpPourcentage < 33) {
        colorClass = 'progress-bar-danger'
    }
    progressBar.className = 'progress-bar ' + colorClass + ' clearMargin';
    progressBar.setAttribute('aria-valuenow', hpPourcentage);
    progressBar.setAttribute('style', 'width:' + hpPourcentage + '%');
    progressBar.innerHTML = currentValue + '/' + valueMax;
}

function createModal(id, titre) {
    var modalMenu = displayElementOnParent('div', id, "modal fade", "", $('body'));
    modalMenu.attr('role', 'dialog');
    var modalMenuDialog = displayElementOnParent('div', id + 'Dialog', 'modal-dialog', '', modalMenu);
    var modalMenuContent = displayElementOnParent('div', id + 'Content', 'modal-Content', '', modalMenuDialog);
    var modalMenuHeader = displayElementOnParent('div', id + 'Header', 'modal-Header', '', modalMenuContent);
    var modalBtnCloseHeader = displayElementOnParent('BUTTON', id + 'BtnCloseHeader', 'close', '&times;', modalMenuHeader);
    modalBtnCloseHeader.attr('data-dismiss', "modal");
    var modalMenuTitle = displayElementOnParent('h4', id + 'Title', 'modal-title', titre, modalMenuHeader);
    var modalBody = displayElementOnParent('div', id + 'Body', 'modal-body', '', modalMenuContent);
    var modalFooter = displayElementOnParent('div', id + 'Footer', 'modal-footer', '', modalMenuContent);
    var modalBtnCloseFooter = displayElementOnParent('BUTTON', id + 'BtnCloseFooter', 'bigBtn', 'Fermer', modalMenuContent);
    modalBtnCloseFooter.attr('data-dismiss', "modal");

    return modalBody;
}

function createForm(id, inputList, parent) {
    var form = displayElementOnParent('form', id, '', '', parent);
    $.each(inputList, function(){
        displayElementOnParent('div', 'newUserForm', 'form-group', '', form);        
        const inputId = this.id;		
        var input = {};	        
        if(this.type != 'submit') {
            var label = displayElementOnParent('label', this.id + 'Label' + 'Id', '', this.label, form);
            input = displayElementOnParent('input', inputId, '', '', form);
            input.attr('class', 'form-control');
            input.attr('name', this.label);            
            label.attr('for', inputId);
        }else {
            input = displayElementOnParent('input', inputId, '', '', form);
        }
        input.attr('type', this.type);
    });

    return form;
}

function createNavBar(id, itemList, parent) {    
    var navBar = displayElementOnParent('nav', id, 'navbar blueColor', '', parent);
    var containerFluid = displayElementOnParent('div', 'containerFluid' + id, 'container-fluid', '', navBar);    
    var ul = displayElementOnParent('ul', 'ulNavbarNav' + id, 'nav navbar-nav', '', containerFluid);
    $.each(itemList, function(index){
        var li = displayElementOnParent('li', 'li' + this.id, '', '', ul);
        var a = displayElementOnParent('a', 'a' + this.id, '', this.label, li);
        a.click(this.functionOnClick);
    })

}