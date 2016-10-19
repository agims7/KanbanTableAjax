var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '86',
    'X-Auth-Token': '8e2b17a95f0c368f4710f343a48191cc'
};

$.ajaxSetup({
    headers: myHeaders
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function (response) {
        setupColumns(response.columns);
    }
});

function setupColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        board.createColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
    cards.forEach(function (card) {
        var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
        col.createCard(card);
    })
}

var day = document.getElementById('day');
day.innerHTML = moment().format('MMMM Do YYYY');
/*
var dogRocky = new Column('Dog Rocky');
var catAmanda = new Column('Cat Amanda');
var dogLucky = new Column('Dog Lucky');

board.addColumn(dogRocky);
board.addColumn(catAmanda);
board.addColumn(dogLucky);

var card1 = new Card('Vaccination for rabies');
var card2 = new Card('Blood test');
var card3 = new Card('Deworming');
var card4 = new Card('Monthly control');

dogRocky.addCard(card1);
catAmanda.addCard(card2);
dogLucky.addCard(card3);
dogLucky.addCard(card4);
*/