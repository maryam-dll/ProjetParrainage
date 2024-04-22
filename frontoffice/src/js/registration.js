$(document).ready(function() {
  $('#registrationFormStep1').submit(function(e) {
    e.preventDefault();
    // Récupérer les valeurs des champs du formulaire
    var voterId = $('#voter-id').val();
    var nationalId = $('#national-id').val();
    var lastName = $('#last-name').val();
    var votingStation = $('#voting-station').val();

    // Vérifier si tous les champs sont remplis
    if (voterId && nationalId && lastName && votingStation) {
      // Si tous les champs sont remplis, afficher la deuxième étape
      $('#step2').show();
      $(this).hide();
    } else {
      // Sinon, afficher un message d'erreur
      alert('Veuillez remplir tous les champs.');
    }
  });
  
// Fonction pour générer un code OTP aléatoire
function generateOTP() {
  var digits = '0123456789';
  var OTP = '';
  for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

$('#registrationFormStep2').submit(function(e) {
  e.preventDefault();
  var phone = $('#phone').val();
  var email = $('#email').val();

  // Vérifier si tous les champs sont remplis
  if (phone && email) {
      // Générer un code OTP
      var OTP = generateOTP();

      // Enregistrer le code OTP dans la base de données
      // Vous devez implémenter cette fonctionnalité côté serveur

      // Envoyer le code OTP par SMS
      $.ajax({
          url: 'votre-url-d-envoi-de-SMS', // URL de l'endpoint sur le serveur pour l'envoi de SMS
          method: 'POST',
          data: { phone: phone, OTP: OTP },
          success: function(response) {
              // Afficher un message de succès à l'utilisateur
              alert('Un code d\'authentification a été envoyé à votre téléphone.');
          },
          error: function() {
              // En cas d'erreur lors de l'envoi de SMS, afficher un message d'erreur
              alert('Une erreur s\'est produite lors de l\'envoi du code d\'authentification par SMS. Veuillez réessayer.');
          }
      });

      // Envoyer le code OTP par e-mail
      $.ajax({
          url: 'votre-url-d-envoi-d-email', // URL de l'endpoint sur le serveur pour l'envoi d'e-mail
          method: 'POST',
          data: { email: email, OTP: OTP },
          success: function(response) {
              // Afficher un message de succès à l'utilisateur
              alert('Un code d\'authentification a été envoyé à votre adresse e-mail.');
          },
          error: function() {
              // En cas d'erreur lors de l'envoi d'e-mail, afficher un message d'erreur
              alert('Une erreur s\'est produite lors de l\'envoi du code d\'authentification par e-mail. Veuillez réessayer.');
          }
      });
  } else {
      // Sinon, afficher un message d'erreur
      alert('Veuillez remplir tous les champs.');
  }
});
});