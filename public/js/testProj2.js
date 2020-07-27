
$(document).ready(function () {
    
    $(document).on("click","button.reviewGameBtn", handleGameReviewSelection);
    $(document).on("click","button.reviewMovieBtn", handleMovieReviewSelection);

    // $('input[type=radio][name=searchSelection]').change(function() {
    //     if (this.value == 'gameSelector') {
    //         console.log("Video Game Selected");
    //     }
    //     else if (this.value == 'movieSelector') {
    //         console.log("Movie Selected");
    //     }
    // });

    $('#gameSelector').click(function () {
        $('#videoGameSearchID').removeClass('d-none');
        $('.radioButton').addClass('d-none');
    });

    $('#movieSelector').click(function () {
        $('#movieSearchID').removeClass('d-none');
        $('.radioButton').addClass('d-none');
    });

    var userGameSearchInput;
    var userMovieSearchInput;

    // var videoGameReview = $("#videoGameReview");
    // var movieReview = $("#movieReview");

    // when the review this game button is clicked run the handlegamereviewselection cb func
    // $(document).on("click","reviewMovieBtn", handleMovieReviewSelection);

    $('.submitGameBtn').click(function (e) {
        e.preventDefault();

        $('#cardDivID').removeClass('d-none');
        $('#videoGameSearchID').addClass('d-none');

        userGameSearchInput = $('#gameTitle').val();

        getGameDetails();
    });

    $('.submitMovieBtn').click(function (e) {
        e.preventDefault();

        $('#cardDivID').removeClass('d-none');
        $('#movieSearchID').addClass('d-none');

        userMovieSearchInput = $('#movieTitle').val();

        getMovieDetails();
    });

    function getGameDetails() {
        var queryURL =
        "https://api.rawg.io/api/games?search=" + userGameSearchInput + "&page_size=5";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then( function (response) {

            console.group('Video Game API Results');
            console.log(response);

            console.log(response.results[0].name);
            console.log(response.results[0].released);
            console.log(response.results[0].rating);
            // console.log(response.results[0].short_screenshots[0].image);
            console.log(response.results[0].background_image);
            console.groupEnd();

            // console.log(response.length);
            // console.log(response.name);
            // console.log(response.platforms[0].name);

            for (let i = 0; i < response.results.length; i++) {
                // responseGameImage = response.results[i].background_image;
                // responseGameName = response.results[i].name;
                // responseGameReleaseDate = response.results[i].released;
                // responseGameRating = response.results[i].rating;

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
        // when reviewgamebtn is clicked add a class of reviewgamecard to the grandparent div element to be loaded on the videogamereviews.html page upon load
        // assigning a class to the selected card should prevent all of the cards from being sent to the review page when requested
    }
            function handleGameReviewSelection() {
                var gameSelection = $(this).parent().parent().children();
                gameSelection.addClass('reviewThisDiv');
                $('div:not(.reviewThisDiv)').addClass('d-none');
                $('.reviewThisDiv').appendTo('body');

                $('.reviewThisDiv').wrap( "<div class='container col-md-6 col-sm-6 shadow-sm p-3 mb-5 bg-white rounded'></div>" );

                // $('.reviewThisDiv').wrap( "<div class='container col-md-6 shadow-sm p-3 mb-5 bg-white rounded' style='width:300px; height:300px;'></div>" );

                $('#reviewTitle').removeClass('d-none');
                $('#reviewTitle').appendTo('.reviewThisDiv');

                $('#reviewForm').removeClass('d-none');
                $('#reviewForm').appendTo('.reviewThisDiv');

                $('#reviewCategory').removeClass('d-none');
                $('#reviewCategory').appendTo('.reviewThisDiv');
                // $('#reviewCategory').prependTo('.reviewThisDiv');

        };

        //     function handleGameReviewSelection() {
        //         var gameSelection = $(this).parent().parent().children();
        //         gameSelection.addClass('reviewThisDiv');
        //         $('div:not(.reviewThisDiv)').addClass('d-none');
        //         $('.reviewThisDiv').appendTo('body');

        //         $('.reviewThisDiv').wrap( "<div class='container col-md-6 shadow-sm p-3 mb-5 bg-white rounded'></div>" );

        //         // $('.reviewThisDiv').wrap( "<div class='container col-md-6 shadow-sm p-3 mb-5 bg-white rounded' style='width:300px; height:300px;'></div>" );

        //         // display text area form for user to enter review
        //         $('#reviewForm').removeClass('d-none');
        //         $('#reviewForm').append('.reviewThisDiv');
        // };

        //     function handleGameReviewSelection() {
        //         var gameSelection = $(this).parent().parent().children();
        //         gameSelection.addClass('reviewThisDiv');
        //         $('div:not(.reviewThisDiv)').hide();
        //         $('.reviewThisDiv').appendTo('body');

        //         $('.reviewThisDiv').wrap( "<div class='container col-md-6 shadow-sm p-3 mb-5 bg-white rounded'></div>" );

        //         // $('.reviewThisDiv').wrap( "<div class='container col-md-6 shadow-sm p-3 mb-5 bg-white rounded' style='width:300px; height:300px;'></div>" );

        //         // display text area form for user to enter review
        //         $('#reviewForm').removeClass('d-none');
        //         $('#reviewForm').appendTo('.reviewThisDiv');
        // };

        //     function handleGameReviewSelection() {
        //         var gameSelection = $(this).parent().parent();
        //         gameSelection.addClass('reviewThisDiv');
        //         $('div:not(.reviewThisDiv)').hide();
        //         $('.reviewThisDiv').appendTo('body');
        // };

        //     function handleGameReviewSelection() {
        //         var gameSelection = $(this).parent().parent().siblings();
        //         gameSelection.addClass('reviewThisDiv');
        //         $('div:not(.reviewThisDiv)').hide();
        //         $('.reviewThisDiv').appendTo('body');
        // };

        //     function handleGameReviewSelection() {
        //         var gameSelection = $(this).parent().parent();
        //         gameSelection.addClass('d-none');
        // };

    // }
    //         function handleGameReviewSelection() {
    //             (this).parent().parent().addClass('reviewGameCard');
    //     };
            //     function handleGameReviewSelection() {
            //         var selectedGame = $(this).parent().parent().attr('id');
            //         console.log(selectedGame);
            // };


    function getMovieDetails() {
        var omdbKey = "285ba2b7";
        var queryURL =
        "http://www.omdbapi.com/?apikey=" + omdbKey + "&s=" + userMovieSearchInput + "&page=1&type=movie";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then( function (response) {

            console.group('Movie API Results');
            console.log(response);
            console.log(response.Search[0].Poster);
            console.log(response.Search[0].Title);
            console.log(response.Search[0].Year);
            console.groupEnd();

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

    function handleMovieReviewSelection() {
        // var gameSelection = $(this).parent().parent().addClass('d-none');
        var movieSelection = $(this).parent().parent();
        movieSelection.addClass('d-none');
};
    
    // function handleMovieReviewSelection() {};

});
