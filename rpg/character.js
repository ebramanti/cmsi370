$(function () {

    $("#confirm-create-item-button").click(function () { //not implemented, just placeholder
        $('#createItemModal').modal('hide');
    });

    $("#confirm-edit-item-button").click(function () { //not implemented, just placeholder
        $('#editItemModal').modal('hide');
    });

    $("#confirm-delete-item-button").click(function () { //not implemented, just placeholder
        $('#deleteItemModal').modal('hide');
    });

    $("#close-inventory-help-button").click(function () {
        $('#inventoryHelpModal').modal('hide');
    });

	var attributeRowTemplate = "<tr>"+"<th>"+"</th>"+"<th>"+"</th>"+"<th>"+"</th>"+"<th>"+"</th>"+"</tr>"
    $.getJSON(
        "http://lmu-diabolical.appspot.com/characters/" + window.location.hash.substr(1),
        function (character) {
            // Do something with the character list.
        	$("h1 > em > strong").text(character.name);
        	$("p > strong > em").text(character.name + "'s 	");
        	$(".attributething").text("Class: " + character.classType + " - Gender: " + character.gender + " - Level: " + character.level + " - Money: " + character.money);
    });
});
