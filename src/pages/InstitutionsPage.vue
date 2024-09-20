<template>
  <q-page>
    <div class="q-pa-md">
      <h6 class="text-center">Search Institution</h6>
      <q-form class="q-gutter-md">
        <q-input
          @change="searchInstitution()"
          rounded
          outlined
          v-model="name"
          label="Institution Name"
        >
          <template v-slot:append>
            <q-icon
              size="sm"
              color="primary"
              name="mdi-magnify"
              @click="searchInstitution()"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </q-form>
    </div>
    <div>
      <div class="q-pa-md">
        <q-virtual-scroll
          style="max-height: 500px"
          :items="rows"
          separator
          v-slot="{ item, index }"
        >
          <q-list :key="index">
            <q-item>
              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-icon
                  size="sm"
                  color="primary"
                  name="mdi-eye"
                  @click="viewInstitution(item)"
                  class="cursor-pointer"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-virtual-scroll>
        <!-- <div class="flex justify-center">
          <q-btn @click="viewMore(item)">view more</q-btn>
        </div> -->
      </div>
    </div>
    <q-dialog v-model="showDialog" persistent>
      <q-card>
        <div class="text-right bg-primary">
          <q-icon
            class="q-pa-md"
            name="mdi-close"
            size="1.5em"
            @click="showDialog = false"
          />
        </div>
        <q-card-section>
          <div class="flex justify-center text-weight-medium text-subtitle1">
            Institution Details
          </div>
          <p class="text-center">
            {{ instDetails.name }}
          </p>
          <p class="text-center">
            Type:
            {{ instDetails.type }}
          </p>
          <p class="text-center">
            Ownership:
            {{ instDetails.ownership }}
          </p>

          <p class="text-center">Location: {{ instDetails.location }}</p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";

const name = ref("");
const $q = useQuasar();
const results = ref(true);
const showDialog = ref(false);
const instDetails = ref("");
const rows = ref([]);
const viewInstitution = (item) => {
  showDialog.value = true;
  instDetails.value = item;
};
const searchInstitution = async () => {
  $q.loading.show({
    delay: 400, // ms
  });
  const response = await api.get(
    `https://test.agroscan.co.tz/api/institutions?name=${name.value}`
  );
  rows.value = response.data.data;
  $q.loading.hide();
};
const getInstitutions = async () => {
  $q.loading.show({
    delay: 400, // ms
  });
  try {
    const response = await api.get(
      `https://test.agroscan.co.tz/api/institutions`
    );
    rows.value = response.data.data;

    results.value = false;
    $q.loading.hide();
  } catch (error) {
    console.log(error);
    $q.notify({
      color: "red-4",
      textColor: "white",
      icon: "warning",
      message: "Error in submission",
      position: "top",
    });
  }
};
onMounted(() => {
  getInstitutions();
});
</script>
