const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());

app.post("/", (req, res) => {
    console.log("GSI Update:", req.body);
    // You can forward this to React using mainWindow.webContents.send(...)
    mainWindow.webContents.send("gsi-update", req.body);
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`GSI server running on port ${PORT}`));
