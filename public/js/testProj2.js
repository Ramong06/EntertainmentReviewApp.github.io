// const review = require("../../models/review");

$(document).ready(function () {

    // Grab static review elements on page load
    var reviewContainer = $('#reviewFormIDStatic');
    var reviewCategory = $('#categoryStatic');
    var reviewContainerTitle = $('#reviewTitleStatic');

    // Set up listeners on reviewGameSubmitButtonID and reviewMovieSubmitButtonID
    // Buttons dynamically created in handleGameReviewSelection cb
    $(document).on("click","button.reviewGameSubmitButtonID", handleNewGameReviewSubmission);
    $(document).on("click","button.reviewMovieSubmitButtonID", handleNewMovieReviewSubmission);

    function handleNewGameReviewSubmission(id) {
        // Grab review title, category, and container elements after user clicks submit review button
        console.group('Review Form Items');
        console.log(reviewContainerTitle);
        console.log(reviewCategory);
        console.log(reviewContainer);
        console.groupEnd();

        // getReviews();
    };

    function handleNewMovieReviewSubmission() {
        // Grab review title, category, and container elements after user clicks submit review button
        console.group('Review Form Items');
        console.log(reviewContainerTitle);
        console.log(reviewCategory);
        console.log(reviewContainer);
        console.groupEnd();

        // getReviews();
    };

    // Set up listeners on reviewGameBtn and reviewMovieBtn
    // Buttons created after results received from api call
    $(document).on("click","button.reviewGameBtn", handleGameReviewSelection);
    $(document).on("click","button.reviewMovieBtn", handleMovieReviewSelection);

    // Set up listeners for delete and edit buttons
    // Buttons created in createNewRow cb
    $(document).on("click", "button.delete", handleReviewDelete);
    $(document).on("click", "button.edit", handleReviewEdit);

    // Set up listener for dropdown selection in browser
    reviewCategory.on("change", handleCategoryChange);

    // Used in createNewRow cb
    var gameSelection;
    var movieSelection;
    
    // Used in getReviews and initializeRows cb
    var reviews;

    // Set up radio button listener
    // Render game search form if movie selected
    $('#gameSelector').click(function () {
        $('#videoGameSearchID').removeClass('d-none');
        $('.radioButton').addClass('d-none');
    });

    // Set up radio button listener
    // Render movie search form if movie selected
    $('#movieSelector').click(function () {
        $('#movieSearchID').removeClass('d-none');
        $('.radioButton').addClass('d-none');
    });

    // Used in getGameDetails and getMovieDetails cb
    var userGameSearchInput;
    var userMovieSearchInput;

    // Set up listener for button on card after rawg api response
    // Grab user search input and hide search form
    $('.submitGameBtn').click(function (e) {
        e.preventDefault();
        
        $('#cardDivID').removeClass('d-none');
        $('#videoGameSearchID').addClass('d-none');
        
        userGameSearchInput = $('#gameTitle').val();
        
        getGameDetails();
    });
    
    // Set up listener for button on card after omdb api response
    // Grab user search input and hide search form
    $('.submitMovieBtn').click(function (e) {
        e.preventDefault();

        $('#cardDivID').removeClass('d-none');
        $('#movieSearchID').addClass('d-none');

        userMovieSearchInput = $('#movieTitle').val();

        getMovieDetails();
    });

    function getGameDetails() {
        // Send http get request to rawg api
        var queryURL =
        "https://api.rawg.io/api/games?search=" + userGameSearchInput + "&page_size=5";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then( function (response) {

            for (let i = 0; i < response.results.length; i++) {
                // Construct html element using response
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
    };

    function handleGameReviewSelection() {
        
        // Grab grandparent div of reviewGameBtn when clicked
        gameSelection = $(this).parent().parent().children();
        gameSelection.addClass('reviewThisDiv');
        // Hide all divs except for the one clicked by user
        $('div:not(.reviewThisDiv)').addClass('d-none');
        // Hide reviewGameBtn
        $('.reviewGameBtn').addClass('d-none');
        $('.reviewThisDiv').appendTo('body');
        
        $('.reviewThisDiv').wrap( "<div class='container col-md-6 col-sm-6 shadow-sm p-3 mb-5 bg-white rounded'></div>" );
        
        $('#reviewTitleStatic').removeClass('d-none');
        $('#reviewTitleStatic').appendTo('.reviewThisDiv');
        
        $('#reviewFormIDStatic').removeClass('d-none');
        $('#reviewFormIDStatic').appendTo('.reviewThisDiv');
        
        $('#categoryStatic').removeClass('d-none');
        $('#categoryStatic').appendTo('.reviewThisDiv');
        
        // Display reviewThisDiv element with title input form and genre dropdown menu appended
        var reviewSubmitButton = $('<button type="button" id="reviewGameSubmitButtonID" class="btn btn-light">Submit Review</button>');
        reviewSubmitButton.appendTo('.reviewThisDiv');

    };

    function getMovieDetails() {
        // Send http get request to omdb api
        var omdbKey = "285ba2b7";
        var queryURL =
        "http://www.omdbapi.com/?apikey=" + omdbKey + "&s=" + userMovieSearchInput + "&page=1&type=movie";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then( function (response) {

            for (let i = 0; i < response.Search.length; i++) {
                //  Construct html element using response
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
    };

    function handleMovieReviewSelection() {
        // Grab grandparent div of reviewGameBtn when clicked
        movieSelection = $(this).parent().parent().children();
        movieSelection.addClass('reviewThisDiv');
        // Hide all divs except for the one clicked by user
        $('div:not(.reviewThisDiv)').addClass('d-none');
        // Hide reviewMovieBtn
        $('.reviewMovieBtn').addClass('d-none');
        $('.reviewThisDiv').appendTo('body');

        $('.reviewThisDiv').wrap( "<div class='container col-md-6 col-sm-6 shadow-sm p-3 mb-5 bg-white rounded'></div>" );

        $('#reviewTitleStatic').removeClass('d-none');
        $('#reviewTitleStatic').appendTo('.reviewThisDiv');

        $('#reviewFormIDStatic').removeClass('d-none');
        $('#reviewFormIDStatic').appendTo('.reviewThisDiv');

        $('#categoryStatic').removeClass('d-none');
        $('#categoryStatic').appendTo('.reviewThisDiv');
        // Display reviewThisDiv element with title input form and genre dropdown menu appended
        var reviewSubmitButton = $('<button type="button" id="reviewMovieSubmitButtonID" class="btn btn-light">Submit Review</button>');
        reviewSubmitButton.appendTo('.reviewThisDiv');
    };

    function getReviews(category) {
        // Create category url
        var categoryString = category || "";
        if (categoryString) {
            categoryString = "/category/" + categoryString;
        }
        // Send get request to api route at the specified category url
        $.get("/api/reviews" + categoryString, function(data) {
            console.log("Reviews", data);
            reviews = data;
            // Check if reviews variable is empty or null
            if (!reviews || !reviews.length) {
                // Call displayEmpty cb else initializeRows cb
                displayEmpty();
            }
            else {
                initializeRows();
            }
        });
    };

    function deleteReview(id) {
        // Send delete request to single review url based on id
        $.ajax({
            method: "DELETE",
            url: "/api/reviews/" + id
        })
        .then(function() {
            // Call getReviews passing in the review category dropdown selection
            getReviews(reviewCategory.val());
        });
    };

    // Cb called to grab reviews again since they are deleted in deleteReview cb???
    getReviews();

    function initializeRows() {
        // Clear review input text and create empty array to store reviews
        reviewContainer.empty();
        var reviewsToAdd = [];
        for (var i = 0; i < reviews.length; i++) {
            // Push items to the array
            reviewsToAdd.push(createNewRow(reviews[i]));
        }
        // Append reviews to the browser review container
        reviewContainer.append(reviewsToAdd);
    };

    function createNewRow(review) {
        var newGameRow = gameSelection;
        
        // Construct new review html
        // Need to ensure function can access reviews.body reviews.category reviews.name
        newGameRow = 
        $('.newGameRow').append(`
        <p>${ review.body }</p>
        <small>Genre: ${ review.category }  |  Title: ${ review.title }</small>
        <button type="button" class="btn btn-warning delete">DELETE</button> 
        <button type="button" class="btn btn-info edit">EDIT</button>
        `);
        newGameRow.data("review", review);
        return newGameRow;
    };
    
    function createNewRow(reviews) {
        // Function constructs new review html
        // Need to ensure function can access reviews.body reviews.category reviews.name
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

    function handleReviewDelete() {
        // Function called when user clicks delete button
        // Grab parent element of the delete button and assign "review" attribute
        var currentReview = $(this)
        .parent()
        .data("review");
        // Call deleteReview with currentReview passed in
        deleteReview(currentReview.id);
    };

    function handleReviewEdit() {
        // Function called when user clicks edit button
        // Grab parent element of the edit button and assignm "review" attribute
        var currentReview = $(this)
        .parent()
        .data("review");
        // Set the current url to a specific review id
        window.location.href = "/cms?review_id=" + currentReview.id;
    };

    function displayEmpty() {
        // Function empties review input form
        // reviewContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No reviews yet for this genre, navigate <a href='../'>here</a> in order to create a new review.");
        reviewContainer.append(messageH2);
    };

    function handleCategoryChange() {
        // Grab value of genre selected in the category dropdown menu
        var newReviewCategory = $(this).val();
        // Pass selected genre into getReviews cb
        getReviews(newReviewCategory);
    };



});