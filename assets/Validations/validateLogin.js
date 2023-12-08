$(document).ready(function(){
$("#loginForm").validate({
    rules:{
        email:{required:true,},
        password:{required:true,minlength: 5,}
    },
    messages:{
        email:{required:"Enter email"},
        password:{required:"Enter Passowrd", minlength: "Password must be at least 5 characters long." }
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