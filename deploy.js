const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();
const path = require("path");
const fs = require('fs');

// 优先读取本地配置文件 ftp.config.js (已被 gitignore)
// 如果不存在，则尝试从环境变量读取
let config = {};
const localConfigPath = path.join(__dirname, 'ftp.config.js');

if (fs.existsSync(localConfigPath)) {
    console.log('正在使用本地配置文件 ftp.config.js');
    config = require(localConfigPath);
} else {
    console.log('未找到本地配置文件，尝试使用环境变量或默认值');
    config = {
        user: process.env.FTP_USER || "ftp_user",
        password: process.env.FTP_PASSWORD || "ftp_password",
        host: process.env.FTP_HOST || "ftp_host",
        port: process.env.FTP_PORT || 21,
        localRoot: __dirname + "/dist/build/h5/",
        remoteRoot: process.env.FTP_REMOTE_ROOT || "/lmzf/",
        include: ["*", "**/*"],      // this would upload everything except dot files
        deleteRemote: false,        // delete ALL existing files at destination before uploading, if true
        forcePasv: true,            // Passive mode is forced (EPSV command is not sent)
        sftp: false                 // use sftp or ftp
    };
}

console.log("正在开始上传文件到 FTP 服务器...");
console.log(`目标主机: ${config.host}`);
console.log(`远程路径: ${config.remoteRoot}`);

ftpDeploy
    .deploy(config)
    .then((res) => {
        console.log("上传完成！");
        console.log("共上传文件数:", res.length || res); // res is array of filenames
    })
    .catch((err) => {
        console.error("上传失败:", err);
    });

ftpDeploy.on("uploading", function (data) {
    console.log(`正在上传 (${data.transferredFileCount}/${data.totalFilesCount}): ${data.filename}`);
});

ftpDeploy.on("uploaded", function (data) {
    console.log(`已完成: ${data.filename}`);
});

ftpDeploy.on("log", function (data) {
    console.log(data);
});
