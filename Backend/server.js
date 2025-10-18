require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(errorHandler);

app.use('/api/auth', authRouter);
app.use("/api/groups", groupRoutes);


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
