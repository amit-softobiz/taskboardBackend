// Connect to MongoDB
const connection=mongoose.connect('mongodb://localhost:27017/tasks', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

export default connection;