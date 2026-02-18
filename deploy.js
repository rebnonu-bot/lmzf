const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();
const path = require("path");

// 建议将敏感信息放在环境变量或外部配置文件中
// 这是一个配置模板，请根据您的 FTP 账号信息进行修改
const config = {
  user: "ftp_user",
  password: "ftp_password",
  host: "ftp_host",
  port: 21,
  localRoot: __dirname + "/dist/build/h5/",
  remoteRoot: "/lmzf/",
  include: ["*", "**/*"],      // this would upload everything except dot files
  deleteRemote: false,        // delete ALL existing files at destination before uploading, if true
  forcePasv: true,            // Passive mode is forced (EPSV command is not sent)
  sftp: false                 // use sftp or ftp
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
