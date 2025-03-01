# Projekt: Join - Projektmanagement-Tool

## Beschreibung
**Join** ist ein kollaboratives Projektmanagement-Tool, das entwickelt wurde, um den Status und die Verantwortlichkeiten von Aufgaben übersichtlich darzustellen. Die Web-App umfasst Funktionen wie Benutzerregistrierung, Kanban-Board, Aufgabenmanagement und Kontaktverwaltung.

## Funktionen
### Benutzerverwaltung
- **Registrierung**: Benutzer können sich registrieren, um Zugang zu erhalten.
- **Login**: Authentifizierung mit E-Mail und Passwort, inkl. Gastzugang.
- **Logout**: Sichere Abmeldung.

### Kanban-Board
- Darstellung der Aufgaben in vier Spalten: ToDo, In Progress, Awaiting Feedback, Done.
- Drag-and-Drop-Funktionalität zum Verschieben von Aufgaben.
- Fortschrittsanzeige für Aufgaben mit Subtasks.
- Aufgaben können hinzugefügt, bearbeitet und gelöscht werden.

### Kontaktverwaltung
- Alphabetisch sortierte Liste aller Kontakte.
- Hinzufügen, Bearbeiten und Löschen von Kontakten.
- Detailansicht für Kontakte mit Informationen wie Name, E-Mail und Telefonnummer.

### Weitere Features
- Mobile Unterstützung mit responsive Design.
- Intuitive Benutzeroberfläche mit Feedback (Hover, Toast-Messages).

## Technologien
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase (Authentifizierung und Datenbank)
- **Tools**: Git, Figma, VS Code

## Projektstruktur
```
project-root/
├── index.html
├── css/
│   ├── style.css
├── js/
│   ├── main.js
│   ├── auth.js
│   ├── kanban.js
│   ├── contacts.js
├── assets/
│   ├── img/
│   ├── icons/
├── firebase.json
└── README.md
```

## Installation
1. **Repository klonen:**
   ```bash
   git clone <repository-url>
   ```
2. **Abhängigkeiten installieren:**
   - Installiere die Firebase CLI: https://firebase.google.com/docs/cli
3. **Firebase initialisieren:**
   - Melde dich in der Firebase CLI an und initialisiere dein Projekt.
   ```bash
   firebase init
   ```
4. **Lokalen Server starten:**
   ```bash
   firebase serve
   ```

## Entwicklungsprozess
- **Scrum**-basiertes Vorgehen mit Sprints.
- **Branching-Strategie:**
  - `main`: Stable branch für Releases.
  - `feature/<feature-name>`: Branches für spezifische Features.

## Anforderungen
- Unterstützt moderne Browser: Chrome, Firefox, Safari, Edge.
- Optimiert für Desktop- und mobile Endgeräte (min. 320px Auflösung).

## Mitwirkende
- [Valentino Strebel]
- [Aris Karamat]
- [Tim S.]
- [Kay W.]
