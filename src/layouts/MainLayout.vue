<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <q-icon name="mdi-school" size="2em" />
          </q-avatar>
          UniGuide
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white">
      <div class="q-pa-sm q-gutter-sm flex justify-around">
        <q-btn to="/course-selection" flat round size="1em" icon="mdi-home" />
        <q-btn to="/institutions" flat round size="1em" icon="mdi-menu" />
        <q-btn to="/career" flat round size="1em" icon="mdi-directions" />
      </div>
    </q-footer>
  </q-layout>
</template>
