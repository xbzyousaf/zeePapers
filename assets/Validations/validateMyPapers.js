$(document).ready(function () {
    const baseUrl = ENV.getBaseURL() + ENDPOINTS.Articles;

    function getMyPapers() {
        $.ajax({
            url: baseUrl,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + UserInfo.GetToken(),
            },
            type: "GET",
            success: function (response) {
                displayPapers(response.data);
            },
            error: function (xhr) {
                console.error(xhr.statusText);
            }
        });
    }

    function displayPapers(papers) {
        const container = $('.row.justify-content-center.pt-2');

        papers.forEach(paper => {
            const truncatedTitle = paper.title.length > 20 ? `${paper.title.substring(0, 17)}...` : paper.title;
            const truncatedContent = paper.content.length > 73 ? `${paper.content.substring(0, 70)}...` : paper.content;

            const imageUrl = `${ENV.getBaseURLWithoutApi()}images/${paper.image}`;
            
            const card = $(`
                <div class="card col-12 col-md-6 col-lg-4 mb-2">
                    <div class="card-wrapper">
                        <div class="card-box align-center">
                            <div class="iconfont-wrapper paper-image-container">
                                <img src="${imageUrl}" alt="image" class="paper-image">
                            </div>
                            <h5 class="card-title mt-2 mbr-fonts-style display-7">${truncatedTitle}</h5>
                            <p class="card-text mbr-fonts-style display-8">${truncatedContent}</p>
                            <a href="#" class="btn-primary more-button" data-paper-id="${paper.id}">More</a>
                        </div>
                    </div>
                </div>`);

            container.append(card);
        });
        $('.more-button').on('click', function (event) {
            event.preventDefault();
            const paperId = $(this).data('paper-id');
            // Store the paperId in sessionStorage or localStorage
            UserInfo.RemovePaperId();
            UserInfo.SetPaperId(paperId);
            // Redirect to papers.html
            // parent.postMessage({ paperId: paperId }, '*');
            window.location.href = `papers.html?id=${paperId}`;
        });
    }

    getMyPapers();
});
