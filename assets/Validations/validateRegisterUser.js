
        $(document).ready(function () {
            $('#registerUserForm').validate({
                rules: {
                    name: { required: true,},
                    username: { required: true,},
                    email: { required: true, email: true},
                    phone: { required: true,},
                    password: { required: true, minlength: 5},
                    confirmPassword: { required: true, equalTo: "#passwordInput"},
                    address: { required: true,},
                },
                messages: {
                    name: { required: "Enter your name." },
                    user: { required: "Enter a username." },
                    email: {
                        required: "Enter your email address.",
                        email: "Enter a valid email address." },
                    phone: { required: "Enter your phone number." },
                    password: {
                        required: "Enter a password.",
                        minlength: "Password must be at least 5 characters long." },
                    confirmPassword: {
                        required: "Confirm your password.",
                        equalTo: "Passwords do not match." },
                    address: {required: "Enter your address."}
                },
                errorElement: "small",
                errorPlacement: function (error, element) {
                    error.addClass("text-danger");
                    error.appendTo(element.parent());
                },
                submitHandler: function (form) {
                    // Sanitize and log the form data
                    var sanitizedData = $(form).serialize();
                    
                    console.log("Sanitized Data:", sanitizedData);
        
                    // You can uncomment the line below to allow the form to submit
                    // form.submit();
                }
            });
        });