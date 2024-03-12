const path = require('path');
const { v4: uuidv4 } = require('uuid');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;

        const nombreCortado = file.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        //Validar extencion
        if (!extensionesValidas.includes(extension)) {
            return reject(
                `La extension ${extension} no es permitida, ${extensionesValidas}.`
            );
        }

        const nombreTemp = uuidv4() + "." + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        file.mv(uploadPath, (err) => {
            if (err)
                return reject(err);

            resolve(nombreTemp);
        });
    });
}

const subirArchivoCloudinary = async (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {
    return new Promise(async (resolve, reject) => {
        const { file } = files;

        const nombreCortado = file.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        if (!extensionesValidas.includes(extension)) {
            return reject(
                `La extension ${extension} no es permitida, ${extensionesValidas}.`
            );
        }

        const { tempFilePath } = file;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        resolve(secure_url);
    });
}

module.exports = {
    subirArchivo,
    subirArchivoCloudinary
};