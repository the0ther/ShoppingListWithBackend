$(function() {
	console.log('doc is ready');

	$('form').on('submit', function(evt) {
		evt.preventDefault();
		$.post('/', {
			data: {
				item: $('[name="item"]').val()
			}
		}).done(function() {
			console.log('SUCCESS. ITEM ADDED');
		}).fail(function(err) {
			console.error('error occurred: ', err);
		})
	})

	$.getJSON('/items')
		.done(function(data){
			console.log('got items', data);
			data.forEach(function(item) {
				console.log('item: ', item);
			});
		})
		.fail(function(err) {
			console.error('error occurred: ', err);
		});
});