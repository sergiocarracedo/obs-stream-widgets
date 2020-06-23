# Obs Stream Widgets

## Project setup
```
lerna link
lerna bootstrap
```

### Run APP and server
```
yarn start
```


### Create a widget
```
WIP
```
* Create a new folder in `package/` using as name
* Link to the project using `lerna link`
* Edit `packages/core/obs-stream-widgets.config.js` and add the new widget

```js
export default {
  widgets: {
    'widget-brand': require('@obs-stream-widgets/widget-brand'),
    'widget-chat': require('@obs-stream-widgets/widget-chat'),
    'your-widget': require('@obs-stream-widgets/your-widget'),
    ...
  }
}

```




