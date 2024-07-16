import { adminBot, userBot } from "./api/telegraf";
import env from "./config/env";
import app from "./s-config";

userBot
  .launch()
  .then(() => {
    console.log(`User bot is running on port ${env.PORT}`);
  })
  .catch((error) => {
    console.error("Error launching the user bot:", error);
  });

adminBot
  .launch()
  .then(() => {
    console.log("Admin bot is running");
  })
  .catch((error) => {
    console.error("Error launching the admin bot:", error);
  });

app.listen(env.PORT || 8080, () => {
  console.log(`Server is running on port ${env.PORT}🔥🔥`);
});

app.use("*", (req, res) => {
  res.status(200).send({ message: "I'm your server" });
});
