
$(document).ready(function () {
  
    $('#registerUserForm').validate({
        rules: {
            name: { required: true, },
            username: { required: true, },
            email: { required: true, email: true },
            phone: { required: true, },
            password: { required: true, minlength: 5 },
            confirmPassword: { required: true, equalTo: "#passwordInput" },
            address: { required: true, },
        },
        messages: {
            name: { required: "Enter your name." },
            username: { required: "Enter a username." },
            email: {
                required: "Enter your email address.",
                email: "Enter a valid email address."
            },
            phone: { required: "Enter your phone number." },
            password: {
                required: "Enter a password.",
                minlength: "Password must be at least 5 characters long."
            },
            confirmPassword: {
                required: "Confirm your password.",
                equalTo: "Passwords do not match."
            },
            address: { required: "Enter your address." }
        },

        errorElement: "small",

        submitHandler: function (form) {
            var data = GetFormData.serializeObject($(form));
            const baseUrl = ENV.getBaseURL() + ENDPOINTS.RegisterUser;
            $.ajax({
                url: baseUrl,
                headers: {
                    'Accept': 'application/json'
                },
                type: "POST",
                data: data,
                success: function (response) {
                    handleRegistrationSuccess(response);
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
    function handleRegistrationSuccess(response) {
        UserInfo.RemoveToken();
        UserInfo.SetToken(response.data);
        getAndSetPersonalInfo();
    }

    function getAndSetPersonalInfo() {
        const baseUrl = ENV.getBaseURL() + ENDPOINTS.PersonelInfo;
        
        $.ajax({
            url: baseUrl,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + UserInfo.GetToken(),
            },
            type: "GET",
            data:'',
            success: function (response) {
                handlePersonalInfoSuccess(response);
            },
            error: function (xhr) {
                console.log('Error fetching personal information:', xhr);
            }
        });
    }
    function handlePersonalInfoSuccess(response) {
        UserInfo.RemoveUser();
        UserInfo.SetUser(JSON.stringify(response.data));
        var user = UserInfo.GetUser();
        window.location.href = 'myPapers.html';
    }
});