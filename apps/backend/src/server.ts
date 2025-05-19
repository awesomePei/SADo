import connectToMongoDB from "@/db/connect";
import { todoRouter } from "@/routes/todoRoutes";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const app = express();
const port = process.env.PORT || 3001;

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Request Body:", JSON.stringify(req.body, null, 2));
  }
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }'
}));

// Routes
app.use("/api/todos", todoRouter);

connectToMongoDB().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});
