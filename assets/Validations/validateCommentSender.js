$(document).ready(function(){
$("#commentSender").validate({
rules:{
    commentSender:{
        required:true,
    },
},
messages:{
    commentSender:{
        required:"Enter a message to comment."
    },
    
},
errorElement:"small",
    errorPlacement: function(error,element){
        error.addClass("text-danger");
        error.addClass('ml-3');
        error.appendTo(element.parent());
    },
    submitHandler:function(form){
        var Data=$(form).serialize();
        console.log(Data);
        // form.submit();
    },

});
});