# SERVIZIO DI E-COMMERCE HEADLESS

Prototipo di sito e-commerce headless formato da una componente front-end autonoma ed indipendente, in grado di comunicare tramite API con i servizi offerti da Salsforce Commerce Cloud.

### Requisiti
    - Node.js > v10

### Installazione

Installa le dipendenze ed avvia in maniera concorrente i due server per front-end e back-end.

```sh
$ cd headlessCommerce
$ npm install
$ npm start
```

Per l'ambiente di produzione, compila il codice del front-end

```sh
$ cd client
$ npm run build
```

ed avvia il server per il bak-end

```sh
$ cd api
$ npm start
```

###### Alessio Barbiero @ Diana Corporation S.r.l.