<template>
  <q-page>
    <div class="q-pa-md">
      <h6 class="text-center">Search for a Career</h6>
      <q-form class="q-gutter-md">
        <q-input
          @change="searchCareer()"
          rounded
          outlined
          v-model="name"
          placeholder="eg.Software Engineering"
        >
          <template v-slot:append>
            <q-icon
              size="sm"
              color="primary"
              name="mdi-magnify"
              @click="searchCareer()"
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
                <q-item-label>{{ item.career_title }}</q-item-label>
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
            Career Details
          </div>
          <p class="text-center">
            {{ careerDetails.career_title }}
          </p>
          <p class="text-center">
            Industry:
            {{ careerDetails.industry }}
          </p>
          <p class="text-center">
            Job Description:
            {{ careerDetails.job_description }}
          </p>
          <p class="text-center">
            Responsibilities:
            {{ careerDetails.responsibilities }}
          </p>
          <p class="text-center">
            Required Education:
            {{ careerDetails.required_education }}
          </p>
          <p class="text-center">
            Skills Required:
            {{ careerDetails.skills_required }}
          </p>
          <p class="text-center">
            Experience Required:
            {{ careerDetails.experience_required }}
          </p>
          <p class="text-center">
            Salary Range:
            {{ careerDetails.salary_range }}
          </p>
          <p class="text-center">
            Company Examples:
            {{ careerDetails.company_examples }}
          </p>
          <p class="text-center">
            Job Posting Sources:
            {{ careerDetails.job_posting_sources }}
          </p>
          <p class="text-center">
            Additional Notes:
            {{ careerDetails.additional_notes }}
          </p>
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
const careerDetails = ref("");
const rows = ref([]);
const viewInstitution = (item) => {
  showDialog.value = true;
  careerDetails.value = item;
};
const searchCareer = async () => {
  const response = await api.get(
    `https://api.agroscan.blog/api/careers?career_title=${name.value}`
  );
  rows.value = response.data.data;
};
const getCareers = async () => {
  try {
    const response = await api.get(`https://api.agroscan.blog/api/careers`);
    rows.value = response.data.data;
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
      position: "top",
    });
    results.value = false;
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
  getCareers();
});
</script>
