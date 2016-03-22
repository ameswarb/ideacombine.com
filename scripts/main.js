jQuery(document).ready(function () {

  $(document).foundation();

  var setContactState = function (state) {

    switch (state) {
      case 'loading':
        $('.contact.loading').show();
        $('.contact.success').hide();
        $('.contact.form').hide();
        $('.contact.form .error').hide();
        break;
      case 'success':
        $('.contact.loading').hide();
        $('.contact.success').show();
        $('.contact.form').hide();
        $('.contact.form .error').hide();
        break;
      case 'error':
        $('.contact.loading').hide();
        $('.contact.success').hide();
        $('.contact.form').show();
        $('.contact.form .error').show();
        break;
      default:
        $('.contact.loading').hide();
        $('.contact.success').hide();
        $('.contact.form').show();
        $('.contact.form .error').hide();
        break;
    }

    return true;
  };

  $('#contact-form').submit(function () {
    event.preventDefault();

    if ($('#contact-form *[data-invalid]').length < 1) {
      setContactState('loading');

      $.ajax({
        url: '//formspree.io/info@ideacombine.com',
        type: 'post',
        dataType: 'json',
        data: $('.contact.form form').serialize(),

        success: function () {
          setContactState('success');
        },

        error: function () {
          // formspree returns a 302 on a successful email for some reason
          setContactState('success');

          // setContactState('error');
        },
      });
    }
  });

});
