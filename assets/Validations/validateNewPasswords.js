
$(document).ready(function(){
    $("#newPassowrd").validate({
        rules: {
            password: { required: true, minlength: 5 },
            confirmPassword: { required: true, equalTo: "#passwordInput" },
        },
        messages: {
            password: {
                required: "Enter a password.",
                minlength: "Password must be at least 5 characters long."
            },
            confirmPassword: {
                required: "Confirm your password.",
                equalTo: "Passwords do not match."
            },
        },
        errorElement: "small",
      
        submitHandler: function (form) {
            var data = NewPassowrd.serializeObject($(form));
            const baseUrl = ENV.getBaseURL() + ENDPOINTS.ResetPassword;
            $.ajax({
                url: baseUrl,
                headers: {
                    'Accept': 'application/json'
                },
                type: "POST",
                data: data,
                success: function (response) {
                    $(".error-message").remove();
                    $("#headingNewPassword").text("Password changed").addClass("text-success");
                    $("#loginButton").show();
                    $("#tokenInput").hide();
                    $("#passwordInput").hide();
                    $("#confirmPasswordInput").hide();
                    $("#btnSubmit").hide();
                },
                error: function (xhr) {
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

    const NewPassowrd = {
        serializeObject: function (form) {
            var config = {};
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
    function displayErrors(errors) {
        $.each(errors, function (key, value) {
            var inputField = $('[name="' + key + '"]');
            var errorMessage = $('<small class="error-message">' + value + '</small>');
            
             // Remove existing error message
                inputField.next('.error-message').remove();
                
                // Append new error message
                errorMessage.insertAfter(inputField);
        });
    }
    $("#loginButton").on("click", function () {
        window.location.href = 'login.html';
      });
});
