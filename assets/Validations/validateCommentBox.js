$(document).ready(function () {
    const paperId = UserInfo.GetPaperId();

    // Example API endpoint to fetch paper details based on the paper ID
    const url = `${ENV.getBaseURL()}${ENDPOINTS.Articles}/${paperId}/${ENDPOINTS.Comments}`;

    // Fetch paper details using the API
    $.ajax({
        url: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + UserInfo.GetToken(),
        },
        type: "GET",
        success: function (response) {
            if (response.data && response.data.length > 0) {
                clearComments();
                renderComments(response.data);
                parent.postMessage({ totalComments: response.data.length }, '*');
            }
        },
        error: function (xhr) {
            console.error(xhr.statusText);
        }
    });

        function renderComments(comments) {
            comments.forEach(function (comment, index) {
                document.querySelector('.comment-container').innerHTML += `
                    <div class="comment-box mt-1" id="commentBox${index}">
                        <figure>
                            <img height="45" width="45" src="assets/images/team1.jpg" alt="Profile photo" class="img-fluid" />
                        </figure>
                        <form id="commentForm${index}" class="">
                            <div class="comment-content">
                                <input id="commentInput${index}" readonly value="${comment.message}" class="form-control auto_height commentInput${index}" />
                            </div>
                            <div class="ml-4">
                                <a href="#">Like</a>
                                <a href="#" class="m-2">Reply</a>
                                <i class="m-2">${formatDate(comment.created_at)}</i>
                            </div>
                        </form>
                    </div>
                `;
            });
        }

        function clearComments() {
            document.querySelector('.comment-container').innerHTML = '';
        }
        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }
        function auto_height(elem) {
            elem.style.height = '1px';
            elem.style.height = `${elem.scrollHeight}px`;
        }
        document.addEventListener('DOMContentLoaded', function () {
            var commentInput = document.getElementById('commentInput');
            var commentToggle = document.querySelector('.comment-toggle');
    
            // Check initial text length
            toggleCommentVisibility(commentInput.value.length);
    
            // Add input event listener to check text length dynamically
            commentInput.addEventListener('input', function () {
                toggleCommentVisibility(this.value.length);
            });
        });
});