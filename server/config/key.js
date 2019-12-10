if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
module.exports = {
  google: {
    clientID:
      "194924959540-9a391ufb2lvt1l8giceiahfrc625kk00.apps.googleusercontent.com",
    clientSecret: "F1-EB6Jizde1Pc-Zx1cDLxuD"
  }
};
