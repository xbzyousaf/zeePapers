$(document).ready(function () {
    const paperId = UserInfo.GetPaperId();

    // Example API endpoint to fetch paper details based on the paper ID
    const url = `${ENV.getBaseURL()}${ENDPOINTS.Articles}/${paperId}/${ENDPOINTS.Stats}`;

    function fetchAndRenderStats() {
    // Fetch paper details using the API
    $.ajax({
        url: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + UserInfo.GetToken(),
        },
        type: "GET",
        success: function (response) {
            renderStats(response.data);
        },
        error: function (xhr) {
            console.error(xhr.statusText);
        }
    });
}
fetchAndRenderStats();
    function renderStats(stats) {
        $(".totalLikes").text(stats.likesCount+" Likes");
        $(".totalComments").text(stats.commentsCount+" Comments");
    }

    // to add like
    const likeUrl = `${ENV.getBaseURL()}${ENDPOINTS.Articles}/${paperId}/${ENDPOINTS.Likes}`;
    $("#likeBtn").on("click", function (event) {
        event.preventDefault();
        // Send a request to like/unlike the article
        $.ajax({
            url: likeUrl,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + UserInfo.GetToken(),
            },
            type: "POST", // You may need to adjust this based on your API
           
            success: function (response) {
                fetchAndRenderStats();
            },
            error: function (xhr) {
                console.log(xhr.statusText);
            }
        });
    });
    window.addEventListener('message', function (event) {
        console.log('Message received:', event.data);
        try {
            if (event.data.type === 'updateStats') {
                // Assuming event.data.stats contains the updated statistics
                renderStats(event.data.stats);
            }
        } catch (error) {
            console.error('Error handling message:', error);
        }
    });

});