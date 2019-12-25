// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-northeast-2'});

// Create the DynamoDB service object
let champ = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  AttributeDefinitions: [
    {
      AttributeName: 'CHAMP_NAME',
      AttributeType: 'S'
    },
    {
      AttributeName: 'CHAMP_POSITION',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'CHAMP_NAME',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'CHAMP_POSITION',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 5
  },
  TableName: 'LOL_CHAMPION_LIST',
  StreamSpecification: {
    StreamEnabled: false
  }
};

// Call DynamoDB to create the table
champ.createTable(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});
