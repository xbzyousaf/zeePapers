const UserInfo = {
    key: 'token',
    user:'user',
    SetToken:function(token) {
    sessionStorage.setItem(this.key, token);
    },
    GetToken:function() {
    return sessionStorage.getItem(this.key);
    },
    RemoveToken:function() {
    sessionStorage.removeItem(this.key);
    },

    SetUser:function(user) {
    sessionStorage.setItem(this.user, user);
    },
    GetUser:function() {
    return sessionStorage.getItem(this.user);
    },
    RemoveUser:function() {
    sessionStorage.removeItem(this.user);
    }
}