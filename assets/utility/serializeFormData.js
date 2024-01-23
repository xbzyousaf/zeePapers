const FormDataWithoutImage = {
    serializeObject: function (form) {
         config = {};
        form.serializeArray().map(function (item) {
            if (config[item.name]) {
                if (typeof (config[item.name]) === "string") {
                    config[item.name] = [config[item.name]];
                }
                config[item.name].push(item.value);
            } else {
                config[item.name] = item.value;
            }
        });

        return config;
    }
};
const FormDataWithImage = {
    serializeObject: function (form) {
        var data = new FormData();
      //Form data
        var form_data = form.serializeArray();
        $.each(form_data, function (key, input) {
            data.append(input.name, input.value);
        });

        //File data
        if($('input[name="image"]')[0].files.length > 0){
            var file_data = $('input[name="image"]')[0].files;
        for (var i = 0; i < file_data.length; i++) {
            data.append("image", file_data[i]);
        }
        }
        return data;
    }
};