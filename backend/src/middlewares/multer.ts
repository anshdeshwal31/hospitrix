import multer from "multer"
import { Request } from "express"

const storage = multer.diskStorage({
    destination : function(req:Request, file:Express.Multer.File,cb :(error: Error | null, destination: string) => void
    ){
        return cb(null,"./uploads")
    },
    filename: function (req:Request,file:Express.Multer.File , cb: (error: Error | null, filename: string) => void):void{
        cb(null, file.originalname)
    }
})

export const upload = multer({storage})
