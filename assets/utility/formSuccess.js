const FormSuccess = {
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