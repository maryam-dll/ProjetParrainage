$(document).ready(function() {
    // Récupérer les paramètres d'URL
    const urlParams = new URLSearchParams(window.location.search);
    const voterId = urlParams.get('voterId');
    const nationalId = urlParams.get('nationalId');
    const lastName = urlParams.get('lastName');
    const votingStation = urlParams.get('votingStation');
    const phone = urlParams.get('phone');
    const email = urlParams.get('email');
  
    // Afficher les données récupérées dans les champs de saisie de parrainage.html (si nécessaire)
    
    // Connexion au compte Ethereum via MetaMask
    if (typeof web3 !== "undefined") {
      console.warn("Using web3 detected from external source like Metamask")
      window.eth = new Web3(window.ethereum)
    } else {
      console.warn("No web3 detected. Falling back to http://localhost:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for deployment. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
      window.eth = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"))
    }
  
    // Chargement des candidats
    function chargerCandidats() {
      VotingContract.deployed().then(function(instance) {
        instance.getCompterCandidats().then(function(compterCandidats) {
          for (var i = 0; i < compterCandidats; i++) {
            instance.getCandidat(i + 1).then(function(data) {
              var name = data[1];
              var party = data[2];
              var slogan = data[3]; // Ajoutez ici la récupération du slogan depuis le contrat
              var colors = data[4]; // Ajoutez ici la récupération des couleurs depuis le contrat
              var photo = data[5]; // Ajoutez ici la récupération de la photo depuis le contrat
              var viewCandidates = `<tr><td>${name}</td><td>${party}</td><td>${slogan}</td><td>${colors}</td><td>${photo}</td></tr>`;
              $("#boxCandidate").append(viewCandidates);
            })
          }
        })
      }).catch(function(err) {
        console.error("ERROR! " + err.message)
      })
    }
  
    // Appel de la fonction pour charger les candidats lors du chargement de la page
    chargerCandidats();
  
    // Fonction de vote
    window.App = {
      vote: function() {
        var idCandidat = $("input[name='candidate']:checked").val();
        if (!idCandidat) {
          $("#msg").html("<p>Veuillez sélectionner un candidat.</p>")
          return
        }
        VotingContract.deployed().then(function(instance) {
          instance.vote(parseInt(idCandidat)).then(function(result) {
            $("#voteButton").attr("disabled", true);
            $("#msg").html("<p>Parrainage effectué avec succès !</p>");
            window.location.reload(1);
          })
        }).catch(function(err) {
          console.error("ERROR! " + err.message)
        })
      }
    };
  
    // Affichage de l'adresse du compte Ethereum connecté
    $("#accountAddress").html("Votre compte: " + window.ethereum.selectedAddress);
  
  });
  