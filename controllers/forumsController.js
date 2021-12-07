"use strict";

const Forum = require("../models/forum"),
  getForumParams = body => {
    return {
      title: body.title,
      content: body.content
    };
  };

module.exports = {
  index: (req, res, next) => {
    Forum.find()
      .then(forums => {
        res.locals.forums = forums;
        next();
      })
      .catch(error => {
        console.log(`Error fetching forums: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("forums/index");
  },

  new: (req, res) => {
    res.render("forums/new");
  },

  create: (req, res, next) => {
    let forumParams = getForumParams(req.body);
    Forum.create(forumParams)
      .then(forum => {
        res.locals.redirect = "/forums";
        res.locals.forum = forum;
        next();
      })
      .catch(error => {
        console.log(`Error saving forum: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let forumId = req.params.id;
    Forum.findById(forumId)
      .then(forum => {
        res.locals.forum = forum;
        next();
      })
      .catch(error => {
        console.log(`Error fetching forum by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("forums/show");
  },

  edit: (req, res, next) => {
    let forumId = req.params.id;
    Forum.findById(forumId)
      .then(forum => {
        res.render("forums/edit", {
          forum: forum
        });
      })
      .catch(error => {
        console.log(`Error fetching forum by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let forumId = req.params.id,
      forumParams = getForumParams(req.body);

    Forum.findByIdAndUpdate(forumId, {
      $set: forumParams
    })
      .then(forum => {
        res.locals.redirect = `/forums/${forumId}`;
        res.locals.forum = forum;
        next();
      })
      .catch(error => {
        console.log(`Error updating forum by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let forumId = req.params.id;
    Forum.findByIdAndRemove(forumId)
      .then(() => {
        res.locals.redirect = "/forums";
        next();
      })
      .catch(error => {
        console.log(`Error deleting forum by ID: ${error.message}`);
        next();
      });
  }
};
