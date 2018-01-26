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
    var elementButton = document.createElement("BUTTON");
    var btnLabel = document.createTextNode(label);
    elementButton.id = id;
    elementButton.className = 'vcenter ' + btnClass;
    elementButton.onclick = functionOnClick;
    elementButton.appendChild(btnLabel);
    parent.append(elementButton);

    return $('#'+elementButton.id);
}

function displayProgressBar(id, currentValue, valueMax, parent) {
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
    container.className = 'progress ' + 'col-sm-4' + ' clearPadding vcenter';
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
    var modalBtnCloseFooter = displayElementOnParent('BUTTON', id + 'BtnCloseFooter', 'btn btn-default', 'Fermer', modalMenuContent);
    modalBtnCloseFooter.attr('data-dismiss', "modal");

    return modalBody;
}
