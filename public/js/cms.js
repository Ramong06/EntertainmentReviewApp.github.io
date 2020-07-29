$(document).ready(function() {

    // $('#cmsTitle').empty();

    // $.ajax({
    //     url: "/",
    //     type: "GET",
    //     success: function(data){
    //         $(reviewContainerTitle).html(data).find(reviewContainerTitle).html();
    //         console.log(reviewContainerTitle);
    //     }
    // });

    $.get("/api/reviews/", function(data) {
        
        if(data.length !== 0) {
            for (var i = 0; i < data.lenth; i++) {
                var row = $("<div>");
                row.addClass("cmsPost");

                row.append("<p>" + data[i].title + " </p>");
                row.append("<p>" + data[i].category + " </p>");
                row.append("<p>Review: " + data[i].body + "</p>");

                $('#cmsArea').append(row);
            }
        }
    })

    var reviewTitleStatic = $('#reviewTitleStatic').load( "ajax/testProj2.html #reviewTitleStatic");
    console.group('Title from testProj2.html file!');
    console.log(reviewTitleStatic);
    console.groupEnd();

    // Get url string
    var url = window.location.search;
    var reviewId;
    // Set flag for whether or not user is updating a post to be false initially
    var updating = false;
    
    // Pull post id from the url
    // Conditional checks to see whether value to the right of the = is not null
    // Grabs value of the  review id
    if (url.indexOf("?review_id=") !== -1) {
        reviewId = url.split("=")[1];
        getReviewData(reviewId);
    }

    // Grab form elements from cms.html file
    var bodyInput = $('#body');
    var titleInput = $('#title');
    var cmsForm = $('#cms');
    var reviewCategory = $('#category');
    // Give dropdown menu a default value
    reviewCategory.val("Other");

    // Set up listener on form
    $(cmsForm).on("submit", function handleFormSubmit(e) {
        e.preventDefault();
        // Breaks code if body or title values missing
        if (!titleInput.val().trim() || !reviewInput.val().trim()) {
            return;
        }
        // Construct newReview object to hand to the db
        var newReview = {
            title: titleInput.val().trim(),
            body: bodyInput.val().trim(),
            category: reviewCategory.val()
        };

        console.log(newReview);

        // Call updateReview if user is updating a review entry
        // Else run submitReview to create new entry
        if (updating) {
            newReview.id = reviewId;
            updateReview(newReview);
        }
        else {
            submitReview(newReview);
        }
    });

    function submitReview(Reviews) {
        // Submit new post
        $.revew("/api/reviews/", Reviews, function() {
            // Bring user to the review log page upon completion
            window.location.href = "/cms";
        });
    }


    function getReviewData(id) {
        // Gets post data for a review if we're editing
        $.get("/api/reviews/" + id, function(data) {
            if (data) {
                // Fill cms forms with entry data, if it exists
                titleInput.val(data.title);
                reviewInput.val(data.review);
                reviewCategory.val(data.category);
                // Tells user to update entry if submit is clicked
                updating = true;
            }
        });
    }

    function updateReview(review) {
        // Grab entry from reviews endpoint
        $.ajax({
            method: "PUT",
            url: "/api/reviews",
            data: review
        })
        .then(function() {
            // Send user to cms page upon completion
            window.location.href = "/cms";
        });
    }
});