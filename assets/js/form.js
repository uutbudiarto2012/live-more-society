// ---------------
// 
// ---------------
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          form.classList.remove('form-valid')
          event.preventDefault()
          event.stopPropagation()
        } else {
          form.classList.add('form-valid')
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

var ajaxTimeout = 20000
var ajaxRetry = 5
var ajaxRetryInterval = 2000

// ---------------
// AJAX RETRY
// ---------------
$.ajax = (($oldAjax) => {
  // on fail, retry by creating a new Ajax deferred
  function check(a,b,c){
    let shouldRetry = b != 'success' && b != 'parsererror';
    if( shouldRetry && --this.retries > 0 )
      setTimeout(() => { $.ajax(this) }, this.retryInterval || 100)
  }

  return settings => $oldAjax(settings).always(check)
})($.ajax)

// ---------------
// SERIALIZE FORM INTO JSON DATA
// ---------------
$.fn.serializeFormJSON = function () {
  let o = {}
  let a = this.serializeArray()
  $.each(a, function () {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]]
      }
      o[this.name].push(this.value || '')
    } else {
      o[this.name] = this.value || ''
    }
  })
  return o
}
// ---------------
// GET PAGE FILE NAME
// ---------------
var GetPageFileName = function() {
  let url                 = window.location.href
  let url_split           = url.split('/')
  let url_last            = url_split[url_split.length - 1]
  let url_last_split      = url_last.split('?')
  let url_last_split_last = (url_last_split[0] != '') ? url_last_split[0] : 'index.html'

  return url_last_split_last
}

// ---------------
// 
// ---------------
$(document).ready(function() {

  // ---------------
  // FORM IBG
  // ---------------
  $('#form-ibg').on('submit', function(e) {
    e.preventDefault();

    var $form = $('#form-ibg');

    if ($form.hasClass('form-valid')) {
      var url = $form.attr('form-submit-ajax');
      var gotopage = $form.attr('data-gotopage');

      var minutes = 15;
      var cookieOpts = {
        path: '/',
        expires: new Date().setTime(new Date().getTime() + (minutes * 60 * 1000))
      }

      $.cookie('name', $form.find('[name=name]').val(), cookieOpts);
      $.cookie('email', $form.find('[name=email]').val(), cookieOpts);
      $.cookie('phone', $form.find('[name=phone]').val(), cookieOpts);
      $.cookie('business', $form.find('[name=business]').val(), cookieOpts);
      $.cookie('contact_person', $form.find('[name=contact_person]').val(), cookieOpts);
      $.cookie('address', $form.find('[name=address]').val(), cookieOpts);
      $.cookie('postal_code', $form.find('[name=postal_code]').val(), cookieOpts);

      setTimeout(() => {
        $.ajax(
          {
            method: 'POST',
            url,
            data: JSON.stringify(
              {
                user_info: $form.serializeFormJSON()
              }
            ),
            headers: {
              'Content-Type': 'application/json'
            },
  
            timeout: ajaxTimeout,
            retries: ajaxRetry,
            retryInterval: ajaxRetryInterval,

            success: function(resp) {
              console.log('resp:', resp)
              if (resp.status.code == 200) {

                if ( gotopage != undefined && gotopage != '' ) {
                  let redirect_url  = gotopage + '&source=' + window.location.href + '&pagename=' + GetPageFileName()

                  setTimeout(() => {
                    window.location.href = redirect_url
                  }, 1500);
                }

              }
            }
          },
        )
      }, 0);

    }
  })
})

