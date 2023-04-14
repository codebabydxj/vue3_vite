<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
      @onCreated="handleCreated" />
  </div>
</template>

<script lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import * as API from '@/config/api'

export default {
  components: { Editor, Toolbar },
  props: {
    modelValue: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    }
  },
  setup(props) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref(props.modelValue)

    // 自定义增加 http  header
    const headerObj = {}

    // 工具配置
    const toolbarConfig = {}

    // 编辑器配置
    const editorConfig = {
      placeholder: '请输入内容...',
      MENU_CONF: {},
    }

    // 上传图片
    editorConfig.MENU_CONF['uploadImage'] = {
      // 上传图片的接口地址
      server: API.uploadFiles,
      // form-data fieldName ，默认值 'wangeditor-uploaded-image'
      fieldName: 'file',
      // form-data:,
      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 5 * 1024 * 1024, // 5M

      // 最多可上传几个文件，默认为 100
      maxNumberOfFiles: 20,

      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['image/png,image/jpeg,image/jpg'],

      // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
      meta: {
        // ...uploadData
        // token: 'xxx',
        // otherKey: 'yyy'
      },

      // 将 meta 拼接到 url 参数中，默认 false
      metaWithUrl: false,

      // 自定义增加 http  header
      headers: headerObj,

      // 跨域是否传递 cookie ，默认为 false
      withCredentials: true,

      // 超时时间，默认为 10 秒
      timeout: 5 * 1000, // 5 秒
      // 上传之前触发
      onBeforeUpload(file: any) {
        // file 选中的文件，格式如 { key: file }
        let fileObj = (Object.values(file)[0] as any).data
        const isJPG = (fileObj.type == 'image/jpg' || fileObj.type == 'image/jpeg' || fileObj.type == 'image/png')
        // if (!isJPG) {
        //     proxy.$message.warning('图片只能是 JPG、GIF、PNG 格式!')
        // }
        // 判断图片宽高
        // 定义 filereader对象

        // 判断图片大小
        let isLt = fileObj.size / 1024 / 1024 < 5 // 判断是否小于5M
        // if (!isLt) {
        //     proxy.$message.warning('图片大小不能超过5M! 请重新上传')
        // }
        if (!isJPG) {
          return false
        } else if (!isLt) {
          return false
        } else {
          return file
        }
        // 可以 return
        // 1. return file 或者 new 一个 file ，接下来将上传
        // 2. return false ，不上传这个 file
      },
      // 上传进度的回调函数
      onProgress(progress: any) {
        // progress 是 0-100 的数字
        console.log('progress', progress)
      },
      // 单个文件上传成功之后
      onSuccess(file: any, res: any) {
        console.log(`${file.name} 上传成功`, res)
      },
      // 自定义插入图片
      customInsert(res: any, insertFn: any) {
        // res 即服务端的返回结果
        // 从 res 中找到 url alt href ，然后插图图片
        insertFn(res.pictureUrl, '', '')
      },
      // 上传错误，或者触发 timeout 超时
      onError(file: any, err: any, res: any) {
        console.warn(`${file.name} 上传出错`, err, res)
      }
    }
    // 上传视频
    editorConfig.MENU_CONF['uploadVideo'] = {
      // 上传视频接口地址
      // server: usUploadStore().uploadVideo,
      // form-data fieldName ，默认值 'wangeditor-uploaded-video'
      fieldName: 'file',

      // 单个文件的最大体积限制，默认为 10M
      maxFileSize: 5 * 1024 * 1024, // 5M

      // 最多可上传几个文件，默认为 5
      maxNumberOfFiles: 3,

      // 选择文件时的类型限制，默认为 ['video/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['video/mp4'],

      // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
      // meta: {
      //     token: 'xxx',
      //     otherKey: 'yyy'
      // },

      // 将 meta 拼接到 url 参数中，默认 false
      metaWithUrl: false,

      // 自定义增加 http  header
      headers: headerObj,

      // 跨域是否传递 cookie ，默认为 false
      withCredentials: true,

      // 超时时间，默认为 30 秒
      timeout: 15 * 1000, // 15 秒

      // 视频不支持 base64 格式插入
      // 自定义插入视频
      customInsert(res: any, insertFn: any) {
        // res 即服务端的返回结果

        // 从 res 中找到 url ，然后插入视频
        insertFn(res.pictureUrl)
      },
      // 上传之前触发
      onBeforeUpload(file: any) {
        // file 选中的文件，格式如 { key: file }
        return file

        // 可以 return
        // 1. return file 或者 new 一个 file ，接下来将上传
        // 2. return false ，不上传这个 file
      },
      // 上传进度的回调函数
      onProgress(progress: any) {
        // progress 是 0-100 的数字
        console.log('progress', progress)
      },
      // 单个文件上传成功之后
      onSuccess(file: any, res: any) {
        console.log(`${file.name} 上传成功`, res)
      },
      // 单个文件上传失败
      onFailed(file: any, res: any) {
        console.log(`${file.name} 上传失败`, res)
      },
      // 上传错误，或者触发 timeout 超时
      onError(file: any, err: any, res: any) {
        console.log(`${file.name} 上传出错`, err, res)
      }
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor: any) => {
      editorRef.value = editor // 记录 editor 实例，重要！
      if (props.disabled) {
          editor.disable()
      } else {
          editor.enable()
      }
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', //  'default' 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated
    };
  }
}
</script>   