$(document).ready(function () {
    const paperId = UserInfo.GetPaperId();
    const statsUrl = `${ENV.getBaseURL()}${ENDPOINTS.Articles}/${paperId}/${ENDPOINTS.Stats}`;

    function fetchAndRenderStats() {
        $.ajax({
            url: statsUrl,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + UserInfo.GetToken(),
            },
            type: 'GET',
            success: function (response) {
                console.log(response.data);
                renderStats(response.data);
            },
            error: function (xhr) {
                console.error(xhr.statusText);
            }
        });
    }

    function renderStats(stats) {
        $(".totalLikes").text(stats.likesCount + " Likes");
        $(".totalComments").text(stats.commentsCount + " Comments");
    }

    // Initial fetch and render
    fetchAndRenderStats();


    // Add comment functionality
    $("#commentSender").validate({
        rules: {
            message: {
                required: true,
            },
        },
        messages: {
            message: {
                required: "Enter a message to comment."
            },
        },
        errorElement: "small",

        submitHandler: function (form) {
            var data = FormDataWithoutImage.serializeObject($(form));
            const article_id = UserInfo.GetPaperId();
            const baseUrl = `${ENV.getBaseURL()}${ENDPOINTS.Articles}/${article_id}/${ENDPOINTS.Comments}`;

            $.ajax({
                url: baseUrl,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + UserInfo.GetToken(),
                },
                type: "POST",
                data: data,

                success: function (response) {
                    // Show success message for the comment
                    FormSuccess.showSuccessMessages(response.message);
                    setTimeout(fetchAndRenderStats, 500);

                    // Clear the comment input field
                    $('#messageInput').val('');

                    // After successfully commenting, refresh the statistics (including comments count) with a slight delay
                },
                error: function (xhr) {
                    var responseJSON = xhr.responseJSON;
                    if (responseJSON && responseJSON.errors) {
                        FormError.showErrorMessages(responseJSON.errors);
                    }
                }
            });
        },
    });
});
