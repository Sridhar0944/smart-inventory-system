const bcrypt = require("bcrypt");

async function hashPassword() {
  const password = "Sridhar@0944";

  const hash = await bcrypt.hash(password, 10);

  console.log(hash);
}

hashPassword();