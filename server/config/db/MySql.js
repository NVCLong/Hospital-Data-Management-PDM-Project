var mysql = require('mysql')

var connect = mysql.createConnection({
    host: '::1',
    user: 'long-user',
    password: 'usbw',
    port: 3306,
    database: 'test'
})

connect.connect(
    (error)=>{
        if(error ){
            console.log(error)
        }
        else{
            console.log("connect succefully")
            var sql='DELETE FROM jokes_table WHERE JokeID=10'
            connect.query(sql, (err, result)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log(result)
                    console.log("Them  data thanh cong")
                }
            })
        }
    }
);