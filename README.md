# Origine della lingua italiana · PWA

Questa cartella contiene una PWA installabile per GitHub Pages e test locale.

## Test locale
1. Apri un terminale nella cartella del progetto.
2. Avvia un server semplice:
   - con Python: `python3 -m http.server 8000`
3. Apri `http://localhost:8000`
4. Controlla:
   - installabilità nel browser
   - navigazione tra pagine
   - funzionamento offline dopo la prima visita
   - presenza del service worker in DevTools

## GitHub Pages
1. Carica tutto il contenuto della cartella nella root del repository.
2. Attiva GitHub Pages sulla branch principale.
3. Usa l'URL del repository pubblicato, ad esempio:
   `https://TUO-USERNAME.github.io/TUO-REPO/`
4. Verifica:
   - manifest caricato
   - service worker registrato
   - icona installazione su Chrome Android
   - “Aggiungi a Home” su iOS/iPadOS Safari

## File principali
- `index.html`: home della PWA
- `pages/*.html`: sezioni e strumenti didattici
- `manifest.json`: metadati installazione
- `service-worker.js`: cache shell e fallback offline
- `pwa.js`: registrazione SW e gestione aggiornamenti
- `offline.html`: pagina di fallback
- `content/*.md`: sorgenti originali inclusi
