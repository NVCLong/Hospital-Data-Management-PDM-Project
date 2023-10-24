


class SiteController{
    //[GET]  /
    homepage(req,res){
        res.status(200).json({success:true,
        msg: 'This is home page'}
        )
    }
}

module.exports= new SiteController();