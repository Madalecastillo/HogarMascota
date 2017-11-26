// custom bootstrap
jQuery(function() {
  $("a[rel~=popover], .has-popover").popover();
  $("a[rel~=tooltip], .has-tooltip").tooltip();
});

// to open notifications
function createNotif(type, text){
  $.notify({
    message: text
  },{
    type: type,
    placement: {
      from: "bottom",
      align: "right"
    },
    offset: 20,
    spacing: 10,
    z_index: 1031,
    delay: 5000,
    timer: 1000,
    animate: {
      enter: 'animated bounceInLeft',
      exit: 'animated bounceOutLeft'
    }
  });
}

// to show and clean errors in forms with ajax
(function($) {

  $.fn.modal_success = function(){
    this.modal('hide');
    this.find('form').trigger("reset");
    this.clear_previous_errors();
  };

  $.fn.render_form_errors = function(errors){
    $form = this;
    this.clear_previous_errors();
    model = this.data('model');
    $.each(errors, function(field, messages){
      $input = $('input[name="' + model + '[' + field + ']"]');
      if ($input.size() < 1){
        $input = $('textarea[name="' + model + '[' + field + ']"]');
        if ($input.size() < 1){
          $input = $('select[name="' + model + '[' + field + ']"]');
        }
      }
      $input.closest('.form-wrapper').append("<p class='help-block'></p>")
      $input.closest('.form-group').addClass('has-error').find('.help-block').html( messages.join(' & ') );
    });
  };

  $.fn.clear_previous_errors = function(){
    $('.form-group.has-error', this).each(function(){
      $('.help-block', $(this)).remove();
      $(this).removeClass('has-error');
    });
  }

}(jQuery));

// handle the sessions for the flash rails messages
flashHandler = function(e, params) {
  switch (params.type) {
    case "success":
      type = "success";
      break;
    case "error":
      type = "danger";
      break;
    case "alert":
      type = "warning";
      break;
    case "notice":
      type = "info";
      break;
  }
  createNotif(type, params.message);
};