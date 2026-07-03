/**
 * Sends the homepage "Become a Member" form to the Google Sheet.
 * ------------------------------------------------------------------
 * 1. Paste your Web app URL from google-apps-script.gs into ENDPOINT below.
 * 2. This file gets referenced from index.html (Egid wires that in).
 * It intercepts the submit, posts the fields to your sheet, and shows
 * the form's existing "Thank you!" / "Oops!" messages.
 */
(function () {
  var ENDPOINT = 'PASTE_YOUR_WEB_APP_URL_HERE';

  var form = document.getElementById('wf-form-Newsletter-Form');
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
