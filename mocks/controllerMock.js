module.exports = (req, res) => {
    res.status(200).send({
        'Method': req.method,
        'Router': req.baseUrl,
        'Path': req.path,
        'Query': req.query,
    });
};