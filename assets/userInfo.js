const UserInfo = {
    key: 'token',
    user:'user',
    paperId:'paper_id',
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
    },
    SetPaperId:function(id) {
    sessionStorage.setItem(this.paperId, id);
    },
    GetPaperId:function() {
    return sessionStorage.getItem(this.paperId);
    },
    RemovePaperId:function() {
    sessionStorage.removeItem(this.paperId);
    }
}