


class SiteController{
    //[GET]  /
    homepage(req,res){
        res.status(200).json({success:true,
        msg: 'This is home page'}
        )
    }
    showUser(req,res){
        res.status(200).json({success: true});
    }
}

module.exports= new SiteController();