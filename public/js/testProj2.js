// const review = require("../../models/review");

$(document).ready(function () {
    
    var reviewContainer = $('#reviewForm');
    var reviewCategory = $('#reviewCategory');
    var reviewContainerTitle = $('#reviewTitle');

    // Document listens for click on reviewGameBtn and reviewMovieBtn
    // Buttons created after results received from api call
    $(document).on("click","button.reviewGameBtn", handleGameReviewSelection);
    $(document).on("click","button.reviewMovieBtn", handleMovieReviewSelection);

    // Document listens for click on delete and edit buttons created in createNewRow cb
    $(document).on("click", "button.delete", handleReviewDelete);
    $(document).on("click", "button.edit", handleReviewEdit);

    // Listener for dropdown selection in browser
    reviewCategory.on("change", handleCategoryChange);

    // Variables used in createNewRow cb
    var gameSelection;
    var movieSelection;
    
    // Variable used in getReviews and initializeRows cb
    var reviews;

    // If user selects video game radio button the video game search form is rendered
    $('#gameSelector').click(function () {
        $('#videoGameSearchID').removeClass('d-none');
        $('.radioButton').addClass('d-none');
    });

    // If user selects movie radio button the movie search form is rendered
    $('#movieSelector').click(function () {
        $('#movieSearchID').removeClass('d-none');
        $('.radioButton').addClass('d-none');
    });

    // Used in getGameDetails and getMovieDetails cb
    var userGameSearchInput;
    var userMovieSearchInput;

    // Listener on submit button that grabs user search input and hides search form
    $('.submitGameBtn').click(function (e) {
        e.preventDefault();
        
        $('#cardDivID').removeClass('d-none');
        $('#videoGameSearchID').addClass('d-none');
        
        userGameSearchInput = $('#gameTitle').val();
        
        getGameDetails();
    });
    
    // Listener on submit button that grabs user search input and hides search form
    $('.submitMovieBtn').click(function (e) {
        e.preventDefault();

        $('#cardDivID').removeClass('d-none');
        $('#movieSearchID').addClass('d-none');

        userMovieSearchInput = $('#movieTitle').val();

        getMovieDetails();
    });

    // Function sends http get request to rawg api then constructs html element using response
    function getGameDetails() {
        var queryURL =
        "https://api.rawg.io/api/games?search=" + userGameSearchInput + "&page_size=5";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then( function (response) {

            for (let i = 0; i < response.results.length; i++) {

                $(".cardDiv").append(`

                    <div class="card" style="width: 18rem;">
                        <img src="${ response.results[i].background_image }" class="card-img-top" alt="video game background image">
                        <div class="card-body">
                            <h5 class="card-title">${ response.results[i].name }
                            <br>
                            <small>Released: ${ response.results[i].released }</small></h5>
                            <p class="card-text"> Rating: ${ response.results[i].rating } </p>
                            <p class="card-text">Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor accumsan tincidunt. Nulla porttitor accumsan tincidunt.</p>
                            <button class="btn btn-light reviewGameBtn" type="submit">Review This Game!</button>
                        </div>
                    </div>
                    <br>
                `);
            }
        });
    }

    // Function adds reviewThisDiv class to grandparent div of the reviewGameBtn element if reviewGameBtn is clicked
    // Function adds d-none class to hide all divs except for the one the user clicks
    // Function displays reviewThisDiv element then appends the title input form and category dropdown selector to reviewThisDiv element
    function handleGameReviewSelection() {
        gameSelection = $(this).parent().parent().children();
        gameSelection.addClass('reviewThisDiv');
        $('div:not(.reviewThisDiv)').addClass('d-none');
        $('.reviewThisDiv').appendTo('body');

        $('.reviewThisDiv').wrap( "<div class='container col-md-6 col-sm-6 shadow-sm p-3 mb-5 bg-white rounded'></div>" );

        $('#reviewTitle').removeClass('d-none');
        $('#reviewTitle').appendTo('.reviewThisDiv');

        $('#reviewForm').removeClass('d-none');
        $('#reviewForm').appendTo('.reviewThisDiv');

        $('#reviewCategory').removeClass('d-none');
        $('#reviewCategory').appendTo('.reviewThisDiv');

        var reviewSubmitButton = $('<button type="button" id="reviewSubmitButtonID" class="btn btn-light">Submit Review</button>');
        reviewSubmitButton.appendTo('.reviewThisDiv');

    };

    // Function sends http get request to omdb api then constructs html element using response
    function getMovieDetails() {
        var omdbKey = "285ba2b7";
        var queryURL =
        "http://www.omdbapi.com/?apikey=" + omdbKey + "&s=" + userMovieSearchInput + "&page=1&type=movie";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then( function (response) {

            for (let i = 0; i < response.Search.length; i++) {

                $(".cardDiv").append(`

                    <div class="card" style="width: 18rem;">
                        <img src="${ response.Search[i].Poster }" class="card-img-top" alt="video game background image">
                        <div class="card-body">
                            <h5 class="card-title">${ response.Search[0].Title }
                            <br>
                            <small>Released: ${ response.Search[0].Year }</small></h5>
                            <p class="card-text">Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor accumsan tincidunt. Nulla porttitor accumsan tincidunt.</p>
                            <button class="btn btn-light reviewMovieBtn" type="submit">Review This Movie!</button>
                        </div>

                    </div>
                    <br>
                `);

            }
        });
    }

    // Function adds reviewThisDiv class to grandparent div of the reviewMovieBtn element if reviewMovieBtn is clicked
    // Function adds d-none class to hide all divs except for the one the user clicks
    // Function displays reviewThisDiv element then appends the title input form and category dropdown selector to reviewThisDiv element
    function handleMovieReviewSelection() {
        movieSelection = $(this).parent().parent().children();
        movieSelection.addClass('reviewThisDiv');
        $('div:not(.reviewThisDiv)').addClass('d-none');
        $('.reviewThisDiv').appendTo('body');

        $('.reviewThisDiv').wrap( "<div class='container col-md-6 col-sm-6 shadow-sm p-3 mb-5 bg-white rounded'></div>" );

        $('#reviewTitle').removeClass('d-none');
        $('#reviewTitle').appendTo('.reviewThisDiv');

        $('#reviewForm').removeClass('d-none');
        $('#reviewForm').appendTo('.reviewThisDiv');

        $('#reviewCategory').removeClass('d-none');
        $('#reviewCategory').appendTo('.reviewThisDiv');

        var reviewSubmitButton = $('<button type="button" id="reviewSubmitButtonID" class="btn btn-light">Submit Review</button>');
        reviewSubmitButton.appendTo('.reviewThisDiv');

    };


    // Function creates category url and sends get request to api route at the specified category url
    // Function then checks if reviews variable is empty or null then calls displayEmpty cb else initializeRows cb
    function getReviews(category) {
        var categoryString = category || "";
        if (categoryString) {
            categoryString = "/category/" + categoryString;
        }
        $.get("/api/reviews" + categoryString, function(data) {
            console.log("Reviews", data);
            reviews = data;
            if (!reviews || !reviews.length) {
                displayEmpty();
            }
            else {
                initializeRows();
            }
        });
    }

    // Function deletes review based on id then calls getReviews cb
    // Function then passes the genre dropdown selection value into getReviews cb
    function deleteReview(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/reviews" + id
        })
        .then(function() {
            getReviews(reviewCategory.val());
        });
    };

    // Cb called to grab reviews again since they are deleted in deleteReview cb???
    getReviews();

    // Function clears review input text then creates empty variable looping through reviews variable then pushes items to the array and appends those reviews to the array
    function initializeRows() {
        reviewContainer.empty();
        var reviewsToAdd = [];
        for (var i = 0; i < reviews.length; i++) {
            reviewsToAdd.push(createNewRow(reviews[i]));
        }
        reviewContainer.append(reviewsToAdd);
    };

    // Function constructs new review html
    // Need to ensure function can access reviews.body reviews.category reviews.name
    function createNewRow(reviews) {
        var newGameRow = gameSelection;
        
        newGameRow = 
        $('.newGameRow').append(`
        <p>${ reviews.body }</p>
        <small>Genre: ${ reviews.category }  |  Title: ${ reviews.name }</small>
        <button type="button" class="btn btn-warning delete">DELETE</button> 
        <button type="button" class="btn btn-info edit">EDIT</button>
        `);
        newGameRow.data("review", review);
        return newGameRow;
    };
    
    // Function constructs new review html
    // Need to ensure function can access reviews.body reviews.category reviews.name
    function createNewRow(reviews) {
        var newMovieRow = movieSelection;

        newMovieRow = 
        $('.newMovieRow').append(`
            <p>${ reviews.body }</p>
            <small>Genre: ${ reviews.category }  |  Title: ${ reviews.name }</small>
            <button type="button" class="btn btn-warning delete">DELETE</button>
            <button type="button" class="btn btn-info edit">EDIT</button>
        `);
        newMovieRow.data("review", review);
        return newMovieRow;
    };

    // Function grabs the parent element of the delete button and gives it the "review" attribute
    // Function passes currentReview.id into deleteReview cb????
    // Function called when user clicks delete button
    function handleReviewDelete() {
        var currentReview = $(this)
        .parent()
        .data("review");
        deleteReview(currentReview.id);
    };

    // Function grabs the parent element of the edit button and gives it the "review" attribute
    // Function uses window.location.href to set the current page url to a specific review id
    // Function called when user clicks edit button
    function handleReviewEdit() {
        var currentReview = $(this)
            .parent()
            .data("review");
        window.location.href = "/videoGameReviews.html?review_id=" + currentReview.id;
    };

    // Function empties review input form
    function displayEmpty() {
        reviewContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No reviews yet for this genre, navigate <a href='../testProj2'>here</a> in order to create a new review.");
        reviewContainer.append(messageH2);
    };

    // Function grabs value of genre selected in the category dropdown menu
    // Function passes selected genre into getReviews cb
    function handleCategoryChange() {
        var newReviewCategory = $(this).val();
        getReviews(newReviewCategory);
    };

});


/************************************************************ */

    // // When #reviewSubmitButtonID clicked; button is created and appended to the review this item card; need listener to handle to post new review
    // function createNewRow(reviews) {
    //     var newGameRow = gameSelection;
    //     var newMovieRow = movieSelection;

    //     // newGameRow.addClass("newGameRow");
    //     // NEED TO GET THE reviews.body reviews.category reviews.name VARIABLES
    //     // Need to attach delete attr to DELETE button
    //     newGameRow = 
    //     $('.newGameRow').append(`
    //     <p>${ reviews.body }</p>
    //     <small>Genre: ${ reviews.category }  |  Title: ${ reviews.name }</small>
    //     <button type="button" class="btn btn-warning">DELETE</button> 
    //     <button type="button" class="btn btn-info">EDIT</button>
    //     `);
        
    //     newGameRow.data("review", review);
        
    //     // newMovieRow.addClass("newMovieRow");
    //     // NEED TO GET THE reviews.body reviews.category reviews.name VARIABLES
    //     // Need to attach edit attr to EDIT button
    //     newMovieRow = 
    //     $('.newMovieRow').append(`
    //         <p>${ reviews.body }</p>
    //         <small>Genre: ${ reviews.category }  |  Title: ${ reviews.name }</small>
    //         <button type="button" class="btn btn-warning">DELETE</button>
    //         <button type="button" class="btn btn-info">EDIT</button>
    //     `);

    //     newMovieRow.data("review", review);

    //     return [newGameRow, newMovieRow];// HOW TO GET VARIABLES OUT OF ARRAY???

    // };