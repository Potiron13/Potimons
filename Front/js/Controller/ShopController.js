var ShopController = function (view) {
    this.view = view;
};

ShopController.prototype = {

    init: function() {         
        this.view.buy = this.buy.bind(this);    
        this.view.render(GetItemInShop());
    },

    displayShop: function() {
        $('#shopModal').modal();
    },

    buy: function(itemName) {
        var item = fetchItemByName(itemName);
        var potiflouz = GetPotiflouz();
        if(potiflouz >= item.price) {
            var itemInInventory = GetItems().find(x=>x.name == itemName);
            if(itemInInventory) {
                itemInInventory.quantity = parseInt(itemInInventory.quantity) + 1;
            }else {
                Items.push(cloneItem(item));
            }
            SetPotiflouz(potiflouz - item.price);
            this.view.render(GetItemInShop());
        }
    }
}