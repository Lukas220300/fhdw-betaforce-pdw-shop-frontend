<template>
  <div class="c-contact">
    <h1 class="title is-1">Kontaktanfrage</h1>
    <div class="box">
      Hier hast du die Möglichkeit uns einer Kontaktanfrage zu senden. Wir werden uns dann schnellstmöglich bei dir
      melden. <br>
      Mit * makierte Felder sind Pflichtfelder.
    </div>

    <div class="box">

      <div class="field">
        <label class="label">Name *</label>
        <div class="control">
          <input class="input" type="text"
                 v-bind:class="{'is-success':validationData.name ==1, 'is-danger':validationData.name == 2}"
                 v-model="inputData.name"
                 placeholder="Max Mustermann">
        </div>
        <p v-if="validationData.name == 2" class="help is-danger">Bitte gib eine Name ein.</p>
      </div>

      <div class="field">
        <label class="label">Email *</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input"
                 v-bind:class="{'is-success':validationData.email ==1, 'is-danger':validationData.email == 2}"
                 v-model="inputData.email"
                 type="email" placeholder="Email input" value="">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span v-if="validationData.email == 2" class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p v-if="validationData.email == 2" class="help is-danger">Bitte gib eine valide Email Adresse ein.</p>
      </div>

      <div class="field">
        <label class="label">Thema *</label>
        <div class="control">
          <div class="select">
            <select v-bind:class="{'is-success':validationData.topic ==1, 'is-danger':validationData.topic == 2}"
                    v-model="inputData.topic">
              <option>Bitte auswählen</option>
              <option>Allgemeines</option>
              <option>Bestellung</option>
              <option>Liferung</option>
              <option>Bezahlung</option>
            </select>
          </div>
        </div>
        <p v-if="validationData.topic == 2" class="help is-danger">Bitte wähle ein Thema.</p>
      </div>

      <div class="field">
        <label class="label">Nachricht *</label>
        <div class="control">
          <textarea class="textarea"
                    v-bind:class="{'is-success':validationData.message ==1, 'is-danger':validationData.message == 2}"
                    placeholder="Hallo, ich habe eine Frage..." v-model="inputData.message"></textarea>
        </div>
        <p v-if="validationData.message == 2" class="help is-danger">Bitte gib eine Nachricht ein.</p>
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox"
                   v-bind:class="{'is-success':validationData.privacyStatement ==1, 'is-danger':validationData.privacyStatement == 2}"
                   v-model="inputData.privacyStatement">
            <span>Ich stimme den <a
              href="/privacy">Datenschutzbedingungen</a> zu. *</span>
          </label>
        </div>
        <p v-if="validationData.privacyStatement == 2" class="help is-danger">Bitte akzeptiere die Bedinungen.</p>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" @click="send($axios, validateInput)">Kontaktanfrage abschicken</button>
        </div>
      </div>
      {{ inputData }}
    </div>

  </div>
</template>

<script>
import {
  validateDefaultText,
  validateEmail,
  validateCheckBox,
  validateSelect
} from "./../scripts/inputValidation/inputValidation"

export default {
  name: "Contact",
  data() {
    const inputData = {
      name: '',
      email: '',
      topic: 'Bitte auswählen',
      message: '',
      privacyStatement: false,
    }
    const validationData = {
      name: 0,
      email: 0,
      topic: 0,
      message: 0,
      privacyStatement: 0,
    }

    return {
      inputData,
      validationData,
    }
  },
  methods: {
    validateInput() {
      let validation = true
      if (!validateDefaultText(this.inputData.name)) {
        validation = false
        this.validationData.name = 2
      } else {
        this.validationData.name = 1
      }
      if (!validateEmail(this.inputData.email)) {
        validation = false
        this.validationData.email = 2
      } else {
        this.validationData.email = 1
      }
      if (!validateSelect(this.inputData.topic, 'Bitte auswählen', ['Allgemeines', 'Bestellung', 'Liferung', 'Bezahlung'])) {
        validation = false
        this.validationData.topic = 2
      } else {
        this.validationData.topic = 1
      }
      if (!validateDefaultText(this.inputData.message)) {
        validation = false
        this.validationData.message = 2
      } else {
        this.validationData.message = 1
      }
      if (!validateCheckBox(this.inputData.privacyStatement)) {
        validation = false
        this.validationData.privacyStatement = 2
      } else {
        this.validationData.privacyStatement = 1
      }

      return validation
    },
    send(axios, validateInput) {
      if(validateInput()) {
        console.log(this.inputData)
      } else {
        this.$buefy.toast.open({
          message: 'Bitte fülle alle Pflichtfelder aus.',
          type: 'is-danger'
        })
      }
    },
  }
}
</script>

