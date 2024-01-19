
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
            var data = FormDataWithoutImage.serializeObject($(form));
            const baseUrl = ENV.getBaseURL() + ENDPOINTS.ResetPassword;
            $.ajax({
                url: baseUrl,
                headers: {
                    'Accept': 'application/json'
                },
                type: "POST",
                data: data,
                success: function (response) {
                    NewPassowrdSuccess.hideNewPassForm();
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
    const NewPassowrdSuccess = {
        hideNewPassForm: function (form) {
            $(".error-message").remove();
                    $("#headingNewPassword").text("Password changed").addClass("text-success");
                    $("#loginButton").show();
                    $("#tokenInput").hide();
                    $("#passwordInput").hide();
                    $("#confirmPasswordInput").hide();
                    $("#btnSubmit").hide();
        }
    };
});
