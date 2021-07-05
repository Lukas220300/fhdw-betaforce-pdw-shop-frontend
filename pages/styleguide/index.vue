<template>
  <div>

    <h1 class="title is-1 styleguide-header">Texts</h1>
    <h2 class="title is-2 styleguide-sub-header">Titles</h2>
    <h1 class="title is-1">h1. The quick brown fox jumps over the lazy dog</h1>
    <h2 class="title is-2">h2. The quick brown fox jumps over the lazy dog</h2>
    <h3 class="title is-3">h3. The quick brown fox jumps over the lazy dog</h3>
    <h4 class="title is-4">h4. The quick brown fox jumps over the lazy dog</h4>
    <h5 class="title is-5">h5. The quick brown fox jumps over the lazy dog</h5>
    <h6 class="title is-6">h6. The quick brown fox jumps over the lazy dog</h6>

    <h2 class="title is-2 styleguide-sub-header">Sub-Titles</h2>
    <h1 class="subtitle is-1">h1. The quick brown fox jumps over the lazy dog</h1>
    <h2 class="subtitle is-2">h2. The quick brown fox jumps over the lazy dog</h2>
    <h3 class="subtitle is-3">h3. The quick brown fox jumps over the lazy dog</h3>
    <h4 class="subtitle is-4">h4. The quick brown fox jumps over the lazy dog</h4>
    <h5 class="subtitle is-5">h5. The quick brown fox jumps over the lazy dog</h5>
    <h6 class="subtitle is-6">h6. The quick brown fox jumps over the lazy dog</h6>

    <h2 class="title is-2 styleguide-sub-header">Paragraph</h2>
    <div class="content">
      <p>Lorem ipsum<sup><a>[1]</a></sup> dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices
        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat
        odio, sollicitudin vel erat vel, interdum mattis neque. Sub<sub>script</sub> works as well!</p>
      <p>Curabitur accumsan turpis pharetra <strong>augue tincidunt</strong> blandit. Quisque condimentum maximus mi,
        sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem
        rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.</p>
      <p>Quisque ante lacus, malesuada ac auctor vitae, congue <a href="#">non ante</a>. Phasellus lacus ex, semper ac
        tortor nec, fringilla condimentum orci. Fusce eu rutrum tellus.</p>
    </div>

    <h1 class="title is-1 styleguide-header">Buttons</h1>
    <h2 class="title is-2 styleguide-sub-header">Default</h2>
    <button class="button">Button</button>
    <a class="button" href="/styleguide">Link</a>
    <button class="button is-fullwidth">Full-Width</button>

    <h2 class="title is-2 styleguide-sub-header">Color-Black</h2>
    <button class="button is-white">White</button>
    <button class="button is-light">Light</button>
    <button class="button is-dark">Dark</button>
    <button class="button is-black">Black</button>
    <button class="button is-text">Text</button>
    <button class="button is-ghost">Ghost</button>

    <h2 class="title is-2 styleguide-sub-header">Color</h2>
    <button class="button is-info">Info</button>
    <button class="button is-success">Success</button>
    <button class="button is-warning">Warning</button>
    <button class="button is-danger">Danger</button>

    <h2 class="title is-2 styleguide-sub-header">Color-Light</h2>
    <button class="button is-info is-light">Info</button>
    <button class="button is-success is-light">Success</button>
    <button class="button is-warning is-light">Warning</button>
    <button class="button is-danger is-light">Danger</button>

    <h2 class="title is-2 styleguide-sub-header">Outlined</h2>
    <button class="button is-outlined">Outlined</button>
    <button class="button is-primary is-outlined">Outlined</button>
    <button class="button is-link is-outlined">Outlined</button>
    <button class="button is-info is-outlined">Outlined</button>
    <button class="button is-success is-outlined">Outlined</button>
    <button class="button is-danger is-outlined">Outlined</button>

    <h2 class="title is-2 styleguide-sub-header">Rounded</h2>
    <button class="button is-rounded">Rounded</button>
    <button class="button is-primary is-rounded">Rounded</button>
    <button class="button is-link is-rounded">Rounded</button>
    <button class="button is-info is-rounded">Rounded</button>
    <button class="button is-success is-rounded">Rounded</button>
    <button class="button is-danger is-rounded">Rounded</button>

    <h2 class="title is-2 styleguide-sub-header">Size</h2>
    <button class="button is-small">Small</button>
    <button class="button">Default</button>
    <button class="button is-normal">Normal</button>
    <button class="button is-medium">Medium</button>
    <button class="button is-large">Large</button>

    <h2 class="title is-2 styleguide-sub-header">Loading</h2>
    <button class="button is-loading">Loading</button>
    <button class="button is-primary is-loading">Loading</button>
    <button class="button is-link is-loading">Loading</button>
    <button class="button is-info is-loading">Loading</button>
    <button class="button is-success is-loading">Loading</button>
    <button class="button is-warning is-loading">Loading</button>
    <button class="button is-danger is-loading">Loading</button>

    <h2 class="title is-2 styleguide-sub-header">Disabled</h2>
    <button class="button" title="Disabled button" disabled>Disabled</button>
    <button class="button is-primary" title="Disabled button" disabled>Disabled</button>
    <button class="button is-link" title="Disabled button" disabled>Disabled</button>
    <button class="button is-info" title="Disabled button" disabled>Disabled</button>
    <button class="button is-success" title="Disabled button" disabled>Disabled</button>
    <button class="button is-warning" title="Disabled button" disabled>Disabled</button>
    <button class="button is-danger" title="Disabled button" disabled>Disabled</button>

    <h1 class="title is-1 styleguide-header">Slider</h1>
    <StageSlider :slides="slides"/>

    <h1 class="title is-1 styleguide-header">Images</h1>
    <div class="todo"></div>

    <h1 class="title is-1 styleguide-header">Icons</h1>
    <div class="todo"></div>

    <h1 class="title is-1 styleguide-header">Teaser</h1>
    <Teaser :title="'Teaser Title'" :sub-title="'Teaser subtitle'"
            imageLink="https://bulma.io/images/placeholders/1280x960.png"/>
    <Teaser :title="'Teaser Title'" :sub-title="'Teaser subtitle'"/>

    <h1 class="title is-1 styleguide-header">Tables</h1>
    <Table :data="tableData" :columns="tableColumns"/>

  </div>
</template>

<script>
import StageSlider from "@/components/StageSlider";
import Teaser from "@/components/Teaser";

export default {
  components: {StageSlider, Teaser},
  name: "styleguide",
  setup() {
    return {
      slides: [
        {image: 'https://bulma.io/images/placeholders/1280x960.png'},
        {image: 'https://bulma.io/images/placeholders/1280x960.png'},
        {image: 'https://bulma.io/images/placeholders/1280x960.png'},
        {image: 'https://bulma.io/images/placeholders/1280x960.png'},
        {image: 'https://bulma.io/images/placeholders/1280x960.png'}
      ],
      tableData: [
        {'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male'},
        {'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male'},
        {'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female'},
        {'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male'},
        {'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female'}
      ],
      tableColumns: [
        {field: 'id', label: 'ID', width: '40', numeric: true},
        {field: 'first_name', label: 'First Name',},
        {field: 'last_name', label: 'Last Name',},
        {field: 'date', label: 'Date', centered: true},
        {field: 'gender', label: 'Gender',}
      ],
    }
  },
}
</script>

<style lang="css">
.styleguide-header {
  background-color: darkgray;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.styleguide-sub-header {
  background-color: lightgray;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
</style>
