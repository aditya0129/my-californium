const express = require('express');
const router = express.Router();
const intro = require('./introduction')
const employee = require('./employee')
const _ = require('underscore')
const mentorModule = require('../abc/xyz/myModule'); 
const req = require('express/lib/request');
const { route } = require('express/lib/application');


router.get("/profile-details", function(req, res){
    // Write the LOGIC here
    res.send('dummy response')
})

router.get('/test-me', function (req, res) {
    console.log("email from introduction module", intro.myEmail)
    intro.myFunction('Sabiha')
    console.log("email from employee module", employee.myEmail)

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let result = _.first(days, 4)
    console.log(`Result from underscore function is ${result}`)
    console.log(`The mentor of the day is ${mentorModule.mentor}`)

    res.send('any dummy text from route handler 1')
});


router.get('/test-me', function(req, res){
    console.log("I am here")
    res.send("any dummy text from route handler 2")
})

router.get('/students', function (req, res){
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})

// PATH Param example
router.get('/student-details/:name', function(req, res){
    /*
    params is an attribute inside request that contains 
    dynamic values.
    This value comes from the request url in the form of an 
    object where key is the variable defined in code 
    and value is what is sent in the request
    */

    let requestParams = req.params

    // JSON strigify function helps to print an entire object
    // We can use many ways to print an object in Javascript, JSON stringify is one of them
    console.log("This is the request "+ JSON.stringify(requestParams))
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    
    res.send('Dummy response')
})

// PATH Param example
router.get("/profile/:name", function(req, res){
    console.log('Printing the request to find out wjere name is stored',req.params)
    console.log('user name is',req.params.name)
    //console.log(`User requesting for profile is ${name}`)
    res.send("dummy details")
})

// Query Param example
router.get("/shoes", function(req, res){
    console.log("The filter options for shoes are -",req.query)
    //req.query.size
    //req.query.brand
    res.send("dummy shoes response")
})
// Assignment
router.get("/test-movies", function(req, res){
    const movies = ["3Idiots","12thMan","Tenet","Avtar","Bahubali"]
    console.log("movie is printing here");
    res.send("My favourite movies are : "+ movies)
})

router.get("/movies/:indexNumber", function(req, res){
    const movies = ["3Idiots","12thMan","Tenet","Avtar","Bahubali"]
    if(req.params.indexNumber > 4){
        res.send("The index that you given is not available")
    }
    res.send(movies[req.params.indexNumber])
})

router.get("/film-details", function(req, res){
    const movieDetails = [
        {
            "id" : 1,
            "name" : "Dasvi"
        },
        {
            "id" : 2,
            "name" : "KGF-Chapter2"
        },
        {
            "id" : 1,
            "name" : "Pushpa"
        },
        {
            "id" : 1,
            "name" : "12thMan"
        }
    ]
    res.send(movieDetails)
})

router.get("/film/:filmId", function(req, res){
    const movieDetails = [
        {
            "id" : 1,
            "name" : "Dasvi"
        },
        {
            "id" : 2,
            "name" : "KGF-Chapter2"
        },
        {
            "id" : 3,
            "name" : "Pushpa"
        },
        {
            "id" : 4,
            "name" : "12thMan"
        }
    ]
    if(req.params.filmId > 4){
        res.send("No movie exists with this id ")
    }
    res.send(movieDetails[req.params.filmId-1])
})

module.exports = router;

module.exports = router;