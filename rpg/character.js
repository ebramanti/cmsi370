$(function () {

	//Creates an item.
    $("#confirm-create-item-button").click(function () { //not implemented, just placeholder
        // JD: Still, nice that you have the placeholder.
        $('#createItemModal').modal('hide');
    });

    //Edits an item.
    $("#confirm-edit-item-button").click(function () { //not implemented, just placeholder
        $('#editItemModal').modal('hide');
    });

    //Clears create item modal if cancelled.
    $("#createItemModal").on("hidden.bs.modal", function() {
        $("#item-name, #item-damage, #item-weight, #item-value").val("");
        // EB: Consolidated the values into one line.
    });

    //Clears edit item modal if cancelled.
    $("#editItemModal").on("hidden.bs.modal", function() {
        $("#edit-item-name, #edit-item-damage, #edit-item-weight, #edit-item-value").val("");
        // EB: Here as well.
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
	var attributeRowTemplate = "<tr>"+"<th>"+"</th>"+"<th>"+"</th>"+"<th>"+"</th>"+"<th>"+"</th>"+"</tr>";
    $.getJSON(
        "http://lmu-diabolical.appspot.com/characters/" + window.location.hash.substr(1),
        function (character) {
            // Do something with the character list.
        	$("h1 > em > strong").text(character.name);
        	$("p > strong > em").text(character.name + "'s 	");
        	$(".attributething").text("Class: " + character.classType + " - Gender: " + character.gender + " - Level: " + character.level + " - Money: " + character.money);
    });

    function populateCharacter() {
        var skillRowTemplate = "<tr>"+ 
            "<td></td>" + 
            "<td></td>" + 
            "</tr>";

        var redSkills = [
            "Archery", 
            "Heavy Armor", 
            "Block",
            "Two-Handed",
            "One-Handed",
            "Smithing"
            ];
        var greenSkills = [
            "Light Armor",
            "Sneak",
            "Lockpicking",
            "Speech",
            "Alchemy"
            ];
        var blueSkills = [
            "Illusion",
            "Conjuration",
            "Destruction",
            "Restoration",
            "Alteration",
            "Enchanting",
            ];
        var skills = [redSkills, greenSkills, blueSkills];
        for (var i = 0; i < skills.length; i++) {
            var currentSkillSet = skills[i];
            var colorId;
            switch(currentSkillSet) {
                case redSkills:
                    colorId = "red";
                    break;
                case greenSkills:
                    colorId = "green";
                    break;
                case blueSkills:
                    colorId = "blue";
                    break;
            }
            for (var j = 0; j < currentSkillSet.length; j++) {
                var $skillRow = $(skillRowTemplate);
                $skillRow.attr({class: colorId});
                $skillRow.find("td:nth-child(1)").text(currentSkillSet[j]);
                $skillRow.find("td:nth-child(2)").text(Math.floor(Math.random()*100)+1);
                $("#skilltable > tbody").append($skillRow);
            }
        }
    }

    function populateItem() {
        var itemRowTemplate = "<tr>" + 
            "<td><input type='checkbox'></td>" + 
            "<td></td>" + 
            "<td></td>" + 
            "<td></td>" + 
            "<td></td>" + 
            "</tr>";
        var templateItems = [
            {name:"Iron Sword", weight: 9, value: 25},
            {name:"Steel Sword", weight: 10, value: 45},
            {name:"Orcish Sword", weight: 11, value: 75},
            {name:"Dwarven Sword", weight: 12, value: 125},
            {name:"Nord Hero Sword", weight: 9, value: 135}
        ];

        for (var i = 0; i < templateItems.length; i++) {
            var currentItem = templateItems[i];
            console.log(currentItem);
            var $itemRow = $(itemRowTemplate);
            $itemRow.find("td:nth-child(1) > input").attr({ value: i });
            $itemRow.find("td:nth-child(2)").text(currentItem.name);
            $itemRow.find("td:nth-child(3)").text(Math.floor(Math.random()*100)+1);
            $itemRow.find("td:nth-child(4)").text(currentItem.weight);
            $itemRow.find("td:nth-child(5)").text(currentItem.value);
            $("#inventorytable > tbody").append($itemRow);
        }
    }

    populateCharacter(); //populates character skills
    populateItem(); //populates character items

});
