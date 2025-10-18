require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');
const groupRoutes = require('./routes/groups');
const userRoutes = require('./routes/users');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use(cors())

app.use('/api/auth', authRouter);
app.use("/api/groups", groupRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

startServer();
