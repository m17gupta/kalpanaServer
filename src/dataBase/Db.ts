import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://devmanishgupta17:Matrix17086@cluster0.hr6as.mongodb.net/kalpanaData?retryWrites=true&w=majoritya')
       
;
       // console.log('MongoDB connected...');
    } catch (err) {
       // console.error("erroro",err);
        process.exit(1);
    }
};

export default connectDB;