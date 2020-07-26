
$(document).ready(function () {
    
    var userGameSearchInput;
    var userMovieSearchInput;

    // var videoGameReview = $("#videoGameReview");
    // var movieReview = $("#movieReview");

    // when the review this game button is clicked run the handlegamereviewselection cb func
    $(document).on("click","reviewGameBtn", handleGameReviewSelection);
    // $(document).on("click","reviewMovieBtn", handleMovieReviewSelection);

    $('.submitGameBtn').click(function (e) {
        e.preventDefault();
    
        userGameSearchInput = $('#gameTitle').val();
    
        getGameDetails();
    });

    $('.submitMovieBtn').click(function (e) {
        e.preventDefault();
    
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
                            <button class="btn btn-light reviewGameBtn" type="submit"><a href="./videoGameReviews.html">Review This Game!</a></button>
                        </div>

                    </div>
                    <br>
                `);

            }
        });
        // when reviewgamebtn is clicked add a class of reviewgamecard to the grandparent div element to be loaded on the videogamereviews.html page upon load
    }
            function handleGameReviewSelection() {
                (this).parent().parent().addClass('reviewGameCard');
        };
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
                            <a class="btn btn-secondary reviewMovieBtn" href="./movieReviews.html" role="button">Review This Movie!</a>
                        </div>

                    </div>
                    <br>
                `);

            }
        });
    }

    // function handleMovieReviewSelection() {};

});
