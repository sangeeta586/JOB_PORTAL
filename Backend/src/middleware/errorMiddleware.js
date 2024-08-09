
export const errorMiddleware = (err,req,res,next) => {
    res.status(500).send({
        message : "Somthing wnet wrong",
        success : false,
        err
    })
}