function checkPromptValue(text) {
    var promptValue = prompt(text)
    while (promptValue === "") {
        alert("Field is empty, please try again");
        promptValue = prompt(text)
    }
    if (!promptValue) {
        throw null;
    }
    return promptValue;
}

var board = {
    name: 'Table Kanban',
    createColumn: function (column) {
        this.element.append(column.element);
        initSortable();
    },
    element: $('#board .column-container')
};

$('.create-column')
    .click(function () {
        var columnName = checkPromptValue('Add patient name');
        $.ajax({
            url: baseUrl + '/column',
            method: 'POST',
            data: {
                name: columnName
            },
            success: function (response) {
                var column = new Column(response.id, columnName);
                board.createColumn(column);
            }
        });
    });

function initSortable() {
    $('.column-list').sortable({
        connectWith: '.column-list',
        placeholder: 'card-placeholder'
    }).disableSelection();
}

$("#sortable").sortable({
    change: function (event, ui) {
        ui.placeholder.css({ visibility: 'visible', border: '1px dotted white', background: 'rgba(183,183,183,0.5)' });
    }
});


$("#sortable").disableSelection();
