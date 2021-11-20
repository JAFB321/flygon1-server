const mongoose = require('mongoose');

const { Schema } = mongoose;

const config = {
    user: "admin",
    pass: "admin",
    dbName: "flygon-db"
};


// await mongoose.connect(`mongodb+srv://jafb321:12345@cluster0.umtlf.mongodb.net/flygon-db?retryWrites=true&w=majority`);
mongoose.connect(`mongodb+srv://${config.user}:${config.pass}@cluster0.umtlf.mongodb.net/${config.dbName}?retryWrites=true&w=majority`);
//  `mongodb+srv://jafb321:12345@cluster0.umtlf.mongodb.net/flygon-db?retryWrites=true&w=majority`
// const salonSchema = new Schema({
//     nombre: String,
//     alumnos: [
//         {
//             expediente: String,
//             nombre: String,
//             ultimaLectura: {
//                 timestamp: Date,
//                 temp: Number,
//                 ox: Number,
//                 bpm: Number,
//             },
//             lecturas: [
//                 {
//                     timestamp: Date,
//                     temp: Number,
//                     ox: Number,
//                     bpm: Number,
//                 }
//             ]
//         }
//     ]
// });

const alumnoSchema = new Schema({
    expediente: String,
    nombre: String,
    ultimaLectura: {
        timestamp: Date,
        temp: Number,
        ox: Number,
        bpm: Number,
    },
    lecturas: [
        {
            timestamp: Date,
            temp: Number,
            ox: Number,
            bpm: Number,
            salon: String
        }
    ]
});
mongoose.model('alumno', alumnoSchema, 'alumnosTest');



// const salon  = 
// const salon = mongoose.model('salon');

const alumno  = () => {
    return mongoose.model('alumno');
}

module.exports = {
    DBalumno: alumno
}