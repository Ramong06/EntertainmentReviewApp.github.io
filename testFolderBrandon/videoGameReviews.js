var loadSelectedItem = function () {
    $.ajax(".testProj2.html", {
        success: function(response) {
            $("#loadSelectedItem").html(response);
        }
    });
};

$("#loadSelectedItem").on('click', loadSelectedItem)

// $(document).ready(function() {
//     $(document).load('videoGameReviews.html .card');
// })

// $(document).on("ready", function() {
//     $.ajax("videoGameReviews.html", {
//         success: function (response) {
//             $(".reviewGameCard").html(response);
//         }
//     });
// })