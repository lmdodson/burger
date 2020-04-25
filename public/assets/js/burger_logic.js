$(function () {
    //  Devour/remake button logic
    $(".change-devoured").on("click", function (event) {
        // grab the id and changed status of the element
        var id = $(this).data("id");
        var newDevoured = $(this).data("newdevoured");

        // object that sets the status to be passed through the ajax put request
        var changedState = {
            devoured: newDevoured
        };
        // ajax put request to update burger status using the id
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: changedState
        }).then(
            function () {
                console.log('changed status to: ', newDevoured);
                // reload the page to show updated lists
                location.reload();
            }
        );
    });

    // form action logic
    $(".create-form").on("submit", function (event) {
        // prevent page reload
        event.preventDefault();
        // object taht sets the burger name to be passed through the ajax post request
        var newBurger = {
            name: $("#burgName").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        }
        // ajax post request to create a new burger
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function (data) {
                // clear the burger name
                $("#burgName").val()
                console.log("created new Burger");
                // reload the page to show updated lists
                location.reload();
            }
        );
    });

});