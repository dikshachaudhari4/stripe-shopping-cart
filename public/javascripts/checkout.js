/** Publishable key is not secret, is ok to store it here.
 * Check https://stripe.com/docs/keys
 */
const stripePublishableTestKey = 'pk_test_51JdYuRSAY7edSl7IMa5pWPfp8fH62gOO4NJrLRt1fN52e7wFUTOhKjQ4PyXPzHomoqEdiXIFCGHZIoq2Y1lnYPMa00Si87mT91';

Stripe.setPublishableKey(stripePublishableTestKey);

const $form = $('#checkout-form');

$form.submit(function(event) {
    $('#charge-error').addClass('invisible');
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#name').val(),
    }, stripeResponseHandler);
    return false;
});

function stripeResponseHandler(status, response) {
    if (response.error) {
        // Show the errors on the form and re-enable submission
        $('#charge-error').text(response.error.message);
        $('#charge-error').removeClass('invisible');
        $form.find('button').prop('disabled', false);

    } else {
        // Token was created and we can proceed
        const token = response.id;

        // Insert the token into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
        $form.get(0).submit();

    }
}
