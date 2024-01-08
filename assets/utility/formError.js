const FormError = {
 showErrorMessages:function(errors) {
    $(".error-message").remove();
$.each(errors, function (key, value) {
    // Find the input field by name and append
    var inputField = $('[name="' + key + '"]');
    var errorMessage = $('<small class="error-message text-danger" id="' + key + '-error">' + value + '</small>');
    // insert error after input
    errorMessage.insertAfter(inputField);
});
}
}