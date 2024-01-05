
        $(document).ready(function () {
            $('#updateProfile').validate({
                rules: {
                    name: { required: true,},
                    username: { required: true,},
                    email: { required: true, email: true},
                    phone: { required: true,},
                    address: { required: true,},
                },
                messages: {
                    name: { required: "Enter your name." },
                    username: { required: "Enter a username." },
                    email: {
                        required: "Enter your email address.",
                        email: "Enter a valid email address." },
                    phone: { required: "Enter your phone number." },
                    address: {required: "Enter your address."}
                },
                errorElement: "small",
                submitHandler: function (form) {
                    var data = UpdateProfile.serializeObject($(form));
                    const baseUrl = ENV.getBaseURL() + ENDPOINTS.UpdateProfile;
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
            const UpdateProfile = {
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