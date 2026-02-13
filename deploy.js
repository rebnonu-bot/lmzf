const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();
const path = require("path");

// 建议将敏感信息放在环境变量或外部配置文件中
// 这是一个配置模板，请根据您的 FTP 账号信息进行修改
const config = {
    user: "your-ftp-username", // 您的 FTP 账号
    password: "your-ftp-password", // 您的 FTP 密码
    host: "your-ftp-host", // 您的 FTP 服务器地址
    port: 21,
    localRoot: path.join(__dirname, "dist/build/h5"),
    remoteRoot: "/lmzf/", // 远程服务器上的目标目录，会自动创建 lmzf 文件夹
    include: ["*", "**/*"],      // 包含所有文件
    exclude: [],                  // 排除的文件
    deleteRemote: false,          // 是否在上传前删除远程目录下的文件
    forcePasv: true,              // 是否强制使用被动模式
    sftp: false,                  // 如果是 SFTP 请设置为 true
};

console.log("正在开始上传文件到 FTP 服务器...");

ftpDeploy
    .deploy(config)
    .then((res) => {
        console.log("上传完成！");
        console.log("共上传文件数:", res);
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
