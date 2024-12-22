---
title: "Ultra Light State Machine"
publishedAt: 2024-12-15
description: "Making a State Machine with just js and html"
postState: "idea"
---

## How it works

Super simple state machine using just html, css, and js.

To ensure that the actions that the user can do have to be represented inside of the div of that type. That way it can only progress in the ways that you want and not have any side effects.

### Structure

Under the section, each day would be hidden, would not used and show on when it is being used. So only one can be shown at a time and the one that is showing has the actions inside of it. So that only those actions can take place well that is visible.

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

Here you just simply show the ID of the dive they wanna show and hide everything else.

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

This doesn't really scale at all. Don't use it for a large scale deployment for anything. This is great for a personal blog or a small little website. Analyze you have reactivity and have a very light weight and fast site when the state gets a lot bigger you're gonna end up with spaghetti code.

Larger apps consider using a library like [XState](https://stately.ai/).
