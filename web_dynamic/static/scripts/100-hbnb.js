$(document).ready(() => {
  const newAmenity = {};
  const newState = {};
  const newCity = {};
  const stateCity = {};

  const validateCheckbox = (selector, diccionario, selectorMostrar, merge = null) => {
    $(selector).change(function () {
      if ($(this).prop('checked')) {
        diccionario[$(this).attr('data-id')] = $(this).attr('data-name');
        if (merge !== null) {
          merge[$(this).attr('data-id')] = $(this).attr('data-name');
        }
      } else {
        delete diccionario[$(this).attr('data-id')];
        if (merge !== null) {
          delete merge[$(this).attr('data-id')];
        }
      }
      if (merge !== null) {
        $(selectorMostrar).text(Object.values(merge).join(', '));
      } else {
        $(selectorMostrar).text(Object.values(diccionario).join(', '));
      }
    });
  };
  // change checkbox of amenity
  validateCheckbox('.amenities li :checkbox', newAmenity, '.amenities h4');
  // change checkbox of state
  validateCheckbox('h2 :checkbox', newState, '.locations h4', stateCity);
  // change checkbox of city
  validateCheckbox('.cities :checkbox', newCity, '.locations h4', stateCity);

  const url = 'http://127.0.0.1:5001/api/v1/status';
  $.get(url, (data) => {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  const plural = (element) => {
    return element !== 1 ? 's' : '';
  };
  $('.filters button').click(() => {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(newAmenity), states: Object.keys(newState), cities: Object.keys(newCity) })
    }).done((data) => {
      $('section.places').empty();
      for (const place of data) {
        let template = '';
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
  // Agregando triger para que pueda ser mostrado los places al ser cargado el DOM
  $('.filters button').trigger('click');
});
