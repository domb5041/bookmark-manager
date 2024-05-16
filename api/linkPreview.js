// https://www.npmjs.com/package/link-preview-js
// https://vercel.com/docs/frameworks/vite#serverless-functions

var linkPreview = require("link-preview-js");

module.exports = (req, res) => {
    linkPreview
        .getLinkPreview(req.query.url)
        .then((data) => res.json(data))
        .catch((err) => {
            console.log(err);
            return res.status(500).send(err);
        });
};
