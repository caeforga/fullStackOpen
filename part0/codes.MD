## 0.4-newNote
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user fills out the form and clicks submit.

    browser->>server: POST /new_note (form data)
    activate server
    server-->>browser: HTTP 302 Found (Redirect to /notes)
    deactivate server

    Note right of browser: The browser redirects to /notes.

    browser->>server: GET /notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET /main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET /main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches JSON data from the server.

    browser->>server: GET /data.json
    activate server
    server-->>browser: [{ "content": "Note 1", "date": "2023-1-1" }, { "content": "Note 2", "date": "2023-1-2" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes.
    
## 0.5_SPA
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user navigates to the SPA version of the notes application.

    browser->>server: GET /spa
    activate server
    server-->>browser: HTML - code
    deactivate server

    Note right of browser: The browser parses the HTML and requests the necessary resources.

    browser->>server: GET /main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET /spa.js
    activate server
    server-->>browser: JavaScript file (spa.js)
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON data from the server.

    browser->>server: GET /data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes using the JSON data.

## 0.6_newNteSPA
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user fills out the form and clicks submit.

    browser->>server: POST /new_note_spa (JSON data)
    activate server
    server-->>browser: HTTP 201 Created
    deactivate server

    Note right of browser: The browser updates the page without reloading.

    browser->>browser: Update DOM with new note
