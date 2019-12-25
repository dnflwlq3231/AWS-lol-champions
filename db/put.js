'use strict';
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handle = function(e, ctx, callback) {
    var params = {
        TableName: "LOL_CHAMPION_LIST",
        Item: {
            CHAMP_NAME: e.CHAMP_NAME,
            CHAMP_POSITION: e.CHAMP_POSITION,
            TIER: e.TIER
        }
    };

    docClient.put(params, function(err, data) {
        if(err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};
