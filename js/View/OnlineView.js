var OnlineView = function () {

}

OnlineView.prototype = {

    render: function(viewModels) {
        console.log(viewModels);
        var idModal = 'onlineModal';
        var view = this;
        var colClass = 'col-sm-2';
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var parent = createModal(idModal, 'Online');
        var container = displayElementOnParent('div', 'onlineContainer', 'container', '', parent);
        var userRow = displayElementOnParent('div', 'onlineRow', 'row', '', container);
        $.each(viewModels, function(index) {
            var userCol = displayElementOnParent('div', 'userCol' + this.id, 'col-sm-2', this.name, userRow);

        });
    },
}
