var API_URL = 'https://kubw9cltna.execute-api.ap-northeast-2.amazonaws.com/champion/champion'

$(document).ready(function () {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: API_URL,
        success: function (data) {
            $('#entries').html('');
            data.forEach(function(champion) {
                $('#entries').append(
                    '<p>' + champion.CHAMP_NAME + '        ' + champion.CHAMP_POSITION
                        + '        ' +champion.TIER + '</p>'
                );

            })
        }
    });
});

$('#submitButton').on ('click', function () {
    $.ajax({
        type: 'POST',
        url: API_URL,
        // data: JSON.stringify({
        //     "body": "{\"CHAMP_NAME\":\"name\",\"CHAMP_POSITION\":\"posiiton\",\"TIER\":\"tier\"}"
        // }),
        data: JSON.stringify({
            "CHAMP_NAME" : $('#name').val(),
            "CHAMP_POSITION": $('#position').val(),
            "TIER": $('#tier').val()
        }),
        contentType: "application/json",

        success: function (data) {
            console.log('success')
            console.log(data)
            console.log(data == Object)
            location.reload();
        },
        error: function (err) {
            console.log('fail to post' + err)
        }
                
    });
    
    return false;
})