import mongoose from 'mongoose'

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB)
    console.log('MongoDB connected!')
  } catch (error) {
    console.log('MongoDB disconnected!')
    throw error;
  }
}

export const disconnection = mongoose.connection.on('disconnected', () =>
  console.log('Disconnected to MongoDB!')
)
// export const connection = mongoose.connection.on('connected', () =>
//   console.log('Connected to MongoDB!')
// )
