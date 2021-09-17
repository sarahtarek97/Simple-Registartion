const rules = require("../../../enum/rules");
const adminPolicy = require('./adminPolicy');
const userPolicy = require('./userPolicy');
//const superAdminPolicy = require('./superAdminPolicy');

const opts = {
    [rules.ADMIN]:{
      can:  adminPolicy
    },
    [rules.USER]:{
       can: userPolicy
    },
    //[rules.SUPERADMIN]:{
    //   can: superAdminPolicy
    //},
};

module.exports = opts;