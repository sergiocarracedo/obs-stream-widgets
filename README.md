# Obs Stream Widgets

## Project setup (without `docker-compose`)

### Install dependencies
```
yarn
```

### Run application and server
```
yarn start
```

Default address: http://localhost:8081

## Project setup (with `docker-compose`) 

To run application with `docker-compose`

```
docker-compose up
```

Remember to rebuild image if code changes with
```
docker-compose build
```

Exposed address: http://localhost:8081

## Create a widget
```
WIP
```
* Edit `obs-stream-widgets.config.js` and add the new widget

```js
export default {
  widgets: {
    'brand': require('@obs-stream-widgets/widget-brand'),
    'chat': require('@obs-stream-widgets/widget-chat'),
    'your-widget': require('@obs-stream-widgets/your-widget'),
    ...
  }
}

```



