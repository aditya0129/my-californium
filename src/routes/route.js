const express = require('express');
const router = express.Router();
const intro = require('./introduction')
const employee = require('./employee')
const _ = require('underscore')
const _l = require('lodash')
const _t = require('lodash')
const _u = require('lodash')
const _f = require('lodash')


const introduction=require('../logger/logger')
const currentdate=require('../util/helper')
const currentmonth=require('../util/helper')
const todayinfo=require('../util/helper')
const lowercaset=require('../validator/formatter')
const uppercaset=require('../validator/formatter')

router.get('/test-me', function (req, res) {
    console.log("email from introduction module", intro.myEmail)
    intro.myFunction('Sabiha')
    //introduction.intro('Aditya')
    console.log("email from employee module", employee.myEmail)
    

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let result = _.first(days, 4)
    console.log(`Result from underscore function is ${result}`)

    introduction.intro('Aditya')
    currentdate.Date()
    currentmonth.month()
    todayinfo.info('Californium','W3D4','Today')
    lowercaset.lowercase('ADITYA')
    uppercaset.uppercase('aditya')
    console.log(_l.chunk(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], 3));
    const odd=[1,3,5,7,9,11,13,15,17,18];
    console.log(_t.tail(odd));
    //const arr =([1,2],[2,3],[5,4],[3,4],[6,3])
    console.log(_u.union([1,2],[2,3],[5,4],[3,4],[6,3]));
    console.log(_f.fromPairs([['horror','The Shining'],['drama','Titanic'],['thriller','Shutter Island'],['fantasy','Pans Labyrinth']
]));






    res.send('any dummy text')
});


router.get('/test-you', function(req, res){
    console.log("I am here")
    res.send("very important text")
})
// router.get('/movies', function(req, res){
//  const arr=['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
//  res.sand(arr)
// })


module.exports = router;