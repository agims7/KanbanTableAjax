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

function Column(id, name) {
	var self = this;

	this.id = id;
	this.name = name;
	this.element = createColumn();

	function createColumn() {
		var today = moment().format('LTS');
		var column = $('<div>').addClass('column col-xs-12 col-sm-4 col-md-3');
		var columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var columnDate = $('<p>').addClass('column-date').text(today);
		var columnCardList = $('<ul>').addClass('column-list');
		var columnDelete = $('<button>').addClass('btn-delete').text('x');
		var columnAddCard = $('<button>').addClass('add-card').text('Add service');

		columnDelete.click(function () {
			self.deleteColumn();
		});

		columnAddCard.click(function (event) {
			var cardName = checkPromptValue('Write patient name');
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
					name: cardName,
					bootcamp_kanban_column_id: self.id
				},
				success: function (response) {
					var card = new Card(response.id, cardName);
					self.createCard(card);
				}
			});
		});

		column.append(columnTitle, columnDate)
			.append(columnDate)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList);

		return column;
	}
}

Column.prototype = {
	createCard: function (card) {
		this.element.children('ul').append(card.element);
	},
	deleteColumn: function () {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function (response) {
				self.element.remove();
			}
		});
	}
};

