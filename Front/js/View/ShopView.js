var ShopView = function () {
    this.buy = null;
}

ShopView.prototype = {

    render: function(items) {
        var view = this;
        var idModal = 'shopModal';
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var modalBody = createModal(idModal, 'Shop');
        var potiflouzRow = displayElementOnParent('div', 'potiflouzShopRow', 'row', '', modalBody);
        var potiflouzLabel = displayElementOnParent('div', 'potiflouzShopLabel', 'col-sm-2', 'Potiflouz : ', potiflouzRow);
        var potiflouz = displayElementOnParent('div', 'potiflouzShop', 'col-sm-4', GetPotiflouz() + '$', potiflouzRow);
        $.each(items, function(index){
            var item = this;
            var itemRow = displayElementOnParent('div', 'itemShopRow' + this.id, 'row', '', modalBody);
            var itemLabel = displayElementOnParent('div', 'itemShopLabel' + this.id, 'col-sm-4', this.name, itemRow);
            var itemPrice = displayElementOnParent('div', 'itemShopPrice' + this.id, 'col-sm-4', this.price + '$', itemRow);
            var btnBuy = displayButtons ('btnBuy' + this.id, 'Achat', 'btn', function(){view.buy(item.name)}, itemRow);
            if(GetPotiflouz() >= item.price) {
                btnBuy.prop( 'disabled', false);
            }else {
                btnBuy.prop( 'disabled', true);
            }
        });
    },

}
