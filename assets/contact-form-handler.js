/**
 * Sends the Contact Us form (contact-us.html) to its OWN Google Sheet.
 * 1. Paste the Web app URL from google-apps-script-contact.gs into ENDPOINT below.
 * 2. This file gets referenced from contact-us.html (Egid wires that in).
 */
(function () {
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbyTaNQz1Nd3pG-B-9l6yec4F8jhhl0DpT89cckTY-ZLsGAlJLA3k9E6pE3boqe4NQwNwg/exec';

  var form = document.getElementById('wf-form-Contact-Form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation(); // beat Webflow's own handler

    var body = new URLSearchParams(new FormData(form));
    var wrap = form.closest('.w-form') || form.parentNode;
    var done = wrap.querySelector('.w-form-done');
    var fail = wrap.querySelector('.w-form-fail');

    fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', body: body })
      .then(function () {
        form.style.display = 'none';
        if (done) done.style.display = 'block';
        form.reset();
      })
      .catch(function () {
        if (fail) fail.style.display = 'block';
      });
  }, true); // capture phase
})();
