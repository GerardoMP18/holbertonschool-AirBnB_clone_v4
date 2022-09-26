$(document).ready(() => {
  const newAmenity = {};
  $('li :checkbox').change(function () {
    if ($(this).prop('checked')) {
      newAmenity[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete newAmenity[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(newAmenity).join(', '));
  });
  const url = 'http://127.0.0.1:5001/api/v1/status';
  $.get(url, (data) => {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  // Envía una solicitud POST con Content-Type: application/json
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({})
  }).done((data) => {
    for (const place of data) {
      let template = '';
      const plural = (element) => {
        return element !== 1 ? 's' : '';
      };
      template += '<article>';
      template += '  <div class="title_box">';
      template += '    <h2>' + place.name + '</h2>';
      template += '    <div class="price_by_night">' + '$' + place.price_by_night + '</div>';
      template += '  </div>';
      template += '  <div class="information">';
      template += '    <div class="max_guest">' + place.max_guest + ' Guest' + plural(place.max_guest) + '</div>';
      template += '    <div class="number_rooms">' + place.number_rooms + ' Bedroom' + plural(place.number_rooms) + '</div>';
      template += '    <div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + plural(place.number_bathrooms) + '</div>';
      template += '  </div>';
      template += '    <div class="user">';
      template += '    </div>';
      template += '    <div class="description">' + place.description + '</div>';
      template += '  </div>';
      template += '</article>';
      $('section.places').append(template);
    }
  });
});
