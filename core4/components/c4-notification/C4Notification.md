### Usage

Component for displaying notifications


##### Example: Notification with message

```jsx
<c4-notification :name="<str>"
                 :show="<true | false>"
                 :type="<success | info | warning | error>"
                 :message="<some text>"
                 :dismissible="<true | false>"
                 :timeout="<int>"
                 @timeout-handler="<function callback>">
</c4-notification>
```

##### Example: Notification with component slot

```jsx
<c4-notification :name="<str>"
                 :show="<true | false>"
                 :type="<success | info | warning | error>"
                 :dismissible="<true | false>"
                 :timeout="<int>"
                 @timeout-handler="<function callback>">
    <component :is="socket-reconnect-error"></component>
</c4-notification>
```

##### Example: Notification with message and component slot

```jsx
<c4-notification :name="<str>"
                 :show="<true | false>"
                 :type="<success | info | warning | error>"
                 :message="<some text>"
                 :dismissible="<true | false>"
                 :timeout="<int>"
                 @timeout-handler="<function callback>">
    <component :is="socket-reconnect-error"></component>
</c4-notification>
```