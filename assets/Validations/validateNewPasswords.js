$(document).ready(function(){
$("#newPassowrd").validate({
    rules:{
        password: { required: true, minlength: 5},
        confirmPassword: { required: true, equalTo: "#passwordInput"},
    },
    messages:{
        password: {
            required: "Enter a password.",
            minlength: "Password must be at least 5 characters long." },
        confirmPassword: {
            required: "Confirm your password.",
            equalTo: "Passwords do not match." },
    },
    errorElement:"small",
    errorPlacement:function(error,element){
        error.addClass("text-danger");
        error.appendTo(element.parent());
    },
    submitHandler:function(form){
        var Data=$(form).serialize();
        console.log("Data:", Data);
        // form.submit();
    }
});
});