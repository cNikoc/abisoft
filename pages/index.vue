//@ts-nocheck
<template>
  <v-container class="v-cont">
    <v-dialog v-model="dialog" scrollable persistent max-width="490" class="dialog">
      <v-card>
        <v-card-title class="headline">
          {{
            DataSend._id === 0
              ? 'Complete the Form'
              : 'Edit'
          }}
        </v-card-title>
        <v-card-text style="height: 500px">
          <v-form ref="form" lazy-validation>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="DataSend.name"
                  outlined
                  :rules="nameRules"
                  dense
                  label="Full Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="DataSend.dateOfBirth"
                  outlined
                  @input="setYearBorn"
                  :rules="fechaDeInscrip"
                  type="date"
                  dense
                  label="Date of Birth"
                ></v-text-field>
                <v-text-field
                  v-model="DataSend.age"
                  outlined
                  dense
                  readonly
                  type="number"
                  label="Age"
                ></v-text-field>
              </v-col>
              <v-col cols="12"> </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="DataSend.dateOfRegistration"
                  outlined
                  dense
                  type="date"
                  @input="calcula()"
                  label="Registration Date"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="DataSend.costo"
                  outlined
                  dense
                  label="Total Cost"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" style="color:#fff" @click="close">Cancel</v-btn>
          <v-btn
            v-if="DataSend._id === 0"
            color="success"
            @click="guardar()"
            >
            Save
          </v-btn>
          <v-btn
            v-if="DataSend._id !== 0"
            color="success"
            @click="actualizar()"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-col cols="12">
      <v-card>
        <v-card-title style="font-style:italic">
          Customers List
          <v-spacer></v-spacer>
          <v-btn color="#333" @click="abrirModal(true)">
            <span style="color:#fff">ADD&nbsp;&nbsp;</span><img style="width:20px; height:20px;color:red" src="https://cdn-icons-png.flaticon.com/512/2312/2312340.png" alt="plus">
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-simple-table hide-default-footer class="elevation-0">
            <template v-slot:default>
              <thead>
                <v-row justify="center"> </v-row>
                <tr>
                  <th class="text-left">Full Name:</th>
                  <th class="text-left">Age:</th>
                  <th class="text-left">Date of Birth:</th>
                  <th class="text-left">Registration Date:</th>
                  <th class="text-left">Total Cost:</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="person of dataPerson.data" :key="person.id">
                  <td>{{person.name.charAt(0).toUpperCase() + person.name.slice(1)}}.</td>
                  <td>{{person.age}}.</td>
                  <td>{{person.dateOfBirth}}.</td>
                  <td>{{person.dateOfRegistration}}.</td>
                  <td>{{person.costo}} u$s.</td>
                  <td></td>
                  <td>
                    <v-btn icon @click="editar(person)">
                      <v-icon> mdi-pencil </v-icon>
                    </v-btn>
                    <v-btn icon @click="deletePerson(person)">
                      <v-icon color="#d40000"> mdi-delete </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { userService } from '../common/service/user.service'

const index = defineComponent({
  setup() {
    const dialog = ref(false)
    const form = ref('')
    const DataSend = ref({
      _id: 0,
      name: '',
      age: 0,
      dateOfBirth: new Date(),
      dateOfRegistration: new Date().toLocaleString(),
      costo: 0,
    })

    const fechaDeInscrip = [
      (v: string) => {
        var r = new Date(DataSend.value.dateOfRegistration)
        // @ts-ignore
        var fechaFormulario = new Date(DataSend.value.dateOfBirth)

        return r > fechaFormulario || 'UPS! You must be older than the year of birth'
      },
      (v: string) => {
        var hoy = new Date()
        var cumpleanos = new Date(v)
        var edad = hoy.getFullYear() - cumpleanos.getFullYear()

        return edad >= 18 || 'UPS! You must be over 18 years old'
      },
    ]

    const nameRules = [
      (v: string) => !!v || 'UPS! Name is required',
      (v: string) =>
        (v && v.length <= 10) || 'UPS! Name must be less than 10 characters',
    ]
    const dataPerson = ref({
      data: [],
    })
    const abrirModal = (data = false) => {
      //
      dialog.value = true
      if (data) {
        DataSend.value.dateOfRegistration = formatDate()
      }
    }

    onMounted(async () => {
      getUsuarios()
      DataSend.value.dateOfRegistration = formatDate()
      calcula()
    })

    const calcula = () => {
      var registro = new Date(DataSend.value.dateOfRegistration)
      const mult = registro.getFullYear() - 2020
      DataSend.value.costo = mult * 100
    }
    const editar = (item: any) => {
      DataSend.value = item
      abrirModal()
    }

    const formatDate = (date = new Date()) => {
      var d = date
      let month = d.getMonth() + 1
      let day = d.getDate()
      let year = d.getFullYear()
      // @ts-ignore
      if (month < 10) month = '0' + month
      // @ts-ignore
      if (day < 10) day = '0' + day

      return [year, month, day].join('-')
    }
    const close = () => {
      dialog.value = false
      DataSend.value = {
        _id: 0,
        name: '',
        age: 0,
        // @ts-ignore
        dateOfBirth: new Date().toLocaleDateString(),
        dateOfRegistration: new Date().toLocaleDateString(),
        costo: 0,
      }
    }
    const getUsuarios = async () => {
      try {
        const response = await userService.userGet()

        dataPerson.value = response
      } catch (e) {}
    }
    const guardar = async () => {
      try {
        // @ts-ignore
        if (form.value.validate()) {
          // @ts-ignore
          delete DataSend.value._id
          const service = await userService.userPost(DataSend.value)
          // @ts-ignore
          dataPerson.value.data.push(service)
          close()
        }
      } catch (response) {}
    }
    const actualizar = async () => {
      try {
        // @ts-ignore
        if (form.value.validate()) {
          const serviceUpdate = await userService.userPatch(DataSend.value)
          const findIndex1 = dataPerson.value.data.findIndex(
            // @ts-ignore
            (indice) => indice._id === DataSend._id
          )
          if (findIndex1 > -1) {
            // @ts-ignore
            dataPerson.value.splice(findIndex1, 1, serviceUpdate)
          }

          close()
        }
      } catch (response) {
        console.log('error', response)
      }
    }

    const deletePerson = async (item: any) => {
      try {
        const serviceDelete = await userService.userDelete(item)
        const index = dataPerson.value.data.findIndex(
          (pers: any) => pers._id === item._id
        )
        if (index > -1) {
          dataPerson.value.data.splice(index, 1)
        }
      } catch (response) {
        console.log('error', response)
      }
    }
    const setYearBorn = (yearold: number) => {
      const d = new Date()
      // @ts-ignore
      let month = parseInt(d.getMonth()) + 1
      // @ts-ignore
      let day = parseInt(d.getDate())
      // @ts-ignore
      let year = parseInt(d.getFullYear())

      const anoNacimiento = parseInt(String(yearold).substring(0, 4))
      const mesNacimiento = parseInt(String(yearold).substring(5, 7))
      const diaNacimiento = parseInt(String(yearold).substring(8, 10))

      let edad = year - anoNacimiento

      if (month < mesNacimiento) {
        edad--
      } else if (month === mesNacimiento) {
        if (day === diaNacimiento) {
          edad--
        }
      }
      DataSend.value.age = edad
    }
    return {
      actualizar,
      calcula,
      dialog,
      setYearBorn,
      editar,
      close,
      abrirModal,
      form,
      DataSend,
      guardar,
      dataPerson,
      deletePerson,
      fechaDeInscrip,
      nameRules,
    }
  },
})
export default index
</script>

<style>
.v-cont {
  background:#9995;
  border-radius: 30px;
  font-style:italic;
  overflow-y: hidden;
}
.dialog {
  background:#48e5;
}
.headline {
  margin-bottom: 20px;
  font-style:italic;
}
</style>
