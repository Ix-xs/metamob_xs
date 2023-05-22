<div align=center>
<h1>
metamob_xs<br>
<img src=https://img.shields.io/badge/JavaScript-100%25-yellow?style=plastic>
<br>
</h1>
<sup>#Not dev</sup> <sup>#Unofficial</sup> <sup>#Dofus</sup> <sup>#Metamob</sup>
<br>
</div>

<img align=right src="https://metamob.fr/img/otomai.png">
<h1><img src="https://metamob.fr/img/logo.png">Metamob</h1>
<a href="https://metamob.fr/connexion">Connectez-vous</a> ou <a href="https://metamob.fr/inscription">Inscrivez-vous</a> pour profiter des avantages du site :
    <ul>
        <li>Suivez votre avancement dans la quête</li>
        <li>Gérez finement vos monstres</li>
        <li>Visualisez votre profil</li>
        <li>Echangez avec d'autres joueurs</li>
        <li>Une question ? Regardez <a href="https://metamob.fr/aide">l'aide</a></li>
      </ul>
<br>
<br>
<h1>🌐API</h1>
Metamob propose une petite API vous permettant de récupérer directement les informations saisies par les utilisateurs.
<br>
<br>
<h2>🗝️Récupérer une clé</h2>
Pour créer votre clé, rendez-vous dans <a href="https://metamob.fr/utilisateur/mon_profil">votre espace</a> et cliquez sur l'onglet "API".
Vous devrez saisir un nom. Gardez à l'esprit que vous ne pouvez créer qu'une seule clé API pour l'instant.<br>
<b>Votre clé sera immédiatement utilisable.</b>
<br>
<h2>✨Installation</h2>

`npm install metamob_xs`
<br>
<h2>👀Utilisation</h2>
<h3>1. Commencez par instancier un nouveau client en fournissant votre clé API fournie par Metamob :</h3>

```js
const { metamob_xs } = require("metamob_xs");

const client = new metamob_xs({ apiKey:"votre_clé_api" });
```

<img src="https://user-images.githubusercontent.com/114710533/234149976-268042b8-9300-4fda-92f8-fa781541abad.png">

<br>
<h3>2. Liste des appels possibles</h3>
<br>

Méthode | options | Description |
| --- | --- | --- |
| `GET.user()` | `pseudo`:string | Récupère les informations d'un utilisateur. Non sensible à la casse. |
| `GET.userMonsters()` | `pseudo`:string<br>params?:{<br>`type?`:string,<br>`monstre?`:string,<br>`etape?`:number,<br>`quantite?`:string,<br>`etat?`:string<br>} | Récupère les monstres d'un utilisateur. Le nom d'utilisateur n'est pas sensible à la casse. |
| `GET.monsters()` | params?:{<br>`monstre?`:string<br>`etape?`:number<br>`type?`:string<br>} | Récupère les monstres. |
| `GET.serveurs()` | `serveur?`:string | Récupère les serveurs. |
| `GET.kralamoures()` | params?:{<br>`serveur?`:string<br>`date_debut?`:{<br>`jour`:string,<br>`mois`:string,<br>`année?`:string<br>}<br>`date_fin?`:{<br>`jour`:string,<br>`mois`:string,<br>`année?`:string<br>}<br>} | Récupère les kralamoures. |
| `GET.zones()` | `zone?`:string | Récupère les zones. |
| `GET.souszones()` | `souszone?`:string | Récupère les sous-zones. |
| `PUT.userMonsters()` | `pseudo`:string<br>`clé_unique`:string<br>body:Array<{<br>`monstre`:string<br>`quantite?`:string<br>`etat?`:string<br>}> | Met à jour les informations de monstre d'un compte utilisateur.<br>Le champ quantite indique l'opération à effectuer sur la quantité:<br>• s'il s'agit d'un nombre seul (par exemple "3"), alors la quantité sera forcée à cette valeur, quelque soit la valeur actuelle.<br>• Si la quantité est une chaîne de caractère commençant par un symbole "+", alors la quantité du monstre sera incrémentée de la valeur indiquée.<br>• S'il s'agit d'une chaîne de caractère commençant par un symbole "-", alors la quantité du monstre sera décrémentée de la valeur indiquée. |
| `PUT.resetUserMonsters()` | `pseudo`:string<br>`clé_unique`:string | Réinitialise les monstres sur le compte. Cela signifie que toutes les informations relatives aux monstres seront supprimées !<br>Les monstres seront mis à l'état aucun (ni recherché ni proposé), avec une quantité nulle (0). |

<br>
<h3>3. Exemples</h3>
<br>


```js
const { metamob_xs } = require("metamob.api");

const client = new metamob_xs({ apiKey:"votre_clé_api" });

client.GET.user("popop").then(console.log); // Renvoi les informations de l'utilisateur.

client.GET.userMonsters("popop", { etat:"propose", quantite:">1" }).then(console.log); // Renvoi les monstres "proposés" et dont l'utilisateur possède en + de 1 exemplaire.
client.GET.userMonsters("popop", { etape:"20", type:"archimonstre" }).then(console.log); // Renvoi une liste des "archimonstres" à l'étape 20 de l'utilisateur.

client.GET.monsters().then(console.log); // Renvoi une liste de tout les monstres.
client.GET.monsters({ type:"archimonstre" }).then(console.log); // Renvoi une liste de tout les archimonstres.

client.GET.serveurs().then(console.log); // Renvoi une liste de tout les serveurs.
client.GET.serveurs("Tylezia").then(console.log); // Renvoi les informations sur le serveur "Tylezia".

client.GET.kralamoures().then(console.log); // Renvoi une liste des ouvertures prévues entre la date du jour et 1 mois plus tard.
client.GET.kralamoures({ serveur:"Tylezia", date_fin:{ jour:"01", mois:"06" } }).then(console.log); // Renvoi une liste des ouvertures prévues entre la date du jour et le 01 juin de l'année en cours si la valeur "mois" est future cette année sinon de l'année prochaine.

client.GET.zones().then(console.log); // Renvoi une liste de toutes les zones.
client.GET.zones("Amakna").then(console.log); // Renvoi les informations sur la zone "Amakna".

client.GET.souszones().then(console.log); // Renvoi une liste de toutes les sous-zones.
client.GET.souszones("Aerdala").then(console.log); // Renvoi les informations sur la sous-zones "Aerdala".

client.PUT.userMonsters("pseudo", "clé_unique", [
	{ monstre:"Arakne", quantite:"+5", etat:"propose" },
	{ monstre:"Larchimaide la Poussée", quantite:"3" },
	{ monstre:"Bouftou Royal", quantite:"-2" },
]).then(console.log);
// La quantité du monstre "Arakne" sera incrémenter de 5 et passera à l'état "proposé".
// La quantité du monstre "Larchimaide la Poussée" passera à 3.
// La quantité du monstre "Bouftou Royal" sera décrémenter de 2.
```

<br>
<div align=center>
<b><i>
Vous êtes sur Tylezia ? Nous aussi 😄</i></b><br>
Rejoignez notre communauté et commencez à échanger avec nos aventuriers.<br>
Partagez ou suivez les positions partagées, modifiez vos monstres directement depuis notre serveur et bien plus encore !
<br>
<br>

![Discord](https://img.shields.io/discord/932030929621368862?color=%234c1130&label=Oak-Island&logo=Discord&logoColor=%234c1130&style=plastic)
</div>