$(document).ready(function () {
    
    $("#loginForm").validate({
        rules: {
            email: { required: true, },
            password: { required: true, minlength: 5, }
        },
        messages: {
            email: { required: "Enter email" },
            password: { required: "Enter Password", minlength: "Password must be at least 5 characters long." }
        },
        
        errorElement: "small",
        submitHandler: function (form) {
            var data = GetFormData.serializeObject($(form));
            const baseUrl = ENV.getBaseURL() + ENDPOINTS.Login;
            $.ajax({
                url: baseUrl,
                headers: {
                    'Accept': 'application/json'
                },
                type: "POST",
                data: (data),
                success: function (response) {
                    window.location.href = 'myPapers.html';
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
