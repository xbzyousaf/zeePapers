
$(document).ready(function () {
    
    getAndPopulateUserInfo();

    $('#updateProfile').validate({
        rules: {
            name: { required: true, },
            username: { required: true, },
            email: { required: true, email: true },
            phone: { required: true, },
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
            address: { required: "Enter your address." }
        },
        errorElement: "small",
        submitHandler: function (form) {
            var data = FormDataWithImage.serializeObject($(form));
            // append _method=PUT for spoofing

            data.append('_method', 'PUT');
            console.log(data);
            var user =JSON.parse(UserInfo.GetUser());
            data.append('id', user.id);

                
            const baseUrl = ENV.getBaseURL() + ENDPOINTS.UpdateProfile +'/'+ user.id;
            console.log(baseUrl);
            $.ajax({
                url: baseUrl,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + UserInfo.GetToken(),
                },
                type: "POST",
                data: data,
                contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                processData: false, // NEEDED, DON'T OMIT THIS
                success: function (response) {
                    updateSuccess(response.data);
                },
                error: function (xhr) {
                    var responseJSON = xhr.responseJSON;
                    if (responseJSON && responseJSON.errors) {
                        FormError.showErrorMessages(responseJSON.errors);
                    }

                },
                finally: function() {
                    debugger;
                }
            });
        },
    });
    function getAndPopulateUserInfo() {
        var userData = JSON.parse(UserInfo.GetUser());
        $('#updateProfile').find('input[name="name"]').val(userData.name);
        $('#updateProfile').find('input[name="username"]').val(userData.username);
        $('#updateProfile').find('input[name="email"]').val(userData.email);
        $('#updateProfile').find('input[name="phone"]').val(userData.phone);
        $('#updateProfile').find('input[name="address"]').val(userData.address);
        
    }
    function updateSuccess(response) {
        UserInfo.RemoveUser();
        UserInfo.SetUser(JSON.stringify(response));
        window.location.href = 'myPapers.html';
    }

});