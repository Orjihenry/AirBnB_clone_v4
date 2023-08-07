$(document).ready(function () {
  const HOST = "localhost";

  // Function to fetch and display reviews
  function fetchAndDisplayReviews(placeId) {
    $.ajax({
      type: "GET",
      url: `http://${HOST}:5001/api/v1/places/${placeId}/reviews`,
      dataType: "json",
      success: function (data) {
        const placeElement = $(`article[data-place-id="${placeId}"]`);
        const reviewsSection = placeElement.find(".reviews");
        reviewsSection.empty();
        if (data.length > 0) {
          data.forEach((review) => {
            reviewsSection.append(`<p>${review.text}</p>`);
          });
        } else {
          reviewsSection.append(`<p>No reviews yet.</p>`);
        }
      },
    });
  }

  // Function to toggle reviews visibility
  function toggleReviewsVisibility(placeId) {
    const placeElement = $(`article[data-place-id="${placeId}"]`);
    const reviewsSection = placeElement.find(".reviews");
    if (reviewsSection.is(":visible")) {
      reviewsSection.hide();
      placeElement.find("span.reviews-toggle").text("show");
    } else {
      fetchAndDisplayReviews(placeId);
      reviewsSection.show();
      placeElement.find("span.reviews-toggle").text("hide");
    }
  }

  // Event listener for clicking on the Reviews span
  $("SECTION.places").on("click", "span.reviews-toggle", function () {
    const placeId = $(this).closest("article").attr("data-place-id");
    toggleReviewsVisibility(placeId);
  });
});
