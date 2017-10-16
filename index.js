var oauth = ""

$(document).ready(function() {
	resetTable();
});

function submitForm() {
	const searchQuery = $("#searchQuery").val();
	resetTable();

	requestSearch = $.ajax({
		type: 'GET',
		url: 'https://api.spotify.com/v1/search',
		dataType: 'json',
		headers: {
			"Authorization": "Bearer " + oauth
		},
		data: {
			"q": searchQuery,
			"type": "track"
		},
		success: function(response) {
			Promise.resolve(response);
		}
	});

	Promise.resolve(requestSearch)
	.then(function(response) {
		const results = response["tracks"]["items"];

		results.forEach(function(track) {
			const trackName = track["name"];
			const artists = track["artists"];

			var trackArtists = "";
			artists.forEach(function(artist) {
				trackArtists += artist["name"] + "<br/>"
			});

			var trackURL = track["external_urls"]["spotify"];
			console.log(trackURL);
			var linkHTML = "<a target='_blank' href='" + trackURL + "'>Link</a>"

			var tableBody = $("#resultsTable tbody");
			tableBody.append($('<tr>')
				.append($('<td>').text(trackName))
				.append($('<td>').html(trackArtists))
				.append($('<td>').html(linkHTML))
			);
		});

		$("#resultsTable").show();
	});
}

function resetTable() {
	$("#searchQuery").val("");
	$("#resultsTable tbody tr").remove();
	$("#resultsTable").hide();
}
