
$(document).ready(function () {
  
    $('#publishPaper').validate({
        rules: {
            title: { required: true, },
            image: { required: true, },
            content: { required: true, }
        },
        messages: {
            title: { required: "Enter your article title." },
            image: { required: "Enter your article image." },
            content: { required: "Enter your article content." },
        },

        
        errorElement: "small",

        submitHandler: function (form) {
            var data = GetFormData.serializeObject($(form));
            const baseUrl = ENV.getBaseURL() + ENDPOINTS.Articles;
            $.ajax({
                url: baseUrl,
                headers: {
                    'Accept': 'application/json'
                },
                type: "POST",
                data: data,
                success: function (response) {
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