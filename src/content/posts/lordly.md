---
title: "lordly"
publishedAt: 2024-09-23
description: "Creating CSS and HTML-Based Stateful Components"
postState: "idea"
---

## Lordly: Creating CSS and HTML-Based Stateful Components

### Introduction

TODO: Need to build the library more.

Having a simple library that focusses on state full static components, that give you the hint with the correct sematic elements in them.

One of the biggest things and the one thing that drives me crazy on the Internet is people not using the input element somatically and asking for numbers, but showing the text keyboard on mobile there's lots of other examples and I'm trying to go we get through the, all.

And asked for the staple components this comes down to forms, especially where when we're submitting a form, we have the initial states, dirty states, valid states, invalid states, and then submitted.

One of the things that I really wanna do is use the built-in abilities of the browser and not create extra JavaScript.

### Inputs

Inputs are very complicated. We want them to deal with a lot of information for us and we want them to look nice and handle our dad and not give us back shit.

But for the user experience, we don't want to control everything and have everything be all a cluster fuck went on a slow connection. Try not to have your validation hit the server. We can do server checks when we submit all the data and not as you type every fucking character.

The other thing with inputs is the HTML is a gigantic grab bag of everything that can possibly be used on it and sometimes it's not contextually sensitive to what we're trying to do.

## It's easy to make mistakes and the **`Code Completions`** list can be huge

```tsx
<Input type="number" autocomplete="address" inputmode="text">
<Input type="url" autocomplete="credit-card">
```

### Forms

#### JS Free Form Flow

Form -> Submit -> Fix Invalid -> Submit -> Success

### Controlled Form Flow

Form -> Start Typing -> Everything glows red showing invalid states -> Submit -> Success

### Stateful Form Flow

Form -> Start Typing -> Only shows invalid if the user has left the field -> Submit -> Success

This is a little trickier with validation fields, but I have a few ideas on how to do this.

#### The Form Double Click

```ts
type FormState =
  | "initial"
  | "dirty"
  | "valid"
  | "invalid"
  | "pending"
  | "submitted";

type InputState = "initial" | "dirty" | "valid" | "invalid";
```

• Guide readers through creating CSS and HTML-based stateful components using Leptos.

• Outline prerequisites: basic knowledge of Rust, HTML, and CSS.

1. Building Your First Stateful Component

I personally think that any user input should be done within a form. That basically means if you're doing a put or a patch request, you are using a form and get request should be going places getting information, not setting values.

1. Advanced Styling Techniques

There is no styling with Lord Lee all we're doing is providing hooks for you to style your components however, you like whether be with talent or regular CSS or anything your heart desires.

But the state of components is controlled through the data type.
The goal here have no in-line styles no dynamic styles have everything the static that can be looked at in the CSS and not guess upon.

• Changing inline styles dynamically with Leptos.
• Using CSS Frameworks
• Integrating frameworks like Tailwind CSS or Bootstrap with Leptos components.

1. Building Complex Components

- I'm just gonna build simple print tips for the form and inputs.

### Tips for Writing the Article

- Practical examples
- Include code snippets and step-by-step guides for each example
- Ensure examples are relevant and demonstrate the concepts clearly
- Visual aids
- Use screenshots or diagrams to illustrate how components should look and behave
- Clarity and accessibility
- Explain technical terms and avoid unnecessary jargon
- Write in a way that is approachable for readers new to Leptos but familiar with HTML and CSS
- Engage with the reader
- Pose questions or challenges to encourage readers to apply what they’ve learned
- Code quality
- Ensure all code examples follow best practices and are tested
- Update references
- Provide up-to-date links and resources
