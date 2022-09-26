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
});
