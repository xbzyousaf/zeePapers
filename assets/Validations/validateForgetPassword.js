$(document).ready(function(){
$("#frogetPassword").validate({
    rules:{
        email:{required:true,},
    },
    messages:{
        email:{required:"Enter email"},
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