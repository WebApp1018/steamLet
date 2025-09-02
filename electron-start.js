// electron-start.js
const { spawn } = require("child_process");

const reactStart = spawn("npm", ["start"], { shell: true, stdio: "inherit" });

// Delay electron start until React dev server is running
setTimeout(() => {
    const electron = require("electron");
    const { spawn } = require("child_process");

    spawn(electron, ["public/electron.js"], { shell: true, stdio: "inherit" });
}, 8000);
