$(function () {

	//Creates an item.
    $("#confirm-create-item-button").click(function () { //not implemented, just placeholder
        $('#createItemModal').modal('hide');
    });

    //Edits an item.
    $("#confirm-edit-item-button").click(function () { //not implemented, just placeholder
        $('#editItemModal').modal('hide');
    });

    //Clears create item modal if cancelled.
    $("#createItemModal").on("hidden.bs.modal", function() {
        $("#item-name").val("");
        $("#item-damage").val("");
        $("#item-weight").val("");
        $("#item-value").val("");
    });

    //Clears edit item modal if cancelled.
    $("#editItemModal").on("hidden.bs.modal", function() {
        $("#edit-item-name").val("");
        $("#edit-item-damage").val("");
        $("#edit-item-weight").val("");
        $("#edit-item-value").val("");
    });

    //Deletes an item.
    $("#confirm-delete-item-button").click(function () { //not implemented, just placeholder
        $('#deleteItemModal').modal('hide');
    });

    //Closes inventory help.
    $("#close-inventory-help-button").click(function () {
        $('#inventoryHelpModal').modal('hide');
    });

    //Gets attributes and displays them on the character page.
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
