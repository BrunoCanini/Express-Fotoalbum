module.exports = function(err, req, res, next){

    res.format({
        json: () =>{
            res.status(500).json({
                message:"Ops, qualcosa è andato storto",
                error: err.message
            })
        },
        default: ()=>{
            res.status(500).send("<h1>Ops, qualcosa è andato storto</h1>")
        }
    })
}