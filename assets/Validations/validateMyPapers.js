
// $(document).ready(function () {
   
//     // Function to fetch personal information from the API
//      getPersonalInfo=function() {
//         const baseUrl = ENV.getBaseURL() + ENDPOINTS.PersonelInfo;
        
//         $.ajax({
//             url: baseUrl,
//             headers: {
//                 'Accept': 'application/json'
//             },
//             type: "GET",
//             data:'',
//             success: function (response) {
//                 UserInfo.SetUser(response);
//                 var user=UserInfo.GetUser();
//                 console.log(user.id);
//             },
//             error: function (xhr) {
//                 console.log('Error fetching personal information:', xhr);
//             }
//         });
//     }
//     getPersonalInfo();

// });