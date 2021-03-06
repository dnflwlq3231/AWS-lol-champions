'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const { CHAMP_NAME, CHAMP_POSITION, TIER } = JSON.parse(event.body);

    const params = {
        TableName: "LOL_CHAMPION_LIST",
        Item: {
            CHAMP_NAME: CHAMP_NAME,
            CHAMP_POSITION: CHAMP_POSITION,
            TIER: TIER
        }
    };

    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    }   catch (err) {
        responseBody = `Unable to put produt: ${err}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: responseBody
    };

    return response;
};