const config = require('config');
/**
 * Verify webhook token
 * @param {*} req
 * @param {*} res
 */
const verifyWebhook = (req, res) => {
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = config.get('VERIFY_STRING');

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];


    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            console.log('WEBHOOK_UNVALID');
            res.sendStatus(403);
        }

    }else {
        // Responds with '403 Forbidden' if verify tokens do not match
        console.log('REQUEST_UNVALID');
        res.sendStatus(403);
    }
};

  module.exports = verifyWebhook;