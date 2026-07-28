import "dotenv/config";
import app from "./app.js";

const PORT = process.env.SERVER_PORT || 8000;

app.listen(PORT, () => {
  console.log(`App runing on port http://localhost:${PORT}...`);
});
