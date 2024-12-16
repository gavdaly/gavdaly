---
title: "Ultra Light State Machine"
publishedAt: 2024-12-15
description: "Making a State Machine with just js and html"
postState: "idea"
---

## How it works

Super simple state machine using just html, css, and js.
Actions havet to be triggered by the user, in the html of the div.

### Structure

```html
<section data-state="initial">
    <div id="initial">
        <!-- do something here -->
        <button onClick="submit">
    </div>

    <div id="pending">
        <!-- show a spinner -->
        <button onClick="cancel">
    </div>

    <div id="success">
        <!-- show a success message -->
        <button onClick="reset">
    </div>

    <div id="error">
        <!-- show an error message -->
        <button onClick="reset">
    </div>
</section>
```

### Styling

```css
[data-state="initial"] {
    #initial {
        display: block;
    }
    #pending, #success, #error {
        display: none;
    }
}
[data-state="pending"] {
    #pending {
        display: block;
    }
    #initial, #success, #error {
        display: none;
    }
}
[data-state="success"] {
    #success {
        display: block;
    }
    #initial, #pending, #error {
        display: none;
    }
}
[data-state="error"] {
    #error {
        display: block;
    }
    #initial, #pending, #success {
        display: none;
    }
}
```

### Logic

```js
let stateDiv = document.querySelector('[data-state]');

fn submit() {

    const pendingTimer = setTimeout(() => {
        stateDiv.dataset.state = 'pending';
    }, 300);

    // do something
    // after sucessful operation
    fetch('https://api.example.com', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
      clearTimeout(pendingTimer);
        if (response.ok) {
            stateDiv.dataset.state = 'success';
        } else {
            stateDiv.dataset.state = 'error';
        }
    }).catch(() => {
        stateDiv.dataset.state = 'error';
    });
}

fn reset() {
    stateDiv.dataset.state = 'initial';
}

fn cancel() {
    stateDiv.dataset.state = 'initial';
}

```

## Considerations
### Doesn't Scale
For small apps or components, this approach is fine.
State get more complex, there is alot more boilerplate code to manage.
Larger apps consider using a library or XState.

###	Make sure you don't have implicit states


## Conclusion
