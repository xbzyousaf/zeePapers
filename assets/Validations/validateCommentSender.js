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
    errorElement: "small",
      
        submitHandler: function (form) {
            var data = GetFormData.serializeObject($(form));
            const baseUrl = ENV.getBaseURL() + ENDPOINTS.Comments;
            $.ajax({
                url: baseUrl,
                headers: {
                    'Accept': 'application/json'
                },
                type: "POST",
                data: data,
                success: function (response) {
                    window.location.href = 'papers.html';
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
});