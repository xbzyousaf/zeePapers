$(document).ready(function(){
$("#frogetPassword").validate({
    rules:{
        email:{required:true,},
    },
    messages:{
        email:{required:"Enter email"},
    },
    errorElement:"small",
    submitHandler: function (form) {
        var data = GetFormData.serializeObject($(form));
        const baseUrl = ENV.getBaseURL() + ENDPOINTS.SendEmailForReset;
        $.ajax({
            url: baseUrl,
            headers: {
                'Accept': 'application/json'
            },
            type: "POST",
            data: (data),
            success: function (response) {
                window.location.href = 'newPassword.html';
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