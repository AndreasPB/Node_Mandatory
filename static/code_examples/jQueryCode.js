$(document).ready( () => {
    $('#clear_button').click( () => $('#data_table tbody tr').remove());
    $('#columns_button').click( () => {
        $('#data_table tbody tr').remove();
        let tableColumns = $('#columns_dropdown').val();