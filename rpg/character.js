$(function () {
    $.getJSON(
        "http://lmu-diabolical.appspot.com/characters/" + window.location.hash.substr(1),
        function (character) {
            // Do something with the character.
            console.log(character);
            $("h1 > em > strong").text(character.name);
            $("#character-table tbody > th:nth-child(1)").text(character.classType);
            $("#character-table tbody > th:nth-child(2)").text(character.gender);
            $("#character-table tbody> th:nth-child(3)").text(character.level);
            $("#character-table tbody> tr> th:nth-child(4)").text(character.money);
        }
    );
});
