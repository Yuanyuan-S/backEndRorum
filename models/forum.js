"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

var forumSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Forum", forumSchema);
