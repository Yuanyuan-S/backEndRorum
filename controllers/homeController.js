"use strict";

module.exports = {
  index: (req, res) => {
    res.render("index");
  },
 
  rules: (req, res) => {
    res.render("rules");
  }
};
