import multer from "multer";

const storage = multer.diskStorage({
    destination : function (req,file,cb) {cb(null,"./uploads")},
    filename : function (req,file,cb) {
        const uniqueSuffix = Date.now() + "-" + file.fieldname;
        cb(null,uniqueSuffix);
    }
});

export {multer,storage};