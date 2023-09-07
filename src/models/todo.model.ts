import {Schema,model} from "mongoose";
import { Itodos } from "../../@types/todo.model";
// Erase if already required

// Declare the Schema of the Mongo model
var todoSchema = new Schema<Itodos>({
    todo:{
        type:String,
        required:true,
        index:true,
    },
    IsDone:{
        type:Boolean,
        default:false
    },
    
},{
    timestamps:true
});

//Export the model
export const TodoModel = model<Itodos>('Todo', todoSchema);