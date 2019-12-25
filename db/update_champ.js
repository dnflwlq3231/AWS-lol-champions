'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const {CHAMP_NAME, CHAMP_POSITION, TIER} = JSON.parse(event.body);

    const params = {
        TableName: "LOL_CHAMPION_LIST",
        Key: {
            CHAMP_NAME: CHAMP_NAME,
            CHAMP_POSITION: CHAMP_POSITION
        },
        UpdateExpression: "set TIER = :t" ,            
        ExpressionAttributeValues: {
            ":t": TIER
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    }   catch (err) {
        responseBody = `Unable to update produt: ${err}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*"
        },
        body: responseBody
    };

    return response;
};