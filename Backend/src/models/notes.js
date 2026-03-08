import moongose,{Schema} from 'mongoose'

const noteSchema=new Schema({   
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
},{
    timestamps:true
})
const Note=moongose.model('Note',noteSchema)

export  {Note} 