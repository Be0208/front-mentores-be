<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getMentors, createMentors, deleteMentorById } from '@/services/apiMentors'
import checkLogged from '@/utils/checkLogged'
import type { MentorType } from '@/types/MentorType'
import router from '@/router'
import MenuSite from '@/components/MenuSite.vue'
import FooterSite from '@/components/FooterSite.vue'

const mentores = ref<MentorType[]>([])

const name = ref<string>('')
const email = ref<string>('')
const cpf = ref<string>('')

const dialog = ref<boolean>(false)
const searchDialog = ref<boolean>(false)

const searchQuery = ref<string>('')

const getData = async () => {
  const response = await getMentors()
  if (response?.data) {
    mentores.value = response.data.mentores
  }
}
async function createMentor() {
  const response = await createMentors(name.value, email.value, cpf.value)
  if (response) {
    dialog.value = false
    await getData()
  }
}
async function deleteMentor(id: string) {
  const response = await deleteMentorById(id)

  if (response) {
    await getData()
    return response.data
  }
}

const filteredMentores = computed(() => {
  if (!searchQuery.value) {
    return mentores.value
  }
  return mentores.value.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Montagem inicial
onMounted(() => {
  getData()
  checkLogged('/home')
})
</script>

<template>
  <MenuSite />

  <main class="my-5 mx-5">
    <v-card class="my-5 " width="100%" >
      <v-toolbar color="grey">
        <!-- modal -->
        <v-toolbar-title>Lista de mentores:</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
          class="text font-weight-regular"
          prepend-icon="mdi-magnify"
          variant="text"
          @click="searchDialog = true"
        >
          Pesquisar Mentor
        </v-btn>

        <v-btn
          class="text font-weight-regular"
          prepend-icon="mdi-account-plus"
          variant="text"
          @click="dialog = true"
        >
        </v-btn>

        <v-dialog v-model="dialog" max-width="600">
          <v-card>
            <v-card-title>Cadastrar Mentor</v-card-title>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="name" label="Nome*" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="email" label="Email*" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                  <v-text-field
                    v-model="cpf"
                    hint="máximo de 11 caracteres"
                    label="CPF*"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text="Fechar" @click="dialog = false"></v-btn>
              <v-btn color="primary" @click="createMentor">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="searchDialog" max-width="600">
          <v-card>
            <v-card-title>Pesquisar Mentor</v-card-title>
            <v-card-text>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field v-model="searchQuery" label="Nome do Mentor"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text="Fechar" @click="searchDialog = false"></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <v-list lines="two">
        <v-list-subheader inset>Mentores:</v-list-subheader>

        <v-list-item
          v-for="mentor in filteredMentores"
          :key="mentor.id"
          :subtitle="mentor.email"
          :title="mentor.name"
        >
          <template v-slot:subtitle>
            <h4>{{ mentor.email }} - {{ mentor.cpf }}</h4>
          </template>

          <template v-slot:append>
            <v-btn color="grey-darken-2" icon="mdi-update" variant="text"></v-btn>
            <v-btn
              color="grey-darken-2"
              icon="mdi-delete"
              variant="text"
              @click="deleteMentor(mentor.id)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </main>

  <FooterSite />
</template>
