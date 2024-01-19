$(document).ready(function () {
    function getQueryParam(name) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        return urlSearchParams.get(name);
    }
    const paperId = getQueryParam('id');

    // Example API endpoint to fetch paper details based on the paper ID
    const url = `${ENV.getBaseURL()}${ENDPOINTS.Articles}/${paperId}`;

    // Fetch paper details using the API
    $.ajax({
        url: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + UserInfo.GetToken(),
        },
        type: "GET",
        success: function (paperDetails) {
            displayPaperDetails(paperDetails.data);
        },
        error: function (xhr) {
            console.error(xhr.statusText);
        }
    });

    window.addEventListener('message', function (event) {
        if (event.data.totalComments !== undefined) {
            adjustIframeHeight(event.data.totalComments);
        }
    });

    function displayPaperDetails(paper) {
        $('.paperTitle').text(paper.title);
        $('.articleImage').attr('src', `${ENV.getBaseURLWithoutApi()}images/${paper.image}`);
        $('.paperDate').text(formatDate(paper.created_at));
        $('.publisherName').text(paper.user.name);
        $('.paperContent').text(paper.content);
    }

    function adjustIframeHeight(totalComments) {
        const iframe = parent.document.querySelector('.paperCommentBox');
        let iframeHeight = 'auto';

        // Adjust the iframe height based on the number of comments
        if (totalComments >= 1 && totalComments <= 4) {
            iframeHeight = `${116 + (totalComments - 1) * 92}px`;
        } else if (totalComments > 4) {
            iframeHeight = '484px';
        }

        iframe.style.height = iframeHeight;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
});
