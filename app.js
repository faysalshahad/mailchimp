// console.log ("Testing the app.js file");

/**Mailchimp API Key
 2dc84b7992ec2366df949d6e83608176-us21
 */

 /**MailChimp Audience ID or List ID
  76bfc14b95
  */

/*Creating a new node app. To do that we are requiring an express module. */
const express = require ("express");

/*Requiring a https module. It is a native module inside node.js. Therefore it does not require external
installation process. */
const https = require ("https");

/**To catch the data from user input we need to install bodyparser module */
const bodyParser = require ("body-parser");

const request = require ("request");

/* The variable name app is being used because it is the best practice 
to use app as a name to represent express modules or express app.*/
const app = express();

/*This code will help our server to serve static files such as CSS and Images, we need
to use a special function of Express module. That is known as static */
app.use(express.static("public"));

/**This is a must necessary code to declare to use the body-parser module to capture user input. */
app.use(bodyParser.urlencoded({extended: true}));

/*We will modify the code here so that if a browser gets in touch with us 
from port 3000 then it can get a response back. "/" The forward slash inside
the app.get is representing the homepage or home-root. */

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/signup.html");
    
});

/** We will catch user input via app.post method and here we are specifying the root route */

app.post("/", function (req, res) {

    /**declaring three different variables to catch and store user inputs in them. after req.body. three 
     * different variable names has been collected from signup.html. these names can be found inside the
     * html <input type> which are part of the html <form>. The names has to be exactly as it has been 
     * mentioned in signup.html.  */
var getUserFirstName = req.body.userFirstName;
var getUserLastName = req.body.userLastName;
var getUserEmailAddress = req.body.userEmailAddress;

 /**This code has been generated from
//   * https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/
//   * add members to the list section
//   *  this id is generated from our mailchimp account audience list id which is
//    * 76bfc14b95
//  */

// const response4 = await mailchimp.lists.addListMember("76bfc14b95", {
//     email_address: getUserEmailAddress,
//             status: "subscribed",
//             merge_fields: {
//                 FNAME: getUserFirstName,
//                 LNAME: getUserLastName
//             }

// });
// console.log(response4);

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: "2dc84b7992ec2366df949d6e83608176-us21",
    server: "us21",
});

const run = async () => {
    const response4 = await mailchimp.lists.addListMember("76bfc14b95", {
        email_address: getUserEmailAddress,
                status: "subscribed",
                merge_fields: {
                    FNAME: getUserFirstName,
                    LNAME: getUserLastName
                }
    
    });
    //console.log(response4);
    
};
run();
console.log("New User has successfully signed up whose First Name is "+getUserFirstName +" and Last Name is "+ getUserLastName +" . His email address is "+ getUserEmailAddress);
res.sendFile(__dirname + "/success.html");






// var data = {
//     members : [
//         {
//             email_address: getUserEmailAddress,
//             status: "subscribed",
//             merge_fields: {
//                 FNAME: getUserFirstName,
//                 LNAME: getUserLastName
//             }
//         }
//     ]

// };

// var jsonData = JSON.stringify(data);

// const url = "https://us21.api.mailchimp.com/3.0/76bfc14b95";

// const options = {
// method : "POST",
// auth: "faysal00:2dc84b7992ec2366df949d6e83608176-us21"
// };

// const request = https.request(url, options, function (response) {
//     if (response.statusCode === 200 ) {
//         res.sendFile(__dirname + "/success.html");
//     }
//     else {
//         res.sendFile(__dirname + "/failure.html");
//     }
//     response.on("data", function (data) {
//         console.log("JSON DATA"+JSON.parse(data));
//     });
// });
    
// request.write(jsonData);
// request.end;
// // logging user input inside our console log in command prompt
// console.log(getUserFirstName, getUserLastName, getUserEmailAddress);
// });



    
});
    
app.post("/success", function (req, res) {
    res.redirect("/");
});


/*After this code we have literally just built our very first own server
this is the barebone of any express server.the callback function will give 
us feedback to verify whether the server is running or not. 
also process.env.port has been written when we upload our files to an external server
then this code will help our file to identify and use the available any random port 
on that particular external server company.*/

app.listen( process.env.PORT || 3000, function () {

    console.log("Server has started running at port 3000. This is a test message.");
    
});




/**These following codes have been copied from Mailchimp and the website is
 * https://mailchimp.com/developer/marketing/guides/quick-start/
 * These codes will check whether we are properly connected with the mailchimps server or not.
 * If we are successfully connected then it will give us response back as 
 *  * { "health_status": "Everything's Chimpy!"}
 */
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "2dc84b7992ec2366df949d6e83608176-us21",
  server: "us21",
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);

}

run();
  


// /** This code has been generated from
//  * https://mailchimp.com/developer/marketing/api/lists/get-lists-info/
//  * get/list section
//  */
//   const response2 = await mailchimp.lists.getAllLists();
//   console.log(response2);

//   /**This code has been generated from
//    * https://mailchimp.com/developer/marketing/api/lists/get-list-info/
//    * GET/lists/{list_id} section
//    * this id is generated from our mailchimp account audience list id which is
//    * 76bfc14b95
//    */
//   const response3 = await mailchimp.lists.getList("76bfc14b95");
//   console.log(response3);

//   /**This code has been generated from
//   * https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/
//   * add members to the list section
//   *  this id is generated from our mailchimp account audience list id which is
//    * 76bfc14b95
//  */

//   const response4 = await mailchimp.lists.addListMember("76bfc14b95", {
//             email_address: "dtuewecvkgfet@gmail.com",
//             status: "subscribed",

//             merge_fields: {
//                 FNAME: "brofdnk",
//                 LNAME: "getfgduin",
//                 ADDRESS: {
//                     addr1: "124534 avenue",
//                     city: "atlanta",
//                     state: "goergia",
//                     zip: "1234"

//                 },
//             },
            
//           });
//           console.log(response4);

//           const response5 = await mailchimp.lists.getListMembersInfo("76bfc14b95");
//   console.log(response5);
  






// /**This code has been generated from
//  * https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/
//  * add members to the list section
//  */
// async function addNewMembers() {
//     const response4 = await mailchimp.lists.addListMember("76bfc14b95", {
//         email_address: "Brekke@gmail.com",
//         status: "pending",
        
//       });
//       console.log(response4);
    
// }

// addNewMembers();

