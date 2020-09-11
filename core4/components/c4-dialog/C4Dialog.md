### Usage

Starter Element for Dialogs with convenience functions
<br><br>

##### Example: Default dialog with two action buttons

```jsx
<div> 
  <v-btn color="accent" small @click="c4Dialog.open1 = !c4Dialog.open1">Toggle c4-dialog open</v-btn>

  <c4-dialog title="Default Dialog" :open="c4Dialog.open1">
    <!-- Default Slot-->
    <div>What can i do you for?</div>
    <div slot="dialog-actions">
      <v-btn dark color="primary" flat @click="c4Dialog.open1 = false">
        Cancel
      </v-btn>
      <v-btn dark color="primary" flat>
        Save
      </v-btn>
    </div>
  </c4-dialog>
</div> 
```

##### Example: Complete dialog 

```jsx
<div> 
  <v-btn color="accent" small @click="c4Dialog.open2 = !c4Dialog.open2">Toggle c4-dialog open</v-btn>

  <c4-dialog width="100vw" scrollable title="Complete Dialog" :open="c4Dialog.open2">
    <!-- Default Slot-->
    <div style="min-height: 120vh">Scrollable</div>
    <div slot="dialog-actions">
      <v-btn dark color="primary" flat @click="c4Dialog.open2 = false">
        Cancel
      </v-btn>
      <v-btn dark color="primary" flat>
        Save
      </v-btn>
    </div>
  </c4-dialog>
</div> 
```
