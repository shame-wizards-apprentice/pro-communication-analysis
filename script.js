$(document).ready(function () {
    // handle the form submission
    $("#user-text").submit(function (event) {
        // prevent the default form behavior
        event.preventDefault();

        // make the ajax call
        $.ajax({
            // data is the text the user entered
            data: $("#textarea1").val(),
            // my server that handles the authenticated api request
            url: "http://34.83.70.58:5000/",
            method: "POST"
        }).then(function (response) {

                var inputText = $("#textarea1").val()
                $("#feedback").show("slow")
                $("#user-text").append(inputText)

            // call the display functions with the response data
            displaySentiment(response.sentiment);
            dispplayEntities(response.entities);
            displayEntitySentiment(response.entitySentiment);
            displaySyntax(response.syntax);
        });
    });
});

// TODO display the sentiment
function displaySentiment(sentiment) {

}

// TODO display the entities
function dispplayEntities(entities) {

}

// TODO display the entity sentiment
// might combine with display entities depending on how we use it
function displayEntitySentiment(entitySentiment) {

}

// TODO process and potentially display syntax data
function displaySyntax(syntax) {

}

// use the url of a wikipedia page from an entity and the wikipedia api
// to get an object with the title of the page and the intro as an extract
// set the wiki data as a property of the entity for future reference
function addWikiExtract(entity) {
    // make sure this entity has a wikipedia url
    if (entity.metadata.wikipedia_url != undefined) {
        // replace the page url with the api url and my parameters
        // keeping the domain ([language].wikipedia.org) and the title the same
        // for cross language compatability
        $.getJSON(entity.metadata.wikipedia_url.replace("wiki/", "w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&origin=*&titles="),
            function (response) {
                // there should only be one page returned, so we get the first one and
                // set it as the wiki property of the entity
                entity.wiki = Object.values(response.query.pages)[0];
            });
    }
}