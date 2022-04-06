const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });

exports.handler = (event, context, callback) => {
    let connect = new AWS.Connect();
    
    const customerName = event.name;
    const customerPhoneNumber = event.number;
    let params = {
        "InstanceId" : '6575e0ac-684a-463b-9157-aa890623ae2f',
        "ContactFlowId" : '29b62825-6cda-4431-9e3b-1c998d3ff259',
        "SourcePhoneNumber" : '+18006218041',
        "DestinationPhoneNumber" : customerPhoneNumber,
        "Attributes" : {
            'name' : customerName,
            'companyName' : event.companyName,
            'WoNumber' : event.WoNumber,
            'LoadInfo' : event.LoadInfo,
            'PickupDateTime' : event.PickupDateTime,
            'DeliveryDateTime' : event.DeliveryDateTime,
            'StopType' : event.StopType,
            'FacilityName' : event.FacilityName,
            'City' : event.City,
            'State' : event.State
        }
    }

    connect.startOutboundVoiceContact(
        params, function (error, response){
            if(error) {
                console.log(error)
                callback("Error", null);
            } else
            {
                console.log('Initiated an outbound call with Contact Id ' + JSON.stringify(response.ContactId));
                callback(null, 'Success');
            }
        }
    );
};
