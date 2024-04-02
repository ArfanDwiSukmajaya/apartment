const app = require("./app/index");
const port = process.env.PORT;

app.listen(port, () => {
    console.log("Server Running on Port ", port);
});
