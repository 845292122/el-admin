import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default () => {
  return Components({
    resolvers: [
      ElementPlusResolver({ importStyle: 'sass' }),
      IconsResolver({
        enabledCollections: ['bi'],
      }),
    ],
  })
}
