import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    cat: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('post', PostSchema)
