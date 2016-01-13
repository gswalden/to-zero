### Install

```sh
npm install -g to-zero
```

### Use

```sh
to-zero 5s # Counting down 5 seconds
to-zero 5m # Counting down 5 minutes
to-zero 5h # Counting down 5 hours

to-zero 5m -d # Timer spawns in the background (won't take over your prompt)

to-zero 5m -m "I'm cooked!" # Display this message in the notification
```

*See the [ms](https://github.com/rauchg/ms.js) package for valid time strings*
