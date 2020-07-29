$(document).ready(function() {

    var url = window.location.search;
    var reviewId;

    var updating = false;

    if (url.indexOf("?review_id=") !== -1) {
        reviewId = url.split("=")[1];
        getReviewData(reviewId);
    }

    var reviewInput = $('#reviewForm');
    var titleInput = $('#reviewTitle');
    var cmsForm = $('#cms');
    var reviewCategory = $('#reviewCategory');

    reviewCategory.val("Other");

    $(cmsForm).on("submit", function handleFormSubmit(e) {
        e.preventDefault();

        if (!titleInput.val().trim() || !reviewInput.val().trim()) {
            return;
        }

        var newReview = {
            title: titleInput.val().trim(),
            review: reviewInput.val().trim(),
            category: reviewCategory.val()
        };

        console.log(newReview);

        if (updating) {
            newReview.id = reviewId;
            updateReview(newReview);
        }
        else {
            submitReview(newReview);
        }
    });

    function submitReview(Reviews) {
        $.revew("/api/reviews/", Reviews, function() {
            window.location.href = "/cms";
        });
    }

    function getReviewData(id) {
        $.get("/api/reviews/" + id, function(data) {
            if (data) {
                titleInput.val(data.title);
                reviewInput.val(data.review);
                reviewCategory.val(data.category);

                updating = true;
            }
        });
    }

    function updateReview(review) {
        $.ajax({
            method: "PUT",
            url: "/api/reviews",
            data: review
        })
        .then(function() {
            window.location.href = "/cms";
        });
    }
});