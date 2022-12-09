function currentdate(){
    console.log(new Date());
}
function month(){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date();
    let month = months[d.getMonth()];
    console.log(month)
    
}
 
function getBatchInfo(batch_name, week, Day){
    console.log(`${batch_name}, ${week}, the topic for ${Day} is Nodejs module system
    `);

}

module.exports.Date=currentdate
module.exports.month=month
module.exports.info=getBatchInfo