$.ajax({
    type: "GET",
    url: "http://localhost:8080/api/data",
    dataType: "json",
    success: function (response, status, xhr) {
        $.each(response, function(i, data) {
            if (i >= tableColumns) return false;
            let $tr = $('<tr>').append(
            $('<td>').text(data.id),
            $('<td>').text(data.first_name),
            $('<td>').text(data.last_name),
            $('<td>').text(data.email),
            ).appendTo('#data_table', 'tbody');