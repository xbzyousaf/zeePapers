const FormSuccess = {
    showSuccessMessages: function (success) {
        // Remove existing success messages
        $(".success-message").remove();

        // Append success message to the success container
        var successContainer = $('#success-container');
        var successMessage = $('<small class="success-message text-info">' + success + '</small>');
        successContainer.append(successMessage);

         // Remove the message after the specified duration (in milliseconds)
         setTimeout(function () {
            successMessage.fadeOut(500, function () {
                $(this).remove();
            });
        }, 3000);
    }
};