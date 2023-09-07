import {connect} from 'mongoose'

export const ConnectDB =async ()=>{
    try {
       await connect(process.env.MONGODB_URI!,{
        serverSelectionTimeoutMS:10000
    }).then(()=>{
         console.log(`MongoDB Connection Succeeded.`)
    }).catch((error)=>{
        console.log('Error in DB connection: ' + error)
        process.exit()
    })
    } catch (error) {
        console.log('Error in DB connection: ' + error)
        process.exit()
    }
    

}