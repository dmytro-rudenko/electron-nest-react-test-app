const { app, BrowserWindow, protocol } = require("electron");
const path = require("path");

const filesPath = path.join(__dirname, "./react-app/build");
const indexPath = path.join(__dirname, "./react-app/build/index.html");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile(indexPath);
};

app.whenReady().then(() => {
  protocol.interceptFileProtocol(
    "file",
    (request, callback) => {
      const url = request.url.replace("file:///", "");

      let normalPath;

      if (url.includes("static")) {
        normalPath = path.normalize(`${filesPath}/${url}`);
      } else {
        normalPath = path.normalize(url);
      }

      callback({ path: normalPath });
    },
    (err) => {
      if (err) console.error("Failed to register protocol");
    }
  );

  app.on("web-contents-created", (event, contents) => {
    contents.on("will-navigate", (event, navigationUrl) => {
      // Handle hash routing
      const parsedUrl = new URL(navigationUrl);
      if (parsedUrl.hash && parsedUrl.hash.length > 1) {
        event.preventDefault();
        const hashPath = parsedUrl.hash.substring(1); // Remove the '#' character
        contents.loadFile(path.join(filesPath, "index.html"), { hash: hashPath });
      }
    });
  });

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});