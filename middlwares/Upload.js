const multer = require('multer')

//Config Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file)
        cb(null, 'public/images') // cb('ERROR_OBJECT', 'DESTINATION')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '.' + file.mimetype.split('/')[1]) // cb('ERROR_OBJECT', 'FILE_NAME')
    }
})

module.exports = multer({ storage }) // ({ storage: storage })

// console.log(req.file)
// {
//     fieldname: 'profilePic',
//     originalname: '11-2-minecraft-diamond-png.png',
//     encoding: '7bit',
//     mimetype: 'image/png',
//     destination: 'public/images',
//     filename: '4901b7cb5b669ef42a15e5d307218c73',
//     path: 'public\\images\\4901b7cb5b669ef42a15e5d307218c73',
//     size: 3100
//   }