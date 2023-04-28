import mongoose from 'mongoose';

const connection = mongoose.createConnection('mongodb+srv://Dani:Dan11111@cluster0.acsdqeu.mongodb.net/AlerChef?retryWrites=true&w=majority').on('open', () => {
    console.log("connect")
}).on('error', () => {
    console.log('error')
})

export default connection;
