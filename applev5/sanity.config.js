import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {createSchema} from 'sanity'

export default defineConfig({
  name: 'default',
  title: 'AppleV5',

  projectId: '8dnopdyf',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
