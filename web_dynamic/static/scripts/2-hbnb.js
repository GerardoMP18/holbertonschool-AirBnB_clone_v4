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
});
