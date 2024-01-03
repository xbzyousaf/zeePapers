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
        errorPlacement: function (error, element) {
            // Remove the existing error message container
            $("#" + element.attr("id") + "-error").remove();
            error.addClass("text-danger");
            // Append the error message above the input field
            error.insertAfter(element);
        },
        submitHandler: function (form) {
            var data = LoginForm.serializeObject($(form));
            $.ajax({
                url: 'http://localhost:8000/api/login',
                headers: {
                    'Accept': 'application/json'
                },
                type: "POST",
                data: (data),
                success: function (response) {
                    window.location.href = 'myPapers.html';
                },
                error: function (xhr, status, error) {
                    // Handle server-side validation errors
                    var responseJSON = xhr.responseJSON;
                    if (responseJSON && responseJSON.errors) {
                        $.each(responseJSON.errors, function (key, value) {
                            // Find the input field by name and append the error message
                            var inputField = $('[name="' + key + '"]');
                            var errorMessage = $('<small class="error-message">' + value + '</small>');
                            // Check if the error is related to the password
                            if (key == 'password') {
                                errorMessage.insertAfter(inputField);
                            } else {
                                errorMessage.insertAfter(inputField);
                            }
                        });
                    }
                }
            });
        },
    });

    const LoginForm = {
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
