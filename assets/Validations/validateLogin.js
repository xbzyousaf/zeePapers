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
            var data = FormDataWithoutImage.serializeObject($(form));
            const baseUrl = ENV.getBaseURL() + ENDPOINTS.Login;
            $.ajax({
                url: baseUrl,
                headers: {
                    'Accept': 'application/json'
                },
                type: "POST",
                data: (data),
                success: function (response) {
                    handleLoginSuccess(response.data);
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
    function handleLoginSuccess(response) {
        UserInfo.RemoveToken();
        UserInfo.SetToken(response.token);
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
                var responseJSON = xhr.responseJSON;
                    if (responseJSON && responseJSON.errors) {
                        FormError.showErrorMessages(responseJSON.errors);
                    }
            }
        });
    }
    function handlePersonalInfoSuccess(response) {
        UserInfo.RemoveUser();
        UserInfo.SetUser(JSON.stringify(response.data));
        window.location.href = 'myPapers.html';
    }

});
