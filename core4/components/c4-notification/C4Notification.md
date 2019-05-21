### Usage

Component for displaying notifications


##### Example: Notification with message

```jsx
<c4-notification :show="<true | false>"  :type="<success | info | warning | error>" :message="<some text>">
</c4-notification>
```

##### Example: Notification with component slot

```jsx
<c4-notification :show="<true | false>"  :type="<success | info | warning | error>">
    <component :is="socket-reconnect-error"></component>
</c4-notification>
```

##### Example: Notification with message and component slot

```jsx
<c4-notification :show="<true | false>"  :type="<success | info | warning | error>" :message="<some txt>">
    <component :is="socket-reconnect-error"></component>
</c4-notification>
```