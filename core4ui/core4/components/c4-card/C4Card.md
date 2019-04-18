### Usage

Usually used inside a c4-page with headline as (top-level element)<br> or title as secondary Table Element Default Conainer Element for any kind of content

<br><br>

##### Example: Title and content

```jsx
<c4-card headline="Cardname">
  <!-- Default Slot-->
  <div>Any Content can be placed here with any tag</div>
</c4-card>
```
<br><br>

##### Example: Complete example

```jsx
<c4-card title="Cardname">
  <div slot="primary-controls">
   <v-btn color="accent" small>Download CSV</v-btn>
  </div>
  <!-- Default Slot-->
  <div>Any Content can be placed here with any tag</div>
  <div slot="card-actions">
    <v-btn flat color="primary">More</v-btn>
  </div>
</c4-card>
```

<br><br>
