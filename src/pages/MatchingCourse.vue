<template>
  <q-page>
    <div class="q-pa-md" v-if="results">
      <h6 class="text-center">Kindly provide your details below</h6>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          outlined
          v-model="name"
          label="Your name *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type your name']"
        />

        <q-select
          outlined
          v-model="major"
          :options="areaOfStudyOptions"
          label="Area of Study *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please select major']"
        ></q-select>
        <q-select
          outlined
          v-model="comb"
          :options="combinationOptions"
          label="Select Your Combination *"
        ></q-select>

        <div class="flex justify-center">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" class="q-ml-sm" />
        </div>
      </q-form>
    </div>
    <div v-if="Submitted">
      <q-toolbar>
        <h6 class="text-center">
          Hello 👋 {{ name }} , below is the list of degree programs for you....
        </h6>
      </q-toolbar>

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
                <q-item-label>{{ item.program_name }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-icon
                  size="sm"
                  color="primary"
                  name="mdi-eye"
                  @click="viewDetails(item)"
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

        <q-card-section
          class="text-subtitle1 flex justify-center text-weight-medium"
          >{{ courseDetails.program_name }}</q-card-section
        >
        <q-card-section>
          <div class="flex justify-center text-weight-medium text-subtitle1">
            Admission Requirements
          </div>
          <p class="text-center">
            {{ courseDetails.admission_requirements }}
          </p>
          <p class="text-center">
            Minimum admission Points:
            {{ courseDetails.min_inst_admission_points }}
          </p>
          <p class="text-center text-caption">
            (where A = 5; B = 4; C= 3; D = 2; E = 1; S =0.5)
          </p>
          <p class="text-center">
            Duration: {{ courseDetails.duration_in_years }} years
          </p>
          <p class="text-center">
            Institution: {{ courseDetails.institution.name }}
          </p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
const major = ref("");
const comb = ref("");
const name = ref("");
const $q = useQuasar();
const Submitted = ref(false);
const results = ref(true);
const showDialog = ref(false);
const courseDetails = ref("");
const areaOfStudyOptions = ["Science", "Arts", "Business"];
const vertical = ref("vertical");
const columns = [
  {
    name: "name",
    required: true,
    label: "Program Name",
    align: "left",
    field: (row) => row.program_name,
  },
  { name: "action", required: true, label: "Action", align: "center" },
];
const rows = ref([]);
const combinationOptions = computed(() => {
  if (major.value === "Science") {
    return [
      { label: "PCB", value: "Physics,Chemistry,Biology" },
      { label: "PGM", value: "Physics,Geography,Mathematics" },
      { label: "PCM", value: "Physics,Chemistry,Mathematics" },
      { label: "CBN", value: "Chemistry,Biology,Nutrition" },
      { label: "CBG", value: "Chemistry,Biology,Geography" },
    ];
  } else if (major.value === "Arts" || major.value === "Business") {
    return [
      { label: "HKL", value: "History,Kiswahili,Language" },
      { label: "EGM", value: "Economics,Geography,Mathematics" },
      { label: "HGL", value: "History,Geography,Languages" },
      { label: "HGE", value: "History,Geography,Economics" },
      { label: "HGK", value: "History,Geography,Kiswahili" },
      { label: "ECA", value: "Economics,Commerce,Accountancy" },
    ];
  } else {
    return [];
  }
});
const viewDetails = (item) => {
  showDialog.value = true;
  courseDetails.value = item;
};
// const viewMore = async () => {
//   const response = await api.get(`https://api.agroscan.blog/api/bachfsixes`);
//   rows.value = response.data.data;
// };
const onSubmit = async () => {
  $q.loading.show({
    delay: 400, // ms
  });
  const subjects = comb.value.value.split(",");
  Submitted.value = true;
  try {
    const response = await api.get(
      `https://api.agroscan.blog/api/bachfsixes?subjects=${subjects}&major=${major.value}`
    );
    console.log(response);
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

const onReset = () => {
  name.value = "";
  major.value = "";
  comb.value = "";
};
</script>
