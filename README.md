Frontend - Caesar X
---

Dette er Caesar X skrevet i React med Astro. I denne applikasjonen kan du laste opp data til systemet, samt inspisere og manipulere dataen lastet inn.

### Hva løser applikasjonen?

Den gjør det mulig å laste opp datasett i CSV på en enkel måte, og tilgjengliggjør dataen i et brukergrensesnitt hvor man kan søke opp det man er interessert i.

Det ble dessverre litt knapt med tid over helgen, og løsningen bærer preg av dette. Om jeg hadde hatt mer tid ville jeg laget et vesentlig bedre søk og lagt på fasettering på kolonner.
Det hadde også vært fint med en event-dreven arkitektur, men dette prioriterte jeg ned av hensyn til tid.

### Hvordan kjører jeg applikasjonen?

Du trenger Docker installert på maskinen din for å kjøre applikasjonen.
Når du har dette kan du kjøre `docker-compose up -d` så vil applikasjoen bygge og kjøre på port `3000`.

### Hvordan bruker jeg applikasjonen?

Applikasjonen har to skjermbilder: 
    1. Inspeksjonsvisning
    2. Opplastningsvisning

For å dra nytte av applikasjonen må du laste opp et gyldig datasett under "Last opp filer". Avhengig av størrelsen på datasettet kan dette ta et lite øyeblikk, men data vil flyte løpende inn i applikasjonen.

Når du har lastet opp ønsket fil kan du gå til inspektøren å utforske dataen.

### Hvordan utvikler jeg i dette systemet?

_Det er en forutsetning at du har Node JS installert på utviklermaskinen din for å kunne jobbe med denne applikasjonen. I skrivende stund er versjonen `v21.2.0`, men du kan finne den til enhvertid gjeldende versjonen i [`.nvmrc`](./.nvmrc) filen som ligger i rotmappen til denne applikasjonen._

For å jobbe med applikasjonen, kjører du følgende kommandosekvens:

1a. `nvm use` inne i `frontend` mappen hvis du har [`nvm`](https://github.com/nvm-sh/nvm) installert
1b. Installer Node JS versjonen spesifisert i [`.nvmrc`](./.nvmrc) filen
2. Kjør `npm install`
3. Kjør `npm run dev`

Når kan du begynne å utvikle ny funksjonalitet i prosjektet. Lag noe kult! 🚀