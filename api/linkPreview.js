var linkPreview = require("link-preview-js");

module.exports = (req, res) => {
    linkPreview
        .getLinkPreview(req.query.url)
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
};
