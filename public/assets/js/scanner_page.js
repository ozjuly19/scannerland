const clipsTableId = '#clips_table';
const datesTableId = '#dates_table';

function changeDate(dateid) {
    loadingSpinnerOn();

    const testicles = $(clipsTableId).find('tbody').html();
    $(clipsTableId).find('tbody').empty();

    // Make a timeout to simulate a server request
    setTimeout(() => {
        $(clipsTableId).find('tbody').html(testicles);
        $(clipsTableId).find('tbody').find('tr').siblings().removeClass('table-primary');
        genericTableEventController(clipsTableId);

        loadingSpinnerOff();
    }, 1000);
}

function genericTableEventController(tableId) {
    // Return just the table body as a jquery object
    var tableBody = $(tableId).find('tbody');
    var rows = tableBody.find('tr');
    for (var i = 0; i < rows.length; i++) {
        var currentRow = rows[i];
        var createClickHandler = function (row) {
            return function () {
                // Convert to jQuery object
                row = $(row);

                // Do other shit like get attribute
                console.log(row.attr('clipid') || row.attr('dateid'))

                // If dateid exists run changeDate(dateid)
                if (row.attr('dateid')) 
                    changeDate(row.attr('dateid'));
                if (row.attr('clipid') || row.attr('dateid'))
                    row.addClass('table-primary').siblings().removeClass('table-primary');
                // window.location.href = url;
            };
        };
        currentRow.onclick = createClickHandler(currentRow);
    }
}

$(document).ready(function () {
    // Setup event listeners on initial load
    genericTableEventController(clipsTableId);
    genericTableEventController(datesTableId);
});
