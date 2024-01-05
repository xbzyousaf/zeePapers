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
        var data = FrogetPassword.serializeObject($(form));
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
            error: function (xhr, status, error) {
                var responseJSON = xhr.responseJSON;
                if (responseJSON && responseJSON.errors) {
                    $(".error-message").remove();
                    $.each(responseJSON.errors, function (key, value) {
                        // Find the input field by name and append
                        var inputField = $('[name="' + key + '"]');
                        var errorMessage = $('<small class="error-message" id="' + key + '-error">' + value + '</small>');
                        // insert error after input
                        errorMessage.insertAfter(inputField);
                    });
                }
            }
        });
    },
});
const FrogetPassword = {
    serializeObject: function (form) {
        config = {};
        form.serializeArray().map(function (item) {
            if (config[item.name]) {
                if (typeof (config[item.name]) === "string") {
                    config[item.name] = [config[item.name]];
                }
                config[item.name].push(item.value);
            } else {
                config[item.name] = item.value;
            }
        });

        return config;
    }
};
});